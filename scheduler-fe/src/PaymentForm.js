import React from 'react';
import { Message, Form, Button, Segment, Container, Header } from 'semantic-ui-react';
import moment from 'moment';

const PaymentForm = ({
  handleInputChange,
  message,
  onSubmit,
  sessions,
  onSelectChange,
  name,
  selectedSession,
  current_status,
  next_status,
  total,
  classes
 }) => (
   <Form>
     <Container>

       <Header block as='h2' attached='top' color='blue' >
         Process Payment
       </Header>

       <Segment attached raised >

         <Form.Select
           label='Session'
           name='selectedSession'
           onChange={onSelectChange}
           options={sessions}
           value={selectedSession}
         />

       </Segment>

       <Segment>
         <h3>Payment to be processed:</h3>
         <p><b>Student: </b></p>
         <p style={{ marginLeft: '1em' }}>{name}</p>
         <p><b>Total: </b></p>
         <p style={{ marginLeft: '1em' }}>{total}</p>
         <p><b>Class Dates: </b></p>
         {classes.map((c, idx) => <p style={{ marginLeft: '1em' }} key={idx}>{moment(c.class_start).format('MMM Do YYYY')}</p>)}
       </Segment>
       <Button
         primary
         size='small'
         onClick={onSubmit}
       >
         Submit
       </Button>
       {message.summary && <Message style={{textAlign: 'center', color: 'red'}} className="message">{message.summary}</Message>}
     </Container>
   </Form>
)

export default PaymentForm;
