import React from 'react';
import axios from 'axios';
import PaymentForm from './PaymentForm';
import moment from 'moment';


class PaymentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
      id: this.props.location.state.id,
      token: sessionStorage.getItem("token"),
      loggedIn: '',
      selectedSession: '',
      sessions: [],
      name: '',
      current_status: '',
      next_status: '',
      current_total: null,
      next_total: null,
      total: null,
      current_classes: [],
      next_classes: [],
      classes: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  };

  componentDidMount () {

    var token = this.state.token;
    var id = this.state.id;
    var self = this;

    axios.post('/get_payment', {
          token: token,
          id: id
    })
    .then(response => {

      self.setState({ sessions: [
        {key: 'current',
        text: 'Current Session (' + moment(response.data.current_start_date).format('MMM Do YYYY') + ' - ' + moment(response.data.current_end_date).format('MMM Do YYYY') + ')',
        value: 'current'},
        {key: 'next',
        text: 'Next Session (' + moment(response.data.next_start_date).format('MMM Do YYYY') + ' - ' + moment(response.data.next_end_date).format('MMM Do YYYY') + ')',
        value: 'next'}
      ] })
      self.setState({ name: response.data.fname + ' ' + response.data.lname});
      self.setState({ current_status: response.data.current_status });
      self.setState({ next_status: response.data.next_status});
      self.setState({ current_total: response.data.current_total });
      self.setState({ next_total: response.data.next_total });
      self.setState({ current_classes: response.data.current_classes });
      self.setState({ next_classes: response.data.next_classes });


    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleInputChange(event) {

    this.setState({ [event.target.name] : event.target.value});
  }

  validateForm = () => {

    let isFormValid = true;

    this.setState({message: {}});

    return isFormValid;
  }

  handleSelectChange = (event, data) => {
    this.setState( {[data.name]: data.value });

    if (data.value === 'current') {
      this.setState({ total: '$ ' + this.state.current_total });
      this.setState({ classes: this.state.current_classes });
    }

    if (data.value === 'next') {
      this.setState({ total: '$ ' + this.state.next_total });
      this.setState({ classes: this.state.next_classes });
    }
  }

  handleSubmit(event) {


  }


  render() {

      return (

        <div>
          <PaymentForm
            handleRowClick={this.handleRowClick}
            message={this.state.message}
            handleInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit}
            sessions={this.state.sessions}
            onSelectChange={this.handleSelectChange}
            selectedSession={this.state.selectedSession}
            name={this.state.name}
            current_status={this.state.current_status}
            next_status={this.state.next_status}
            current_total={this.state.current_total}
            next_total={this.state.next_total}
            classes={this.state.classes}
            total={this.state.total}
          />
        </div>
    );
  }
}

export default PaymentPage;
