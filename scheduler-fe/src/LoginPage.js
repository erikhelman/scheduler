import React from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MainPage from './MainPage';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      name: '',
      password: '',
      loggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();
    const name = this.state.name;
    const password = this.state.password;
    var self=this;
    const status = this.state.loggedIn;

    axios.post('/login', {
      name: name,
      password: password
    })
    .then(function (response) {
      console.log(response.status)
      if (response.status == 200) {
        console.log(response.data.hasOwnProperty('isAuthenticated'));
        if (response.data.hasOwnProperty("isAuthenticated")) {
          console.log(response.data.isAuthenticated);
          if (response.data.isAuthenticated == "true") {
              console.log('success')
              sessionStorage.setItem('user_id', response);
              self.setState({loggedIn: true});
          } else {
            console.log('Invalid username and/or password.')
          }
        } else {
            console.log("Invalid response, authentication not validated")
        }
      } else {
          console.log("An error has occurred. Please try to login again.");
        }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
    console.log(this.state.name);
  }
  render() {
    if (this.state.loggedIn){
      return <Redirect to='/main' />;
    }
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        name={this.state.name}
        password={this.state.password}

      />
    );
  }
}

export default LoginPage;
