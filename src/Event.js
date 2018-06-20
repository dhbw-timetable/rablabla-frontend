import React from 'react';
import PropTypes from 'prop-types';
import Dotdotdot from 'react-dotdotdot';
import moment from 'moment';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { start, end, style, theme, eventObj, onClick } = this.props;
    const startMmt = moment(eventObj.startDate, 'HH:mm DD.MM.YYYY');
    const startValue = startMmt.hours() + startMmt.minutes() / 60 - start;
    const endMmt = moment(eventObj.endDate, 'HH:mm DD.MM.YYYY');
    const durationValue = (endMmt.hours() + endMmt.minutes() / 60 - start) - startValue;
    const eventStyle = {
      ...style,
      backgroundColor: theme.palette.primary.main,
      boxShadow: `1.5px 2px 5px 1px ${theme.palette.primary.dark}`,
      top: `calc((100vh / ${end - start + 1}) * ${startValue})`,
      height: `calc((100vh / ${end - start + 1}) * ${durationValue})`,
    };
    return (<div onClick={onClick} className="event" style={eventStyle}>
        <Dotdotdot className="event-time-wrapper" clamp={1}>
          <p className="event-time" style={{ color: theme.palette.primary.contrastText }}>
            {startMmt.format('HH:mm')} - {endMmt.format('HH:mm')}
          </p>
        </Dotdotdot>
        <Dotdotdot clamp={2}>
          <p className="event-title" style={{ color: theme.palette.primary.contrastText }}>
            {eventObj.title}
          </p>
        </Dotdotdot>
        <Dotdotdot className="event-description-wrapper" clamp={1}>
          <p
            className="event-description"
            style={{
              display: (document.documentElement.clientHeight || window.innerHeight) <= 350 ? 'none' : 'block',
              color: theme.palette.primary.contrastText,
            }}
          >
            {eventObj.ressources}
          </p>
        </Dotdotdot>
    </div>);
  }
}

Event.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
  eventObj: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

Event.defaultProps = {
  style: {},
};
