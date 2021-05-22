import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import history from "./services/history";

import './App.css';
import AuthRoute from './components/Routes/AuthRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Explore from './pages/Explore/Explore';
import Faq from './pages/FAQ';
import Plans from './pages/Plans';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Sign Up/Signup';
import AdminLayout from './components/Layout/AdminLayout';

function App() {
  return (
       <Router history={history}>
         <AdminLayout>
        <Switch>
          {/* <AuthRoute  path='/explore' type='private' component={Explore} /> */}
          <AuthRoute path='/dashboard' type='/private'>
            <Dashboard />
          </AuthRoute>
          <AuthRoute path='/login' type='guest'>
            <Signin />
          </AuthRoute>
          <AuthRoute path='/register' type='guest'>
            <Signup />
          </AuthRoute>
          <Route component={LandingPage} exact path="/" />
          <Route component={Explore} exact path="/explore" />
          <Route component={Plans} exact path='/plans' />
          <Route component={Faq} exact path='/faq' />
        </Switch>
        </AdminLayout>
      </Router>
   
  );
}

export default App;
