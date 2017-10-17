import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {withStyles} from 'material-ui/styles';

const ProfileForm = ({
  onChange,
  onSubmit,
  errors,
  firstName, lastName,
  password,
  email
 }) => (
  <Card className="container" style={{marginLeft:10,marginRight:10, paddingTop:75}}>
    <form action="/" onSubmit={onSubmit}>

      <div style = {{display:'inline-block', marginLeft:20}}>
        <TextField id="firstName" floatingLabelText="First Name" floatingLabelFixed={true} margin="dense" style = {{marginLeft: 10,  marginRight: 10}}/>
        <TextField id="lastName" floatingLabelText="Last Name" floatingLabelFixed={true} style = {{marginLeft: 10,  marginRight: 10}} onChange={onChange} errorText={errors.name} value={lastName} />
        <TextField id="date" floatingLabelText="Date of Birth" floatingLabelFixed={true} type="date" style = {{marginLeft: 10,  marginRight: 10}} />
        <SelectField floatingLabelText="Gender" floatingLabelFixed={true} style={{verticalAlign:'bottom', marginLeft: 10,  marginRight: 10}}>
          <MenuItem value={1} primaryText="Male" />
          <MenuItem value={2} primaryText="Female" />
        </SelectField>

      </div>

      <div style = {{display:'inline-block', marginLeft:20}}>
        <TextField id="swimLevel" floatingLabelText="Swim Level" floatingLabelFixed={true} margin="dense" style = {{marginLeft: 10,  marginRight: 10}} type="number"/>
        <TextField id="currentDay" floatingLabelText="Current Day of the Week" floatingLabelFixed={true} type="date" style = {{marginLeft: 10,  marginRight: 10}} />
        <TextField id="currentTime" floatingLabelText="Current Time" floatingLabelFixed={true} type="Time" style = {{marginLeft: 10,  marginRight: 10}} />

      </div>

      <div style = {{display:'inline-block', marginLeft:20}}>
        <SelectField floatingLabelText="Class Type" floatingLabelFixed={true} style={{verticalAlign:'bottom', marginLeft: 10,  marginRight: 10}}>
          <MenuItem value={1} primaryText="Private" />
          <MenuItem value={2} primaryText="Semi-Private" />
          <MenuItem value={3} primaryText="Group" />
        </SelectField>
        <SelectField floatingLabelText="Class Length" floatingLabelFixed={true} style={{verticalAlign:'bottom', marginLeft: 10,  marginRight: 10}}>
          <MenuItem value={1} primaryText="30 mins" />
          <MenuItem value={2} primaryText="45 mins" />
          <MenuItem value={3} primaryText="60 mins" />
        </SelectField>
        <SelectField floatingLabelText="Preferred Day of the Week" floatingLabelFixed={true} style={{verticalAlign:'bottom', marginLeft: 10,  marginRight: 10}}>
          <MenuItem value={1} primaryText="Monday" />
          <MenuItem value={2} primaryText="Tuesday" />
          <MenuItem value={3} primaryText="Wednesday" />
          <MenuItem value={4} primaryText="Thursday" />
          <MenuItem value={5} primaryText="Friday" />
          <MenuItem value={6} primaryText="Saturday" />
          <MenuItem value={7} primaryText="Sunday" />
        </SelectField>
        <SelectField floatingLabelText="Preferred Time" floatingLabelFixed={true} style={{verticalAlign:'bottom', marginLeft: 10,  marginRight: 10}}>
          <MenuItem value={1} primaryText="Morning" />
          <MenuItem value={2} primaryText="Afternoon" />
          <MenuItem value={3} primaryText="Evening" />
        </SelectField>
      </div>

      <div style = {{display:'inline-block', marginLeft:20}}>
        <TextField
          floatingLabelText="Email"
          type="email"
          name="email"
          onChange={onChange}
          errorText={errors.email}
          value={email}
        />
      </div>

      <div style={{paddingTop:10, paddingBottom:10,marginLeft:20}}>
        <RaisedButton
          type="submit"
          label="Submit"
        />
      </div>
    </form>
  </Card>
)

export default ProfileForm;
