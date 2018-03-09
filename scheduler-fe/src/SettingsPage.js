import React from 'react';
import axios from 'axios';
import SettingsForm from './SettingsForm';
import moment from 'moment';


class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
      token: sessionStorage.getItem("token"),
      requests: [],
      loggedIn: '',
      selected: '',
      checkValue: 'none',
      doRedirect: false,
      sessionStartDate: null,
      sessionEndDate: null,
      numberAllowed: 0,
      notice: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleCheckChange = (e, { value }) => {
    this.setState({ checkValue: value });
  }

  componentDidMount () {

    var token = this.state.token;
    var self = this;
    axios.post('/all_requests', {
          token: token
    })
    .then(response => {
      self.setState({ requests: response.data.requests });
      self.setState({ sessionStartDate: response.data.start_date !== '' ? moment(response.data.start_date) : null });
      self.setState({ sessionEndDate: response.data.end_date !== '' ? moment(response.data.end_date) : null });
      self.setState({ numberAllowed: response.data.number_allowed });
      self.setState({ notice: response.data.notice });

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

  handleStartDateChange(date) {
      this.setState({ sessionStartDate: date });
  }

  handleEndDateChange(date) {
    this.setState({ sessionEndDate: date });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  validateForm = () => {

    let isFormValid = true;

    this.setState({message: {}});

    if (this.state.sessionStartDate == null) {
      this.setState({message: {summary: "Invalid session start date or date format. Please use MM/DD/YYYY or pick a date from the calendar."}});
      isFormValid = false;
      return isFormValid;
    }

    if (this.state.sessionEndDate == null) {
      this.setState({message: {summary: "Invalid session end date or date format. Please use MM/DD/YYYY or pick a date from the calendar."}});
      isFormValid = false;
      return isFormValid;
    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();

    if (this.validateForm()) {
      var token = this.state.token;
      var startDate = this.state.sessionStartDate != null ? this.state.sessionStartDate : null;
      var endDate = this.state.sessionEndDate != null ? this.state.sessionEndDate : null;
      var numberAllowed = this.state.numberAllowed;
      var notice = this.state.notice;


      //axios.post('/config', {
      axios.post('https://mrrescheduler-be.herokuapp.com/config', {
        token: token,
        startDate: startDate,
        endDate: endDate,
        numberAllowed: numberAllowed,
        notice: notice

      })
      .then(response => {

        if (response.data.configUpdate === true) {
          this.setState({ message: {summary: "Configuration successfully updated"}})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }


  render() {

      return (

        <div>
          <SettingsForm
            handleRowClick={this.handleRowClick}
            message={this.state.message}
            requests={this.state.requests}
            handleCheckChange={this.handleCheckChange}
            checkValue={this.state.checkValue}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            handleInputChange={this.handleInputChange}
            handleEditClick={this.handleEditClick}
            sessionStartDate={this.state.sessionStartDate}
            sessionEndDate={this.state.sessionEndDate}
            numberAllowed={this.state.numberAllowed}
            onSubmit={this.handleSubmit}
            notice={this.state.notice}
          />
        </div>
    );
  }
}

export default SettingsPage;
