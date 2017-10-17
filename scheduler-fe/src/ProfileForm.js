import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {withStyles} from 'material-ui/styles';

const ProfileForm = ({
  onSubmit,
  onChange,
  errors,
  fname,
  lname,
  city,
  street,
  province,
  postal,
  phone,
  email
 }) => (
  <Card className="container" style={{marginLeft:10,marginRight:10, paddingTop:75}}>
    <form action="/" onSubmit={onSubmit}>



      <div style = {{display:'inline-block', marginLeft:20}}>

        <TextField
          id="firstName"
          name="fname"
          floatingLabelText="First Name"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={fname}
        />

        <TextField
          id="lastName"
          name="lname"
          floatingLabelText="Last Name"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={lname}
        />

        <TextField
          id="city"
          name="city"
          floatingLabelText="City"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={city}
        />

        <TextField
          id="province"
          name="province"
          floatingLabelText="Province"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={province}
        />

        <TextField
          id="street"
          name="street"
          floatingLabelText="street"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={street}
        />

        <TextField
          id="postal"
          name="postal"
          floatingLabelText="Postal Code"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={postal}
        />

        <TextField
          id="phone"
          name="phone"
          floatingLabelText="Phone Number"
          floatingLabelFixed={true}
          style = {{marginLeft: 10,  marginRight: 10}}
          onChange={onChange}
          errorText={errors.name}
          value={phone}
        />

        <TextField
          floatingLabelText="Email"
          type="email"
          name="email"
          onChange={onChange}
          errorText={errors.email}
          value={email}
        />
        <div style={{paddingTop:10, paddingBottom:10}}>
          <RaisedButton
            type="submit"
            label="Submit"
          />
        </div>
      </div>
    </form>

  </Card>
)

export default ProfileForm;
