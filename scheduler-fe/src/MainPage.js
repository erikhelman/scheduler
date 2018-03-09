import React from 'react';
import MainForm from './MainForm';
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      loggedIn: false,
      visible: true,
      menubarHeight: {},
      menuItems: [
        [
          'Profile',
          'profile',
          '/main/profile',
          'id card',
          '{ProfilePage}'
        ],
        [
          'Student Information',
          'studentInfo',
          '/main/student',
          'user circle',
          'StudentPage'
        ],
        [
          'Reschedule a Class',
          'reschedule',
          '/main/reschedule',
          'calendar times',
          'ReschedulePage'
        ]
      ]
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.signout = this.signout.bind(this);
  }

  componentWillMount() {


    if (typeof this.props.location.state === 'undefined') {
      this.setState({ loggedIn: false});
    } else {
      this.setState({ loggedIn: this.props.location.state.loggedIn});
    }


    {/*
      <Menu.Item as={ Link } to='/main/profile' name='profileLink'>
         <Icon name='id card' />
         Profile
       </Menu.Item>
       <Menu.Item as={ Link } to='/main/student' name='studentInfoLink'>
         <Icon name='user circle' />
         Student Information
       </Menu.Item>
       <Menu.Item as={ Link } to='/main/calendar' name='calendar'>
         <Icon name='calendar' />
         Calendar
       </Menu.Item>
       <Menu.Item as={ Link } to='/main/reschedule' name='reschedule'>
         <Icon name='calendar times' />
         Reschedule a Class
       </Menu.Item>
       <Menu.Item name='instructors'>
         <Icon name='id badge' />
         Instructors
       </Menu.Item>
       <Menu.Item as={ Link } to='/main/all_students' name='allStudents'>
         <Icon name='table' />
         Students
       </Menu.Item>
       <Menu.Item as={ Link } to='/main/all_users' name='allUsers'>
         <Icon name='columns' />
         Users
       </Menu.Item>
       <Menu.Item as= { Link } to='/main/settings' name='Settings'>
         <Icon name='setting' />
         Settings
       </Menu.Item>
       */}
  }

  componentDidMount () {

    var menubar = document.getElementById("menubar");
    this.setState({ menubarHeight: window.getComputedStyle(menubar).height });
    //this.setState({loggedIn: (this.props.location.state.loggedIn != null ? this.props.location.state.loggedIn : false)});
    //this.setState({role: this.props.location.state.role});

  }

  signout = (event) => {
    sessionStorage.removeItem("token");
    this.setState({ loggedIn: false });

  }

  toggleVisibility () {
    this.setState({ visible: !this.state.visible });
  }


  render() {
    if (this.state.loggedIn == false){
      console.log('why');
      return <Redirect to={{
        pathname: '/'

      }}/>;
    }
    return (
        <div>
          <MainForm
            visible= {this.state.visible}
            toggleVisibility= {this.toggleVisibility}
            menubarHeight = {this.state.menubarHeight}
            menuitems={this.state.menuItems}
            signout={this.signout}
          />
        </div>

    );
  }
}

export default MainPage;
