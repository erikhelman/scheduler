import React from 'react';
import Datepicker from 'react-datepicker';
import { Form, Segment, Container, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const genders = [
  { key : 'm', text: 'Male', value: 'm' },
  { key : 'f', text: 'Female', value: 'f' }
];

const classType = [
  { key: 'group', text: 'Group', value: 'group'},
  { key: 'semi', text: 'Semi-Private', value: 'semi' },
  { key: 'private', text: 'Private', value: 'private' },
  { key: 'dev', text: 'Development', value: 'dev' },
]

const classLength = [
  { key: 30, text: '30 minutes', value: 30 },
  { key: 45, text: '45 minutes', value: 45 },
  { key: 60, text: '1 hour', value: 60 }
]

const levels = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
  { key: 6, text: '6', value: 6 },
  { key: 7, text: '7', value: 7 },
  { key: 8, text: '8', value: 8 },
  { key: 9, text: '9', value: 9 },
  { key: 10, text: '10', value: 10 },
  { key: 11, text: '11', value: 11 },
  { key: 12, text: '12', value: 12 }
]

const AdminStudentForm = ({
  onInputChange,
  onGenderChange,
  onClassTypeChange,
  onClassLengthChange,
  onLevelChange,
  onDateChange,
  onSubmit,
  errors,
  fname,
  lname,
  dob,
  gender,
  emerg_contact,
  emerg_phone,
  class_type,
  class_length,
  level
 }) => (

     <Form>
       <Container>
         <Header
           block
           as='h2'
           attached='top'
           color='blue'
           content='Student Information'
         />
         <Segment basic attached>
           <Form.Group >
             <Form.Input
               fluid
               label='First Name'
               placeholder='First Name'
               name='fname'
               onChange={onInputChange}
               //error={student.errors.fname}
               value={fname}
               width={5}
             />
             <Form.Input
               fluid
               label='Last Name'
               placeholder='Last Name'
               name='lname'
               onChange={onInputChange}
               //error={student.errors.fname}
               value={lname}
               width={5}
             />
             <Form.Select
               fluid
               label='Gender'
               placeholder='Gender'
               name='gender'
               onChange={onGenderChange}
               options={genders}
               value={gender}
               width={2}
             />
           </Form.Group>
           <br />
           <Form.Field
             label='Date of Birth'
             control={Datepicker}
             placeholderText='Date of Birth'
             name='dob'
             onChange={onDateChange}
             selected={dob}
           />
           <Form.Group>
             <Form.Select
               fluid
               label='Class Type'
               placeholder='Class Type'
               name='class_type'
               onChange={onClassTypeChange}
               options={classType}
               value={class_type}
               width={5}
             />

             <Form.Select
               fluid
               label='Class Length'
               placeholder='Class Length'
               name='class_length'
               onChange={onClassLengthChange}
               options={classLength}
               value={class_length}
               width={5}
             />

             <Form.Select
               fluid
               label='Level'
               placeholder='Level'
               name='level'
               onChange={onLevelChange}
               options={levels}
               value={level}
               width={2}
             />
           </Form.Group>
           <Form.Input
             fluid
             label='Emergency Contact'
             placeholder='Emergency Contact'
             name='emerg_contact'
             onChange={onInputChange}
             value={emerg_contact}
             width={5}
           />

           <Form.Input
             fluid
             label='Emergency Contact Number'
             placeholder='Emergency Contact Number'
             name="emerg_phone"
             onChange={onInputChange}
             value={emerg_phone}
             width={5}
             //error={student.errors.emerg_phone}
           />


           <Form.Button
             content = 'Submit Changes'
             color='blue'
             onClick={onSubmit}
           />
         </Segment>
       </Container>

</Form>

)


export default AdminStudentForm;
