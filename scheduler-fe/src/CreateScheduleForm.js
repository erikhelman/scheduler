import React from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Button, Form, Header, Message, Segment, Container, Rail, Popup, Icon } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const gender = [
  { key : 'm', text: 'Male', value: 'm' },
  { key : 'f', text: 'Female', value: 'f' }
];

const classType = [
  { key: 'group', text: 'Group', value: 'group'},
  { key: 'semi', text: 'Semi-Private', value: 'semi' },
  { key: 'private', text: 'Private', value: 'private' }
]

const classLength = [
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

const daysOfTheWeek = [
  { key: 'monday', text: 'Monday', value: 'monday' },
  { key: 'tuesday', text: 'Tuesday', value: 'tuesday' },
  { key: 'wednesday', text: 'Wednesday', value: 'wednesday' },
  { key: 'thursday', text: 'Thursday', value: 'thursday' },
  { key: 'friday', text: 'Friday', value: 'friday' },
  { key: 'saturday', text: 'Saturday', value: 'saturday' },
  { key: 'sunday', text: 'Sunday', value: 'sunday' }
]

const CreateScheduleForm = ({
  onSubmit,
  onInputChange,
  onStudentChange,
  errors,
  email,
  password,
  confirmPassword,
  fname,
  lname,
  phone,
  addStudent,
  removeStudent,
  students,
  onGenderChange,
  onDateChange,
  onClassTypeChange,
  onClassLengthChange,
  onLevelChange,
  onDayChange,
  onStartTimeChange0,
  onStartTimeChange1,
  onStartTimeChange2,
  onEndTimeChange0,
  onEndTimeChange1,
  onEndTimeChange2,
  timeconfig,
  loading,
  disabled
}) => (
  <Container>

    <Form>

      <Rail  position='left'>
        <Segment>
          <Button fluid
            content='Add New Student'
            icon='user plus'
            labelPosition='left'
            color='blue'
            onClick={addStudent}
          />

        </Segment>
      </Rail>
      <Header block as='h2' attached='top' color='blue' >
        Registration
      </Header>
      <Segment attached>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='First Name'
            value={fname}
            name='fname'
            onChange={onInputChange}
            error={errors.fname}
          />
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Last Name'
            value={lname}
            name='lname'
            onChange={onInputChange}
            error={errors.lname}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            icon='mail outline'
            iconPosition='left'
            placeholder='Email Address'
            type='email'
            value={email}
            name='email'
            onChange={onInputChange}
            error={errors.email}
          />
          <Form.Input
            fluid
            icon='phone'
            iconPosition='left'
            placeholder="Phone Number"
            name="phone"
            onChange={onInputChange}
            error={errors.phone}
            value={phone}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={password}
            name='password'
            onChange={onInputChange}
            error={errors.password}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
            value={confirmPassword}
            name='confirmPassword'
            onChange={onInputChange}
            error={errors.confirmPassword}
          />
        </Form.Group>
        {students.map((student, idx) => (
          <div key={idx} style={{ paddingBottom: '10px' }} >
            <Header block as='h3' attached='top' color='blue' >
              Student Information
              <Popup
                trigger={<Icon
                  name='user delete'
                  style={{float:'right'}}
                  color='blue'
                  onClick={removeStudent(idx)}
                         />}
                content='Remove Student'
              />

            </Header>
            <Segment raised attached>

              <Form.Group>
                <Form.Input
                  fluid
                  label='First Name'
                  placeholder='First Name'
                  name='fname'
                  onChange={onStudentChange(idx)}
                  value={student.fname}
                  width={5}
                />
                <Form.Input
                  fluid
                  label='Last Name'
                  placeholder='Last Name'
                  name='lname'
                  onChange={onStudentChange(idx)}
                  value={student.lname}
                  width={5}
                />
                <Form.Select
                  fluid
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
                control={Datepicker}
                placeholderText='Date of Birth'
                name='dob'
                onChange={onDateChange(idx)}
                selected={student.dob}
              />

              <Form.Group>
                <Form.Select
                  fluid
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
                  label='Level'
                  placeholder='Level'
                  name='level'
                  onChange={onLevelChange(idx)}
                  options={levels}
                  value={student.level}
                  width={2}
                />
              </Form.Group>

              <Form.Input
                fluid
                label='If this student has previously taken swimming lessons, please indicate where'
                name='previous_school'
                onChange={onStudentChange(idx)}
                value={student.previous_school}
              />

              <p><b>Please enter up to three windows of time where you would like your class to be</b></p>

              <Form.Group>

                <Form.Field
                  fluid
                  label='Start Of Window'
                  control={Datetime}
                  name='startTime0'
                  onChange={onStartTimeChange0(idx)}
                  dateFormat={false}

                  width={5}
                  value={student.startTime0}
                />


                <Form.Field
                  fluid
                  label='End Of Window'
                  control={Datetime}
                  name='endTime0'
                  onChange={onEndTimeChange0(idx)}
                  dateFormat={false}
                  timeConstraints={timeconfig}
                  width={5}
                  value={student.endTime0}

                />

                <Form.Select
                  fluid
                  label='Day of the Week'
                  name='day0'
                  onChange={onDayChange(idx)}
                  options={daysOfTheWeek}
                  value={student.day0}
                  width={2}
                />

              </Form.Group>

              <Form.Group>

                <Form.Field
                  label='Start Of Window'
                  control={Datetime}
                  name='startTime1'
                  onChange={onStartTimeChange1(idx)}
                  dateFormat={false}
                  timeConstraints={timeconfig}
                  width={5}
                  value={student.startTime1}
                />

                <Form.Field
                  label='End Of Window'
                  control={Datetime}
                  name='endTime1'
                  onChange={onEndTimeChange1(idx)}
                  dateFormat={false}
                  timeConstraints={timeconfig}
                  width={5}
                  value={student.endTime1}
                />

                <Form.Select
                  fluid
                  label='Day of the Week'
                  name='day1'
                  onChange={onDayChange(idx)}
                  options={daysOfTheWeek}
                  value={student.day1}
                  width={2}
                />

              </Form.Group>

              <Form.Group>

                <Form.Field
                  label='Start Of Window'
                  control={Datetime}
                  name='startTime2'
                  onChange={onStartTimeChange2(idx)}
                  dateFormat={false}
                  timeConstraints={timeconfig}
                  width={5}
                  value={student.startTime2}
                />

                <Form.Field
                  label='End of Window'
                  control={Datetime}
                  name='endTime2'
                  onChange={onEndTimeChange2(idx)}
                  dateFormat={false}
                  timeConstraints={timeconfig}
                  width={5}
                  value={student.endTime2}
                />

                <Form.Select
                  fluid
                  label='Day of the Week'
                  name='day2'
                  onChange={onDayChange(idx)}
                  options={daysOfTheWeek}
                  value={student.day2}
                  width={2}
                />

              </Form.Group>

            </Segment>
          </div>

        ))}
        {errors.summary && <Message style={{textAlign: 'center', color: 'red'}} className="error-message">{errors.summary}</Message>}
        <Button
          disabled = {disabled}
          loading={loading}
          color='blue'
          fluid size='large'
          type='submit'
          onClick={onSubmit}
        >Create
        </Button>

        <br />
        <p style={{textAlign: 'center'}}>Already have an account? <Link to={'/'}>Log in</Link></p>
      </Segment>

    </Form>
  </Container>

)

export default CreateScheduleForm;
