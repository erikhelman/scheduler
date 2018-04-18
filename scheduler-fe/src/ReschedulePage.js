import React from 'react';
import axios from 'axios';
import RescheduleForm from './RescheduleForm';
import moment from 'moment';


class ReschedulePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: sessionStorage.getItem("token"),
      message: {},
      classes: [],
      names: '',
      sessionStartDate: null,
      sessionEndDate: null,
      notice: 0,
      studentId: '',
      selectedClass: '',
      students: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRescheduleDateChange = this.handleRescheduleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.reset_fields = this.reset_fields.bind(this);
  };

  componentDidMount () {

    var token = this.state.token;

    axios.post('/get_reschedule', {

      token: token

    })

    .then(response => {
        console.log(response.data.students)
        console.log(response.data.session_start_date)
        console.log(response.data.session_end_date)
        console.log(response.data.session_id)
        let names = [];
        response.data.students.forEach(function(s) {
          names.push(
            {key: s.student_id,
            text: s.student_name,
            value: s.student_id
          })
        })

        this.setState({ names: names});
        this.setState({ students: response.data.students});

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleRescheduleDateChange(date) {
      this.setState({ rescheduleDate: date });
  }

  handleSelectChange = (event, data) => {
    this.setState( {[data.name]: data.value });

    if (data.name === 'studentId') {

      let student = this.state.students.filter((s) => s.student_id === data.value);
      console.log(student)
      let classes = student[0].classes.map(function (c, idx) {

        return {
          key: idx,
          text: moment(c).format('dddd, MMM Do YYYY'),
          value: idx
        }

      })

      this.setState({ classes: classes })
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
    }

  validateForm = () => {

    let isFormValid = true;

    this.setState({message: {}});

    if (this.state.name === '') {
      isFormValid = false;
      this.setState({message: {summary: "Please enter the student's name."}});

    }

    if (this.state.rescheduleDate == null) {
      this.setState({message: {summary: "Please select a class to reschedule."}});
      isFormValid = false
    }

    return isFormValid;
  }

  reset_fields() {

        this.setState({rescheduleDate: null});
        this.setState({name: ''});

  }
  handleSubmit(event) {

    event.preventDefault();

    if (this.validateForm()) {

      var rescheduleDate = this.state.rescheduleDate != null ? this.state.rescheduleDate : null;
      var email = this.state.email.trim();
      var time = moment()

      axios.post('/reschedule', {

        rescheduleDate: rescheduleDate,
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
            names={this.state.names}
            email={this.state.email}
            notice={this.state.notice}
            studentId={this.state.studentId}
            classes={this.state.classes}
            selectedClass={this.state.selectedClass}
            onSelectChange={this.handleSelectChange}
          />
        </div>
    );
  }
}

export default ReschedulePage;
