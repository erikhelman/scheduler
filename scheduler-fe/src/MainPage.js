import React from 'react';
import MainForm from './MainForm';
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      loggedIn: true,
      visible: true,
      menubarHeight: {},
      role: 'admin', //this.props.location.state.role,
      menuItems: [
        [
          'Profile',
          'profile',
          '/main/profile',
          'id card',
          'ProfilePage'
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

    if (this.state.role === 'admin') {
      let menu = this.state.menuItems;
      let items = [
        [
          'Schedule a Student',
          'schedule',
          '/main/scheduleStudent',
          'add to calendar',
          'ScheduleStudentPage'
        ],
        [
          'Calendar',
          'calendar',
          '/main/calendar',
          'calendar',
          'CalendarPage'
        ],
        [
          'Instructors',
          'instructors',
          '/main/instructors',
          'id badge',
          'InstructorPage'
        ],
        [
          'All Students',
          'allStudents',
          '/main/all_students',
          'table',
          'AllStudentsPage'
        ],
        [
          'All Users',
          'allUsers',
          '/main/all_users',
          'columns',
          'AllUsersPage'
        ],
        [
          'Settings',
          'settings',
          '/main/settings',
          'setting',
          'SettingsPage'
        ],
        [
          'Classes',
          'classes',
          '/main/all_classes',
          'calendar',
          'AllClassesPage'
        ],
        [
          'Create Schedule',
          'createSchedule',
          '/main/create_schedule',
          'calendar',
          'CreateSchedulePage'
        ],
      ]
      menu = [...menu, ...items];
      this.setState({menuItems: menu})

    }

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
    {/* if (this.state.loggedIn == false){
      console.log('why');
      return <Redirect to={{
        pathname: '/'

      }}/>;
    }
    */}
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
