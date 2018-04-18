import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CreateScheduleForm from './CreateScheduleForm';

class CreateSchedulePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: sessionStorage.getItem("token"),
      errors: {},
      timeconfig: {
        minutes : {
          step: 15
        }
      },
      minAge: '',
      maxAge: '',
      minLevel: '',
      maxLevel: '',
      selectedClassType: '',
      selectedClassLength: '',
      selectedDay: '',
      startTime: '',
      locations: [],
      schedules: [],
      sessions: [],
      lanes: [],
      newLocation: '',
      newSchedule: '',
      selectedLocation: '',
      scheduleLocation: '',
      selectedSchedule: '',
      selectedSession: '',
      selectedLane: '',
      newLocationLanes: '',
      classTypes: [],
      classLengths: [],
      checked: false,
      selectedQueryLocation: '',
      selectedQuerySchedule: '',
      querySchedules: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.querySubmit = this.querySubmit.bind(this);

  }

  clearFields = () => {
    this.setState({ selectedClassType: ''});
    this.setState({ selectedClassLength: ''});
    this.setState({ selectedDay: ''});
    this.setState({ startTime: ''});
    this.setState({ minLevel: ''});
    this.setState({ maxLevel: ''});
    this.setState({ minAge: ''});
    this.setState({ maxAge: ''});
    this.setState({ selectedLane: ''});
    this.setState({ checked: false});
  }

  componentDidMount = () => {
    axios.post('/get_schedule_def', {
      //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
      token: this.state.token

    })
    .then(response => {

      this.setState ({ locations: response.data.locations });
      this.setState ({ classTypes: response.data.class_types });
      this.setState ({ classLengths: response.data.class_lengths });

    })
    .catch(function (error) {
      if (error.response) {
          console.log("response " + error.response);
      } else if (error.request) {
          console.log("Request" + error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log("config " + error.config);
      //this.setState({errors: {summary: error}});
    });
  }

  createSchedule = () => {
    axios.post('/create_schedule', {
      //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
      token: this.state.token,
      scheduleName: this.state.newSchedule,
      scheduleLocation: this.state.scheduleLocation

    })
    .then(response => {

      if (response.data.scheduleUpdate === true) {
        this.setState({ newSchedule: '' });
        this.setState({ scheduleLocation: '' });
        this.setState({ locations: response.data.locations })
      } else {
        this.setState({errors: {summary: response.data.errors}});
      }
    })
    .catch(function (error) {
      if (error.response) {
          console.log("response " + error.response);
      } else if (error.request) {
          console.log("Request" + error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log("config " + error.config);
      //this.setState({errors: {summary: error}});
    });
  }

  createLocation = () => {
    axios.post('/create_location', {
      //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
      token: this.state.token,
      locationName: this.state.newLocation,
      locationLanes: this.state.newLocationLanes

    })
    .then(response => {

      if (response.data.locationUpdate === true) {
        console.log(response.data)
        this.setState({ newLocation: '' });
        this.setState({ newLocationLanes: ''});
        this.setState({ locations: response.data.locations });
      } else {
        this.setState({errors: {summary: response.data.errors}});
      }
    })
    .catch(function (error) {
      if (error.response) {
          console.log("response " + error.response);
      } else if (error.request) {
          console.log("Request" + error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log("config " + error.config);
      //this.setState({errors: {summary: error}});
    });
  }

  handleCheckChange = (e) => {
    this.setState({ checked: !this.state.checked});

  }

  validateForm = () => {

    let isFormValid = true;
    var error = {};

    this.setState({errors: {}});

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();

    let token = this.state.token;
    let schedule = this.state.selectedSchedule;
    let location = this.state.selectedLocation;
    let day = this.state.selectedDay;
    let classType = this.state.selectedClassType;
    let classLength = this.state.selectedClassLength;
    let startTime = this.state.startTime;
    let minLevel = this.state.minLevel;
    let maxLevel = this.state.maxLevel;
    let minAge = this.state.minAge;
    let maxAge = this.state.maxAge;
    let lane = this.state.selectedLane;
    let split = this.state.checked;

    if (this.validateForm()) {

      axios.post('/add_schedule_def', {
        //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
        token: token,
        schedule: schedule,
        day: day,
        classType: classType,
        classLength: classLength,
        startTime: startTime,
        minLevel: minLevel,
        maxLevel: maxLevel,
        minAge: minAge,
        maxAge: maxAge,
        lane: lane,
        split: split
      })
      .then(response => {

        if (response.data.scheduleUpdated === "true") {
          this.clearFields()
        } else {
          this.setState({errors: {summary: response.data.errors}});
        }
      })
      .catch(function (error) {
        if (error.response) {
            console.log("response " + error.response);
        } else if (error.request) {
            console.log("Request" + error.request);
        } else {
            console.log('Error', error.message);
        }

        //this.setState({errors: {summary: error}});
      });
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSelectChange = (event, data) => {
    this.setState( {[data.name]: data.value });

    if (data.name === 'selectedLocation') {

      let lanes = [];

      let location = this.state.locations.filter(l => l.key === data.value);
      let i;

      let schedules = location[0].schedules.map(s => {

        return ({key: s.schedule_id,
                text: s.schedule_name,
                value: s.schedule_id})
        }
      );

      for (i = 1; i <= location[0].lanes; i++) {
        lanes.push(
          {key: i,
          text: i,
          value: i
          }

        )
      }

      this.setState({ schedules: schedules });
      this.setState({ selectedLane: '' })
      this.setState({ lanes: lanes })
    }

    if (data.name === 'selectedQueryLocation') {

      let location = this.state.locations.filter(l => l.key === data.value);
      let i;

      let querySchedules = location[0].schedules.map(s => {

        return ({key: s.schedule_id,
                text: s.schedule_name,
                value: s.schedule_id})
        }
      );

      this.setState({ querySchedules: querySchedules });

    }
  }

  handleStartTimeChange = (data) => {
      this.setState({ startTime: data });
  }

  querySubmit(event) {

    event.preventDefault();

    let token = this.state.token;
    let schedule = this.state.selectedQuerySchedule;
    let location = this.state.selectedQueryLocation;

    axios.post('/query_schedule', {
        //  axios.post('https://glacial-sierra-90432.herokuapp.com/register', {
        token: token,
        schedule: schedule,
        location: location,

      })
      .then(response => {
        console.log(response.data)
        this.setState({ querySchedule: response.data.querySchedule });

      })
      .catch(function (error) {
        if (error.response) {
            console.log("response " + error.response);
        } else if (error.request) {
            console.log("Request" + error.request);
        } else {
            console.log('Error', error.message);
        }

      });

  }

  render() {
    if (this.state.success){
      return <Redirect to={{
        pathname: '/success',
      }}/>;
    }
    return (
      <CreateScheduleForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        onSelectChange={this.handleSelectChange}
        errors={this.state.errors}
        onStartTimeChange={this.handleStartTimeChange}
        timeconfig={this.state.timeconfig}
        schedules={this.state.schedules}
        scheduleId={this.state.scheduleId}
        selectedDay={this.state.selectedDay}
        selectedClassLength={this.state.selectedClassLength}
        selectedClassType={this.state.selectedClassType}
        minLevel={this.state.minLevel}
        maxLevel={this.state.maxLevel}
        minAge={this.state.minAge}
        maxAge={this.state.maxAge}
        startTime={this.state.startTime}
        locations={this.state.locations}
        sessions={this.state.sessions}
        newLocation={this.state.newLocation}
        newSchedule={this.state.newSchedule}
        createLocation={this.createLocation}
        createSchedule={this.createSchedule}
        selectedLocation={this.state.selectedLocation}
        scheduleLocation={this.state.scheduleLocation}
        selectedSchedule={this.state.selectedSchedule}
        selectedLane={this.state.selectedLane}
        lanes={this.state.lanes}
        newLocationLanes={this.state.newLocationLanes}
        checked={this.state.checked}
        handleCheckChange={this.handleCheckChange}
        clearFields={this.clearFields}
        classTypes={this.state.classTypes}
        classLengths={this.state.classLengths}
        querySchedules={this.state.querySchedules}
        selectedQueryLocation={this.state.selectedQueryLocation}
        selectedQuerySchedule={this.state.selectedQuerySchedule}
        querySubmit={this.querySubmit}
      />
    );
  }
}

export default CreateSchedulePage;
