import React from 'react';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import AdminStudentForm from './AdminStudentForm';


class AdminStudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.state.id,
      headerHeight: '',
      token: sessionStorage.getItem("token"),
      fname: '',
      lname: '',
      dob: {},
      gender: '',
      emerg_contact: '',
      emerg_phone: '',
      class_type: '',
      class_length: '',
      level: '',
      snackbarState: false
    };
    this.handleClassTypeChange = this.handleClassTypeChange.bind(this);
    this.handleClassLengthChange = this.handleClassLengthChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});

    var token = this.state.token;
    var id = this.state.id;

    axios.post('/admin_student', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/students', {
      token: token,
      id: id
    })
    .then(response => {

      if (response.data.dob === '') {
        response.data.dob = null
            } else {
              response.data.dob += " EDT"
              response.data.dob = new Date(response.data.dob);

          }
          response.data.emerg_phone = (response.data.emerg_phone != null ? format(response.data.emerg_phone, 'CA', 'National') : '');

          this.setState({ fname: response.data.fname,
                          lname: response.data.lname,
                          dob: response.data.dob,
                          gender: response.data.gender,
                          emerg_contact: response.data.emerg_contact,
                          emerg_phone: response.data.emerg_phone,
                          class_type: response.data.class_type,
                          class_length: response.data.class_length,
                          level: response.data.level });
      })

      //this.setState({students: (response.data.students != null ? response.data.students : '')});


    .catch(function (error) {
      console.log(error);
    });

  }



  validateStudentForm = () => {

    let isFormValid = true;

    this.setState({errors: {}});

    if (this.state.emerg_phone.length !== 0) {

      let phoneCheck = parse(this.state.emerg_phone, "CA")
      if (phoneCheck.phone == null) {
        this.setState({errors: {phone: "Please enter a valid phone number"}});
        isFormValid = false;
      }

    }

    return isFormValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateStudentForm()) {

      var fname = this.state.fname;
      var lname = this.state.lname;
      var gender = this.state.gender;
      var dob = this.state.dob;
      var emerg_phone = parse(this.state.emerg_phone, "CA");
      var emerg_contact = this.state.emerg_contact;
      var class_length = this.state.class_length;
      var class_type = this.state.class_type;
      var level = this.state.level;
      var token = this.state.token;
      var id = this.state.id;

      axios.post('/update_admin_student', {
    //  axios.post('https://glacial-sierra-90432.herokuapp.com/update_students', {
        id: id,
        token: token,
        fname: fname,
        lname: lname,
        gender: gender,
        dob: dob,
        emerg_phone: (emerg_phone.phone != null ? emerg_phone.phone : ''),
        emerg_contact: emerg_contact,
        class_length: class_length,
        class_type: class_type,
        level: level

      })
      .then(response => {
        if (response.data.studentUpdate === "true") {
          this.setState({snackbarState: true});
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  handleGenderChange(event, index, value) {
    this.setState({ gender: value });
  }

  handleClassTypeChange(event, index, value) {
    this.setState({ class_type: value });
  }

  handleClassLengthChange(event, index, value) {
    this.setState({ class_length: value });
  }

  handleLevelChange(event, index, value) {
    this.setState({ level: value });
  }

  handleInputChange(event) {

    this.setState({[event.target.name] : event.target.value});
  }

  handleDateChange(event, date) {
    this.setState( {dob: date });
  }

  handleRequestClose = () => {
    this.setState({
        snackbarState: false,
      });
  }

  render() {
    var headerStyle = {
      height: this.state.headerHeight
    };

    return (
      <div>
        <div style={headerStyle}></div>
        <AdminStudentForm
          onSubmit={this.handleSubmit}
          onInputChange={this.handleInputChange}
          onGenderChange={this.handleGenderChange}
          onClassTypeChange= {this.handleClassTypeChange}
          onClassLengthChange={this.handleClassLengthChange}
          onLevelChange={this.handleLevelChange}
          onDateChange={this.handleDateChange}
          errors={this.state.errors}
          fname={this.state.fname}
          lname={this.state.lname}
          dob={this.state.dob}
          gender={this.state.gender}
          emerg_contact={this.state.emerg_contact}
          emerg_phone={this.state.emerg_phone}
          class_type={this.state.class_type}
          class_length={this.state.class_length}
          level={this.state.level}
          snackbarState={this.state.snackbarState}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
export default AdminStudentPage
