import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default function Body(props) {
  const buttonStyle = {
    marginLeft: '25px',
    marginRight: '25px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p className="App-intro">
        #material-ui
      </p>
      <p className="App-intro">
        To get started, edit <code>App.js</code> or <code>App.scss</code> and save
        to reload. <code>npm start</code> will run on two threads.
      </p>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => { props.setTheme('light'); }}
      >
        Light <Icon >highlight</Icon>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => { props.setTheme('dark'); }}
      >
        Dark <Icon >highlight</Icon>
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => { props.setTheme('alternative'); }}
      >
        Alternative <Icon >highlight</Icon>
      </Button>
    </div>
  );
}

Body.propTypes = {
  setTheme: PropTypes.func.isRequired,
};
