import React from 'react';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: '',
      errors: {},
      token: sessionStorage.getItem("token"),
      fname: '',
      lname: '',
      city: '',
      province: '',
      street: '',
      postal: '',
      phone: '',
      email: '',
      snackbarState: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {

    this.setState({headerHeight: document.getElementById('header').clientHeight});

    var token = this.state.token;

    axios.post('/profile', {
//    axios.post('https://glacial-sierra-90432.herokuapp.com/profile', {
      token: token
    })
    .then(response => {
      this.setState({email: (response.data.email != null ? response.data.email : '')});
      this.setState({fname: (response.data.fname != null ? response.data.fname : '')});
      this.setState({lname: (response.data.lname != null ? response.data.lname : '')});
      this.setState({city: (response.data.city != null ? response.data.city : '')});
      this.setState({province: (response.data.province != null ? response.data.province : '')});
      this.setState({street: (response.data.street != null ? response.data.street : '')});
      this.setState({postal: (response.data.postal != null ? response.data.postal : '')});
      this.setState({phone: (response.data.phone != null ? format(response.data.phone, 'CA', 'National') : '')});

    })
    .catch(function (error) {
      console.log(error);
    });

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
      var fname = this.state.fname;
      var lname = this.state.lname;
      var city = this.state.city;
      var street = this.state.street;
      var province = this.state.province;
      var postal = this.state.postal;
      var phone = parse(this.state.phone, "CA")
      var email = this.state.email;
      var token = this.state.token;

      axios.post('/update_profile', {
      //axios.post('https://glacial-sierra-90432.herokuapp.com/update_profile', {
        token: token,
        fname: fname,
        lname: lname,
        city: city,
        street: street,
        province: province,
        postal: postal,
        phone: (phone.phone != null ? phone.phone : ''),
        email: email
      })
      .then(response => {
        if (response.data.profileUpdate === "true") {
          this.setState({snackbarState: true});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }

handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
}

handleProvinceChange = (event, index, value) => {
  this.setState({province: value});

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

    return (
      <div>
        <div style={headerStyle}></div>
        <ProfileForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          errors={this.state.errors}
          fname={this.state.fname}
          lname={this.state.lname}
          city={this.state.city}
          street={this.state.street}
          province={this.state.province}
          postal={this.state.postal}
          phone={this.state.phone}
          email={this.state.email}
          onProvinceChange={this.handleProvinceChange}
          snackbarState={this.state.snackbarState}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default ProfilePage;
