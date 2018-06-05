import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Cake from '@material-ui/icons/Cake';
import Airplay from '@material-ui/icons/Airplay';
import Cloud from '@material-ui/icons/Cloud';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {this.props.title}
            </Typography>
            <IconButton style={{ position: 'absolute', right: 0 }} color="inherit">
              <Cloud />
            </IconButton>
            <IconButton style={{ position: 'absolute', right: '48px' }} color="inherit">
              <Cake />
            </IconButton>
            <IconButton
              style={{
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: 0,
                right: 0,
              }}
              color="inherit"
            >
              <Airplay />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
};
