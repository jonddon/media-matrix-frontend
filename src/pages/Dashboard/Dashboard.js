import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {signOutUser} from '../../redux/actions';
import styles from'./Dashboard.module.css';


class Dashboard extends React.Component{
  static propTypes = {
    signOutUser: PropTypes.func.isRequired
  }
  render(){
    // const {signOutUser} = this.props
    return(
      <div className={styles.container}>Dashboard
      <Link to='/' onClick={this.props.signOutUser}>Sign Out</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {userData} = state.auth;
      // console.log(state.auth, 'sign in state')
  return {userData}
};

export default connect(mapStateToProps, {signOutUser})(Dashboard);