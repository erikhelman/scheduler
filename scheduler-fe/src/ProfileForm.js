import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'

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
  email,
  onProvinceChange
 }) => (
   <form action="/" onSubmit={onSubmit}>

     <Card className="container" style={{margin:'1em', paddingBottom:'1em'}}>

       <div >
         <TextField
           name="fname"
           floatingLabelText="First Name"
           floatingLabelFixed={true}
           style={customStyle.nameTextFields}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
           onChange={onChange}
           errorText={errors.name}
           value={fname}
         />

         <TextField
           name="lname"
           floatingLabelText="Last Name"
           floatingLabelFixed={true}
           style={customStyle.nameTextFields}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
           onChange={onChange}
           errorText={errors.name}
           value={lname}
         />
       </div>
       <div>
         <TextField
           name="street"
           floatingLabelText="Street"
           floatingLabelFixed={true}
           style={customStyle.streetTextfield}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
           onChange={onChange}
           errorText={errors.name}
           value={street}
         />
       </div>
       <div style={{ display: 'flex', width:'54em'}}>
         <TextField
           name="city"
           floatingLabelText="City"
           floatingLabelFixed={true}
           style={customStyle.textfields}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
           onChange={onChange}
           errorText={errors.name}
           value={city}
         />

         <SelectField
           name="province"
           floatingLabelText="Province"
           floatingLabelFixed={true}
           style={customStyle.SelectField}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
           onChange={onProvinceChange}
           errorText={errors.name}
           value={province}
         >
           <MenuItem value={"1"} primaryText="Ontario" />
           <MenuItem value={"2"} primaryText="Quebec" />
           <MenuItem value={"3"} primaryText="Manitoba" />
           <MenuItem value={"4"} primaryText="Alberta" />
           <MenuItem value={"5"} primaryText="Saskatchewan" />
           <MenuItem value={"6"} primaryText="British Columbia" />
           <MenuItem value={"7"} primaryText="Nova Scotia" />
           <MenuItem value={"8"} primaryText="Newfoundland" />
           <MenuItem value={"9"} primaryText="Prince Edward Island" />
           <MenuItem value={"10"} primaryText="Yukon" />
           <MenuItem value={"11"} primaryText="Northwest Territories" />
           <MenuItem value={"12"} primaryText="Nunavut" />
         </SelectField>


         <TextField
           name="postal"
           floatingLabelText="Postal Code"
           floatingLabelFixed={true}
           style={customStyle.textfields}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
           onChange={onChange}
           errorText={errors.name}
           value={postal}
         />
       </div>
       <div>
         <TextField
           name="phone"
           floatingLabelText="Phone Number"
           floatingLabelFixed={true}
           style={customStyle.textfields}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
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
           style={customStyle.emailTextField}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
         />
       </div>
     </Card>

     <div >
       <RaisedButton
         type="submit"
         label="Submit"
         style={customStyle.general}
         backgroundColor = '#1E88E5'
         labelColor = '#FFFFFF'
       />
     </div>
   </form>

     )

const customStyle = {
  textfields: {
    marginRight:'1em',
    marginLeft: '1em',
    flex:'1',
    //alignSelf: 'flex-end'
  },
  selectField: {
    marginRight:'1em',
    marginLeft: '1em',
    alignSelf: 'flex-end'
  },
  streetTextfield: {
    marginRight:'1em',
    marginLeft: '1em',
    width:'52em',
    verticalAlign:'bottom'
  },
  nameTextFields: {
    marginRight:'1em',
    marginLeft: '1em',
    width:'25em',
    verticalAlign:'bottom'
  },
  emailTextField: {
    marginRight:'1em',
    marginLeft: '1em',
    width:'34em',
    verticalAlign:'bottom'
  },
  general: {
    position: 'relative',
    marginLeft: '1em'
  },
  colorStyle: {
    color:blue600
  },
  underlineStyle: {
    borderColor:blue600
  },
};

export default ProfileForm;
