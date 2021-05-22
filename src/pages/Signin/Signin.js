import React from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from './signin.module.css';
import { signInUser, clearSignIn } from '../../redux/actions/index';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/button';
import Loading from '../../components/Loading';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            identifier: '',
            password: '',
            toggle: false,
            loading: false,
        }
    }

    static propTypes = {
        signInUser: PropTypes.func.isRequired,
        clearSignIn: PropTypes.func.isRequired
    }

     handleToggle =()=> {
        this.setState({ toggle: !this.state.toggle})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleSignIn =(e)=> {
        e.preventDefault();
        // e.target.reset();
        const {identifier, password} = this.state;
        const user = {identifier, password}
        this.props.signInUser(user)
        // this.props.clearSignIn()
    }

    renderLoading = () => {
        const { loadingUser } = this.props
        if(loadingUser || this.state.loading) {
            return (
                <Button label={<Loading color='#fff' width='4rem' height='2rem' />} className={styles.disabled} type='submit' />
            )
        }
         return <Button  label='Log In' className={styles.button} type='submit' />
    }


    redirectToHome = () => {
        console.log(this.props, 'this props')
        
    }

  
    render(){
        // const {loadingUser} = this.props
        return (
            <div className={styles.wrapper}>
                <form onSubmit={this.handleSignIn} className={styles.container}>
                    <p className={styles.header}>User Login</p>
                    <Input 
                        placeholder='Username' 
                        className={styles.inputWrapper}
                        inputClassName={styles.emailInput} 
                        type='text' 
                        onChange={this.onChange} 
                        visuallyHidden
                        name='identifier'
                    />
                    <InputPassword
                        placeholder='Password' 
                        className={styles.passInput}
                        inputStyle={styles.inputPassword}
                        toggle={this.state.toggle} 
                        onToggle={this.handleToggle}
                        onChange={this.onChange}
                        name='password' 
                    />
                    {this.renderLoading()}
                    {/* <Button  label='Log In' className={styles.button} type='submit' /> */}
                    <p className={styles.forgotPassword}>Forgot Password?</p>
                </form>
                <Link to='/register'>
                    <Button label='Create Account' className={styles.createAccount} />
                </Link>
        </div>);
    }
}

const mapStateToProps = state => {
    const {identifier, password, loadingUser} = state.auth;
        // console.log(state.auth, 'sign in state')
    return {identifier, password, loadingUser}
};

export default connect(mapStateToProps, {clearSignIn, signInUser})(Signin);