import React from 'react';
import CalendarForm from './CalendarForm';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


class CalendarPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      end: null,
      title: '',
      students: '',
      level: '',
      instructor: '',
      lane: '',
      age: '',
      myEventsList: [
        {
        id: 0,
        title:
        `Lane: 1
Level: 1-2
Age: > 6
Instructor: Jacques Lalanne
Students: Timmy Jimmy Sally`,
        allDay: false,
        start: new Date(2018, 0, 1, 10, 0, 0),
        end: new Date(2018, 0, 1, 11, 0, 0)
      },
      {
      id: 0,
      title:
      `Lane: 3
Level: Development
Age: 10+
Instructor: Aquaman
Students: Skeeter Scooter`,
      allDay: false,
      start: new Date(2018, 0, 1, 10, 0, 0),
      end: new Date(2018, 0, 1, 12, 0, 0)
    },
    {
    id: 0,
    title:
    `Lane: 4
Level: 10-12
Age: 16+
Instructor: A porpoise
Students: Freddy Johnny`,
    allDay: false,
    start: new Date(2018, 0, 1, 10, 0, 0),
    end: new Date(2018, 0, 1, 10, 45, 0)
  },
  {
  id: 0,
  title:
  `Lane: 2
Level: 7-10
Age: 16+
Instructor: Ariel
Students: Freddy Johnny`,
  allDay: false,
  start: new Date(2018, 0, 1, 10, 45, 0),
  end: new Date(2018, 0, 1, 11, 30, 0)
}
    ]
  };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  handleStartDateChange(date) {
    this.setState({ start: date });
  }

  handleEndDateChange(date) {
    this.setState({ end: date });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  onSelectEvent(event) {
    alert(event.title);
  }

  onButtonClick(event, data) {


    var newEvent = {};
    newEvent.title = 'Lane: ' + this.state.lane + ' Level: ' + this.state.level + ' Age: ' + this.state.age + ' Instructor: ' + this.state.instructor + ' Students: ' + this.state.students;
    newEvent.allDay = false;
    newEvent.start = this.state.start.toDate();
    newEvent.end = this.state.end.toDate();
    newEvent.students = this.state.students;
    newEvent.instructor = this.state.instructor;
    newEvent.lane = this.state.lane;
    newEvent.level = this.state.level;

    this.setState({ myEventsList: [...this.state.myEventsList, newEvent]});

  }

  render() {

    return (
      <div>
        <CalendarForm
          myEventsList={this.state.myEventsList}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          handleInputChange={this.handleInputChange}
          start={this.state.start}
          end={this.state.end}
          level={this.state.level}
          students={this.state.students}
          lane={this.state.lane}
          instructor={this.state.instructor}
          onSelectEvent={this.onSelectEvent}
          onButtonClick={this.onButtonClick}
          age={this.state.age}
        />
      </div>
    );
  }
}

export default CalendarPage;
