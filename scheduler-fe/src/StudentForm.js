import React from 'react';
import Datepicker from 'react-datepicker';
import { Form, Segment, Popup, Header, Icon, Container, Button, Rail, Divider } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const gender = [
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


const StudentForm = ({
  onChange,
  onSubmit,
  addStudent,
  removeStudent,
  errors,
  students,
  onGenderChange,
  onDateChange,
  onClassTypeChange,
  onClassLengthChange,
  onLevelChange
 }) => (

  <Form>
    <Container>
      <Rail internal position='left'>
        <Segment>
          {/*<Button fluid
            content='Add New Student'
            icon='user plus'
            labelPosition='left'
            color='blue'
            onClick={addStudent}
            />
            <Divider>
          </Divider>*/}
          <Button fluid
            icon='checkmark box'
            labelPosition='left'
            content = 'Submit All Changes'
            color='blue'
            onClick={onSubmit}
          />
        </Segment>
      </Rail>

      {students.map((student, idx) => (
        <div key={idx} style={{ paddingBottom: '10px' }} >
          <Header block as='h3' attached='top' color='blue' >
            Student Information
            {/*
              <Popup
              trigger={<Icon
                name='user delete'
                style={{float:'right'}}
                color='blue'
                onClick={removeStudent(idx)}
              />}
              content='Remove Student'
              />
            */}

          </Header>
          <Segment basic attached>

            <Form.Group>
              <Form.Input
                fluid
                disabled
                label='First Name'
                placeholder='First Name'
                name='fname'
                onChange={onChange(idx)}
                value={student.fname}
                width={5}
              />
              <Form.Input
                fluid
                disabled
                label='Last Name'
                placeholder='Last Name'
                name='lname'
                onChange={onChange(idx)}
                value={student.lname}
                width={5}
              />
              <Form.Select
                fluid
                disabled
                label='Gender'
                name='gender'
                onChange={onGenderChange(idx)}
                options={gender}
                value={student.gender}
                width={2}
              />

            </Form.Group>

            <Form.Field
              label='Date of Birth'
              disabled
              control={Datepicker}
              placeholderText='Date of Birth'
              name='dob'
              onChange={onDateChange(idx)}
              selected={student.dob}
            />

            <Form.Group>
              <Form.Select
                fluid
                disabled
                label='Class Type'
                placeholder='Class Type'
                name='class_type'
                onChange={onClassTypeChange(idx)}
                options={classType}
                value={student.class_type}
                width={5}
              />

              <Form.Select
                fluid
                disabled
                label='Class Length'
                placeholder='Class Length'
                name='class_length'
                onChange={onClassLengthChange(idx)}
                options={classLength}
                value={student.class_length}
                width={5}
              />

              <Form.Select
                fluid
                disabled
                label='Level'
                placeholder='Level'
                name='level'
                onChange={onLevelChange(idx)}
                options={levels}
                value={student.level}
                width={2}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                fluid
                label='Emergency Contact'
                placeholder='Emergency Contact'
                name='emerg_contact'
                onChange={onChange(idx)}
                value={student.emerg_contact}
                width={5}
              />

              <Form.Input
                fluid
                label='Emergency Contact Number'
                placeholder='Emergency Contact Number'
                name="emerg_phone"
                onChange={onChange(idx)}
                value={student.emerg_phone}
                width={5}
              />
            </Form.Group>
          </Segment>
        </div>

      ))}


    </Container>
    </Form>


)

export default StudentForm;
