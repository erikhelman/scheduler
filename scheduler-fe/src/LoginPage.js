import React from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      email: '',
      password: '',
      loggedIn: false,
      role: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  validateLoginForm = () => {

    let isFormValid = true;
    let error = {};

    this.setState({errors: {}});

    if (this.state.email.trim().length === 0) {
      isFormValid = false;

      error.summary = 'Please provide your email address';
      error.email = true;

      this.setState({ errors: error });

    }

    if (this.state.password.trim().length === 0) {
      isFormValid = false;

      error.summary = 'Please provide your password';
      error.password = true;

      this.setState({ errors: error });

    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    //var self = this;

    if (this.validateLoginForm()) {
      axios.post('/login', {
      //axios.post('https://glacial-sierra-90432.herokuapp.com/login', {
        email: email,
        password: password
      })
      .then(response => {

        if (response.status === 200) {

          if (response.data.hasOwnProperty("isAuthenticated")) {

            if (response.data.isAuthenticated === "true") {

                sessionStorage.setItem("token", response.data["token"]);
                this.setState({role: response.data.role})
                this.setState({loggedIn: true});

            } else {
              this.setState({errors: {summary: response.data.error}});
            }
          } else {
              this.setState({errors: {summary: 'Invalid response, authentication not validated'}});
          }
        } else {
            this.setState({errors: {summary: "An error has occurred. Please try to login again."}});
          }

      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }
  render() {
    if (this.state.loggedIn){
      return <Redirect to={{
        pathname: '/main',
        state: {
          role: this.state.role,
          loggedIn: true
        }

      }}/>;
    }
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        email={this.state.email}
        password={this.state.password}

      />
    );
  }
}

export default LoginPage;
