// IMPORT FROM EXTERNAL
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Customer from './CustomerComponent';
import BuyDrug from './Buy Drug/BuyDrugComponent';
import ViewCart from './Buy Drug/ViewCartComponent';
import ManageDrug from './Nurse Manage/Manage Drug/ManageDrug';
// import StatisticOrder from './Nurse Manage/Manage Order/StatisticOrder';
import ViewOrder from './Nurse Manage/Manage Order/ViewOrder';
import ViewOrderDetail from './Nurse Manage/Manage Order/ViewOrderDetail';

// DUNG
import HeaderDoctor from '../4.DungComponent/Header';
import Doctor from '../4.DungComponent/DoctorComponent';

//PHUC
import LoginPane from '../2.PhucComponent/loginPaneComponent';
import SignPwd from '../2.PhucComponent/forgetpwd';
import Profile from '../2.PhucComponent/profile';
//NOT PHUC

class Main extends Component {
  render() {
    const ViewMyCart = ({match}) => {
      return(
        <ViewCart cart = {JSON.parse(match.params.cart)} />
      )
    }

    const ViewDetails = ({match}) => {
      return (
        <ViewOrderDetail orderID = {parseInt(JSON.parse(match.params.orderID))} />
      )
    }
    
    return (
      <div>
        <Header />
        <div>
          <Switch>
              {/*---------------------------------Cat------------------------------------*/}
              <Route path='/home' component={Home} />
              <Route path='/buydrug' component={BuyDrug} />
              <Route path='/customer' component={Customer} />
              <Route path='/view_cart/:cart' component={ViewMyCart}/>
              <Route path='/manage_drug' component={ManageDrug} />
              <Route path='/view_order' component={ViewOrder} />
              {/* <Route path='/statistic_order' component={StatisticOrder} /> */}
              <Route path='/view_order_details/:orderID' component={ViewDetails} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={Doctor} />

              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={LoginPane}/>
              <Route path='/signup' component={SignPwd}/>
              <Route path='/forgetpwd' component={SignPwd}/>
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

