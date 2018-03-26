import React from 'react';
import { Modal, Rail, Divider, Message, Form, Button, Segment, Container, Header } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SettingsForm = ({
  handleRowClick,
  handleCheckChange,
  handleCurrentStartDateChange,
  handleCurrentEndDateChange,
  handleNextStartDateChange,
  handleNextEndDateChange,
  handleInputChange,
  message,
  requests,
  checkValue,
  handleEditClick,
  currentStartDate,
  currentEndDate,
  nextStartDate,
  nextEndDate,
  numberAllowed,
  onSubmit,
  notice,
  modalOpen
 }) => (
   <Form>
     <Container>
       <Rail internal position='left'>
         <Segment>
           <Modal trigger={<Button fluid primary icon='plus square outline' labelPosition='left' color='blue' content='Add New Session' />}
             size='small'
           >
             <Header icon='plus square outline' content='Add New Session' />
             <Modal.Content>
               <h4>Set session dates:</h4>
               <Form>
                 <Form.Group>
                   <Form.Field
                     label='Current Session Start Date'
                     control={Datepicker}
                     placeholderText='MM/DD/YYYY'
                     name='startDate'
                     onChange={handleCurrentStartDateChange}
                     selected={currentStartDate}
                   />

                   <Form.Field
                     label='Current Session End Date'
                     control={Datepicker}
                     placeholderText='MM/DD/YYYY'
                     name='endDate'
                     onChange={handleCurrentEndDateChange}
                     selected={currentEndDate}
                   />
                 </Form.Group>
                 <Form.Group>
                   <Form.Field
                     label='Next Session Start Date'
                     control={Datepicker}
                     placeholderText='MM/DD/YYYY'
                     name='startDate'
                     onChange={handleNextStartDateChange}
                     selected={nextStartDate}
                   />

                   <Form.Field
                     label='Next Session End Date'
                     control={Datepicker}
                     placeholderText='MM/DD/YYYY'
                     name='endDate'
                     onChange={handleNextEndDateChange}
                     selected={nextEndDate}
                   />
                 </Form.Group>
               </Form>

             </Modal.Content>
             <Modal.Actions>
               <Button size='small'
                 //onClick={handleCancel}
               >
                 Cancel
               </Button>
               <Button
                 primary
                 size='small'
                 //onClick={handleConfirm}
               >
                 Submit
               </Button>
             </Modal.Actions>
           </Modal>

           <Divider>
           </Divider>
           <Modal trigger={<Button fluid primary icon='plus square outline' labelPosition='left' color='blue' content='Advance Session' />}
             size='small'
           >
             <Header icon='plus square outline' content='Advance Session' />
             <Modal.Content>
               <h4>Current session will become:</h4>
               <p>{nextStartDate} - {nextEndDate}</p>
               <p>Please enter the new session dates </p>
               <Form>
                 <Form.Group>
                   <Form.Field
                     label='New Session Start Date'
                     control={Datepicker}
                     placeholderText='MM/DD/YYYY'
                     name='newStartDate'
                     //onChange={handleCurrentStartDateChange}
                     //selected={currentStartDate}
                   />

                   <Form.Field
                     label='New Session End Date'
                     control={Datepicker}
                     placeholderText='MM/DD/YYYY'
                     name='newEndDate'
                     //onChange={handleCurrentEndDateChange}
                     //selected={currentEndDate}
                   />
                 </Form.Group>
               </Form>

             </Modal.Content>
             <Modal.Actions>
               <Button size='small'
                 //onClick={handleCancel}
               >
                 Cancel
               </Button>
               <Button
                 primary
                 size='small'
                 //onClick={handleConfirm}
               >
                 Submit
               </Button>
             </Modal.Actions>
           </Modal>
         </Segment>
       </Rail>

       <Header block as='h2' attached='top' color='blue' >
         Settings
       </Header>

       <Segment attached raised >

         <Form.Group>
           <Form.Field
             label='Current Session Start Date'
             control={Datepicker}
             placeholderText='MM/DD/YYYY'
             name='startDate'
             onChange={handleCurrentStartDateChange}
             selected={currentStartDate}
           />

           <Form.Field
             label='Current Session End Date'
             control={Datepicker}
             placeholderText='MM/DD/YYYY'
             name='endDate'
             onChange={handleCurrentEndDateChange}
             selected={currentEndDate}
           />
         </Form.Group>
         <Form.Group>
           <Form.Field
             label='Next Session Start Date'
             control={Datepicker}
             placeholderText='MM/DD/YYYY'
             name='startDate'
             onChange={handleNextStartDateChange}
             selected={nextStartDate}
           />

           <Form.Field
             label='Next Session End Date'
             control={Datepicker}
             placeholderText='MM/DD/YYYY'
             name='endDate'
             onChange={handleNextEndDateChange}
             selected={nextEndDate}
           />
         </Form.Group>

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

       {message.summary && <Message style={{textAlign: 'center', color: 'red'}} className="message">{message.summary}</Message>}
       {/*
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
   </Form>
 )

export default SettingsForm;
