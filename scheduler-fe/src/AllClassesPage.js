import React from 'react';
import axios from 'axios';
import AllClassesForm from './AllClassesForm';
import moment from 'moment';


class AllClassesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
      token: sessionStorage.getItem("token"),
      loggedIn: '',
      doRedirect: false,
      sessions: [],
      selectedSession: '',
      timeconfig: {
        minutes : {
          step: 15
        },
      },
      students: [],
      studentId: '',
      classes: [],
      timeRange: [],
      names: [],
      day: '',
      startTime: null,
      endTime: null,
      displayClasses: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  };

  clearFields = () => {

    this.setState({ selectedSession: '' });
    this.setState({ studentId: '' });
    this.setState({ day: '' });
    this.setState({ displayClasses: this.state.classes })
  }

  componentDidMount () {

    let token = this.state.token;
    let self = this;
    axios.post('/all_classes', {
          token: token
    })
    .then(response => {

      self.setState({ classes: response.data.classes });
      self.setState({ displayClasses: response.data.classes });

      let names = response.data.students.map(student => {

        const fullName = student.fname + ' ' + student.lname;
        return ({key: student.student_id,
                text: fullName,
                value: student.student_id})
        }
      );

      let sessions = response.data.sessions.map(session => {

        let sessionName;

        if (session.current_session) {
          sessionName = 'Current'
        } else if (session.next_session) {
          sessionName = 'Next'
        }
        //= moment(session.s_start_date).format('M/D/YY') + '-' + moment(session.s_end_date).format('M/D/YY');
        return ({ key: session.session_id,
                  text: sessionName,
                value: session.session_id})
      })

      self.setState({ names: names});
      self.setState({ sessions: sessions});


    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleInputChange = (idx) => (event) => {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSelectChange = (event, data) => {
    this.setState( {[data.name]: data.value });

    let student;
    let session;
    let day;
    let filter;
    let self = this;

    if (data.name === 'studentId') {
      student = data.value;
      session = self.state.selectedSession;
      day = self.state.day;
    }

    if (data.name === 'selectedSession') {
      student = self.state.studentId;
      session = data.value;
      day = self.state.day;
    }

    if (data.name === 'day') {
      student = self.state.studentId;
      session = self.state.selectedSession;
      day = data.value;
    }

    if (student !== '' || session !== '') {

      filter = this.state.classes.filter(function(d) {

        if (student !== '' && session === '') {

          return d.student_id === student

        }
        else if (student === '' && session !== '') {

          return d.session_id === session
        }
        else {


          return d.session_id === session &&
                 d.student_id === student
        }

      })
    }

  this.setState({ displayClasses: filter });

  }

  handleStartTimeChange = (data) => {
    this.setState({ startTime: data });
  }

  handleEndTimeChange = (data) => {
    this.setState({ endTime: data });
  }


  render() {

      return (

        <div>
          <AllClassesForm
            handleRowClick={this.handleRowClick}
            handleInputChange={this.handleInputChange}
            sessions={this.state.sessions}
            onSelectChange={this.handleSelectChange}
            timeconfig={this.state.timeconfig}
            onStartTimeChange={this.handleStartTimeChange}
            onEndTimeChange={this.handleEndTimeChange}
            fullName={this.state.fullName}
            students={this.state.students}
            day={this.state.day}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            names={this.state.names}
            studentId={this.state.studentId}
            selectedSession={this.state.selectedSession}
            displayClasses={this.state.displayClasses}
            clearFields={this.clearFields}
          />
        </div>
    );
  }
}

export default AllClassesPage;
