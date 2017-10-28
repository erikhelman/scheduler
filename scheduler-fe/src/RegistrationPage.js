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
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;

    axios.post('/register', {
      name: name,
      password: password,
      email: email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
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
      />
    );
  }
}

export default RegistrationPage;
