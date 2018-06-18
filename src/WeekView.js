import React from 'react';
import PropTypes from 'prop-types';

export default class WeekView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="weekview" style={this.props.style}>
        <div className="dayview" >
          <h4 className="dayheader">Mo 11.06.</h4>
        </div>
        <div className="dayview" >
          <h4 className="dayheader">Di 12.06.</h4>
        </div>
        <div className="dayview" >
          <h4 className="dayheader">Mi 13.06.</h4>
        </div>
        <div className="dayview" >
          <h4 className="dayheader">Do 14.06.</h4>
        </div>
        <div className="dayview" >
          <h4 className="dayheader">Fr 15.06.</h4>
        </div>
        <div className="dayview" >
          <h4 className="dayheader">Sa 16.06.</h4>
        </div>
        <div className="dayview" >
          <h4 className="dayheader">So 17.06.</h4>
        </div>
      </div>
    );
  }
}

WeekView.propTypes = {
  style: PropTypes.object,
  // language: PropTypes.object.isRequired,
};

WeekView.defaultProps = {
  style: {},
};
