// IMPORT FROM EXTERNAL
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
//PHUC
import LoginPane from '../2.PhucComponent/loginPaneComponent';
import SignPwd from '../2.PhucComponent/forgetpwd';
import Profile from '../2.PhucComponent/profile';
//NOT PHUC
class Main extends Component {
  render() {
    const HomePage = () => {
      return(
          <Home />
      );
    }
    const Login = () => {
      return(
          <LoginPane />
      );
    }
    const Sign = () => {
      return(
          <SignPwd />
      );
    }
    const ProfilePage = () =>{
      return (
        <Profile/>
      )
    }
    
    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Sign}/>
              <Route path='/forgetpwd' component={Sign}/>
              <Route path='/profile' component={ProfilePage}/>
              <Redirect to='/home' />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
