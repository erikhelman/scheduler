import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';

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
   <Card className="container" style={{margin: 10}} >

     <form onSubmit={onSubmit}>


       {students.map((student, idx) => (
         <div className="students">

           <TextField
             value={student.fname}
             name="fname"
             onChange={onChange(idx)}
             style = {{marginLeft: 20,  marginRight: 10}}
           />

           <TextField
             value={student.lname}
             name="lname"
             onChange={onChange(idx)}
             style = {{marginLeft: 20,  marginRight: 10}}
           />
           <br />
           <DropDownMenu
             name="gender"
             value={student.gender}
             onChange={onGenderChange(idx)}
           >

             <MenuItem value={"m"} primaryText="Male" />
             <MenuItem value={"f"} primaryText="Female" />

           </DropDownMenu>
           <br />
           <DatePicker
             name="dob"
             hintText="Date of Birth"
             container="inline"
             mode="landscape"
             value={student.dob}
             onChange={onDateChange(idx)}
             style = {{marginLeft: 20,  marginRight: 10}} />

           <button
             type="button"
             onClick={removeStudent(idx)}
           className="small">-
           </button>
         </div>
       ))}
       <RaisedButton
         type="button"
         onClick={addStudent}
         style={{margin: 10}}
         label = "Add Student"
       />

       <RaisedButton
         type="submit"
         label = "Submit Changes"
         style={{margin: 10}}
       />

     </form>
   </Card>
     )

export default StudentForm;
