import React from 'react';
import { Popup, Message, Modal, Table, Icon, Form, Button, Segment, Container, Header } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const daysOfTheWeek = [
  { key: 'monday', text: 'Monday', value: '1' },
  { key: 'tuesday', text: 'Tuesday', value: '2' },
  { key: 'wednesday', text: 'Wednesday', value: '3' },
  { key: 'thursday', text: 'Thursday', value: '4' },
  { key: 'friday', text: 'Friday', value: '5' },
  { key: 'saturday', text: 'Saturday', value: '6' },
  { key: 'sunday', text: 'Sunday', value: '0' }
]

const AllClassesForm = ({
  handleRowClick,
  onStartTimeChange,
  onEndTimeChange,
  handleInputChange,
  onSelectChange,
  students,
  studentId,
  timeconfig,
  sessions,
  names,
  day,
  startTime,
  endTime,
  selectedSession,
  displayClasses,
  clearFields
 }) => (
   <Container>
     <Form>

       <Header block as='h2' attached='top' color='blue' >
         Classes
       </Header>

       <Segment attached raised >
         <Form.Group widths='equal'>
           <Form.Select
             label='Student'
             name='studentId'
             onChange={onSelectChange}
             options={names}
             value={studentId}
           />

           <Form.Select
             label='Session'
             name='selectedSession'
             onChange={onSelectChange}
             options={sessions}
             value={selectedSession}
           />


           <Form.Select
             fluid
             label='Select day of the week'
             name='day'
             onChange={onSelectChange}
             options={daysOfTheWeek}
             value={day}

           />

           <Form.Field
             fluid
             label='Class Start'
             control={Datetime}
             name='startTime'
             onChange={onStartTimeChange}
             dateFormat={false}
             timeConstraints={timeconfig}
             value={startTime}
           />

           <Form.Field
             fluid
             label='Class End'
             control={Datetime}
             name='endTime'
             onChange={onEndTimeChange}
             dateFormat={false}
             timeConstraints={timeconfig}
             value={endTime}
           />
         </Form.Group>
         <Button
           primary
           size='small'
           onClick={clearFields}
         >
           Clear Filters
         </Button>

       </Segment>

       <Table celled >
         <Table.Header>
           <Table.Row>

             <Table.HeaderCell>Session Start Date</Table.HeaderCell>
             <Table.HeaderCell>Class Start</Table.HeaderCell>
             <Table.HeaderCell>Class End</Table.HeaderCell>
             <Table.HeaderCell>Student</Table.HeaderCell>
           </Table.Row>
         </Table.Header>


         <Table.Body>
           {displayClasses.map((c, idx) => <Table.Row key={idx} >

             <Table.Cell
               children = {moment(c.s_start_date).format('MM/DD/YY')}>
             </Table.Cell>
             <Table.Cell
               children = {moment(c.class_start).format('hh:mm')}>
             </Table.Cell>
             <Table.Cell
               children = {moment(c.class_end).format('hh:mm')}>
             </Table.Cell>
             <Table.Cell>
               {c.fname} {c.lname}
             </Table.Cell>

           </Table.Row>)}
         </Table.Body>

       </Table>

     </Form>
   </Container>
)

export default AllClassesForm;
