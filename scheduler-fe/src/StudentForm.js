import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {blue600} from 'material-ui/styles/colors'

const StudentForm = ({
  onChange,
  onSubmit,
  errors,
  fname,
  lname,
  gender,
  dob,
  level,
  class_type,
  class_length,
  status,
  students
 }) => (
     <div>

       <Card className="container">
         <form action="/" onSubmit={onSubmit}>
           <br />
           <br />
           <br />
           <br />
           {students.map(student => <div key={student.student_id}
             style = {customStyle.general}>

             <div style = {customStyle.general}>
               <TextField
                 id="firstName"
                 floatingLabelText="First Name"
                 floatingLabelFixed={true}
                 margin="dense"
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
                 value={fname}
                 name="fname"
                 onChange={onChange}
               />

               <TextField
                 id="lastName"
                 floatingLabelText="Last Name"
                 floatingLabelFixed={true}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
                 onChange={onChange}
                 errorText={errors.name}
                 value={lname}
                 name="lname"
               />

               <TextField
                 id="date"
                 floatingLabelText="Date of Birth"
                 floatingLabelFixed={true}
                 type="date"
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
                 value={dob}
                 name="dob"
                 onChange={onChange}
               />

               <SelectField floatingLabelText="Gender"
                 floatingLabelFixed={true}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               >
                 <MenuItem value={1} primaryText="Male" />
                 <MenuItem value={2} primaryText="Female" />
               </SelectField>
             </div>

             <div style = {customStyle.general}>
               <TextField
                 id="swimLevel"
                 floatingLabelText="Swim Level"
                 floatingLabelFixed={true}
                 margin="dense"
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
                 type="number"
                 name="level"
               />

               <TextField
                 id="currentDay"
                 floatingLabelText="Current Day of the Week"
                 floatingLabelFixed={true}
                 type="date"
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               />
               <TextField
                 id="currentTime"
                 floatingLabelText="Current Time"
                 floatingLabelFixed={true}
                 type="Time" style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               />

             </div>

             <div style = {customStyle.general}>
               <SelectField
                 floatingLabelText="Class Type"
                 floatingLabelFixed={true}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               >

                 <MenuItem value={1} primaryText="Private" />
                 <MenuItem value={2} primaryText="Semi-Private" />
                 <MenuItem value={3} primaryText="Group" />

               </SelectField>

               <SelectField
                 floatingLabelText="Class Length"
                 floatingLabelFixed={true}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               >

                 <MenuItem value={1} primaryText="30 mins" />
                 <MenuItem value={2} primaryText="45 mins" />
                 <MenuItem value={3} primaryText="60 mins" />

               </SelectField>

               <SelectField floatingLabelText="Preferred Day of the Week"
                 floatingLabelFixed={true}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               >
                 <MenuItem value={1} primaryText="Monday" />
                 <MenuItem value={2} primaryText="Tuesday" />
                 <MenuItem value={3} primaryText="Wednesday" />
                 <MenuItem value={4} primaryText="Thursday" />
                 <MenuItem value={5} primaryText="Friday" />
                 <MenuItem value={6} primaryText="Saturday" />
                 <MenuItem value={7} primaryText="Sunday" />
               </SelectField>

               <SelectField floatingLabelText="Preferred Time"
                 floatingLabelFixed={true}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               >
                 <MenuItem value={1} primaryText="Morning" />
                 <MenuItem value={2} primaryText="Afternoon" />
                 <MenuItem value={3} primaryText="Evening" />
               </SelectField>

               <SelectField
                 floatingLabelText="Status"
                 floatingLabelFixed={true}
                 name="status"
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               >

                 <MenuItem value={1} primaryText="Active" />
                 <MenuItem value={2} primaryText="Inactive" />

               </SelectField>

             </div>

             <div style = {customStyle.general}>
               <TextField
                 floatingLabelText="Email"
                 type="email"
                 name="email"
                 onChange={onChange}
                 errorText={errors.email}
                 style={customStyle.textfields}
                 underlineFocusStyle={customStyle.colorStyle}
                 floatingLabelFocusStyle={customStyle.colorStyle}
               />
             </div>
           </div>)}
           <div style={{paddingBottom:10,marginLeft:20}}>
             <RaisedButton
               type="submit"
               label="Submit"
               style={customStyle.textfields}
               backgroundColor = '#1E88E5'
               labelColor = '#FFFFFF'
             />
           </div>
         </form>)}
       </Card>
     </div>

)

const customStyle = {
  general: {
    display:'inline-block',
    marginLeft:20
  },
  textfields: {
    position: 'relative',
    verticalAlign: 'bottom',
    marginLeft: 10,
    marginRight: 10
  },
  colorStyle: {
    color:blue600
  },
};

export default StudentForm;
