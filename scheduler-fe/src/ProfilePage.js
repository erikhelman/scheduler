import React from 'react';
import ProfileForm from './ProfileForm';
import axios from 'axios';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      name: '',
      password: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    const name = this.state.name;
    const password = this.state.password;

    axios.post('/login', {
      name: name,
      password: password
    })
    .then(function (response) {
      sessionStorage.setItem('user_id', response);
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
    return (
      <ProfileForm
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

export default ProfilePage;
