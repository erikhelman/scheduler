import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class Header extends React.Component {

  signOut = (event) => {
    sessionStorage.removeItem("token")
  }

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;
    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      }
    };

    return (
    <AppBar
      style={{...styles, ...style.appBar}}
      id="header"
      title="Scheduler"
      iconElementLeft={
        <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
          <Menu color={white} />
        </IconButton>
      }
      iconElementRight={
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Help" />
          <MenuItem
            primaryText="Sign out"
            onClick = {this.signOut}
            containerElement={<Link to='/' />}  />
        </IconMenu>
      }

    />)
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
