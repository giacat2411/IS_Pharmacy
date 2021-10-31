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
import ViewCart from './ViewCartComponent';
import NurseManageMedicine from './NurseManageMedicineComponent';

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

    const ViewMyCart = ({match}) => {
      return(
        <ViewCart cart = {JSON.parse(match.params.cart)} />
      )
    }

    const DoctorPage = () => {
      return(
          <Doctor />
      );
    }

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
              <Route path='/customer' component={Customer} />
              <Route path='/view_cart/:cart' component={ViewMyCart}/>
              <Route path='/manage_medicine' component={NurseManageMedicine} />
              <Route path='/doctor' component={DoctorPage} />
              <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;

