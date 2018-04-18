import React from 'react';
import { Grid, Dropdown, Table, Divider, Button, Form, Header, Message, Segment, Container, Rail, Checkbox } from 'semantic-ui-react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

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
  onSelectChange,
  onStartTimeChange,
  timeconfig,
  schedules,
  scheduleId,
  selectedDay,
  selectedClassLength,
  selectedClassType,
  minLevel,
  maxLevel,
  minAge,
  maxAge,
  startTime,
  locations,
  sessions,
  lanes,
  newLocation,
  newSchedule,
  createLocation,
  createSchedule,
  selectedLocation,
  scheduleLocation,
  selectedSchedule,
  selectedSession,
  selectedLane,
  newLocationLanes,
  checked,
  handleCheckChange,
  clearFields,
  classTypes,
  classLengths,
  selectedQueryLocation,
  selectedQuerySchedule,
  querySchedules,
  querySubmit
}) => (
  <Container>

    <Form>

      <Rail position='left'>
        <Segment>
          <Form.Input
            fluid
            label='New Location Name'
            placeholder='Location Name'
            name='newLocation'
            onChange={onInputChange}
            value={newLocation}
          />
          <Form.Input
            fluid
            label='Number of Lanes at This Location'
            placeholder='Lanes'
            name='newLocationLanes'
            onChange={onInputChange}
            value={newLocationLanes}
          />
          <Button fluid
            content='Add New Location'
            icon='home'
            labelPosition='left'
            color='blue'
            onClick={createLocation}
          />
          <Divider />
          <Form.Input
            fluid
            label='New Schedule Name'
            placeholder='Schedule Name'
            name='newSchedule'
            onChange={onInputChange}
            value={newSchedule}
          />

          <Form.Select
            fluid
            label='For Which Location?'
            placeholder='Locations'
            name='scheduleLocation'
            onChange={onSelectChange}
            options={locations}
            value={scheduleLocation}
          />

          <Button fluid
            content='Add New Schedule'
            icon='table'
            labelPosition='left'
            color='blue'
            onClick={createSchedule}
          />
        </Segment>
      </Rail>
      <Header block as='h2' attached='top' color='blue' >
        Create Schedule
      </Header>
      <Segment attached>
        <Form.Group widths='equal'>

          <Form.Select
            fluid
            label='Location'
            placeholder='Locations'
            name='selectedLocation'
            onChange={onSelectChange}
            options={locations}
            value={selectedLocation}
          />

          <Form.Select
            fluid
            label='Schedule'
            placeholder='Schedules'
            name='selectedSchedule'
            onChange={onSelectChange}
            options={schedules}
            value={selectedSchedule}
          />

        </Form.Group>

        <Divider />

        <Form.Group widths='equal'>
          <Form.Select
            fluid
            label='Day of the Week'
            name='selectedDay'
            onChange={onSelectChange}
            options={daysOfTheWeek}
            value={selectedDay}
          />

          <Form.Select
            fluid
            label='Class Type'
            placeholder='Class Type'
            name='selectedClassType'
            onChange={onSelectChange}
            options={classTypes}
            value={selectedClassType}
          />

          <Form.Select
            fluid
            label='Class Length'
            placeholder='Class Length'
            name='selectedClassLength'
            onChange={onSelectChange}
            options={classLengths}
            value={selectedClassLength}
          />

          <Form.Field
            fluid
            label='Start Time'
            control={Datetime}
            name='startTime'
            onChange={onStartTimeChange}
            dateFormat={false}
            value={startTime}
          />
        </Form.Group>
        <Form.Group widths='equal'>

          <Form.Input
            fluid
            label='Min Level'
            placeholder='Min Level'
            name='minLevel'
            onChange={onInputChange}
            value={minLevel}
          />

          <Form.Input
            fluid
            label='Max Level'
            placeholder='Max Level'
            name='maxLevel'
            onChange={onInputChange}
            value={maxLevel}
          />

          <Form.Input
            fluid
            label='Min Age'
            placeholder='Min Student Age'
            name='minAge'
            onChange={onInputChange}
            value={minAge}
          />

          <Form.Input
            fluid
            label='Max Age'
            placeholder='Max Age'
            name='maxAge'
            onChange={onInputChange}
            value={maxAge}
          />
        </Form.Group>
        <Form.Group>
          <Form.Select
            label='Lane'
            placeholder='Lane'
            name='selectedLane'
            onChange={onSelectChange}
            options={lanes}
            value={selectedLane}
          />
          <Checkbox
            style={{ marginLeft: '1em', paddingTop: '2em'}}
            name='splitLane'
            label='Split This Lane?'
            checked={checked}
            onChange={handleCheckChange}
          />

        </Form.Group>


        {errors.summary && <Message style={{textAlign: 'center', color: 'red'}} className="error-message">{errors.summary}</Message>}
        <Button
          color='blue'
          size='small'
          onClick={onSubmit}
        >Add
        </Button>
        <Button
          color='blue'
          size='small'
          onClick={clearFields}
        >Clear Fields
        </Button>

      </Segment>

    </Form>
    <Header block as='h2' attached='top' color='blue' >
      View Schedules
    </Header>
    <Segment attached>
      <Form>
        <Form.Group widths='equal'>
          <Form.Select
            fluid
            label='Location'
            placeholder='Select Location'
            name='selectedQueryLocation'
            onChange={onSelectChange}
            options={locations}
            value={selectedQueryLocation}
          />

          <Form.Select
            fluid
            label='Schedule'
            placeholder='Select Schedule'
            name='selectedQuerySchedule'
            onChange={onSelectChange}
            options={querySchedules}
            value={selectedQuerySchedule}
          />
        </Form.Group>
        <Button
          color='blue'
          size='small'
          onClick={querySubmit}
        >Get Schedule
        </Button>
      </Form>

      <Table celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan='2' textAlign='center'>
              Lane 1
            </Table.HeaderCell>
            <Table.HeaderCell colSpan='2' textAlign='center'>
              Lane 2
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              A
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              B
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              A
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              B
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>8:00</Table.Cell>
            <Table.Cell rowSpan='3'>8:00 - 8:45</Table.Cell>
            <Table.Cell rowSpan='4'>8:00 - 9:00</Table.Cell>
            <Table.Cell rowSpan='4'>8:00 - 9:00</Table.Cell>
            <Table.Cell rowSpan='4'>8:00 - 9:00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>Open</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>9:00</Table.Cell>
            <Table.Cell rowSpan='4'>9:00 - 10:00</Table.Cell>
            <Table.Cell rowSpan='3'>9:00 - 9:45</Table.Cell>
            <Table.Cell rowSpan='3'>9:00 - 9:45</Table.Cell>
            <Table.Cell rowSpan='4'>9:00 - 10:00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell rowSpan='3'>9:45 - 10:30</Table.Cell>
            <Table.Cell rowSpan='3'>9:45 - 10:30</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>10:00</Table.Cell>
            <Table.Cell rowSpan='4'>10:00 - 11:00</Table.Cell>
            <Table.Cell rowSpan='4'>Open</Table.Cell>
          </Table.Row><Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell rowSpan='2'>Open</Table.Cell>
            <Table.Cell rowSpan='2'>Open</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>11:00</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>



        </Table.Body>
      </Table>
    </Segment>
  </Container>

)

export default CreateScheduleForm;
