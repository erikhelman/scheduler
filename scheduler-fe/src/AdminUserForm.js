import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';

const AdminUserForm = ({
  onInputChange,
  onGenderChange,
  onActiveStatusChange,
  onRoleChange,
  onProvinceChange,
  onSubmit,
  errors,
  fname,
  lname,
  username,
  active,
  email,
  phone,
  role,
  customer_id,
  city,
  province,
  street,
  postal,
  onRequestClose,
  snackbarState
 }) => (

     <form onSubmit={onSubmit}>

       <Card className="user" style={{margin:'1em', paddingBottom: '1em'}}>
         <div>
           <TextField
             floatingLabelText="First Name"
             floatingLabelFixed={true}
             value={fname}
             name="fname"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />
           <TextField
             floatingLabelText="Last Name"
             floatingLabelFixed={true}
             value={lname}
             name="lname"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />
           <TextField
             floatingLabelText="Username"
             floatingLabelFixed={true}
             value={username}
             disabled={true}
             name="username"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />
         </div>
         <div style={{ display: 'flex', width:'54em'}}>
           <TextField
             floatingLabelText="Customer ID"
             floatingLabelFixed={true}
             name="customer_id"
             value={customer_id}
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />
           <SelectField
             name="active"
             floatingLabelText="Status"
             floatingLabelFixed={true}
             value={active}
             onChange={onActiveStatusChange}
             style={customStyle.SelectField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           >

             <MenuItem value={true} primaryText="Active" />
             <MenuItem value={false} primaryText="Disabled" />

           </SelectField>

           <SelectField
             name="role"
             floatingLabelText="Role"
             floatingLabelFixed={true}
             value={role}
             onChange={onRoleChange}
             style={customStyle.SelectField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           >

             <MenuItem value={"user"} primaryText="User" />
             <MenuItem value={"admin"} primaryText="Administrator" />
             <MenuItem value={"inst"} primaryText="Instructor" />

           </SelectField>

         </div>
         <Divider />
         <div style={{ display: 'flex', width:'54em'}}>
           <TextField
             floatingLabelText="Email Address"
             floatingLabelFixed={true}
             value={email}
             name="email"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />

           <TextField
             name="phone"
             floatingLabelText="Phone Number"
             floatingLabelFixed={true}
             style={customStyle.textfields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onInputChange}
             value={phone}
             errorText={errors !== undefined ? errors.phone : ''}
           />

         </div>
         <div style={customStyle.general}>
           <TextField
             name="street"
             floatingLabelText="Street"
             floatingLabelFixed={true}
             style={customStyle.streetTextfield}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onInputChange}
             errorText={errors.street}
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
             onChange={onInputChange}
             errorText={errors.city}
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
             errorText={errors.province}
             value={province}
           >
             <MenuItem value={"ON"} primaryText="Ontario" />
             <MenuItem value={"QC"} primaryText="Quebec" />
             <MenuItem value={"MB"} primaryText="Manitoba" />
             <MenuItem value={"AB"} primaryText="Alberta" />
             <MenuItem value={"SK"} primaryText="Saskatchewan" />
             <MenuItem value={"BC"} primaryText="British Columbia" />
             <MenuItem value={"NS"} primaryText="Nova Scotia" />
             <MenuItem value={"NL"} primaryText="Newfoundland" />
             <MenuItem value={"PE"} primaryText="Prince Edward Island" />
             <MenuItem value={"YT"} primaryText="Yukon" />
             <MenuItem value={"NT"} primaryText="Northwest Territories" />
             <MenuItem value={"NU"} primaryText="Nunavut" />
           </SelectField>


           <TextField
             name="postal"
             floatingLabelText="Postal Code"
             floatingLabelFixed={true}
             style={customStyle.textfields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onInputChange}
             errorText={errors.postal}
             value={postal}
           />
         </div>

       </Card>

       <div >
         <RaisedButton
           type="submit"
           label = "Submit Changes"
           style={customStyle.general}
           backgroundColor = '#1E88E5'
           labelColor = '#FFFFFF'
         />
       </div>
       <Snackbar
         open={snackbarState}
         style={{textAlign: 'center'}}
         message="Student information updated successfully!"
         autoHideDuration={3000}
         onRequestClose={onRequestClose}
       />
     </form>

     )

     const customStyle = {
       textfields: {
         marginRight:'1em',
         marginLeft: '1em',
         flex:'1',
       },
       selectField: {
         marginRight:'10em',
         marginLeft: '10em',
         width:'20em'

       },
       nameTextFields: {
         marginRight:'1em',
         marginLeft: '1em',
         width:'25em',
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
       removeButton: {
         position: 'absolute',
         right: '1em'
       },
       colorStyle: {
         color:blue600
       },
       underlineStyle: {
         borderColor:blue600
       },
     };
export default AdminUserForm;
