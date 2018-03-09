import React from 'react';
import { Form, Segment, Container, Header } from 'semantic-ui-react';

const RecoveryForm = ({
  handleInputChange,
  message,
  onSubmit,
  email
 }) => (
   <Container style={{ paddingTop: 10 }}>
     <Form>
       <Header block as='h2' attached='top' color='blue' >
         Password Recovery
       </Header>

       <Segment attached raised >
         <h4>
           Please enter your email address and you will receive an email with a password recovery link.
         </h4>

         <Form.Input
           fluid
           placeholder='Email Address'
           name='email'
           onChange={handleInputChange}
           value={email}
         />

         <Form.Button
           content="Submit"
           color="blue"
           onClick={onSubmit}
         />

       </Segment>
     </Form>
   </Container>
 )

export default RecoveryForm;
