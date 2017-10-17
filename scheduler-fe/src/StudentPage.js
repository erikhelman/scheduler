import React from 'react';
import StudentForm from './StudentForm';
import axios from 'axios';

class StudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      token: sessionStorage.getItem("token"),
      fname: '',
      lname: '',
      dob: '',
      gender: '',
      level: '',
      classtype: '',
      classlength: '',
      preferredtime: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {

    var token = this.state.token;

    axios.post('/student', {
      token: token
    })
    .then(response => {
      this.setState({email: response.data.email});
      this.setState({fname: response.data.fname});
      this.setState({lname: response.data.lname});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleSubmit(event) {

    event.preventDefault();

    var name = this.state.name;
    var email = this.state.email;

    {/*axios.post('/login', {
      name: name,
      email: email
    })
    .then(function (response) {
      sessionStorage.setItem('user_id', response);
    })
    .catch(function (error) {
      console.log(error);
    });*/}

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
    console.log(this.state.name);
  }

  render() {
    return (
      <StudentForm
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

export default StudentPage;
