import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const {type} = props;
  
  const user = localStorage.getItem('userData')
  if (type === "guest" && user ) return <Redirect to="/explore" />;
  else if (type === "private" && !user) return <Redirect to="/" />;

  return <Route exact {...props} />;
};

const mapStateToProps = state => {
  const {userData} = state.auth;
  console.log(state.auth.userData)
  return {userData}
};

export default connect(mapStateToProps)(AuthRoute);