import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    axios.get('/api/tests')
         .then(result => this.setState({ message: result.data.message }))
  };

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.message}</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
