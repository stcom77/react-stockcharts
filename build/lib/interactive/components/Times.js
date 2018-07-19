'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Times = function Times(_ref) {
  var x1 = _ref.x1,
      x2 = _ref.x2,
      y1 = _ref.y1,
      y2 = _ref.y2,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth;

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('line', {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: stroke,
      strokeWidth: strokeWidth
    }),
    _react2.default.createElement('line', {
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

exports.default = Times;
//# sourceMappingURL=Times.js.map