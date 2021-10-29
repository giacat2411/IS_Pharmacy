import './App.css';
import { Component } from 'react';
import Main from './1.CatComponent/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { FaAppStore } from 'react-icons/fa';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
        <Main />
    </div>
    </BrowserRouter>
  );
}
}

export default App;
