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

const ScheduleStudentForm = ({
  handleRowClick,
  onStartTimeChange,
  onEndTimeChange,
  handleInputChange,
  onSelectChange,
  onSubmit,
  students,
  timeconfig,
  sessions,
  onSessionChange,
  names,
  modalOpen,
  confirmResult,
  handleCancel,
  handleConfirm,
  showModal,
  studentId,
  selectedSession,
  scheduleDates,
  confirmContent,
  fullName,
  message,
  removeDates,
  addDates,
  onDayofWeekChange,
  classTimes,
  price
 }) => (
   <Container>
     <Form>

       <Header block as='h2' attached='top' color='blue' >
         Schedule a Student
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

         </Form.Group>

         <Button
           size='small'
           content='Add More Class Times'
           color='blue'
           onClick={addDates}
         />
         <br />
         <br />

         {classTimes.map((cTime, idx) => (
           <Form.Group widths='equal' key={idx}>
             <Form.Select
               fluid
               label='Select day of the week'
               name='scheduleDay'
               onChange={onDayofWeekChange(idx)}
               options={daysOfTheWeek}
               value={cTime.scheduleDay}

             />

             <Form.Field
               fluid
               label='Class Start'
               control={Datetime}
               name='startTime'
               onChange={onStartTimeChange(idx)}
               dateFormat={false}
               timeConstraints={timeconfig}
               value={cTime.startTime}
             />

             <Form.Field
               fluid
               label='Class End'
               control={Datetime}
               name='endTime'
               onChange={onEndTimeChange(idx)}
               dateFormat={false}
               timeConstraints={timeconfig}
               value={cTime.endTime}
             />
             <Popup
               trigger={<Icon
                 name='minus'
                 color='blue'
                 onClick={removeDates(idx)}
                        />}
               content='Remove Time'
             />
           </Form.Group>))}
         <Modal trigger={<Button onClick={showModal} primary>Schedule</Button>}
           size='small'
           open={modalOpen}
         >
           <Header icon='add to calendar' content='Confirm schedule dates' />
           <Modal.Content>
             <h4>{fullName} will be scheduled for the following class dates: </h4>
             <br />
             <Table>
               <Table.Body>

                 {scheduleDates.map((sDates, idx) =>
                   <Table.Row key = {idx}>
                     <Table.Cell textAlign='center'>
                       {sDates[0].format('dddd, MMM Do YYYY h:mm a')} - {sDates[1].format('h:mm a')}
                     </Table.Cell>
                   </Table.Row>)}

               </Table.Body>

             </Table>

             <Form.Input
               fluid
               label='Price per class:'
               placeholder='Price'
               value={price}
               name='price'
               onChange={handleInputChange}
             />
             
           </Modal.Content>
           <Modal.Actions>
             <Button size='small' onClick={handleCancel}>
               No
             </Button>
             <Button primary size='small' onClick={handleConfirm}>
               Yes
             </Button>
           </Modal.Actions>
         </Modal>
       </Segment>
       {message.summary && <Message style={{textAlign: 'center', color: 'red'}} className="message">{message.summary}</Message>}
     </Form>

     </Container>
     )

     export default ScheduleStudentForm;
