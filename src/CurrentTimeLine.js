import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class CurrentTimeLine extends React.Component {

  intervalId = null;

  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
    };

    this.intervalId = setInterval(this.onUpdate, 10000);
  }

  onUpdate = () => {
    this.setState({ now: moment() });
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { start, end, style, theme } = this.props;
    const value = this.state.now.hours() + this.state.now.minutes() / 60 - start;
    const top = `calc((100vh / ${end - start + 1}) * ${value})`;

    return (
      <div
        className="currtimeline"
        style={{
          ...style,
          top,
          backgroundColor: theme.special.week.timeline.color,
        }}
      />
    );
  }
}

CurrentTimeLine.propTypes = {
  theme: PropTypes.object.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  style: PropTypes.object,
};

CurrentTimeLine.defaultProps = {
  style: {},
};
