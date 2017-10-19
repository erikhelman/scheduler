import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {withStyles} from 'material-ui/styles';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


const AllStudentsForm = ({
  onSubmit,
  onChange,
  errors,
  students
 }) => (
   <div>
     <Card className="container" style={{marginLeft:10,marginRight:10, paddingTop:75}}>
       <div style = {{display:'inline-block', marginLeft:20}}>
         <div style={{paddingTop:10, paddingBottom:10}}>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHeaderColumn>First Name</TableHeaderColumn>
                 <TableHeaderColumn>Last Name</TableHeaderColumn>
                 <TableHeaderColumn>Email Address</TableHeaderColumn>
                 <TableHeaderColumn>Date of Birth</TableHeaderColumn>
                 <TableHeaderColumn>Phone Number</TableHeaderColumn>
                 <TableHeaderColumn>Gender</TableHeaderColumn>
                 <TableHeaderColumn>Level</TableHeaderColumn>
                 <TableHeaderColumn>Class Type</TableHeaderColumn>
               </TableRow>
             </TableHeader>
             <TableBody>
               {students.map(student => <TableRow key={student.student_id}>
                 <TableRowColumn>{student.fname}</TableRowColumn>
                 <TableRowColumn>{student.lname}</TableRowColumn>
                 <TableRowColumn>{student.email}</TableRowColumn>
                 <TableRowColumn>{student.dob}</TableRowColumn>
                 <TableRowColumn>{student.phone}</TableRowColumn>
                 <TableRowColumn>{student.gender}</TableRowColumn>
                 <TableRowColumn>{student.level}</TableRowColumn>
                 <TableRowColumn>{student.class_type}</TableRowColumn>
               </TableRow>)}
             </TableBody>
           </Table>
         </div>
       </div>
     </Card>
   </div>
  )

export default AllStudentsForm;
