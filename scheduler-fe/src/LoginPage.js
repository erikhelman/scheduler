import React from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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

  validateLoginForm = () => {

    let isFormValid = true;

    this.setState({errors: {}});

    if (this.state.name.trim().length === 0) {
      isFormValid = false;
      this.setState({errors: {name: 'Please provide your username'}});

    }

    if (this.state.password.trim().length === 0) {
      isFormValid = false;
      this.setState({errors: {password: 'Please provide your password'}});

    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();
    const name = this.state.name;
    const password = this.state.password;
    var self = this;

    if (this.validateLoginForm()) {
      axios.post('/login', {
      //axios.post('https://glacial-sierra-90432.herokuapp.com/login', {
        name: name,
        password: password
      })
      .then(function (response) {

        if (response.status === 200) {

          if (response.data.hasOwnProperty("isAuthenticated")) {

            if (response.data.isAuthenticated === "true") {

                sessionStorage.setItem("token", response.data["token"]);
                self.setState({loggedIn: true});

            } else {
              self.setState({errors: {summary: 'Invalid username and/or password'}});
            }
          } else {
              self.setState({errors: {summary: 'Invalid response, authentication not validated'}});
          }
        } else {
            self.setState({errors: {summary: "An error has occurred. Please try to login again."}});
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
        state: { loggedIn: this.state.loggedIn }

      }}/>;
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
