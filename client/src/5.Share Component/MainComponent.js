// IMPORT FROM EXTERNAL
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
// CAT
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './Main UI/HomeComponent';
import Customer from './Main UI/CustomerComponent';
import BuyDrug from '../1.CatComponent/Buy Drug/BuyDrugComponent';
import ViewCart from '../1.CatComponent/Buy Drug/ViewCartComponent';
import ManageDrug from '../1.CatComponent/Nurse Manage/Manage Drug/ManageDrug';
import StatisticOrder from '../1.CatComponent/Nurse Manage/Manage Order/StatisticOrder';
import ViewOrder from '../1.CatComponent/Nurse Manage/Manage Order/ViewOrder';
import ViewOrderDetail from '../1.CatComponent/Nurse Manage/Manage Order/ViewOrderDetail';

// DUNG
import Doctor from './Main UI/DoctorComponent';
import Appointment from '../4.DungComponent/AppointmentComponent';
import CancelAppointment from '../4.DungComponent/CancelAppointmentComponent';
import Payment from '../4.DungComponent/PaymentComponent';
import CreateAnAppointment from '../4.DungComponent/CreateAnAppointmentComponent';
import Re_examinationSchedule from '../4.DungComponent/Re-examinationScheduleComponent';
import MedicalRecord from '../4.DungComponent/VIewMedicalRecordComponent';
import InstantAppointment from '../4.DungComponent/InstantAppointmentComponent';

//PHUC
import LoginPane from '../2.PhucComponent/loginPaneComponent';
import Profile from '../2.PhucComponent/profile';
import SignUp from '../2.PhucComponent/Signup';
import { HeaderProvider } from './Context';

//CHANH
import Nurse from './Main UI/NurseComponent';

const Main = () => {
  const ViewDetails = ({match}) => {
    return (
      <ViewOrderDetail orderID = {parseInt(JSON.parse(match.params.orderID))} />
    )
  }

  let ctx = undefined;

    return (
      <HeaderProvider>
      <div>
        <Header/>
        <div>
          <Switch>
              {/*---------------------------------Cat------------------------------------*/}
              <Route path='/home' component={Home} />
              <Route path='/buydrug' component={BuyDrug} />
              <Route path='/customer' component={Customer} />
              <Route path='/view_cart' component={ViewCart}/>
              <Route path='/manage_drug' component={ManageDrug} />
              <Route path='/view_order' component={ViewOrder} />
              <Route path='/statistic_order' component={StatisticOrder} />
              <Route path='/view_order_details/:orderID' component={ViewDetails} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={Doctor} />
              <Route path='/appointment' component={Appointment} />
              <Route path='/cancelappointment' component={CancelAppointment} />
              <Route path='/payment/' component={Payment} />
              <Route path='/createanappointment' component={CreateAnAppointment} />
              <Route path='/view_medical_record' component={MedicalRecord} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedule} />
              <Route path='/instant_appointment' component={InstantAppointment} />


              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={LoginPane}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/profile' component={Profile}/>

              {/*---------------------------------Chanh------------------------------------*/}
              <Route path='/nurse' component={Nurse} />
              
              <Redirect to='/home' />
  
          </Switch>
        </div>
        <Footer />
      </div>
      </HeaderProvider>
    );
}

export default Main;

