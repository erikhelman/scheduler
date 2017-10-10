import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Routes from './Routes';
import ThemeDefault from './themeDefault';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import StudentPage from './StudentPage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider MuiThemeProvider={ThemeDefault}>
        <div className="container">
          <Route exact path="/" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/main" component={MainPage} />
          {/*}<MainPage />*/}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
