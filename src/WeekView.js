import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from './Day';

export default class WeekView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { style, theme, displayDate, weekStartsOnMonday, eventData } = this.props;
    return (
      <div className="weekview" style={style}>
        {Array(7).fill().map((_, i) => {
          const dayMmt = (weekStartsOnMonday ? moment(displayDate).day(i + 1)
            : moment(displayDate).day(i));
          return (<Day dayEvents={eventData[dayMmt.format('DD.MM.YYYY')]} key={`day${i}`} theme={theme} dayMoment={dayMmt} dayIndex={i} />);
        })}
      </div>
    );
  }
}

WeekView.propTypes = {
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
  displayDate: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  weekStartsOnMonday: PropTypes.bool.isRequired,
};

WeekView.defaultProps = {
  style: {},
};
