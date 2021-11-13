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
import Doctor from '../4.DungComponent/DoctorComponent';
import Appointment from '../4.DungComponent/AppointmentComponent';
import Fetch from '../4.DungComponent/testfetch';
import CancelAppointment from '../4.DungComponent/CancelAppointmentComponent';
import Payment from '../4.DungComponent/PaymentComponent';
import CreateAnAppointment from '../4.DungComponent/CreateAnAppointmentComponent';
import Re_examinationSchedule from '../4.DungComponent/Re-examinationScheduleComponent';

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

    const AppointmentPage = () => {
      return(
          <Appointment />
      );
    }

    const CancelAppointmentPage = () => {
      return(
          <CancelAppointment />
      );
    }

    const PaymentPage = ({match}) => {
      return(
        <Payment cart = {JSON.parse(match.params.cart)} />
      )
    }

    const CreateAnAppointmentPage = () => {
      return(
        <CreateAnAppointment />
      )
    }

    const Re_examinationSchedulePage = () => {
      return(
        <Re_examinationSchedule />
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
              <Route path='/doctor' component={DoctorPage} />
              <Route path='/appointment' component={AppointmentPage} />
              <Route path='/cancelappointment' component={CancelAppointmentPage} />
              <Route path='/payment/:cart' component={PaymentPage} />
              <Route path='/createanappointment' component={CreateAnAppointmentPage} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedulePage} />


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

