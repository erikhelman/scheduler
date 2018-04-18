import React from 'react';
import axios from 'axios';
import AllUsersForm from './AllUsersForm';
import { Redirect } from 'react-router-dom';

class AllUsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      token: sessionStorage.getItem("token"),
      users: [],
      loggedIn: '',
      selected: '',
      checkValue: 'none',
      doRedirect: false
    };

    this.handleEditClick = this.handleEditClick.bind(this);
  };

  handleRowClick = (user) => {

  }

  handleCheckChange = (e, { value }) => {
    this.setState({ checkValue: value });
    
  }

  componentDidMount () {

    var token = this.state.token;
    var self = this;

    axios.post('/all_users', {
    //axios.post('https://glacial-sierra-90432.herokuapp.com/all_users', {
      token: token
    })
    .then(response => {
      self.setState({users: response.data.users});
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



  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  render() {

      if (this.state.doRedirect) {
        return <Redirect to={{
          pathname: '/main/admin_user_page',
          state: { id: this.state.checkValue }

        }}/>;
      }

      return (

        <div>
          <AllUsersForm
            handleRowClick={this.handleRowClick}
            onChange={this.handleInputChange}
            errors={this.state.errors}
            users={this.state.users}
            handleCheckChange={this.handleCheckChange}
            checkValue={this.state.checkValue}
            handleEditClick={this.handleEditClick}
          />
        </div>
    );
  }
}

export default AllUsersPage;
