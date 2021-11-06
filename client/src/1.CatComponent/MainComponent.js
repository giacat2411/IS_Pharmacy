// IMPORT FROM EXTERNAL
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
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

//PHUC
import LoginPane from '../2.PhucComponent/loginPaneComponent';
import Profile from '../2.PhucComponent/profile';
import SignUp from '../2.PhucComponent/Signup';
//NOT PHUC

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
        <Header/>
        <div>
          <Switch>
              {/*---------------------------------Cat------------------------------------*/}
              <Route path='/home' component={HomePage} />
              <Route path='/buydrug' component={BuyDrug} />
              <Route path='/customer' component={Customer} />
              <Route path='/view_cart/:cart' component={ViewMyCart}/>
              <Route path='/manage_medicine' component={NurseManageMedicine} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={DoctorPage} />

              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={LoginPane}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/profile' component={Profile}/>

              {/*---------------------------------Chanh------------------------------------*/}


              <Redirect to='/home' />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;

