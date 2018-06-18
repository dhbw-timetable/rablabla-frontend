import React from 'react';
import PropTypes from 'prop-types';

export default class WeekView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { style, theme } = this.props;
    const dayviewStyle = { backgroundColor: theme.palette.primary.light };
    const dayheaderStyle = {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    };

    return (
      <div className="weekview" style={style}>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>Mo. 11.</h4>
        </div>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>Di. 12.</h4>
        </div>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>Mi. 13.</h4>
        </div>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>Do. 14.</h4>
        </div>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>Fr. 15.</h4>
        </div>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>Sa. 16.</h4>
        </div>
        <div className="dayview" style={dayviewStyle}>
          <h4 className="dayheader" style={dayheaderStyle}>So. 17.</h4>
        </div>
      </div>
    );
  }
}

WeekView.propTypes = {
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
  // language: PropTypes.object.isRequired,
};

WeekView.defaultProps = {
  style: {},
};
