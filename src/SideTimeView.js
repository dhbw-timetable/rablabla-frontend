import React from 'react';
import PropTypes from 'prop-types';

export default function SideTimeView(props) {
  const { start, end, theme, navbarHeight } = props;
  const lines = end - start + 1;

  const styles = (document.documentElement.clientHeight || window.innerHeight) <= 450 ? {
    container: {
      display: 'none',
    },
    weekview: {
      left: 0,
    },
    line: {
      display: 'none',
    },
  } : {
    container: {
      display: 'block',
    },
    weekview: {
      left: '30px',
    },
    line: {
      display: 'block',
    },
  };
  return (
    <div>
      <div
        className="sidetimesview-times-container"
        style={{
          backgroundColor: theme.special.week.sidetimesview.backgroundColor,
          top: `${navbarHeight}px`,
          ...styles.container,
        }}
      >
        {Array(lines).fill().map((_, i) => {
          return (
              <span
                className="sidetimesview-time"
                key={`time${i}`}
                style={{
                  color: theme.special.week.sidetimesview.color,
                  top: `calc(${(100 / lines) * i}% - 6.5px + 31px)`, // font-size/2 + dayheader
                }}
              >
                {i + start}
              </span>
          );
        })}
      </div>
      {Array(lines).fill().map((_, i) => {
        return (
          <span
            className="sidetimesview-line"
            key={`line${i}`}
            style={{
              backgroundColor: theme.special.week.sidetimesview.color,
              top: `calc(${(100 / lines) * i}% + ${31 + navbarHeight}px)`,
              ...styles.line,
            }}
          />
        );
      })}
    </div>
  );
}

SideTimeView.propTypes = {
  navbarHeight: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};
