import React from 'react';
import PropTypes from 'prop-types';

export default function SideTimeView(props) {
  const { start, end, theme } = props;
  const lines = end - start + 1;
  return (
    <div>
      <div
        className="sidetimesview-times-container"
        style={{
          backgroundColor: theme.palette.primary.light,
        }}
      >
        {Array(lines).fill().map((_, i) => {
          return (
              <span
                className="sidetimesview-time"
                key={`time${i}`}
                style={{
                  color: theme.palette.primary.dark,
                  top: `calc(${(100 / lines) * i}% - 6.5px)`,
                }}
              >{i + start}</span>
          );
        })}
      </div>
      {Array(lines).fill().map((_, i) => {
        return (
          <span
            className="sidetimesview-line"
            key={`line${i}`}
            style={{
              top: `calc(${(100 / lines) * i}% + 95px)`,
            }}
          />
        );
      })}
    </div>
  );
}

SideTimeView.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  theme: PropTypes.object.isRequired,
};

SideTimeView.defaultProps = {
  start: 7,
  end: 19,
};
