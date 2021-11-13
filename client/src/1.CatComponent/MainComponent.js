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
              <Route path='/home' component={HomePage} />
              <Route path='/buydrug' component={BuyDrug} />
              <Route path='/customer' component={Customer} />
              <Route path='/view_cart/:cart' component={ViewMyCart}/>
              <Route path='/manage_medicine' component={NurseManageMedicine} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={DoctorPage} />
              <Route path='/appointment' component={AppointmentPage} />
              <Route path='/cancelappointment' component={CancelAppointmentPage} />
              <Route path='/payment/:cart' component={PaymentPage} />
              <Route path='/createanappointment' component={CreateAnAppointmentPage} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedulePage} />


              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Sign}/>
              <Route path='/forgetpwd' component={Sign}/>
              <Route path='/profile' component={ProfilePage}/>

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

