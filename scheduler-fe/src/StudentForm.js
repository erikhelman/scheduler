import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
   <div name="container">
     
     <form onSubmit={onSubmit}>

       <h4>Students</h4>

       {students.map((student, idx) => (
         <div className="students">

           <input
             type="text"
             placeholder={`Student #${idx + 1} fname`}
             value={student.fname}
             name="fname"
             onChange={onChange(idx)}
           />

           <input
             type="text"
             placeholder={`Student #${idx + 1} lname`}
             value={student.lname}
             name="lname"
             onChange={onChange(idx)}
           />

           <DropDownMenu
             name="gender"
             value={student.gender}
             onChange={onGenderChange(idx)}>

             <MenuItem value={"m"} primaryText="Male" />
             <MenuItem value={"f"} primaryText="Female" />

           </DropDownMenu>

           <DatePicker
             name="dob"
             hintText="Date of Birth"
             container="inline"
             mode="landscape"
             value={student.dob}
             onChange={onDateChange(idx)} />

           <button
             type="button"
             onClick={removeStudent(idx)}
           className="small">-
           </button>
         </div>
       ))}
       <button
         type="button"
         onClick={addStudent}
       className="small">Add Student
       </button>

       <button
         onSubmit = {onSubmit}>Submit Changes
       </button>
     </form>
   </div>
     )

export default StudentForm;
