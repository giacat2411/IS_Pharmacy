// IMPORT FROM EXTERNAL
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORT DATA

// IMPORT COMPONENTS
import Header from './Header';
import Footer from './Footer';
import Doctor from './Doctor';

class MainDoctor extends Component {
  render() {
    const DoctorPage = () => {
      return(
          <Doctor />
      );
    }

    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route path='/doctor' component={DoctorPage} />
              <Redirect to="/doctor" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainDoctor;
