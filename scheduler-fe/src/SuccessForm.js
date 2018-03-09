import React from 'react';
import { Message } from 'semantic-ui-react';

class SuccessForm extends React.Component {

  render() {
    return (
      <Message>
        <Message.Header>
          Successful Registration
        </Message.Header>
        <p>Your account has been successfully registered! You will be contacted by Champion Swimming once your student(s) and lesson time(s) have been confirmed.</p>
      </Message>
    );
  }
}

export default SuccessForm;
