import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';

const AdminStudentForm = ({
  onInputChange,
  onGenderChange,
  onClassTypeChange,
  onClassLengthChange,
  onLevelChange,
  onDateChange,
  onSubmit,
  errors,
  fname,
  lname,
  dob,
  gender,
  emerg_contact,
  emerg_phone,
  class_type,
  class_length,
  level,
  onRequestClose,
  snackbarState
 }) => (

     <form onSubmit={onSubmit}>

       <Card className="student" style={{margin:'1em', paddingBottom: '1em'}}>
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
         </div>
         <div style={customStyle.general}>
           <DatePicker
             name="dob"
             floatingLabelText="Date of Birth"
             floatingLabelFixed={true}
             container="inline"
             mode="landscape"
             value={dob}
             onChange={onDateChange}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             maxDate = {new Date()}
           />
           <SelectField
             name="gender"
             floatingLabelText="Gender"
             floatingLabelFixed={true}
             value={gender}
             onChange={onGenderChange}
             style={customStyle.SelectField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           >

             <MenuItem value={"m"} primaryText="Male" />
             <MenuItem value={"f"} primaryText="Female" />

           </SelectField>
         </div>
         <div style={{paddingBottom:'1em'}}>
           <TextField
             floatingLabelText="Emergency Contact Name"
             floatingLabelFixed={true}
             value={emerg_contact}
             name="emerg_contact"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />

           <TextField
             name="emerg_phone"
             floatingLabelText="Emergency Contact Number"
             floatingLabelFixed={true}
             style={customStyle.textfields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onInputChange}
             value={emerg_phone}
             errorText={errors !== undefined ? errors.emerg_phone : ''}
           />
         </div>
         <Divider />
         <div style={customStyle.general}>
           <SelectField
             name="class_type"
             floatingLabelText="Class Type"
             floatingLabelFixed={true}
             value={class_type}
             onChange={onClassTypeChange}
             style={customStyle.SelectField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           >

             <MenuItem value={"group"} primaryText="Group" />
             <MenuItem value={"semi"} primaryText="Semi-Private" />
             <MenuItem value={"private"} primaryText="Private" />
             <MenuItem value={"dev"} primaryText="Development" />

           </SelectField>

           <SelectField
             name="class_length"
             floatingLabelText="Class Length"
             floatingLabelFixed={true}
             value={class_length}
             onChange={onClassLengthChange}
             style={customStyle.SelectField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           >

             <MenuItem value={30} primaryText="30 minutes" />
             <MenuItem value={45} primaryText="45 minutes" />
             <MenuItem value={60} primaryText="1 hour" />

           </SelectField>

           <SelectField
             name="level"
             floatingLabelText="Level"
             floatingLabelFixed={true}
             value={level}
             onChange={onLevelChange}
             style={customStyle.SelectField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           >

             <MenuItem value={"1"} primaryText="1" />
             <MenuItem value={"2"} primaryText="2" />
             <MenuItem value={"3"} primaryText="3" />
             <MenuItem value={"4"} primaryText="4" />
             <MenuItem value={"5"} primaryText="5" />
             <MenuItem value={"6"} primaryText="6" />
             <MenuItem value={"7"} primaryText="7" />
             <MenuItem value={"8"} primaryText="8" />
             <MenuItem value={"9"} primaryText="9" />
             <MenuItem value={"10"} primaryText="10" />

           </SelectField>
         </div>
         <div>
           <TextField
             floatingLabelText="Lesson Date"
             floatingLabelFixed={true}
             //value={lesson_date}
             name="lessonDate"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />
           <TextField
             floatingLabelText="Lesson Time"
             floatingLabelFixed={true}
             //value={lesson_time}
             name="lessonTime"
             onChange={onInputChange}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
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
export default AdminStudentForm;
