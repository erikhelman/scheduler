import React from 'react';
import axios from 'axios';
import RecoveryForm from './RecoveryForm';


class RecoveryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
      email: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  validateForm = () => {

    let isFormValid = true;


    this.setState({message: {}});

    if (this.state.email.trim() == '') {
      this.setState({message: {summary: "Please enter a valid email address."}});
      isFormValid = false;
      return isFormValid;
    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();

    let email = this.state.email;

    if (this.validateForm()) {


      axios.post('/recovery', {

        email: email

      })
      .then(response => {

        if (response.data.recoverySuccessful === true) {
          this.setState({ message: {summary: "Request has been received. An email with a password recovery link should appear in your inbox shortly."}})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }


  render() {

    return (

      <div>
        <RecoveryForm
          message={this.state.message}
          handleInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          email={this.state.email}
        />
      </div>
    );
  }
}

export default RecoveryPage;
