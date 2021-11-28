import './App.css';
import { Component } from 'react';
//import Main from './1.CatComponent/MainComponent';
import ScheduleTable from './3.ChanhComponent/ViewSchedule.js';
//import Appointment from './4.DungComponent/AppointmentComponent.js';

import { BrowserRouter } from 'react-router-dom';
//import { application } from 'express';
//import './server'
class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
        <ScheduleTable/>
    </div>
    </BrowserRouter>
  );
}
}

export default App;
