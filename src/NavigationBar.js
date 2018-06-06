import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import Apps from '@material-ui/icons/Apps';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';
import logoDark from './logo_dark.svg';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      titleMode: 0,
    };
  }

  toggleTitleMode = () => {
    this.setState({ titleMode: this.state.titleMode === 2 ? 0 : this.state.titleMode + 1 });
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, titleMode } = this.state;
    const { displayDate, darkFont, doRefresh, setDisplayDate } = this.props;

    const open = Boolean(anchorEl);

    let titleComponent;
    if (titleMode === 0) { // MONTH
      titleComponent = (
        <Typography onClick={this.toggleTitleMode} variant="title" color="inherit">
          {`${displayDate.format('MMMM YYYY')}`}
        </Typography>);
    } else if (titleMode === 1) { // KW
      titleComponent = (
        <Typography onClick={this.toggleTitleMode} variant="title" color="inherit">
          {`KW${displayDate.isoWeek()} ${displayDate.format('YYYY')}`}
        </Typography>);
    } else { // REACT
      titleComponent = (
        <img
          onClick={this.toggleTitleMode}
          src={darkFont ? logoDark : logo}
          color="black"
          style={{ width: '48px', height: '48px' }}
          className="App-logo"
          alt="logo"
        />);
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {titleComponent}
            <IconButton
              style={{ position: 'absolute', right: 0 }}
              color="inherit"
              aria-owns={open ? 'more-menu' : null}
              aria-haspopup="true"
              onClick={this.handleMenuOpen}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="more-menu"
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={() => {
                this.handleMenuClose();
                doRefresh();
              }}
              >Refresh</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>ICS</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>GitHub</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>Preferences</MenuItem>
            </Menu>
            <IconButton
              style={{
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: 0,
                right: '96px',
              }}
              color="inherit"
              onClick={() => { setDisplayDate(displayDate.subtract(7, 'days')); }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              style={{
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: 0,
                right: 0,
              }}
              color="secondary"
              onClick={() => { /* TODO: Implement */ }}
            >
              <Apps />
            </IconButton>
            <IconButton
              style={{
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: '96px',
                right: 0,
              }}
              color="inherit"
              onClick={() => { setDisplayDate(displayDate.add(7, 'days')); }}
            >
              <ChevronRight />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  displayDate: PropTypes.object.isRequired,
  darkFont: PropTypes.bool,
  // setTheme: PropTypes.func.isRequired,
  doRefresh: PropTypes.func.isRequired,
  setDisplayDate: PropTypes.func.isRequired,
};

NavigationBar.defaultProps = {
  darkFont: false,
};
