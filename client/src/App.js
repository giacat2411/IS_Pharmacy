import './App.css';
import { Component } from 'react';
import Main from './1.CatComponent/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import Login from './2.PhucComponent/LoginComponent';
import SignPwd from './2.PhucComponent/forgetpwd';
class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
        <SignPwd />
    </div>
    </BrowserRouter>
  );
}
}

export default App;