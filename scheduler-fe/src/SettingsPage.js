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
      loggedIn: '',
      currentStartDate: null,
      currentEndDate: null,
      nextStartDate: null,
      nextEndDate: null,
      notice: '',
      numberAllowed: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCurrentStartDateChange = this.handleCurrentStartDateChange.bind(this);
    this.handleCurrentEndDateChange = this.handleCurrentEndDateChange.bind(this);
    this.handleNextStartDateChange = this.handleNextStartDateChange.bind(this);
    this.handleNextEndDateChange = this.handleNextEndDateChange.bind(this);
  };

  componentDidMount () {

    var token = this.state.token;
    var self = this;
    axios.get('/get_config', {
          token: token
    })
    .then(response => {

      self.setState({ currentStartDate: response.data.current_start_date !== '' ? moment(response.data.current_start_date) : null });
      self.setState({ currentEndDate: response.data.current_end_date !== '' ? moment(response.data.current_end_date) : null });
      self.setState({ nextStartDate: response.data.next_start_date !== '' ? moment(response.data.next_start_date) : null });
      self.setState({ nextEndDate: response.data.next_end_date !== '' ? moment(response.data.next_end_date) : null });
      self.setState({ numberAllowed: response.data.numberAllowed !== null ? response.data.numberAllowed : ''});
      self.setState({ notice: response.data.notice !== null ? response.data.notice : ''});

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleCurrentStartDateChange(date) {
      this.setState({ currentStartDate: date });
  }

  handleCurrentEndDateChange(date) {
    this.setState({ currentEndDate: date });
  }

  handleNextStartDateChange(date) {
      this.setState({ nextStartDate: date });
  }

  handleNextEndDateChange(date) {
    this.setState({ nextEndDate: date });
  }

  handleInputChange(event) {

    this.setState({ [event.target.name] : event.target.value});
  }

  validateForm = () => {

    let isFormValid = true;

    this.setState({message: {}});

    if (this.state.currentStartDate == null) {
      this.setState({message: {summary: "Invalid start date or date format for current session. Please use MM/DD/YYYY or pick a date from the calendar."}});
      isFormValid = false;
      return isFormValid;
    }

    if (this.state.currentEndDate == null) {
      this.setState({message: {summary: "Invalid end date or date format for current session. Please use MM/DD/YYYY or pick a date from the calendar."}});
      isFormValid = false;
      return isFormValid;
    }

    if (this.state.nextStartDate == null) {
      this.setState({message: {summary: "Invalid start date or date format for next session. Please use MM/DD/YYYY or pick a date from the calendar."}});
      isFormValid = false;
      return isFormValid;
    }

    if (this.state.nextEndDate == null) {
      this.setState({message: {summary: "Invalid end date or date format for current session. Please use MM/DD/YYYY or pick a date from the calendar."}});
      isFormValid = false;
      return isFormValid;
    }

    return isFormValid;
  }

  handleSubmit(event) {

    event.preventDefault();

    if (this.validateForm()) {
      var token = this.state.token;
      var currentStartDate = this.state.currentStartDate != null ? this.state.currentStartDate : null;
      var currentEndDate = this.state.currentEndDate != null ? this.state.currentEndDate : null;
      var nextStartDate = this.state.nextStartDate != null ? this.state.nextStartDate : null;
      var nextEndDate = this.state.nextEndDate != null ? this.state.nextEndDate : null;
      var numberAllowed = this.state.numberAllowed;
      var notice = this.state.notice;

      axios.post('/config', {
        token: token,
        currentStartDate: currentStartDate,
        currentEndDate: currentEndDate,
        nextStartDate: nextStartDate,
        nextEndDate: nextEndDate,
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
            checkValue={this.state.checkValue}
            handleCurrentStartDateChange={this.handleCurrentStartDateChange}
            handleCurrentEndDateChange={this.handleCurrentEndDateChange}
            handleNextStartDateChange={this.handleNextStartDateChange}
            handleNextEndDateChange={this.handleNextEndDateChange}
            handleInputChange={this.handleInputChange}
            handleEditClick={this.handleEditClick}
            currentStartDate={this.state.currentStartDate}
            currentEndDate={this.state.currentEndDate}
            nextStartDate={this.state.nextStartDate}
            nextEndDate={this.state.nextEndDate}
            numberAllowed={this.state.numberAllowed}
            onSubmit={this.handleSubmit}
            notice={this.state.notice}
          />
        </div>
    );
  }
}

export default SettingsPage;
