// IMPORT FROM EXTERNAL
import styled from 'styled-components';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
import Header from '../1.CatComponent/HeaderComponent';
import Footer from '../1.CatComponent/FooterComponent';
import LoginPane from './loginPaneComponent';
class Login extends Component {
  render() {
    const Login = () => {
      return(
          <LoginPane phone="__________" pwd="******"/>
      );
    }

    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route path='/Login' component={Login} />
              {/*<Route path='/forgotPwd' component={ForgotPwd} />
              <Route path='/home' component={HomePage} />*/}
              <Redirect to="/Login" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
