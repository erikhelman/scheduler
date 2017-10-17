import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const RegistrationForm = ({
  onSubmit,
  onChange,
  errors,
  email,
  password,
  name
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Register</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line" style={{position:'relative'}}>
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={name} style={{marginLeft: '40%', width:200}}
        />
      </div>

      <div className="field-line" style={{position:'relative'}}>
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={email} style={{marginLeft: '40%', width:200}}
        />
      </div>

      <div className="field-line" style={{position:'relative'}}>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={password} style={{marginLeft: '40%', width:200}}
        />
      </div>

      <div className="button-line" style={{position:'relative'}}>
        <RaisedButton type="submit" label="Register" primary style={{marginLeft: '40%', width:200}} />
      </div>

      <CardText>Already have an account? <Link to={'/'}>Log in</Link></CardText>
    </form>
  </Card>
);

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default RegistrationForm
