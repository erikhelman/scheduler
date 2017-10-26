import React from 'react';
import ProfileForm from './ProfileForm';
import axios from 'axios';

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
  }

  componentDidMount () {

    var token = this.state.token;

    axios.post('/profile', {
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
      this.setState({phone: (response.data.phone != null ? response.data.phone : '')});

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleSubmit(event) {

    event.preventDefault();

    var fname = this.state.fname;
    var lname = this.state.lname;
    var city = this.state.city;
    var street = this.state.street;
    var province = this.state.province;
    var postal = this.state.postal;
    var phone = this.state.phone;
    var email = this.state.email;
    var token = this.state.token;

    axios.post('/update_profile', {
      token: token,
      fname: fname,
      lname: lname,
      city: city,
      street: street,
      province: province,
      postal: postal,
      phone: phone,
      email: email
    })
    .then(response => {

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  render() {
    return (
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
      />
    );
  }
}

export default ProfilePage;
