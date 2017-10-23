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
      class_length: ''
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
      this.setState({fname: (response.data.fname != null ? response.data.fname : '')});
      this.setState({lname: (response.data.lname != null ? response.data.lname : '')});
      this.setState({gender: (response.data.gender != null ? response.data.gender : '')});
      this.setState({dob: (response.data.dob != null ? response.data.dob : '')});
      this.setState({level: (response.data.level != null ? response.data.level : '')});
      this.setState({class_type: (response.data.class_type != null ? response.data.class_type : '')});
      this.setState({class_length: (response.data.class_length != null ? response.data.class_length : '')});

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
    var token = this.state.token;

    axios.post('/update_students', {
      token: token,
      fname: fname,
      lname: lname,
      gender: gender,
      dob: dob,
      level: level,
      class_type: class_type,
      class_length: class_length
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
      />
    );
  }
}

export default StudentPage;
