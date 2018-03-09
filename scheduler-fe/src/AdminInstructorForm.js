import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';

const AdminInstructorForm = ({
  onInputChange,
  onActiveStatusChange,
  onSubmit,
  errors,
  fname,
  lname,
  username,
  status,
  email,
  phone,
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
         <div><SelectField
           name="status"
           floatingLabelText="Status"
           floatingLabelFixed={true}
           value={status}
           onChange={onActiveStatusChange}
           style={customStyle.SelectField}
           underlineFocusStyle={customStyle.underlineStyle}
           floatingLabelFocusStyle={customStyle.colorStyle}
              >

           <MenuItem value={true} primaryText="Active" />
           <MenuItem value={false} primaryText="Disabled" />

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
         message="Instructor information updated successfully!"
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
export default AdminInstructorForm;
