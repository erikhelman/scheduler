import React from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import StudentPage from './StudentPage';
import AllStudentsPage from './AllStudentsPage';
import AllUsersPage from './AllUsersPage';
import InstructorPage from './InstructorPage';
import AdminInstructorPage from './AdminInstructorPage';
import AdminStudentPage from './AdminStudentPage';
import AdminUserPage from './AdminUserPage';
import ReschedulePage from './ReschedulePage';
import SettingsPage from './SettingsPage';
import ScheduleStudentPage from './ScheduleStudentPage';
import AllClassesPage from './AllClassesPage';
import PaymentPage from './PaymentPage';
import CreateSchedulePage from './CreateSchedulePage';

const MainForm = ({
  visible,
  toggleVisibility,
  menubarHeight,
  menuitems,
  signout
 }) => (
   <div>
     <div>
       <Menu id='menubar' compact fixed='top' inverted color='blue'>

         <Menu.Item as='a'><Icon name='sidebar' onClick={toggleVisibility} /></Menu.Item>

         <Menu.Menu position='right'>
           <Menu.Item
             onClick={signout}
             as='a'
           >
             Sign Out
           </Menu.Item>
         </Menu.Menu>

       </Menu>
     </div>
     <div style= {{ paddingTop: menubarHeight}}>
       <Sidebar.Pushable as={Segment} style= {{ minHeight: '100vh'}}>
         <Sidebar as={Menu} animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>
           {menuitems.map((menuitem, idx) => (
             <Menu.Item key={idx} as={ Link } to={menuitem[2]} name={menuitem[1]}>
               <Icon name={menuitem[3]} />
               {menuitem[0]}
             </Menu.Item>
           ))}

         </Sidebar>
         <Sidebar.Pusher style= {{ minHeight: '100vh'}}>
           <Segment basic>

             <Route path='/main/profile' component={ProfilePage} />
             <Route path='/main/student' component={StudentPage} />
             <Route path='/main/all_students' component={AllStudentsPage} />
             <Route path='/main/all_users' component={AllUsersPage} />
             <Route path='/main/admin_student_page' component={AdminStudentPage} />
             <Route path='/main/admin_user_page' component={AdminUserPage} />
             <Route path='/main/instructor_page' component={InstructorPage} />
             <Route path='/main/admin_instructor_page' component={AdminInstructorPage} />
             <Route path='/main/reschedule' component={ReschedulePage} />
             <Route path='/main/settings' component={SettingsPage} />
             <Route path='/main/scheduleStudent' component={ScheduleStudentPage} />
             <Route path='/main/all_classes' component={AllClassesPage} />
             <Route path='/main/student_payment_page' component={PaymentPage} />
             <Route path='/main/create_schedule' component={CreateSchedulePage} />


           </Segment>

       </Sidebar.Pusher>
     </Sidebar.Pushable>
   </div>
   </div>

)


export default MainForm;
