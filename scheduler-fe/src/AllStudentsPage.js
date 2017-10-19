import React from 'react';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import AllStudentsForm from './AllStudentsForm';

class AllStudentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      token: sessionStorage.getItem("token"),
      students: [],
      loggedIn: ''
    };
    var students = [
      [{id: 1},{name: 'name1'}],
      [{id: 2},{name: 'name2'}]
    ]
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {

    var token = this.state.token;
    var st = []

    axios.post('/all_students', {
      token: token
    })
    .then(response => {
      st = response.data.students;
      console.log('response data');
      console.log(response.data.students);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({students: st});
    console.log(st);
    console.log(this.state.students);
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
      <AllStudentsForm
        onSubmit={this.handleSubmit}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        students={this.state.students}
      />
    );
  }
}

export default AllStudentsPage;
