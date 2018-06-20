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
    const { theme, dayMoment, style, dayEvents, onEventClick } = this.props;
    const dayviewStyle = {
      backgroundColor: theme.palette.primary.light,
      ...style,
    };
    const dayheaderStyle = {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    };
    const daybodyStyle = {
      backgroundColor: (document.documentElement.clientHeight || window.innerHeight) <= 450 ? theme.palette.primary.light : 'rgba(0,0,0,0)',
      height: '100%',
    };
    return (<div className="dayview" style={dayviewStyle}>
      <h4 className="dayheader" style={dayheaderStyle}>{dayMoment.format('dd. DD. MM.')}</h4>
      <div className="daybody" style={daybodyStyle}>
        {dayEvents.map((e, i) => {
          return (
            <Event
              onClick={clickEvent => onEventClick(e, clickEvent)}
              eventObj={e}
              key={`event${i}`}
              theme={theme}
            />);
        })}
      </div>
    </div>);
  }
}

Day.propTypes = {
  theme: PropTypes.object.isRequired,
  dayMoment: PropTypes.object.isRequired,
  dayIndex: PropTypes.number.isRequired,
  onEventClick: PropTypes.func.isRequired,
  dayEvents: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.object,
};

Day.defaultProps = {
  style: {},
  dayEvents: [],
};
