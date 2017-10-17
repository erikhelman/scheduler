import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import ThemeDefault from './themeDefault';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider MuiThemeProvider={ThemeDefault}>
        <div className="container">
          <Route exact path="/" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/main" component={MainPage} />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
