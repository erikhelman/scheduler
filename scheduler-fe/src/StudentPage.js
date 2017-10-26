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
      gender: '',
      dob: '',
      level: '',
      class_type: '',
      class_length: '',
      status: '',
      students: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {

    var token = this.state.token;

    axios.post('/students', {
      token: token
    })
    .then(response => {
      this.setState({students: response.data.students});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleSubmit(event) {

    event.preventDefault();

    var fname = this.state.fname;
    var lname = this.state.lname;
    var gender = this.state.gender;
    var dob = this.state.dob;
    var level = this.state.level;
    var class_type = this.state.class_type;
    var class_length = this.state.class_length;
    var status = this.state.status;
    var token = this.state.token;

    axios.post('/update_students', {
      token: token,
      fname: fname,
      lname: lname,
      gender: gender,
      dob: dob,
      level: level,
      class_type: class_type,
      class_length: class_length,
      status: status
    })
    .then(response => {

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
    console.log(this.state.name)
  }

  render() {
    console.log(this.state.students);

    return (

      <StudentForm
        onSubmit={this.handleSubmit}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        fname={this.state.fname}
        lname={this.state.lname}
        gender={this.state.gender}
        dob={this.state.dob}
        level={this.state.level}
        class_type={this.state.class_type}
        class_length={this.state.class_length}
        status={this.state.status}
        students={this.state.students}
      />
    );
  }
}

export default StudentPage;
