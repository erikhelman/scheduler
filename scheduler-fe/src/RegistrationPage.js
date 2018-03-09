import React from 'react';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      email: '',
      fname: '',
      lname: '',
      password: '',
      phone: '',
      confirmPassword: '',
      success: false,
      students: [{ dob: null,
                  fname: '' ,
                  lname: '',
                  gender: '',
                  level: '',
                  class_type: '',
                  class_length: '',
                  previous_school: '',
                  errors: {}
                }]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
  }

  validateRegisterForm = () => {

    let isFormValid = true;
    var error = {};

    this.setState({errors: {}});

    if (this.state.fname.trim().length === 0) {
      isFormValid = false;

      error.summary = 'Please enter your first name';
      error.fname = true;

      this.setState({ errors: error });

    }

    if (this.state.lname.trim().length === 0) {
      isFormValid = false;

      error.summary = 'Please enter your last name';
      error.fname = true;

      this.setState({ errors: error });

    }

    if (this.state.email.trim().length === 0) {
      isFormValid = false;

      error.summary = 'Please enter your email address';
      error.email = true;

      this.setState({ errors: error });

    }

    if (this.state.password.trim().length === 0) {
      isFormValid = false;

      error.summary = 'Please provide a password';
      error.password = true;

      this.setState({ errors: error });

    }

    if (this.state.phone.length !== 0) {

      let phoneCheck = parse(this.state.phone, "CA")
      if (phoneCheck.phone == null) {

        error.phone = true;
        error.summary = 'Please enter a valid phone number';

        this.setState({errors: error});
        isFormValid = false;
      }

    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();

    let email = this.state.email;
    let password = this.state.password;
    let fname = this.state.fname;
    let lname = this.state.lname;
    let students = this.state.students;
    let phone = parse(this.state.phone, "CA")

    if (this.validateRegisterForm()) {

      axios.post('/register', {
        //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
        fname: fname,
        lname: lname,
        password: password,
        email: email,
        phone: (phone.phone != null ? phone.phone : ''),
        students: students
      })
      .then(response => {

        if (response.data.isRegistered === "true") {
          console.log('should be redirected');
          console.log(response.data);
          this.setState({ success: true });
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

  handleStudentChange = (idx) => (event) => {

    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, [event.target.name]: event.target.value };
    });

    this.setState({ students: newStudents });
  }

  handleStudentGenderChange = (idx) => (event, data) => {

    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, gender: data.value };
    });

    this.setState({ students: newStudents });
  }

  handleLevelChange = (idx) => (event, data) => {

    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, level: data.value };
    });

    this.setState({ students: newStudents });
  }

  handleClassLengthChange = (idx) => (event, data) => {

    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, class_length: data.value };
    });

    this.setState({ students: newStudents });
  }

  handleClassTypeChange = (idx) => (event, data) => {

    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, class_type: data.value };
    });

    this.setState({ students: newStudents });
  }

  handleDateofBirthChange = (idx) => (date) => {

    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, dob: date };
    });

    this.setState({ students: newStudents });
  }

  handleAddStudent = () => {
    this.setState({
      students: this.state.students.concat([{ student_id: '-1', dob: null }])
      });
  }

  handleRemoveStudent = (idx) => () => {
    this.setState({
      students: this.state.students.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    if (this.state.success){
      return <Redirect to={{
        pathname: '/success',
      }}/>;
    }
    return (
      <RegistrationForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        onStudentChange={this.handleStudentChange}
        errors={this.state.errors}
        fname={this.state.fname}
        lname={this.state.lname}
        password={this.state.password}
        confirmPassword={this.state.confirmPassword}
        phone={this.state.phone}
        email={this.state.email}
        addStudent = {this.handleAddStudent}
        removeStudent = {this.handleRemoveStudent}
        students={this.state.students}
        onGenderChange={this.handleStudentGenderChange}
        onDateChange={this.handleDateofBirthChange}
        onClassTypeChange={this.handleClassTypeChange}
        onClassLengthChange={this.handleClassLengthChange}
        onLevelChange={this.handleLevelChange}
      />
    );
  }
}

export default RegistrationPage;
