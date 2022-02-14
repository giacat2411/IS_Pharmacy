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
import Payment from '../1.CatComponent/Buy Drug/PaymentComponent';
import PaymentMoMo from '../1.CatComponent/Buy Drug/PaymentMoMoComponent';
import ViewMedicalDetail from '../4.DungComponent/ViewMedicalDetail';
import Prescribe from '../1.CatComponent/Doctor/PrescribeComponent';
import ViewPrescribe from '../1.CatComponent/Doctor/ViewPrescribeMedicine';
import StatisticTreatmentTurn from '../1.CatComponent/Nurse Manage/Manage Treatment/StatisticTreatmentTurnComponent';
import ViewOrderPrescribeDetail from '../1.CatComponent/Nurse Manage/Manage Order/ViewOrderPrescribeDetail';
import ViewDoctor from '../1.CatComponent/Patient/ViewDoctorComponent';
import ViewTreatmentTurn from '../1.CatComponent/Doctor/ViewTreatmentTurnComponent';

// DUNG
import Doctor from './Main UI/DoctorComponent';
import Appointment from '../4.DungComponent/AppointmentComponent';
import CancelAppointment from '../4.DungComponent/CancelAppointmentComponent';
// import Payment from '../4.DungComponent/PaymentComponent';
import CreateAnAppointment from '../4.DungComponent/CreateAnAppointmentComponent';
import Re_examinationSchedule from '../4.DungComponent/Re-examinationScheduleComponent';
import MedicalRecord from '../4.DungComponent/VIewMedicalRecordComponent';
import ViewMedicalRecord from '../4.DungComponent/MedicalRecordComponent';
import InstantAppointment from '../4.DungComponent/InstantAppointmentComponent';

//PHUC
import LoginPane from '../2.PhucComponent/loginPaneComponent';
import Profile from '../2.PhucComponent/profile';
import SignUp from '../2.PhucComponent/Signup';
import { HeaderProvider } from './Context';
import PathCtx, { PathProvider } from './Path';
import HR from '../2.PhucComponent/HR';
import PrescribeDetail from '../1.CatComponent/Nurse Manage/Manage Order/PrescibeMed';


//CHANH
import Nurse from './Main UI/NurseComponent';
import axios from 'axios';
import SaveSchedule from '../3.ChanhComponent/SaveSchedule';
import View from '../3.ChanhComponent/View';
import ScheduleTable from '../3.ChanhComponent/ViewSchedule';


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
    const res = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/session')
    console.log(res.data.role);
    if (res.data !== undefined)
      if (res.data.role !== undefined)
        this.updatePage(res.data.role === "Guest" ? 'home' : res.data.role)
  }

  updatePage(page) {
    this.setState({ redirect_page: page })
  }

  render() {
    const Treatment = ({ match }) => {
      return (
        <ViewTreatmentTurn phone={parseInt(JSON.parse(match.params.id))} />
      )
    }
    const Prescribe_Medicine = ({ match }) => {
      return (
        <Prescribe treatment_id={parseInt(JSON.parse(match.params.id))} />
      )
    }

    const View_Prescribe = ({ match }) => {
      return (
        <ViewPrescribe treatment_id={parseInt(JSON.parse(match.params.id))} />
      )
    }

    const MedicalDetail = ({ match }) => {
      return (
        <ViewMedicalDetail medicalID={parseInt(JSON.parse(match.params.id))} />
      )
    }
    const ViewDetails = ({ match }) => {
      return (
        <ViewOrderDetail orderID={parseInt(JSON.parse(match.params.orderID))} />
      )
    }

    const ViewPrescribeDetails = ({ match }) => {
      return (
        <ViewOrderPrescribeDetail orderID={parseInt(JSON.parse(match.params.orderID))} />
      )
    }

    const Info = ({ match }) => {
      return (
        <Profile phone={parseInt(JSON.parse(match.params.phone))} />
      )
    }

    const Login = () => {
      return (
        <LoginPane updatePage={this.updatePage} />
      )
    }

    const Record = ({ match }) => {
      return <ViewMedicalRecord phone={parseInt(JSON.parse(match.params.phone))} />
    }

    const role = this.state.redirect_page === 'home' ? 0 :
      this.state.redirect_page === 'Patient' ? 1 :
        this.state.redirect_page === 'Nurse' ? 2 : 3
    console.log(this.state.redirect_page)
    return (
      <HeaderProvider>
        <div>
          <Header updatePage={this.updatePage} />
          <div className="content-container">
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
              <Route path='/view_order_prescribe_details/:orderID' component={ViewPrescribeDetails} />
              <Route path='/payment' component={Payment} />
              <Route path='/payment_momo' component={PaymentMoMo} />
              <Route path="/view_medical_detail/:id" component={MedicalDetail} />
              <Route path="/prescribe/:id" component={Prescribe_Medicine} />
              <Route path="/view_prescribe/:id" component={View_Prescribe} />
              <Route path='/statistic_treatment' component={StatisticTreatmentTurn} />
              <Route path='/view_doctor' component={ViewDoctor} />
              <Route path='/view_treatment/:id' component={Treatment} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={Doctor} />
              <Route path='/appointment' component={Appointment} />
              <Route path='/cancelappointment' component={CancelAppointment} />
              <Route path='/createanappointment' component={CreateAnAppointment} />
              <Route path='/view_medical_record' component={MedicalRecord} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedule} />
              <Route path='/instant_appointment' component={InstantAppointment} />
              <Route path='/medical_record/:phone' component={Record} />

              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='/profile/:phone' component={Info} />
              <Route path='/HR' component={HR} />
              <Route path='/prescribe-med' component={PrescribeDetail} />
              {/* <Route path='/myorder'component={MyListOrder}/> */}

              {/*---------------------------------Chanh------------------------------------*/}
              <Route path='/nurse' component={Nurse} />
              <Route path='/saveSchedule' component={SaveSchedule} />
              <Route path='/view' component={View} />
              <Route path='/scheduleTable' component={ScheduleTable} />

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

