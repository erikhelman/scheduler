import React from 'react';
import axios from 'axios';
import ScheduleStudentForm from './ScheduleStudentForm';
import moment from 'moment';


class ScheduleStudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
      token: sessionStorage.getItem("token"),
      loggedIn: '',
      doRedirect: false,
      currentStartDate: null,
      currentEndDate: null,
      nextStartDate: null,
      nextEndDate: null,
      timeconfig: {
        minutes : {
          step: 15
        },
      },
      students: [],
      names: [],
      sessions: [],
      modalOpen: false,
      price: '',
      confirmResult: '',
      studentId: '',
      selectedSession: '',
      scheduleDates: [],
      confirmContent: '',
      fullName: '',
      classTimes: [{scheduleDay: '',
                  startTime: null,
                  endTime: null}]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  };


  componentDidMount () {

    let token = this.state.token;
    let self = this;
    axios.post('/all_students', {
          token: token
    })
    .then(response => {

      self.setState({ students: response.data.students });

      let names = response.data.students.map(student => {

        const fullName = student.fname + ' ' + student.lname
        return ({key: response.data.students.indexOf(student),
                text: fullName,
                value: response.data.students.indexOf(student)})
        }
      );

      self.setState({ names: names});

    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/get_config', {
          token: token
    })
    .then(response => {
      self.setState({ currentStartDate: response.data.current_start_date !== '' ? moment(response.data.current_start_date) : null });
      self.setState({ currentEndDate: response.data.current_end_date !== '' ? moment(response.data.current_end_date) : null });
      self.setState({ nextStartDate: response.data.next_start_date !== '' ? moment(response.data.next_start_date) : null });
      self.setState({ nextEndDate: response.data.next_end_date !== '' ? moment(response.data.next_end_date) : null });
      self.setState({ sessions: [
        {key: 'current',
        text: 'Current Session (' + moment(response.data.current_start_date).format('MMM Do YYYY') + ' - ' + moment(response.data.current_end_date).format('MMM Do YYYY') + ')',
        value: 'current'},
        {key: 'next',
        text: 'Next Session (' + moment(response.data.next_start_date).format('MMM Do YYYY') + ' - ' + moment(response.data.next_end_date).format('MMM Do YYYY') + ')',
        value: 'next'}
      ]
    });
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleEditClick(event) {

    if (this.state.checkValue !== 'none') {
      this.setState({ doRedirect: true });
    }
  }

  handleAddDates = () => {
    this.setState({
      classTimes: this.state.classTimes.concat([ {scheduleDay: '',
                      startTime: null,
                      endTime: null} ])
      });
  }

  handleRemoveDates = (idx) => () => {
    this.setState({
      classTimes: this.state.classTimes.filter((s, sidx) => idx !== sidx)
    });
  }

  handleInputChange = (idx) => (event) => {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSelectChange = (event, data) => {
    this.setState( {[data.name]: data.value });
  }

  handleDayOfWeekChange = (idx) => (event, data) => {
    const newDates = this.state.classTimes.map((cTime, sidx) => {
      if (idx !== sidx) return cTime;
      return { ...cTime, scheduleDay: data.value };
    });

    this.setState({ classTimes: newDates });
  }

  showModal = () => {

    let self = this;
    if (this.validateForm()) {

      let newDates = [];

      self.state.classTimes.forEach(function(cTime) {
        let scheduleDay = cTime.scheduleDay;
        let startDate;
        let endDate;
        let day = moment();
        let validSessionDate = true;



        // Check which session is selected, set start and end date accordingly
        if (self.state.selectedSession === 'current') {

          startDate = self.state.currentStartDate;
          endDate = self.state.currentEndDate;

        } else if (self.state.selectedSession === 'next') {

           startDate = self.state.nextStartDate;
           endDate = self.state.nextEndDate;

        } else {

          validSessionDate = false;

        }

        // Check if the session has already started
        if (day.isBefore(startDate)) {
          // If the session has not started, set the first lesson day to the start date
          day = moment(startDate);
        }
        // Find the offset to bring the first lesson day to the same as the requested day
        if ((cTime.scheduleDay - day.day()) < 0) {

           // If the offset is negative, add an extra week to stay in the session
           let offset = cTime.scheduleDay - day.day()+7;
            day.add(offset, 'd');
          } else {
           // If the offset is positive, adjust the first lesson date
           day.add(Math.abs(day.day() - cTime.scheduleDay), 'd');
          }

          let classStart = day.clone();
            classStart.hour(cTime.startTime.hour());
            classStart.minute(cTime.startTime.minute());

          let classEnd = day.clone();
            classEnd.hour(cTime.endTime.hour());
            classEnd.minute(cTime.endTime.minute());

      while (classStart.isBefore(endDate) || classStart.isSame(endDate, 'day')) {

          newDates.push([classStart, classEnd]);
          //day = day.clone().add(7, 'd');
          classStart = classStart.clone().add(7, 'd');
          classEnd = classEnd.clone().add(7, 'd');

      }
      //scheduleDates.push(newDates);
    })
    console.log(newDates);
    this.setState({ fullName: this.state.students[this.state.studentId].fname + ' ' + this.state.students[this.state.studentId].lname})
    this.setState({ scheduleDates: newDates });
    this.setState({ modalOpen: true });
    }
  }

  handleConfirm = () => {

    this.handleSubmit()
    this.setState({ modalOpen: false });
  }

  handleCancel = () => this.setState({ modalOpen: false });

  handleStartTimeChange = (idx) => (data) => {
    const newDates = this.state.classTimes.map((cTime, sidx) => {
      if (idx !== sidx) return cTime;
      return { ...cTime, startTime: data };
    });

    this.setState({ classTimes: newDates });
  }

  handleEndTimeChange = (idx) => (data) => {
    const newDates = this.state.classTimes.map((cTime, sidx) => {
      if (idx !== sidx) return cTime;
      return { ...cTime, endTime: data };
    });

    this.setState({ classTimes: newDates });
  }

  validateForm = () => {

    let isFormValid = true;

    this.setState({message: {}});

    if (this.state.studentId === '') {
      this.setState({message: {summary: "Please select a student"}});
      isFormValid = false;
      return isFormValid;
    }

    if (this.state.selectedSession === '') {
      this.setState({message: {summary: "Please select a session"}});
      isFormValid = false;
      return isFormValid;
    }

    var self = this;
    this.state.classTimes.forEach(function(d) {

      if (d.scheduleDay === '') {
        self.setState({message: {summary: "Please select a day of the week"}});
        isFormValid = false;
        return isFormValid;
      }

      if (d.startTime == null || d.startTime == '') {
        self.setState({message: {summary: "Please select a class start time"}});
        isFormValid = false;
        return isFormValid;
      }

      if (d.endTime == null || d.endTime == '') {
        self.setState({message: {summary: "Please select a class end time"}});
        isFormValid = false;
        return isFormValid;
      }
    });

    return isFormValid;
  }

  handleSubmit() {

    var token = this.state.token;
    var scheduleDates = this.state.scheduleDates;
    var selectedSession = this.state.selectedSession;
    var studentId = this.state.students[this.state.studentId].student_id;

    console.log(scheduleDates);
    axios.post('/add_scheduled_classes', {

      token: token,
      scheduleDates: scheduleDates,
      selectedSession: selectedSession,
      studentId: studentId

    })
    .then(response => {

      if (response.data.classesScheduled === true) {
        this.setState({ message: {summary: "Classes successfully scheduled"}})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

      return (

        <div>
          <ScheduleStudentForm
            handleRowClick={this.handleRowClick}
            message={this.state.message}
            requests={this.state.requests}
            handleInputChange={this.handleInputChange}
            sessionStartDate={this.state.sessionStartDate}
            sessionEndDate={this.state.sessionEndDate}
            numberAllowed={this.state.numberAllowed}
            onSubmit={this.handleSubmit}
            notice={this.state.notice}
            sessions={this.state.sessions}
            onSelectChange={this.handleSelectChange}
            names={this.state.names}
            timeconfig={this.state.timeconfig}
            modalOpen={this.state.modalOpen}
            confirmResult={this.state.confirmResult}
            handleConfirm={this.handleConfirm}
            handleCancel={this.handleCancel}
            showModal={this.showModal}
            studentId={this.state.studentId}
            selectedSession={this.state.selectedSession}
            onStartTimeChange={this.handleStartTimeChange}
            onEndTimeChange={this.handleEndTimeChange}
            scheduleDates={this.state.scheduleDates}
            confirmContent={this.state.confirmContent}
            fullName={this.state.fullName}
            students={this.state.students}
            removeDates={this.handleRemoveDates}
            addDates={this.handleAddDates}
            onDayofWeekChange={this.handleDayOfWeekChange}
            classTimes={this.state.classTimes}
            price={this.state.price}
          />
        </div>
    );
  }
}

export default ScheduleStudentPage;
