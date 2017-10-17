import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  name,
  password
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div style = {{position: 'relative'}}>
        <TextField
          floatingLabelText="User Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={name} style={{marginLeft: '40%', width:200}}
        />
      </div>

      <div style = {{position: 'relative'}}>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={password} style={{marginLeft: '40%', width:200}}
        />
      </div>

      <div className="button-line" style = {{position: 'relative'}}>
        <RaisedButton type="submit" label="Log In" primary style={{marginLeft: '40%', width:200}}/>
      </div>

      <CardText>Don't have an account? <Link to={'/registration'}>Create one</Link></CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
