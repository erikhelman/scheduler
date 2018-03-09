import React from 'react';
import { Container, Header, Segment, Message, Form, Button } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const RescheduleForm = ({
  onChange,
  handleRescheduleDateChange,
  handleInputChange,
  message,
  rescheduleDate,
  fname,
  lname,
  onSubmit,
  startDate,
  endDate,
  email,
  notice
 }) => (
   <Container>
     <Form>
       <Header block as='h2' attached='top' color='blue' >
         Reschedule a Class
       </Header>
       <Segment attached raised>
         <h4 className="ui top black header">Please enter the information below to submit a request to reschedule a lesson.</h4>

         <Form.Group>
           <Form.Input
             label="Student's First Name"
             name='fname'
             onChange={handleInputChange}
             value={fname}
           />

           <Form.Input
             label="Student's Last Name"
             name='lname'
             value={lname}
             onChange={handleInputChange}
           />
         </Form.Group>
         <Form.Field
             label='Date of Class to be Rescheduled'
             control={Datepicker}
           placeholderText='MM/DD/YYYY'
           name='dob'
           onChange={handleRescheduleDateChange}
           selected={rescheduleDate}
           minDate={moment().add(notice, "days")}
           maxDate={moment(endDate)}
         />

         <Button
           primary
           size='small'
           onClick={onSubmit}
         >
           Submit
         </Button>
       </Segment>
     </Form>
     {message.summary && <Message style={{textAlign: 'center', color: 'red'}} className="message">{message.summary}</Message>}

   </Container>
)

export default RescheduleForm;
