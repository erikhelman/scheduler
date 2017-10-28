import React from 'react';
import StudentForm from './StudentForm';
import axios from 'axios';


class StudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: '',
      token: sessionStorage.getItem("token"),
      students: [{ student_id: '',
                  fname: '' ,
                  lname: ''}]
    };
  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});


    var token = this.state.token;

    axios.post('/students', {
      token: token
    })
    .then(response => {

      this.setState({students: (response.data.students != null ? response.data.students : '')});

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleStudentChange = (idx) => (event) => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, [event.target.name]: event.target.value };
    });

    this.setState({ students: newStudents });
  }

  handleStudentGenderChange = (idx) => (event, index, value) => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, gender: value };
    });

    this.setState({ students: newStudents });
  }

  handleStudentDateChange = (idx) => (event, date) => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, dob: date };
    });

    this.setState({ students: newStudents });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var students = this.state.students;
    var token = this.state.token;

    axios.post('/update_students', {
      token: token,
      students: students
    })
    .then(response => {

    })
    .catch(function (error) {
      console.log(error);
    });

  }


  handleAddStudent = () => {
    this.setState({
      students: this.state.students.concat([{ student_id: '-1' }])
    });
  }

  handleRemoveStudent = (idx) => () => {
    this.setState({
      students: this.state.students.filter((s, sidx) => idx !== sidx)
  });
}

  render() {
    console.log(this.state.students);
    console.log(this.state.headerHeight);
    var divStyle = {
      height: this.state.headerHeight
    };
    console.log(divStyle);

    return (
      <div>
        <div style={divStyle}></div>
        <StudentForm
          onSubmit={this.handleSubmit}
          onChange={this.handleStudentChange}
          addStudent = {this.handleAddStudent}
          removeStudent = {this.handleRemoveStudent}
          errors={this.state.errors}
          students={this.state.students}
          onGenderChange={this.handleStudentGenderChange}
          onDateChange={this.handleStudentDateChange}
        />
      </div>
    );
  }
}
export default StudentPage
