import React from 'react';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';
import AdminUserForm from './AdminUserForm';


class AdminUserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.state.id,
      token: sessionStorage.getItem("token"),
      username: '',
      status: '',
      email: {},
      role: '',
      fname: '',
      lname: '',
      customerID: '',
      city: '',
      province: '',
      street: '',
      postal: '',
      phone: '',
      errors: {}
    };
    this.handleActiveStatusChange = this.handleActiveStatusChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount () {

    var token = this.state.token;
    var id = this.state.id;

    axios.post('/admin_user', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/admin_user', {
      token: token,
      id: id
    })
    .then(response => {

      response.data.phone = (response.data.phone != null ? format(response.data.phone, 'CA', 'National') : '');

      this.setState({ fname: response.data.fname,
                      lname: response.data.lname,
                      username: response.data.username,
                      status: response.data.status,
                      email: response.data.email,
                      role: response.data.role,
                      customerID: response.data.customer_id,
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
      var status = this.state.status;
      var phone = parse(this.state.phone, "CA");
      var email = this.state.email;
      var role = this.state.role;
      var customerID = this.state.customerID;
      var city = this.state.city;
      var province = this.state.province;
      var street = this.state.street;
      var postal = this.state.postal;
      var token = this.state.token;
      var id = this.state.id;

      axios.post('/update_admin_user', {
    //  axios.post('https://glacial-sierra-90432.herokuapp.com/update_admin_user', {
        id: id,
        token: token,
        fname: fname,
        lname: lname,
        username: username,
        status: status,
        phone: (phone.phone != null ? phone.phone : ''),
        email: email,
        role: role,
        customerID: customerID,
        city: city,
        province: province,
        street: street,
        postal: postal

      })
      .then(response => {
        if (response.data.userUpdate === "true") {

        }

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  handleActiveStatusChange(event, data) {
    this.setState({ status: data.value });
  }

  handleRoleChange(event, data) {
    this.setState({ role: data.value });
  }

  handleProvinceChange(event, data) {
    this.setState({ province: data.value });
  }

  handleInputChange(event) {

    this.setState({[event.target.name] : event.target.value});
  }

  render() {

    return (
      <div>
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
          status={this.state.status}
          email={this.state.email}
          phone={this.state.phone}
          role={this.state.role}
          customerID={this.state.customerID}
          city={this.state.city}
          province={this.state.province}
          street={this.state.street}
          postal={this.state.postal}
        />
      </div>
    );
  }
}
export default AdminUserPage
