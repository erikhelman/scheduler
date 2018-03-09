import React from 'react';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import AdminInstructorForm from './AdminInstructorForm';


class AdminInsructorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.state.id,
      headerHeight: '',
      token: sessionStorage.getItem("token"),
      username: '',
      active: '',
      email: '',
      role: '',
      fname: '',
      lname: '',
      phone: '',
      snackbarState: false,
      errors: {}
    };
    this.handleActiveStatusChange = this.handleActiveStatusChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    console.log(this.state.active)
  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});

    var token = this.state.token;
    var id = this.state.id;

    axios.post('/admin_user', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/admin_user', {
      token: token,
      id: id
    })
    .then(response => {

      response.data.phone = (response.data.phone != null ? format(response.data.phone, 'CA', 'National') : '');
      console.log(response.data);
      this.setState({ fname: response.data.fname,
                      lname: response.data.lname,
                      role: response.data.role,
                      username: response.data.username,
                      active: response.data.active,
                      email: response.data.email,
                      phone: response.data.phone
                     });
      })

    .catch(function (error) {
      console.log(error);
    });

  }



  validateUserForm = () => {

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

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateUserForm()) {

      var fname = this.state.fname;
      var lname = this.state.lname;
      var email = this.state.email;
      var role = this.state.role;
      var username = this.state.username;
      var active = this.state.active;
      var phone = parse(this.state.phone, "CA");
      var token = this.state.token;
      var id = this.state.id;

      axios.post('/update_admin_user', {
    //  axios.post('https://glacial-sierra-90432.herokuapp.com/update_admin_user', {
        id: id,
        token: token,
        fname: fname,
        lname: lname,
        username: username,
        active: active,
        role: role,
        phone: (phone.phone != null ? phone.phone : ''),
        email: email

      })
      .then(response => {
        if (response.data.userUpdate === "true") {
          this.setState({snackbarState: true});
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  handleActiveStatusChange(event, index, value) {
    this.setState({ active: value });
  }

  handleRoleChange(event, index, value) {
    this.setState({ role: value });
  }

  handleProvinceChange(event, index, value) {
    this.setState({ province: value });
  }

  handleInputChange(event) {

    this.setState({[event.target.name] : event.target.value});
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
        <AdminInstructorForm
          onSubmit={this.handleSubmit}
          onInputChange={this.handleInputChange}
          onActiveStatusChange={this.handleActiveStatusChange}
          onRoleChange= {this.handleRoleChange}
          onProvinceChange={this.handleProvinceChange}
          errors={this.state.errors}
          fname={this.state.fname}
          lname={this.state.lname}
          username={this.state.username}
          active={this.state.active}
          email={this.state.email}
          phone={this.state.phone}
          role={this.state.role}
          customer_id={this.state.customer_id}
          city={this.state.city}
          province={this.state.province}
          street={this.state.street}
          postal={this.state.postal}
          snackbarState={this.state.snackbarState}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
export default AdminInsructorPage;
