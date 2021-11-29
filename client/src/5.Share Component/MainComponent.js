// IMPORT FROM EXTERNAL
import React, { Component, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
// CAT
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './Main UI/HomeComponent';
import Patient from './Main UI/PatientComponent';
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
import ViewMedicalRecord from '../4.DungComponent/MedicalRecordComponent';

//PHUC
import LoginPane from '../2.PhucComponent/loginPaneComponent';
import Profile from '../2.PhucComponent/profile';
import SignUp from '../2.PhucComponent/Signup';
import { HeaderProvider } from './Context';
import PathCtx, { PathProvider } from './Path';
import HR from '../2.PhucComponent/HR';

//CHANH
import Nurse from './Main UI/NurseComponent';
import axios from 'axios';



// const CustomerPath = ['/buydrug', '/customer', '/view_cart', '/view_order', '/view_order_details/:orderID', '/payment/', '/view_medical_record'];
// const DoctorPath = ['/statistic_order', '/view_order', '/view_order_details/:orderID',
//   '/doctor', '/view_medical_record'];//   '/appointment','/cancelappointment' ,'/createanappointment','/re-examination_schedule','/instant_appointment'
// const NurserPath = ['/manage_drug', '/nurse'];
// const GlobalPath = ['/', '/home', '/login', '/signup', '/profile'];

// const reload = (role, currPath) => {
//   if (currPath in GlobalPath) return currPath;
//   if (role == 'Doctor') {
//     if (currPath in [DoctorPath]) return currPath;
//   }
//   else if (role == 'Nurse') {
//     if (currPath in NurserPath) return currPath;
//   }
//   else if (role == 'Customer') {
//     if (currPath in CustomerPath) return currPath;
//   }
//   else return '/';
// }

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect_page: 'home'
    }
    this.updatePage = this.updatePage.bind(this);
  }

  async componentDidMount() {
    await axios.get('/api/get/session')
    axios.get('/api/get/session').then(res => {
      console.log(res.data.role);
      if (res.data !== undefined)
        this.updatePage(res.data.role === undefined ? 'home' : res.data.role)
    })
  }

  updatePage(page) {
    this.setState({redirect_page: page})
  }

  render() {
    const ViewDetails = ({ match }) => {
      return (
        <ViewOrderDetail orderID={parseInt(JSON.parse(match.params.orderID))} />
      )
    }

    const Info = ({match}) => {
      return (
        <Profile phone = {parseInt(JSON.parse(match.params.phone))}/>
      )
    }
    
    const Login = () => {
      return (
        <LoginPane updatePage={this.updatePage} />
      )
    }

    const role = this.state.redirect_page === 'home' ? 0 :
                this.state.redirect_page === 'Patient' ? 1 :
                this.state.redirect_page === 'Nurse' ? 2 : 3       
    console.log(this.state.redirect_page)
    return (
      <HeaderProvider>
        <div>
          <Header updatePage={this.updatePage}/>
          <div>
            <Switch>
              {/*---------------------------------Cat------------------------------------*/}
              <Route exact path='/home' component={Home} />
              <Route path='/buydrug' component={BuyDrug} />
              <Route path='/patient' component={Patient} />
              <Route path='/view_cart' component={ViewCart} />
              <Route path='/manage_drug' component={ManageDrug} />
              <Route path='/view_order' component={ViewOrder} />
              <Route path='/statistic_order' component={StatisticOrder} />
              <Route path='/view_order_details/:orderID' component={ViewDetails} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={Doctor} />
              <Route path='/appointment' component={Appointment} />
              <Route path='/cancelappointment' component={CancelAppointment} />
              <Route path='/payment' component={Payment} />
              <Route path='/createanappointment' component={CreateAnAppointment} />
              <Route path='/view_medical_record' component={MedicalRecord} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedule} />
              <Route path='/instant_appointment' component={InstantAppointment} />
              <Route path='/medical_record' component={ViewMedicalRecord} />

              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='/profile/:phone' component={Info} />
              <Route path='/HR' component={HR} />

              {/*---------------------------------Chanh------------------------------------*/}
              <Route path='/nurse' component={Nurse} />

              <Redirect to={`/${this.state.redirect_page}`} />
            </Switch>
          </div>
          <Footer />
        </div>
      </HeaderProvider>
    );
  }
}

export default Main;

