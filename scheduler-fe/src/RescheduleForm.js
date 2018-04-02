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
  onSubmit,
  startDate,
  endDate,
  email,
  onSelectChange,
  names,
  studentId,
  notice,
  selectedClass,
  classes
 }) => (
   <Container>
     <Form>
       <Header block as='h2' attached='top' color='blue' >
         Reschedule a Class
       </Header>
       <Segment attached raised>
         <h4 className="ui top black header">Please enter the information below to submit a request to reschedule a lesson.</h4>

         <Form.Group widths='equal'>
           <Form.Select
             label='Student'
             name='studentId'
             onChange={onSelectChange}
             options={names}
             value={studentId}
           />

           <Form.Select
             label='Classes'
             name='selectedClass'
             onChange={onSelectChange}
             options={classes}
             value={selectedClass}
           />
         </Form.Group>

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
