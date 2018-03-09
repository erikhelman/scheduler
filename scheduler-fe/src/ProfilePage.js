import React from 'react';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import { parse, format } from 'libphonenumber-js';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      token: sessionStorage.getItem("token"),
      fname: '',
      lname: '',
      city: '',
      province: '',
      street: '',
      postal: '',
      phone: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
  }

  componentDidMount () {
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
    let error = {};

    this.setState({errors: {}});

    if (this.state.phone.length !== 0) {

      let phoneCheck = parse(this.state.phone, "CA")
      if (phoneCheck.phone == null) {

        error.phone = true;
        error.summary = 'Please enter a valid phone number';

        this.setState({errors: error});
        isFormValid = false;
      }

    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();
    if (this.validateProfileForm()) {
      let fname = this.state.fname;
      let lname = this.state.lname;
      let city = this.state.city;
      let street = this.state.street;
      let province = this.state.province;
      let postal = this.state.postal;
      let phone = parse(this.state.phone, "CA")
      let email = this.state.email;
      let token = this.state.token;

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

handleProvinceChange(event, data) {

  this.setState({province: data.value});

}


  render() {

    return (
      <div>
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
        />
      </div>
    );
  }
}

export default ProfilePage;
