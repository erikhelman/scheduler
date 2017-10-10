import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';

const ProfileForm = ({
  onChange,
  onSubmit,
  errors,
  name,
  password,
  email
 }) => (
  <Card className="container">
    <CardTitle title="Profile" />

    <div>
      <TextField
        name = "name"
        floatingLabelText="Name"
        type = "name"
        onChange={onChange}
        errorText={errors.name}
        value={name}
      />
    </div>

    <div>
      <TextField
        floatingLabelText="Password"
        type="password"
        name="password"
        onChange={onChange}
        errorText={errors.password}
        value={password}
      />
    </div>

    <div>
      <TextField
        floatingLabelText="Email"
        type="email"
        name="email"
        onChange={onChange}
        errorText={errors.email}
        value={email}
      />
    </div>

    <div>
      <RaisedButton
        type="submit"
        label="Submit"
      />
    </div>

  </Card>
)

export default ProfileForm;
