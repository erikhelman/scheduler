import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import {blue600} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import { Segment, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

const InstructorForm = ({
  onSubmit,
  onChange,
  errors,
  fname,
  lname,
  email,
  phone,
  username,
  instructors,
  checkValue,
  onCheckChange,
  onEditClick,
  onRequestClose,
  snackbarState
 }) => (
   <div>
     <form action="/" onSubmit={onSubmit}>

       <Card className="container" style={{margin:'1em', paddingBottom:'1em'}}>

         <div>
           <TextField
             name="fname"
             floatingLabelText="First Name"
             floatingLabelFixed={true}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onChange}
             errorText={errors.fname}
             value={fname}
           />

           <TextField
             name="lname"
             floatingLabelText="Last Name"
             floatingLabelFixed={true}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onChange}
             errorText={errors.lname}
             value={lname}
           />
         </div>
         <div>
           <TextField
             name="username"
             floatingLabelText="User Name"
             floatingLabelFixed={true}
             style={customStyle.nameTextFields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onChange}
             errorText={errors.username}
             value={username}
           />
         </div>
         <div>
           <TextField
             name="phone"
             floatingLabelText="Phone Number"
             floatingLabelFixed={true}
             style={customStyle.textfields}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
             onChange={onChange}
             errorText={errors.phone}
             value={phone}
           />

           <TextField
             floatingLabelText="Email"
             floatingLabelFixed={true}
             type="email"
             name="email"
             onChange={onChange}
             errorText={errors.email}
             value={email}
             style={customStyle.emailTextField}
             underlineFocusStyle={customStyle.underlineStyle}
             floatingLabelFocusStyle={customStyle.colorStyle}
           />
         </div>
       </Card>

       <div >
         <RaisedButton
           type="submit"
           label="Submit"
           style={customStyle.general}
           backgroundColor = '#1E88E5'
           labelColor = '#FFFFFF'
         />
         <Snackbar
           open={snackbarState}
           style={{textAlign: 'center'}}
           message="Profile submitted successfully"
           autoHideDuration={3000}
           onRequestClose={onRequestClose}
         />
       </div>
     </form>
     <div>

       <Segment raised>
         <Table collapsing compact celled definition>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell />
               <Table.HeaderCell>First Name</Table.HeaderCell>
               <Table.HeaderCell>Last Name</Table.HeaderCell>
             </Table.Row>
           </Table.Header>


           <Table.Body>
             {instructors.map(instructor => <Table.Row key={instructor.id}>
               <Table.Cell collapsing>
                 <Checkbox
                   name='checkboxGroup'
                   value={instructor.id}
                   checked={checkValue === instructor.id}
                   onChange={onCheckChange}/>
               </Table.Cell>
               <Table.Cell
                 children = {instructor.fname}>
               </Table.Cell>
               <Table.Cell
                 children = {instructor.lname}>
               </Table.Cell>
             </Table.Row>)}
           </Table.Body>

           <Table.Footer fullWidth>
             <Table.Row>
               <Table.HeaderCell />
               <Table.HeaderCell colSpan='4'>
                 <Button
                   icon
                   labelPosition='left'
                   primary
                   size='small'
                   onClick = {onEditClick}>
                   <Icon name='user' /> Edit Instructor
                 </Button>
               </Table.HeaderCell>
             </Table.Row>
           </Table.Footer>
         </Table>
       </Segment>
     </div>
   </div>
  )

     const customStyle = {
       textfields: {
         marginRight:'1em',
         marginLeft: '1em',
         flex:'1',
         //alignSelf: 'flex-end'
       },
       selectField: {
         marginRight:'1em',
         marginLeft: '1em',
         alignSelf: 'flex-end'
       },
       streetTextfield: {
         marginRight:'1em',
         marginLeft: '1em',
         width:'52em',
         verticalAlign:'bottom'
       },
       nameTextFields: {
         marginRight:'1em',
         marginLeft: '1em',
         width:'25em',
         verticalAlign:'bottom'
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
       colorStyle: {
         color:blue600
       },
       underlineStyle: {
         borderColor:blue600
       },
     };

     export default InstructorForm;
