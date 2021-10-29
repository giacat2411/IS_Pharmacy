import './App.css';
import { Component } from 'react';
import MainDoctor from './4.DungComponent/Main';
//import Main from './1.CatComponent/MainComponent'
import { BrowserRouter } from 'react-router-dom';
import { FaAppStore } from 'react-icons/fa';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
        <MainDoctor />
    </div>
    </BrowserRouter>
  );
}
}

export default App;
