import React from 'react';
import axios from 'axios';
import AllStudentsForm from './AllStudentsForm';

class AllStudentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      token: sessionStorage.getItem("token"),
      students: [],
      loggedIn: '',
      selected: [1]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows
    });
  };

  componentDidMount () {

    var token = this.state.token;
    var self = this;

    axios.post('/all_students', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/all_students', {
      token: token
    })
    .then(response => {
      self.setState({students: response.data.students});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleSubmit(event) {

    event.preventDefault();

  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
    console.log(this.state.name);
  }

  render() {

    return (
        <div>
          <AllStudentsForm
            onSubmit={this.handleSubmit}
            onChange={this.handleInputChange}
            errors={this.state.errors}
            students={this.state.students}
          />
        </div>
    );
  }
}

export default AllStudentsPage;
