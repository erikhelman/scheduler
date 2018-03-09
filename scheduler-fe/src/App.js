import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import SuccessForm from './SuccessForm';
import RecoveryPage from './RecoveryPage';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/registration" component={ RegistrationPage } />
        <Route path="/main" component={ MainPage } />
        <Route path="/success" component={ SuccessForm } />
        <Route path="/recovery" component={ RecoveryPage } />
      </div>

    );
  }
}

export default App;
