import React from 'react';
import PropTypes from 'prop-types';

const Times = ({ x1, x2, y1, y2, stroke, strokeWidth }) => {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1={x2}
        y1={y1}
        x2={x1}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

Times.propTypes = {};

export default Times;
