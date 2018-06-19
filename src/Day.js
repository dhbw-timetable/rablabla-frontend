import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { theme, dayMoment, style } = this.props;
    const dayviewStyle = {
      backgroundColor: theme.palette.primary.light,
      ...style,
    };
    const dayheaderStyle = {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    };
    const daybodyStyle = {
      backgroundColor: window.innerHeight <= 450 ? theme.palette.primary.light : 'rgba(0,0,0,0)',
      height: '100%',
    };
    return (<div className="dayview" style={dayviewStyle}>
      <h4 className="dayheader" style={dayheaderStyle}>{dayMoment.format('dd. DD. MM.')}</h4>
      <div className="daybody" style={daybodyStyle}>
        <Event theme={theme} />
      </div>
    </div>);
  }
}

Day.propTypes = {
  theme: PropTypes.object.isRequired,
  dayMoment: PropTypes.object.isRequired,
  dayIndex: PropTypes.number.isRequired,
  style: PropTypes.object,
};

Day.defaultProps = {
  style: {},
};
