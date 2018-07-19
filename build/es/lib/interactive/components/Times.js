import React from 'react';
import PropTypes from 'prop-types';

var Times = function Times(_ref) {
  var x1 = _ref.x1,
      x2 = _ref.x2,
      y1 = _ref.y1,
      y2 = _ref.y2,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth;

  return React.createElement(
    'g',
    null,
    React.createElement('line', {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: stroke,
      strokeWidth: strokeWidth
    }),
    React.createElement('line', {
      x1: x2,
      y1: y1,
      x2: x1,
      y2: y2,
      stroke: stroke,
      strokeWidth: strokeWidth
    })
  );
};

Times.propTypes = {};

export default Times;
//# sourceMappingURL=Times.js.map