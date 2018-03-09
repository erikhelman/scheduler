import React from 'react';
import { Form, Button, Segment, Container, Header } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SettingsForm = ({
  handleRowClick,
  handleCheckChange,
  handleStartDateChange,
  handleEndDateChange,
  handleInputChange,
  message,
  requests,
  checkValue,
  handleEditClick,
  sessionStartDate,
  sessionEndDate,
  numberAllowed,
  onSubmit,
  notice
 }) => (
   <Container>
     <Form>
       <Header block as='h2' attached='top' color='blue' >
         Settings
       </Header>

       <Segment attached raised >

         <Form.Field
           label='Session Start Date'
           control={Datepicker}
           placeholderText='MM/DD/YYYY'
           name='startDate'
           onChange={handleStartDateChange}
           selected={sessionStartDate}
         />

         <Form.Field
           label='Session End Date'
           control={Datepicker}
           placeholderText='MM/DD/YYYY'
           name='endDate'
           onChange={handleEndDateChange}
           selected={sessionEndDate}
         />

         <Form.Group widths='equal'>
           <Form.Input
             fluid
             label='Number of Rescheduled Classes Allowed'
             name='numberAllowed'
             onChange={handleInputChange}
             value={numberAllowed}

           />
           <Form.Input
             fluid
             label='Number of Days Notice Required to Reschedule a Class'
             name='notice'
             onChange={handleInputChange}
             value={notice}
           />
         </Form.Group>

         <Button
           type='submit'
           primary
           size='small'
           onClick={onSubmit}
         >
           Submit
         </Button>
       </Segment>
     </Form>
     {/*
       {message.summary && <Message style={{textAlign: 'center', color: 'red'}} className="message">{message.summary}</Message>}
       <Segment raised>
       <Table collapsing compact celled>
         <Table.Header>
       <Table.Row>
       <Table.HeaderCell>First Name</Table.HeaderCell>
       <Table.HeaderCell>Last Name</Table.HeaderCell>
       <Table.HeaderCell>Contact Email</Table.HeaderCell>
       <Table.HeaderCell>Time of Request</Table.HeaderCell>
       <Table.HeaderCell>Class Date to be Rescheduled</Table.HeaderCell>
       </Table.Row>
         </Table.Header>



       <Table.Body>
       {requests.map(request => <Table.Row key={request.reschedule_id}>

       <Table.Cell>{request.fname}</Table.Cell>
       <Table.Cell>{request.lname}</Table.Cell>
       <Table.Cell>{request.email}</Table.Cell>
       <Table.Cell>{moment(request.time).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
       <Table.Cell>{moment(request.class_date).format("dddd, MMMM Do YYYY")}</Table.Cell>

       </Table.Row>)}
       </Table.Body>


       </Table>
       </Segment>
     */}
   </Container>
 )

export default SettingsForm;
