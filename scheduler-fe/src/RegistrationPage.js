import React from 'react';
import axios from 'axios';
import RegistrationForm from './RegistrationForm';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      email: '',
      name: '',
      password: '',
      snackbarState: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  validateRegisterForm = () => {

    let isFormValid = true;

    this.setState({errors: {}});

    if (this.state.name.trim().length === 0) {
      isFormValid = false;
      this.setState({errors: {name: 'Please enter a username'}});

    }

    if (this.state.email.trim().length === 0) {
      isFormValid = false;
      this.setState({errors: {email: 'Please enter an email address'}});

    }

    if (this.state.password.trim().length === 0) {
      isFormValid = false;
      this.setState({errors: {password: 'Please provide a password'}});

    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();

    this.setState({snackbarState: false});

    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;

    if (this.validateRegisterForm()) {

      axios.post('/register', {
    //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
        name: name,
        password: password,
        email: email
      })
      .then(response => {
        console.log(response.data.isRegistered);
        if (response.data.isRegistered === "true") {
          this.setState({snackbarState: true});
        } else {
          this.setState({errors: {summary: response.data.errors}});
        }
      })
      .catch(function (error) {
        if (error.response) {
            console.log("response " + error.response);
        } else if (error.request) {
            console.log("Request" + error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log("config " + error.config);
        //this.setState({errors: {summary: error}});
      });
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleRequestClose = () => {
    this.setState({
        snackbarState: false,
      });
    }

  render() {
    return (
      <RegistrationForm
        onSubmit={this.handleSubmit}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        name={this.state.name}
        password={this.state.password}
        email={this.state.email}
        snackbarState={this.state.snackbarState}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

export default RegistrationPage;
