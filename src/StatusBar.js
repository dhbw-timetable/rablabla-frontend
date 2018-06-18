import React from 'react';
import PropTypes from 'prop-types';

export default function StatusBar(props) {
  return (
    <div style={{
      backgroundColor: props.color,
      position: 'fixed',
      zIndex: 99999,
      top: '-100px',
      height: '100px',
      width: '100vw',
      left: 0,
    }}
    />
  );
}

StatusBar.propTypes = {
  color: PropTypes.string.isRequired,
};
