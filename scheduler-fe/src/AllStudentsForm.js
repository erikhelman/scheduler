import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {withStyles} from 'material-ui/styles';

const AllStudentsForm = ({
  onSubmit,
  onChange,
  errors,
  students
 }) => (
   <div>
     <br />
     <br />
     <br />
     <br />
     <Card className="container" style={{marginLeft:10,marginRight:10, paddingTop:75}}>

       <div style = {{display:'inline-block', marginLeft:20}}>
         <div style={{paddingTop:10, paddingBottom:10}}>

         </div>
       </div>
     </Card>
   </div>
  )

export default AllStudentsForm;
