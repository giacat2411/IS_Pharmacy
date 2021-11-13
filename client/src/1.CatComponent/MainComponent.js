// IMPORT FROM EXTERNAL
import React, { Component,useState,useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
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
import Profile from '../2.PhucComponent/profile';
import SignUp from '../2.PhucComponent/Signup';
// import HeaderDefine from './Context';
import { HeaderProvider } from './Context';
//TODO: Context user with role

//CHANH
import ManagerNur from '../3.ChanhComponent/ManagerNur';

const Main = (props) => {
  // const ctx = useContext(HeaderDefine);
  // const [formValue, setFormValue] = useState({
      
  //     phone: ctx.phone,
  //     fullname: ctx.fullname,
  //     pwd: '123456',
  //     role:"Guest",
  // });

  // const ProviderValue=useMemo(()=>({formValue,setFormValue}),[formValue,setFormValue]);
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

    // const ctx = useContext(HeaderDefine);
    // const [formValue, setFormValue] = useState({
        
    //     phone: ctx.phone,
    //     fullname: ctx.fullname,
    //     pwd: '123456',
    //     role:"Guest",
    // });
    // const ProviderValue=useMemo(()=>({formValue,setFormValue}),[formValue,setFormValue]);


    const PaymentPage = ({match}) => {
      return(
        <Payment cart = {JSON.parse(match.params.cart)} />
      )
    }
    
    return (
      // <HeaderDefine.Provider value={ProviderValue}>
      <HeaderProvider>
      <div>
        <Header/>
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
              <Route path='/appointment' component={Appointment} />
              <Route path='/cancelappointment' component={CancelAppointment} />
              <Route path='/payment/:cart' component={PaymentPage} />
              <Route path='/createanappointment' component={CreateAnAppointment} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedule} />


              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={LoginPane}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/profile' component={Profile}/>

              {/*---------------------------------Chanh------------------------------------*/}
              <Route path='/nurse' component={ManagerNur} />

              <Redirect to='/home' />
          </Switch>
        </div>
        <Footer />
      </div>
      </HeaderProvider>
      // </HeaderDefine.Provider>
    );
}

export default Main;

