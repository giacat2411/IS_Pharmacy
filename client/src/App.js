import './App.css';
import { Component } from 'react';
//import Main from './1.CatComponent/MainComponent';
import ScheduleTable from './3.ChanhComponent/ViewSchedule';
import { BrowserRouter } from 'react-router-dom';
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
