import React from 'react';
import InstructorForm from './InstructorForm';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import { Redirect } from 'react-router-dom';

class InstructorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: '',
      errors: {},
      token: sessionStorage.getItem("token"),
      fname: '',
      lname: '',
      username: '',
      phone: '',
      email: '',
      instructors: [],
      snackbarState: false,
      doRedirect: false,
      checkValue: 'none'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleCheckChange = (e, { value }) => {
    this.setState({ checkValue: value });
  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});

    var token = this.state.token;
    var self = this;

    axios.post('/instructors', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/all_users', {
      token: token
    })
    .then(response => {
      self.setState({instructors: response.data.instructors});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleEditClick(event) {

    if (this.state.checkValue !== 'none') {
      this.setState({ doRedirect: true });
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  validateProfileForm = () => {

    let isFormValid = true;

    this.setState({errors: {}});

    if (this.state.phone.length !== 0) {

      let phoneCheck = parse(this.state.phone, "CA")
      if (phoneCheck.phone == null) {
        this.setState({errors: {phone: "Please enter a valid phone number"}});
        isFormValid = false;
      }

    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();
    if (this.validateProfileForm()) {
      var username = this.state.username;
      var fname = this.state.fname;
      var lname = this.state.lname;
      var phone = parse(this.state.phone, "CA")
      var email = this.state.email;
      var token = this.state.token;


      axios.post('/add_instructor', {
      //axios.post('https://glacial-sierra-90432.herokuapp.com/update_profile', {
        token: token,
        fname: fname,
        lname: lname,
        username: username,
        phone: (phone.phone != null ? phone.phone : ''),
        email: email
      })
      .then(response => {
        console.log(response.data);
        if (response.data.isRegistered === true) {
          this.setState({snackbarState: true});
          this.setState({instructors: response.data.instructors});
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }

handleRequestClose = () =>{
  this.setState({
      snackbarState: false,
    });
}

  render() {
    var headerStyle = {
      height: this.state.headerHeight
    };

    if (this.state.doRedirect) {
      return <Redirect to={{
        pathname: '/main/admin_instructor_page',
        state: { id: this.state.checkValue }

      }}/>;
    }

    return (
      <div>
        <div style={headerStyle}></div>
        <InstructorForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          errors={this.state.errors}
          username={this.state.username}
          fname={this.state.fname}
          lname={this.state.lname}
          phone={this.state.phone}
          email={this.state.email}
          instructors={this.state.instructors}
          onCheckChange={this.handleCheckChange}
          onEditClick={this.handleEditClick}
          checkValue={this.state.checkValue}
          snackbarState={this.state.snackbarState}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default InstructorPage;
