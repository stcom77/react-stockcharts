"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

var _EdgeCoordinateV = require("../../coordinates/EdgeCoordinateV3");

var _MouseCoordinateY = require("../../coordinates/MouseCoordinateY");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveYCoordinate = function (_Component) {
  _inherits(InteractiveYCoordinate, _Component);

  function InteractiveYCoordinate(props) {
    _classCallCheck(this, InteractiveYCoordinate);

    var _this = _possibleConstructorReturn(this, (InteractiveYCoordinate.__proto__ || Object.getPrototypeOf(InteractiveYCoordinate)).call(this, props));

    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
    _this.isHover = _this.isHover.bind(_this);
    return _this;
  }

  _createClass(InteractiveYCoordinate, [{
    key: "isHover",
    value: function isHover(moreProps) {
      var onHover = this.props.onHover;


      if ((0, _utils.isDefined)(onHover)) {
        var values = helper(this.props, moreProps);
        if (values == null) return false;

        var x1 = values.x1,
            x2 = values.x2,
            y = values.y,
            rect = values.rect;

        var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
            mouseX = _moreProps$mouseXY[0],
            mouseY = _moreProps$mouseXY[1];

        if (mouseX >= rect.x && mouseX <= rect.x + this.width && mouseY >= rect.y && mouseY <= rect.y + rect.height) {
          return true;
        }
        if (x1 <= mouseX && x2 >= mouseX && Math.abs(mouseY - y) < 4) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "drawOnCanvas",
    value: function drawOnCanvas(ctx, moreProps) {
      var _props = this.props,
          bgFill = _props.bgFill,
          bgOpacity = _props.bgOpacity,
          textFill = _props.textFill,
          fontFamily = _props.fontFamily,
          fontSize = _props.fontSize,
          fontStyle = _props.fontStyle,
          fontWeight = _props.fontWeight,
          stroke = _props.stroke,
          strokeWidth = _props.strokeWidth,
          strokeOpacity = _props.strokeOpacity,
          strokeDasharray = _props.strokeDasharray,
          text = _props.text,
          textBox = _props.textBox,
          edge = _props.edge;
      var _props2 = this.props,
          selected = _props2.selected,
          hovering = _props2.hovering;


      var values = helper(this.props, moreProps);
      if (values == null) return;

      var x1 = values.x1,
          x2 = values.x2,
          y = values.y,
          rect = values.rect;


      ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);

      ctx.beginPath();
      if (selected || hovering) {
        ctx.lineWidth = strokeWidth + 1;
      } else {
        ctx.lineWidth = strokeWidth;
      }
      ctx.textBaseline = "middle";
      ctx.textAlign = "start";
      ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;

      this.width = textBox.padding.left + ctx.measureText(text).width + textBox.padding.right + textBox.closeIcon.padding.left + textBox.closeIcon.width + textBox.closeIcon.padding.right;

      ctx.setLineDash((0, _utils.getStrokeDasharrayCanvas)(strokeDasharray));
      ctx.moveTo(x1, y);
      ctx.lineTo(rect.x, y);

      ctx.moveTo(rect.x + this.width, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      ctx.setLineDash([]);

      ctx.fillStyle = (0, _utils.hexToRGBA)(bgFill, bgOpacity);

      ctx.fillRect(rect.x, rect.y, this.width, rect.height);
      ctx.strokeRect(rect.x, rect.y, this.width, rect.height);

      ctx.fillStyle = textFill;

      ctx.beginPath();
      ctx.fillText(text, rect.x + 10, y);
      var newEdge = _extends({}, edge, {
        textFill: textFill,
        fontFamily: fontFamily,
        fontSize: fontSize,
        opacity: bgOpacity
      });
      var yValue = edge.displayFormat(this.props.yValue);
      var yCoord = (0, _MouseCoordinateY.getYCoordinate)(y, yValue, newEdge, moreProps);
      (0, _EdgeCoordinateV.drawOnCanvas)(ctx, yCoord);
    }
  }, {
    key: "renderSVG",
    value: function renderSVG(moreProps) {
      var _props3 = this.props,
          bgFill = _props3.bgFill,
          bgOpacity = _props3.bgOpacity,
          textFill = _props3.textFill,
          fontFamily = _props3.fontFamily,
          fontSize = _props3.fontSize,
          fontStyle = _props3.fontStyle,
          fontWeight = _props3.fontWeight,
          stroke = _props3.stroke,
          strokeWidth = _props3.strokeWidth,
          strokeOpacity = _props3.strokeOpacity,
          strokeDasharray = _props3.strokeDasharray,
          text = _props3.text,
          textBox = _props3.textBox,
          edge = _props3.edge,
          rectWidth = _props3.rectWidth,
          rectHeight = _props3.rectHeight,
          textAnchor = _props3.textAnchor,
          textWidthProp = _props3.textWidth;
      var _props4 = this.props,
          selected = _props4.selected,
          hovering = _props4.hovering;


      var values = helper(this.props, moreProps);
      if (values == null) return;

      var x1 = values.x1,
          x2 = values.x2,
          y = values.y,
          rect = values.rect;


      var textWidth = textBox.padding.left + textWidthProp + textBox.padding.right + textBox.closeIcon.padding.left + textBox.closeIcon.width + textBox.closeIcon.padding.right;

      var line = _react2.default.createElement("line", {
        key: 1,
        strokeOpacity: strokeOpacity,
        stroke: stroke,
        strokeWidth: strokeWidth,
        strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
        x1: x1,
        y1: y,
        x2: x2,
        y2: y
      });

      var textRect = _react2.default.createElement("rect", {
        key: 3,
        x: rect.x,
        y: rect.y,
        height: rect.height,
        width: textWidth,
        fill: bgFill,
        opacity: bgOpacity,
        strokeWidth: strokeWidth,
        stroke: stroke,
        strokeOpacity: strokeOpacity
      });
      return [line, textRect];
    }
  }, {
    key: "render",
    value: function render() {
      var interactiveCursorClass = this.props.interactiveCursorClass;
      var _props5 = this.props,
          onHover = _props5.onHover,
          onUnHover = _props5.onUnHover;
      var _props6 = this.props,
          onDragStart = _props6.onDragStart,
          onDrag = _props6.onDrag,
          onDragComplete = _props6.onDragComplete;


      return _react2.default.createElement(_GenericChartComponent2.default, {
        clip: false,
        xxxyyy: true,
        isHover: this.isHover,

        svgDraw: this.renderSVG,
        canvasToDraw: _GenericComponent.getMouseCanvas,
        canvasDraw: this.drawOnCanvas,

        interactiveCursorClass: interactiveCursorClass
        /* selected={selected} */
        , enableDragOnHover: true,

        onDragStart: onDragStart,
        onDrag: onDrag,
        onDragComplete: onDragComplete,
        onHover: onHover,
        onUnHover: onUnHover,

        drawOn: ["mousemove", "mouseleave", "pan", "drag"]
      });
    }
  }]);

  return InteractiveYCoordinate;
}(_react.Component);

function helper(props, moreProps) {
  var yValue = props.yValue,
      textBox = props.textBox,
      at = props.at;
  var _moreProps$chartConfi = moreProps.chartConfig,
      width = _moreProps$chartConfi.width,
      yScale = _moreProps$chartConfi.yScale,
      height = _moreProps$chartConfi.height;

  var _yScale$domain = yScale.domain(),
      _yScale$domain2 = _slicedToArray(_yScale$domain, 2),
      lowerYValue = _yScale$domain2[0],
      upperYValue = _yScale$domain2[1];

  var y = Math.round(yScale(yValue));
  // const coordinate = yScale.invert(y);

  if (y >= 0 && y <= height) {
    var rect = {
      x: at === 'left' ? textBox.left : width - textBox.width - textBox.left,
      y: y - textBox.height / 2,
      height: textBox.height,
      width: textBox.padding.left + textBox.padding.right + textBox.closeIcon.width + textBox.closeIcon.padding.left + textBox.closeIcon.padding.right
    };

    return {
      x1: 0,
      x2: width,
      y: y,
      rect: rect
    };
  }
}

InteractiveYCoordinate.propTypes = {
  at: _propTypes2.default.oneOf(["left", "right"]),
  bgFill: _propTypes2.default.string.isRequired,
  bgOpacity: _propTypes2.default.number.isRequired,

  stroke: _propTypes2.default.string.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  strokeOpacity: _propTypes2.default.number.isRequired,
  strokeDasharray: _propTypes2.default.string.isRequired,

  textFill: _propTypes2.default.string.isRequired,
  fontFamily: _propTypes2.default.string.isRequired,
  fontSize: _propTypes2.default.number.isRequired,
  fontWeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  fontStyle: _propTypes2.default.string.isRequired,

  text: _propTypes2.default.string.isRequired,
  edge: _propTypes2.default.object.isRequired,
  textBox: _propTypes2.default.object.isRequired,
  yValue: _propTypes2.default.number.isRequired,

  onDragStart: _propTypes2.default.func.isRequired,
  onDrag: _propTypes2.default.func.isRequired,
  onDragComplete: _propTypes2.default.func.isRequired,
  onHover: _propTypes2.default.func,
  onUnHover: _propTypes2.default.func,

  defaultClassName: _propTypes2.default.string,
  interactiveCursorClass: _propTypes2.default.string,

  tolerance: _propTypes2.default.number.isRequired,
  selected: _propTypes2.default.bool.isRequired,
  hovering: _propTypes2.default.bool.isRequired
};

InteractiveYCoordinate.defaultProps = {
  at: 'right',
  onDragStart: _utils.noop,
  onDrag: _utils.noop,
  onDragComplete: _utils.noop,

  fontWeight: "normal", // standard dev

  strokeWidth: 1,
  tolerance: 4,
  selected: false,
  hovering: false
};

exports.default = InteractiveYCoordinate;
//# sourceMappingURL=InteractiveYCoordinate.js.map