import React from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react'


const AllUsersForm = ({
  handleRowClick,
  onChange,
  handleCheckChange,
  errors,
  users,
  checkValue,
  handleEditClick
 }) => (
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
           {users.map(user => <Table.Row key={user.id} onClick = {handleRowClick.bind(this, user)}>
             <Table.Cell collapsing>
               <Checkbox
                 name='checkboxGroup'
                 value={user.id}
                 checked={checkValue === user.id}
                 onChange={handleCheckChange}/>
             </Table.Cell>
             <Table.Cell
               children = {user.fname}>
             </Table.Cell>
             <Table.Cell
               children = {user.lname}>
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
                 onClick = {handleEditClick}>
                 <Icon name='user' /> Edit User
               </Button>
             </Table.HeaderCell>
           </Table.Row>
         </Table.Footer>
       </Table>
     </Segment>
   </div>
     )

     export default AllUsersForm;
