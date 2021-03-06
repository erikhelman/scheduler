import React from 'react';
import StudentForm from './StudentForm';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import moment from 'moment';


class StudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: '',
      token: sessionStorage.getItem("token"),
      students: [{ student_id: '',
                  dob: null,
                  fname: '' ,
                  lname: '',
                  emerg_contact: '',
                  emerg_phone: '',
                  errors: {}
                }]
    };
  }

  componentDidMount () {

    var token = this.state.token;

    axios.post('/students', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/students', {
      token: token
    })
    .then(response => {

      response.data.students.forEach(function(student){

        student.dob = (student.dob !== null ? moment(student.dob) : null);

        student.emerg_phone = (student.emerg_phone != null ? format(student.emerg_phone, 'CA', 'National') : '')

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
          console.log(this.state.students)
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

  validateStudentForm = () => {

    let isFormValid = true;

    const newStudents = this.state.students.map((student, sidx) => {

      if (student.emerg_phone !== undefined && student.emerg_phone.length !== 0) {

          let phoneCheck = parse(student.emerg_phone, "CA")

            if (phoneCheck.phone == null) {
              isFormValid = false;
              return {...student, errors: {emerg_phone: "Phone number is invalid"}};
          } else {
              return {...student, errors: {}};
          }
      } else {
          return {...student, errors: {}};
      }

    });

    this.setState({ students: newStudents });
    return isFormValid;
}

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateStudentForm()) {

      var students = this.state.students;
      var token = this.state.token;

      students.forEach(function(student){

          var phone = parse(student.emerg_phone, "CA");
          student.emerg_phone = (phone.phone != null ? phone.phone : '');

      });

      axios.post('/update_students', {
    //  axios.post('https://glacial-sierra-90432.herokuapp.com/update_students', {
        token: token,
        students: students
      })
      .then(response => {

        if (response.data.studentUpdate === true) {

          response.data.students.forEach(function(student){

              student.dob = (student.dob !== null ? moment(student.dob) : null);

              student.emerg_phone = (student.emerg_phone !== '' ? format(student.emerg_phone, 'CA', 'National') : '')

          });
          this.setState({students: response.data.students})

        }

      })
      .catch(function (error) {
        console.log(error);
      });
    }
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

    return (
      <div>

        <StudentForm
          onSubmit={this.handleSubmit}
          onChange={this.handleStudentChange}
          addStudent = {this.handleAddStudent}
          removeStudent = {this.handleRemoveStudent}
          errors={this.state.errors}
          students={this.state.students}
          onGenderChange={this.handleStudentGenderChange}
          onDateChange={this.handleDateofBirthChange}
          onClassTypeChange={this.handleClassTypeChange}
          onClassLengthChange={this.handleClassLengthChange}
          onLevelChange={this.handleLevelChange}
        />
      </div>
    );
  }
}
export default StudentPage
