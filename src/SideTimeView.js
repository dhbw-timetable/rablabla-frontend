import React from 'react';
import PropTypes from 'prop-types';

export default function SideTimeView(props) {
  const { start, end, theme } = props;
  const lines = end - start + 1;
  return (
    <div className="sidetimesview-container">

      {Array(lines).fill().map((_, i) => {
        return (
          <span
            className="sidetimesview-line"
            key={`line${i}`}
            style={{
              top: `calc(${(100 / lines) * i}%)`,
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
