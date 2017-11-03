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
                  lname: '',
                  emerg_contact: '',
                  emerg_phone: ''}]
    };
  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});


    var token = this.state.token;

    axios.post('/students', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/students', {
      token: token
    })
    .then(response => {

      response.data.students.forEach(function(student){

          
          if (student.dob !== '') {
            student.dob += " EDT"
            student.dob = new Date(student.dob);
          }

      });

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

  handleLevelChange = (idx) => (event, index, value) => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, level: value };
    });

    this.setState({ students: newStudents });
  }

  handleClassLengthChange = (idx) => (event, index, value) => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, class_length: value };
    });

    this.setState({ students: newStudents });
  }

  handleClassTypeChange = (idx) => (event, index, value) => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, class_type: value };
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
  //  axios.post('https://glacial-sierra-90432.herokuapp.com/update_students', {
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
    var headerStyle = {
      height: this.state.headerHeight
    };

    return (
      <div>
        <div style={headerStyle}></div>
        <StudentForm
          onSubmit={this.handleSubmit}
          onChange={this.handleStudentChange}
          addStudent = {this.handleAddStudent}
          removeStudent = {this.handleRemoveStudent}
          errors={this.state.errors}
          students={this.state.students}
          onGenderChange={this.handleStudentGenderChange}
          onDateChange={this.handleStudentDateChange}
          onClassTypeChange={this.handleClassTypeChange}
          onClassLengthChange={this.handleClassLengthChange}
          onLevelChange={this.handleLevelChange}
        />
      </div>
    );
  }
}
export default StudentPage
