import React from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {clearSignUp, signUpUser} from '../../redux/actions/index';
import styles from './signup.module.css';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/button';
import Loading from '../../components/Loading';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        error: '',
        name: '',
        phone_number: '',
        email: '',
        loading: false,
        toggle: false,
        toggleConfirmation: false
      };
    }
    // const [userName, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [error, setError] = useState('');
    // const [name, setName] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [email, setEmail] = useState('');
    // const [toggle, setToggle] = useState(false);

    static propTypes = {
        signUpUser: PropTypes.func.isRequired
    }


    handleToggle = () => {
        // setToggle(prevState => !prevState);
        this.setState({toggle: !this.state.toggle})
    }

    handleToggleConfirmation =()=> {
        this.setState({toggleConfirmation: !this.state.toggleConfirmation})
    }
    
    handleConfirmPassword = (e) => {
        if(e.target.value !== this.state.password && e.target.value !== ''){
            this.setState({error: 'Passwords do not match'})
            // console.log(this.state.error)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { first_name, last_name, username, phone_number, password, email } = this.state;
        const newUser = {first_name, last_name, username, phone_number, password, email }

        this.props.signUpUser(newUser)
        
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

  
    render(){
        return (
            <div className={styles.wrapper}>
                <form autoComplete='off' onSubmit={this.handleSubmit} className={styles.container}>
                    <p className={styles.header}>Sign Up</p>
                    <Input
                        placeholder='First Name'
                        className={styles.inputWrapper}
                        inputClassName={styles.emailInput}
                        onChange={e => this.setState({first_name: e.target.value})}
                        visuallyHidden
                        type='text'
                    />
                    <Input
                        placeholder='Last Name'
                        className={styles.inputWrapper}
                        inputClassName={styles.emailInput}
                        onChange={e => this.setState({last_name: e.target.value})}
                        visuallyHidden
                        type='text'
                    />
                    <Input
                        placeholder='Email'
                        className={styles.inputWrapper}
                        inputClassName={styles.emailInput}
                        onChange={e => this.setState({email: e.target.value})}
                        visuallyHidden
                        type='email'
                    />
                    <Input 
                        placeholder='Username' 
                        className={styles.inputWrapper}
                        inputClassName={styles.emailInput} 
                        type='text' 
                        onChange={e => this.setState({username: e.target.value})}
                        visuallyHidden
                    />
                    <Input
                        placeholder='Phone Number'
                        className={styles.inputWrapper}
                        inputClassName={styles.emailInput}
                        onChange={e => this.setState({phone_number: e.target.value})}
                        visuallyHidden
                    />
                    <InputPassword
                        placeholder='Password' 
                        className={styles.passInput}
                        inputStyle={styles.inputPassword}
                        toggle={this.state.toggle} 
                        onToggle={this.handleToggle}
                        onChange={ e => this.setState({password: e.target.value})}
                    />
                    <InputPassword
                        placeholder='Confirm Password' 
                        className={styles.passInput}
                        inputStyle={styles.inputPassword}
                        toggle={this.state.toggleConfirmation} 
                        onToggle={this.handleToggleConfirmation}
                        onChange={this.handleConfirmPassword} 
                    />
                    {/* <p>{error}</p> */}
                    {this.renderLoading()}
                    <p className={styles.haveAccount}>Have an account already? <Link to='/login' className={styles.login}>Log In</Link></p>
                </form>
            </div>);
    }
}


const mapStateToProps = state => {
    const { first_name, last_name, username, password, phone_number, loadingUser, email, error } = state.auth;
    // console.log(first_name, 'name mapstate')
    // console.log(state.register, 'this is state')
    return { first_name, last_name, username, password, phone_number, loadingUser, email, error };
}

export default connect(mapStateToProps, {signUpUser, clearSignUp}) (SignUp);