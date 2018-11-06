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

require('moment/locale/de.js');

export default class NavigationBar extends React.Component {
  githubAnchor = null;

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      titleMode: parseInt(window.localStorage.getItem('titleMode'), 0) || 0,
    };
  }

  toggleTitleMode = () => {
    const titleMode = this.state.titleMode === 2 ? 0 : this.state.titleMode + 1;
    window.localStorage.setItem('titleMode', titleMode);
    this.setState({ titleMode });
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, titleMode } = this.state;
    const { language, displayDate, darkFont, doRefresh,
      setDisplayDate, showPreferences, showDatePicker } = this.props;

    const open = Boolean(anchorEl);
    let titleComponent;
    if (titleMode === 0) { // MONTH
      titleComponent = (
        <Typography onClick={this.toggleTitleMode} variant="title" color="inherit">
          {`${displayDate.format(document.body.clientWidth > 475 ? 'MMMM YYYY' : 'MMMM')}`}
        </Typography>);
    } else if (titleMode === 1) { // KW
      titleComponent = (
        <Typography onClick={this.toggleTitleMode} variant="title" color="inherit">
          {`KW${displayDate.isoWeek()} ${document.body.clientWidth > 475 ? displayDate.format('YYYY') : ''}`}
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
      <div >
        <AppBar className="navbar">
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
                doRefresh(true);
              }}
              >{language.REFRESH}</MenuItem>
              <MenuItem onClick={() => { this.githubAnchor.click(); }}>
                <a
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href="https://github.com/dhbw-timetable"
                  rel="noopener noreferrer"
                  target="_blank"
                  ref={el => this.githubAnchor = el}
                  onClick={this.handleMenuClose}
                >
                  {language.GITHUB}
                </a>
              </MenuItem>
              <MenuItem onClick={() => { this.handleMenuClose(); showPreferences(); }}>
                {language.PREFERENCES}
              </MenuItem>
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
              onClick={() => { showDatePicker(); }}
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
  language: PropTypes.object.isRequired,
  displayDate: PropTypes.object.isRequired,
  darkFont: PropTypes.bool,
  doRefresh: PropTypes.func.isRequired,
  setDisplayDate: PropTypes.func.isRequired,
  showPreferences: PropTypes.func.isRequired,
  showDatePicker: PropTypes.func.isRequired,
};

NavigationBar.defaultProps = {
  darkFont: false,
};
