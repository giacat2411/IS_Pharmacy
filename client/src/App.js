import './App.css';
import { Component } from 'react';
//import Main from './1.CatComponent/MainComponent';
import Main from './3.ChanhComponent/ManagerNur';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
        <Main/>
    </div>
    </BrowserRouter>
  );
}
}

export default App;
