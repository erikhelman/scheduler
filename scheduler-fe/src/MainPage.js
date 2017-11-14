import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import LeftDrawer from './LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from './themeDefault';
import ProfilePage from './ProfilePage';
import { Route } from 'react-router-dom';
import StudentPage from './StudentPage';
import AllStudentsPage from './AllStudentsPage';
import AdminStudentPage from './AdminStudentPage';
import AdminUserPage from './AdminUserPage';
import AllUsersPage from './AllUsersPage';
//import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      loggedIn: false,
      role: ''
    };
  }

  componentWillMount () {
    this.setState({loggedIn: (this.props.location.state.loggedIn != null ? this.props.location.state.loggedIn : false)});
    this.setState({role: this.props.location.state.role});

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleToggleNavDrawer () {
    this.setState({
      navDrawerOpen: false
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };


    /*{if (this.state.loggedIn !== true){
      return <Redirect to={{
        pathname: '/',
        state: { loggedIn: this.state.loggedIn }

      }}/>;
    }}*/

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>

          <Header styles={styles.header} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}  />

          <LeftDrawer navDrawerOpen={navDrawerOpen} onBlur={this.handleToggleNavDrawer.bind(this)} role={this.state.role}/>

          <div className="container">
            <Route path="/main/profile" component={ProfilePage} />
            <Route path="/main/student" component={StudentPage} />
            <Route path="/main/all_students" component={AllStudentsPage} />
            <Route path="/main/all_users" component={AllUsersPage} />
            <Route path="/main/admin_student_page" component={AdminStudentPage} />
            <Route path="/main/admin_user_page" component={AdminUserPage} />
          </div>

        </div>
        </MuiThemeProvider>
    );
  }
}

MainPage.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
}
export default withWidth()(MainPage);
