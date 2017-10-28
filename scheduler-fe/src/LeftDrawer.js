import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {white, blue600} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';


const LeftDrawer = (props) => {

  let { navDrawerOpen } = props;

  const styles = {
    logo:{
      fontSize: 22,
      color: white,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
      paddingTop: 20
    },
    menuItem: {
      color: white,
      fontSize: 14
    }
  }

  return (
        <Drawer
          open={navDrawerOpen}
        >
          <div style={styles.logo}>
            Navigation
          </div>
          <MenuItem
            style={styles.menuItem}
            containerElement={<Link to='/main/profile' />}>
            Profile
          </MenuItem>
          <MenuItem
            style={styles.menuItem}
            containerElement={<Link to='/main/student' />}>
            Student
          </MenuItem>
          <MenuItem
            style={styles.menuItem}
            containerElement={<Link to='/main/all_students' />}>
            All Students
          </MenuItem>
        </Drawer>
    );
  };
LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool
};

export default LeftDrawer;
