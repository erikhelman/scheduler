import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

const StudentForm = ({
  onChange,
  onSubmit,
  addStudent,
  removeStudent,
  errors,
  students,
  onGenderChange,
  onDateChange,
  onClassTypeChange,
  onClassLengthChange,
  onLevelChange
 }) => (

     <form onSubmit={onSubmit}>

       {students.map((student, idx) => (
         <Card key={idx} className="students" style={{margin:'1em', paddingBottom: '1em'}}>
           <div>
             <TextField
               floatingLabelText="First Name"
               floatingLabelFixed={true}
               value={student.fname}
               name="fname"
               onChange={onChange(idx)}
               style={customStyle.nameTextFields}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
             />
             <TextField
               floatingLabelText="Last Name"
               floatingLabelFixed={true}
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
           <div style={{paddingBottom:'1em'}}>
             <TextField
               floatingLabelText="Emergency Contact Name"
               floatingLabelFixed={true}
               value={student.emerg_contact}
               name="emerg_contact"
               onChange={onChange(idx)}
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
               onChange={onChange(idx)}
               value={student.emerg_phone}
             />
           </div>
           <Divider />
           <div style={customStyle.general}>
             <SelectField
               name="class_type"
               floatingLabelText="Class Type"
               floatingLabelFixed={true}
               value={student.class_type}
               onChange={onClassTypeChange(idx)}
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
               value={student.class_length}
               onChange={onClassLengthChange(idx)}
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
               value={student.level}
               onChange={onLevelChange(idx)}
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
               value={student.lesson_date}
               name="lessonDate"
               onChange={onChange(idx)}
               style={customStyle.nameTextFields}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
             />
             <TextField
               floatingLabelText="Lesson Time"
               floatingLabelFixed={true}
               value={student.lesson_time}
               name="lessonTime"
               onChange={onChange(idx)}
               style={customStyle.nameTextFields}
               underlineFocusStyle={customStyle.underlineStyle}
               floatingLabelFocusStyle={customStyle.colorStyle}
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
export default StudentForm;
