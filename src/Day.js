import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Event from './Event';
import CurrentTimeLine from './CurrentTimeLine';

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { id, theme, dayMoment, style, dayEvents, onEventClick,
      start, end, dayIndex } = this.props;
    const isCurrent = id === moment().format('DD.MM.YYYY');
    const dayviewStyle = {
      backgroundColor: theme.special.week.dayview.backgroundColor,
      ...style,
    };
    const dayheaderStyle = {
      backgroundColor: theme.special.week.dayheader.backgroundColor,
      color: isCurrent
        ? theme.special.week.dayheader.color.secondary : theme.special.week.dayheader.color.primary,
      fontWeight: isCurrent ? 400 : 200,
    };
    const daybodyStyle = {
      backgroundColor: (document.documentElement.clientHeight || window.innerHeight) <= 450 ? theme.special.week.daybody.backgroundColor : 'rgba(0,0,0,0)',
      height: '100%',
    };

    return (
      <div id={id} className="dayview" style={dayviewStyle}>
        <h4 className="dayheader" style={dayheaderStyle}>{dayMoment.format('dd. DD. MM.')}</h4>
        <div className="daybody" style={daybodyStyle}>
          {dayEvents.map((e, i) => {
            return (
              <Event
                start={start}
                end={end}
                onClick={clickEvent => onEventClick(e, clickEvent)}
                eventObj={e}
                key={`day${dayIndex}_event${i}`}
                theme={theme}
              />);
          })}
          { isCurrent
            ? (
              <CurrentTimeLine
                theme={theme}
                start={start}
                end={end}
              />
            ) : <div />}
        </div>
      </div>);
  }
}

Day.propTypes = {
  id: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
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
