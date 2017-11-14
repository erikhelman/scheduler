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
  if (props.role === "admin") {
    return (
          <Drawer
            open={navDrawerOpen}
          >
            <div style={styles.logo}>
              Navigation
            </div>
            <MenuItem
              style={styles.menuItem}
              containerElement={<Link to='/main/all_students' />}>
              All Students
            </MenuItem>
            <MenuItem
              style={styles.menuItem}
              containerElement={<Link to='/main/all_users' />}>
              All Users
            </MenuItem>
          </Drawer>
      );
    } else if (props.role === "user") {
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
                Student Information
              </MenuItem>
            </Drawer>
        );
    } else {
      return (
            <Drawer open={navDrawerOpen}>
            </Drawer>
          );
    }

  };
LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool
};

export default LeftDrawer;
