import React from 'react';
import { Segment, Button, Checkbox, Table, Container, Rail, Divider, Header, Form } from 'semantic-ui-react';

const AllStudentsForm = ({
  handleRowClick,
  onChange,
  handleCheckChange,
  errors,
  students,
  checkValue,
  handleEditClick
 }) => (
   <Form>
     <Container>
       <Rail internal position='left'>
         <Segment>
           <Button
             fluid
             content='Edit Student'
             icon='user'
             labelPosition='left'
             color='blue'
             onClick = {handleEditClick}
           />
           <Divider>Filters
           </Divider>
         </Segment>
       </Rail>



       <Header block as='h2' attached='top' color='blue' >
         All Student Information
       </Header>

       <Segment basic attached>
         <Table celled definition>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell />
               <Table.HeaderCell>First Name</Table.HeaderCell>
               <Table.HeaderCell>Last Name</Table.HeaderCell>
               <Table.HeaderCell>Email Address</Table.HeaderCell>
               <Table.HeaderCell>Phone Number</Table.HeaderCell>

             </Table.Row>
           </Table.Header>


           <Table.Body>
             {students.map(student => <Table.Row key={student.student_id} onClick = {handleRowClick.bind(this,student)}>
               <Table.Cell collapsing>
                 <Checkbox
                   name='checkboxGroup'
                   value={student.student_id}
                   checked={checkValue === student.student_id}
                   onChange={handleCheckChange}/>
               </Table.Cell>
               <Table.Cell
                 children = {student.fname}>
               </Table.Cell>
               <Table.Cell
                 children = {student.lname}>
               </Table.Cell>
               <Table.Cell
                 children = {student.email}>
               </Table.Cell>
               <Table.Cell
                 children = {student.phone}>
               </Table.Cell>

             </Table.Row>)}
           </Table.Body>

         </Table>
       </Segment>
     </Container>
   </Form>
     )

     export default AllStudentsForm;
