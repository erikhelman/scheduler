import React from 'react';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import AdminUserForm from './AdminUserForm';


class AdminUserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.state.id,
      headerHeight: '',
      token: sessionStorage.getItem("token"),
      username: '',
      active: '',
      email: {},
      role: '',
      fname: '',
      lname: '',
      customer_id: '',
      city: '',
      province: '',
      street: '',
      postal: '',
      phone: '',
      snackbarState: false,
      errors: {}
    };
    this.handleActiveStatusChange = this.handleActiveStatusChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});

    var token = this.state.token;
    var id = this.state.id;

    axios.post('/admin_user', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/students', {
      token: token,
      id: id
    })
    .then(response => {
      
      response.data.phone = (response.data.phone != null ? format(response.data.phone, 'CA', 'National') : '');

      this.setState({ fname: response.data.fname,
                      lname: response.data.lname,
                      username: response.data.username,
                      active: response.data.active,
                      email: response.data.email,
                      role: response.data.role,
                      customer_id: response.data.customer_id,
                      city: response.data.city,
                      province: response.data.province,
                      street: response.data.street,
                      postal: response.data.postal,
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
      var username = this.state.username;
      var active = this.state.active;
      var phone = parse(this.state.phone, "CA");
      var email = this.state.email;
      var role = this.state.role;
      var customer_id = this.state.customer_id;
      var city = this.state.city;
      var province = this.state.province;
      var street = this.state.street;
      var postal = this.state.postal;
      var token = this.state.token;
      var id = this.state.id;

      axios.post('/update_admin_user', {
    //  axios.post('https://glacial-sierra-90432.herokuapp.com/update_students', {
        id: id,
        token: token,
        fname: fname,
        lname: lname,
        username: username,
        active: active,
        phone: (phone.phone != null ? phone.phone : ''),
        email: email,
        role: role,
        customer_id: customer_id,
        city: city,
        province: province,
        street: street,
        postal: postal

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
        <AdminUserForm
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
export default AdminUserPage
