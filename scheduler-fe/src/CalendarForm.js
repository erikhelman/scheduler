import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Form, Button, Table, Segment, Container, Label, Input } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
require('react-big-calendar/lib/css/react-big-calendar.css');


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const CalendarForm = ({
  myEventsList,
  handleStartDateChange,
  handleEndDateChange,
  handleInputChange,
  onSelectEvent,
  onButtonClick,
  start,
  end,
  level,
  students,
  instructor,
  lane,
  age
}) => (
  <div>
    <Segment raised>
      <BigCalendar
        selectable
        onSelectEvent={onSelectEvent}
        onSelectSlot={slotInfo =>
          alert(
        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}` +
          `\naction: ${slotInfo.action}`
          )}
        events={myEventsList}
      />
    </Segment>
    <Form>
      <Segment raised>
        <Label>
          Students
        </Label>
        <Input
          name='students'
          value={students}
          onChange={handleInputChange}
        />
        <Label>
          Instructor
        </Label>
        <Input
          name='instructor'
          value={instructor}
          onChange={handleInputChange}
        />
        <Label>
          Lane
        </Label>
        <Input
          name='lane'
          value={lane}
          onChange={handleInputChange}
        />
        <Label>
          Level
        </Label>
        <Input
          name='level'
          value={level}
          onChange={handleInputChange}
        />
        <Label>
          Age
        </Label>
        <Input
          name='age'
          value={age}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <Label>
          Start Date
        </Label>
        <Datepicker
          placeholderText='Start'
          name='start'
          onChange={handleStartDateChange}
          selected={start}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
        />
        <br />
        <Label>
          End Date
        </Label>
        <Datepicker
          placeholderText='End'
          name='end'
          onChange={handleEndDateChange}
          selected={end}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
        />

      </Segment>
      <Button
        type='submit'
        primary
        size='small'
        onClick={onButtonClick}>
        Add
      </Button>
    </Form>
  </div>
    );

export default CalendarForm;
