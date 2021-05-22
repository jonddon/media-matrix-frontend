import React, {Fragment, useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {GiHamburgerMenu, MdExplore, AiFillSchedule, BsQuestionCircleFill, RiLoginCircleFill, RiLogoutCircleFill, FaRegEdit} from 'react-icons/all';

import {signOutUser} from '../../redux/actions/index';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import Button from '../button';

const Header = props => {
  const [isShown, setIsShown] = useState(false);

  const {userData} = props;

  Header.propTypes = {
    signOutUser: PropTypes.func.isRequired
  }
  
  function handleToggle() {
    setIsShown(prevState => !prevState);
  }
  const user = localStorage.getItem('userData')

  function signOutUser(){
    localStorage.clear()
  }
  return (
      <div>
        <header className={styles.container}>
        <div className={styles.headerLeft}>
          <Link exact='true' to={'/'}>
            <img src={logo} className={styles.logo} alt='Media Matrix'  />
          </Link>
          <div className='nav'>
            <NavLink activeClassName={styles.active} id={styles.navLink} className={styles.navLink} exact to={user ? '/explore': '/'}>Explore</NavLink>
            <NavLink activeClassName={styles.active} className={styles.navLink} exact to='/plans'>Plans</NavLink>
            <NavLink activeClassName={styles.active} className={styles.navLink} exact to='/faq'>FAQ</NavLink>
          </div>
        </div>

        {user ? 
        <nav className={styles.headerRight}>
          <Link className={styles.profile} exact='true' to='/dashboard'></Link>
        </nav>
         :
        <nav className={styles.headerRight}>
        <Link className={styles.login} to='/login'>Sign In</Link>
        <Link  to='/register'>
          <Button label='Sign Up' className={styles.signup} />
        </Link>
        </nav> }

        <nav className={styles.headerRight}>
        <GiHamburgerMenu onClick={handleToggle} className={styles.hamburgerMenu} />
        </nav>     
        </header>

        {isShown === true ? <div className={styles.hamburgerList}>
        <Link exact='true' to={user ? '/explore': '/'} className={styles.hamburgerItems}>
          <MdExplore className={styles.icon} />
          <div className={styles.items}>Explore</div>
        </Link>
        <Link exact='true' to='/plans' className={styles.hamburgerItems}>
          <AiFillSchedule className={styles.icon} />
          <div className={styles.items}>Plans</div>
        </Link>
        <Link exact='true' to='/faq' className={styles.hamburgerItems}>
          <BsQuestionCircleFill className={styles.icon} />
          <div className={styles.items}>Frequently Asked Questions</div>
        </Link>
        { user ? <Link to='/' onClick={signOutUser} className={styles.hamburgerItems}>
          <RiLogoutCircleFill className={styles.icon} />
          <div className={styles.items}>Sign Out</div>
        </Link> :
        <>
        <Link exact='true' to='/login' className={styles.hamburgerItems}>
          <RiLoginCircleFill className={styles.icon} />
          <div className={styles.items}>Sign In</div>
        </Link>
        <Link exact='true' to='/register' className={styles.hamburgerItems}>
        <FaRegEdit className={styles.icon} />
          <div className={styles.items}>Sign Up</div>
        </Link>
        </>}
      </div>: <Fragment/>}
      </div>
  );
}

const mapStateToProps = state => {
  const {isAuthenticated, userData} = state.auth;

  console.log(userData, 'userdata console header')
  return {isAuthenticated, userData}
}
export default connect(mapStateToProps, {signOutUser})(Header);
