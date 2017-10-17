import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import ProfilePage from './ProfilePage';
import MainPage from './MainPage';
import StudentPage from './StudentPage';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component ={LoginPage}/>
      <Route exact path='/main' component={MainPage}/>
      <Route exact path='/registration' component={RegistrationPage}/>
      <Route exact path='/profile' component={ProfilePage}/>
      <Route exact path='/student' component={StudentPage}/>
    </Switch>
  </main>
)

export default Routes;
