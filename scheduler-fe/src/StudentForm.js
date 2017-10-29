import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';

const StudentForm = ({
  onChange,
  onSubmit,
  addStudent,
  removeStudent,
  errors,
  students,
  onGenderChange,
  onDateChange
 }) => (
     <form onSubmit={onSubmit}>


       {students.map((student, idx) => (
         <Card className="students" style={{margin:'1em', paddingBottom: '1em'}}>
           <div>
             <TextField
               floatingLabelText="First Name"
               value={student.fname}
               name="fname"
               onChange={onChange(idx)}
               style={customStyle.nameTextFields}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
             />
             <TextField
               floatingLabelText="Last Name"
               value={student.lname}
               name="lname"
               onChange={onChange(idx)}
               style={customStyle.nameTextFields}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
             />
             <RaisedButton
               type="button"
               onClick={removeStudent(idx)}
               label = "Remove"
               style={customStyle.removeButton}
               backgroundColor = '#1E88E5'
               labelColor = '#FFFFFF'
             />
           </div>
           <div style={customStyle.general}>
             <SelectField
               name="gender"
               floatingLabelText="Gender"
               floatingLabelFixed={true}
               value={student.gender}
               onChange={onGenderChange(idx)}
               style={customStyle.SelectField}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
             >

               <MenuItem value={"m"} primaryText="Male" />
               <MenuItem value={"f"} primaryText="Female" />

             </SelectField>
           </div>
           <div style={customStyle.general}>
             <DatePicker
               name="dob"
               floatingLabelText="Date of Birth"
               floatingLabelFixed={true}
               container="inline"
               mode="landscape"
               value={student.dob}
               onChange={onDateChange(idx)}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
               maxDate = {new Date()}
             />
           </div>

         </Card>
       ))}
       <div >
         <RaisedButton
           type="button"
           onClick={addStudent}
           style={customStyle.general}
           backgroundColor = '#1E88E5'
           labelColor = '#FFFFFF'
           label = "Add Student"
         />

         <RaisedButton
           type="submit"
           label = "Submit Changes"
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
       },
       selectField: {
         marginRight:'1em',
         marginLeft: '2em',
         alignSelf: 'flex-end'
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
export default StudentForm;
