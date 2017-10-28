import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {blue600} from 'material-ui/styles/colors'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  name,
  password
}) => (
  <Card className="container" >
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div >
        <TextField
          floatingLabelText="User Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={name}
          style={customStyle.textfields}
          underlineFocusStyle={customStyle.underlineStyle}
          floatingLabelFocusStyle={customStyle.colorStyle}
        />
      </div>

      <div >
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={password}
          style={customStyle.textfields}
          underlineFocusStyle={customStyle.underlineStyle}
          floatingLabelFocusStyle={customStyle.colorStyle}
        />
      </div>

      <div className="button-line" >
        <RaisedButton
          type="submit"
          label="Log In"
          style={customStyle.general}
          backgroundColor = '#1E88E5'
          labelColor = '#FFFFFF'
          />
      </div>

      <CardText>Don't have an account? <Link to={'/registration'}>Create one</Link></CardText>

    </form>
  </Card>
);

const customStyle = {
  textfields: {
    position: 'relative',
    width: '20rem',
    marginLeft: '40%'
  },
  general: {
    position: 'relative',
    width: '20rem',
    marginLeft: '40%'
  },
  colorStyle: {
    color:blue600
  },
  underlineStyle: {
    borderColor:blue600
  },
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
