// IMPORT FROM EXTERNAL
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Customer from './CustomerComponent';
import BuyDrug from './BuyDrugComponent';

// DUNG
import HeaderDoctor from '../4.DungComponent/Header';
import Doctor from '../4.DungComponent/DoctorComponent';

class Main extends Component {
  render() {
    const HomePage = () => {
      return(
          <Home />
      );
    }

<<<<<<< HEAD
    const ViewMyCart = ({match}) => {
      return(
        <ViewCart cart = {JSON.parse(match.params.cart)} />
      )
      
    const DoctorPage = () => {
      return(
          <Doctor />
      );

    }

=======
>>>>>>> parent of a10e943 (Update Buy and View Cart Feature)
    return (
      <div>
        <Switch>
          <Route path='/home' component={Header} />
          <Route path='/doctor' component={HeaderDoctor} />
        </Switch>
        <div>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/buydrug' component={BuyDrug} />
<<<<<<< HEAD
              <Route path='/customer' component={Customer} />
              <Route path='/view_cart/:cart' component={ViewMyCart}/>
              <Route path='/doctor' component={DoctorPage} />
=======
              <Route exact path='/customer' component={Customer} />
>>>>>>> parent of a10e943 (Update Buy and View Cart Feature)
              <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;

