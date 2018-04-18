import React from 'react';
import { Checkbox, Table, Modal, Rail, Divider, Message, Form, Button, Segment, Container, Header } from 'semantic-ui-react';
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
  onSessionSubmit,
  onRescheduleSubmit,
  onClassTypeSubmit,
  onClassPriceSubmit,
  notice,
  classType,
  numStudents,
  classLength,
  price,
  existingClasses,
  existingPrices
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
         <Header as='h3'>Session Settings</Header>
         <Divider />
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
         <Button
           type='submit'
           primary
           size='small'
           onClick={onSessionSubmit}
         >
           Update Session Settings
         </Button>
         <Header as='h3'>Class Reschedule Settings</Header>
         <Divider />
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
           onClick={onRescheduleSubmit}
         >
           Update Reschedule Settings
         </Button>
         <Header as='h3'>Class Settings</Header>
         <Divider />
         <Form.Group widths='equal'>
           <Form.Input
             fluid
             label='Class Type'
             name='classType'
             onChange={handleInputChange}
             value={classType}
           />
           <Form.Input
             fluid
             label='Number of Students'
             name='numStudents'
             onChange={handleInputChange}
             value={numStudents}
           />
         </Form.Group>
         <Button
           type='submit'
           primary
           size='small'
           onClick={onClassTypeSubmit}
         >
           Update Class Types
         </Button>
         <br />
         <br />
         <Segment basic attached>
           <Table celled>
             <Table.Header>
               <Table.Row>
                 <Table.HeaderCell />
                 <Table.HeaderCell>Class Type</Table.HeaderCell>
                 <Table.HeaderCell>Number of Students</Table.HeaderCell>
               </Table.Row>
             </Table.Header>

             <Table.Body>
               {existingClasses.map((ec, idx) => <Table.Row key={idx} onClick = {handleRowClick.bind(this,ec)}>
                 <Table.Cell>
                   <Checkbox
                     name='checkboxGroup'
                     value={ec.class_type_id}
                     checked={checkValue === ec.class_type_id}
                     onChange={handleCheckChange}/>
                 </Table.Cell>
                 <Table.Cell
                   children = {ec.class_type}>
                 </Table.Cell>
                 <Table.Cell
                   children = {ec.num_students}>
                 </Table.Cell>
               </Table.Row>)}
             </Table.Body>

           </Table>
         </Segment>
         <br />
         <Form.Group widths='equal'>
           <Form.Input
             fluid
             label='Class Length (in minutes)'
             name='classLength'
             onChange={handleInputChange}
             value={classLength}
           />
           <Form.Input
             fluid
             label='Price of Class ($)'
             name='price'
             onChange={handleInputChange}
             value={price}
           />
         </Form.Group>
         <Button
           type='submit'
           primary
           size='small'
           onClick={onClassPriceSubmit}
         >
           Update Class Prices
         </Button>
         <br />
         <br />
         <Segment basic attached>
           <Table celled>
             <Table.Header>
               <Table.Row>
                 <Table.HeaderCell />
                 <Table.HeaderCell>Class Length (minutes)</Table.HeaderCell>
                 <Table.HeaderCell>Price ($)</Table.HeaderCell>
               </Table.Row>
             </Table.Header>

             <Table.Body>
               {existingPrices.map((ep, idx) => <Table.Row key={idx} onClick = {handleRowClick.bind(this,ep)}>
                 <Table.Cell>
                   <Checkbox
                     name='checkboxGroup'
                     value={ep.class_price_id}
                     checked={checkValue === ep.class_price_id}
                     onChange={handleCheckChange}/>
                 </Table.Cell>
                 <Table.Cell
                   children = {ep.class_length}>
                 </Table.Cell>
                 <Table.Cell
                   children = {ep.class_price}>
                 </Table.Cell>
               </Table.Row>)}
             </Table.Body>

           </Table>
         </Segment>
         <br />
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
