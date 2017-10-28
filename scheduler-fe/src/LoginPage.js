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

  handleSubmit(event) {

    event.preventDefault();
    const name = this.state.name;
    const password = this.state.password;
    var self=this;

    axios.post('/login', {
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
