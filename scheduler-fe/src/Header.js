import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class Header extends React.Component {

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

    />)
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
