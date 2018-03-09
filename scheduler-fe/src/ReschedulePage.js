import React from 'react';
import axios from 'axios';
import RescheduleForm from './RescheduleForm';
import moment from 'moment';


class ReschedulePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
      rescheduleDate: null,
      fname: '',
      lname: '',
      startDate: null,
      endDate: null,
      email: '',
      notice: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRescheduleDateChange = this.handleRescheduleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.reset_fields = this.reset_fields.bind(this);
  };

  componentDidMount () {
    axios.get('/get_config')

    .then(response => {

        this.setState({startDate: response.data.start_date});
        this.setState({endDate: response.data.end_date});
        this.setState({notice: response.data.notice});

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleRescheduleDateChange(date) {
      this.setState({ rescheduleDate: date });

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
    }

  validateForm = () => {

    let isFormValid = true;

    this.setState({message: {}});

    if (this.state.fname.trim().length === 0) {
      isFormValid = false;
      this.setState({message: {summary: "Please enter the student's first name."}});

    }

    if (this.state.lname.trim().length === 0) {
      isFormValid = false;
      this.setState({message: {summary: "Please enter the student's last name."}});

    }

    if (this.state.email.trim().length === 0) {
      isFormValid = false;
      this.setState({message: {summary: "Please enter the contact information."}});

    }

    if (this.state.rescheduleDate == null) {
      this.setState({message: {summary: "Invalid date or date format. Please use MM/DD/YYYY and pick a valid date witin the current session."}});
      isFormValid = false
    }

    return isFormValid;
  }

  reset_fields() {

        this.setState({rescheduleDate: null});
        this.setState({fname: ''});
        this.setState({lname: ''});
        this.setState({email: ''})
  }
  handleSubmit(event) {

    event.preventDefault();

    if (this.validateForm()) {
      var fname = this.state.fname.trim();
      var lname = this.state.lname.trim();
      var rescheduleDate = this.state.rescheduleDate != null ? this.state.rescheduleDate : null;
      var email = this.state.email.trim();
      var time = moment()

      axios.post('/reschedule', {

        rescheduleDate: rescheduleDate,
        fname: fname,
        lname: lname,
        email: email,
        time: time

      })
      .then(response => {

        if (response.data.rescheduleUpdate === true) {
          this.setState({message: {summary: 'Your reschedule request for ' + moment(this.state.rescheduleDate).format("dddd, MMMM Do YYYY") + ' has been received. You will be contacted by Champion Swimming with an update soon.'}});
          this.reset_fields()
        } else {
          this.setState({message: {summary: response.data.message }})
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
          <RescheduleForm
            message={this.state.message}
            handleRescheduleDateChange={this.handleRescheduleDateChange}
            handleInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit}
            rescheduleDate={this.state.rescheduleDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            fname={this.state.fname}
            lname={this.state.lname}
            email={this.state.email}
            notice={this.state.notice}
          />
        </div>
    );
  }
}

export default ReschedulePage;
