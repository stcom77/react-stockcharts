var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import { isHovering2, generateLine } from "./StraightLine";
import { hexToRGBA, getStrokeDasharray } from "../../utils";
import Times from './Times';

var ClickableShape = function (_Component) {
	_inherits(ClickableShape, _Component);

	function ClickableShape(props) {
		_classCallCheck(this, ClickableShape);

		var _this = _possibleConstructorReturn(this, (ClickableShape.__proto__ || Object.getPrototypeOf(ClickableShape)).call(this, props));

		_this.saveNode = _this.saveNode.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(ClickableShape, [{
		key: "saveNode",
		value: function saveNode(node) {
			this.node = node;
		}
	}, {
		key: "isHover",
		value: function isHover(moreProps) {
			var mouseXY = moreProps.mouseXY;

			if (this.closeIcon) {
				var textBox = this.props.textBox;
				var _closeIcon = this.closeIcon,
				    x = _closeIcon.x,
				    y = _closeIcon.y;

				var halfWidth = textBox.closeIcon.width / 2;

				var start1 = [x - halfWidth, y - halfWidth];
				var end1 = [x + halfWidth, y + halfWidth];
				var start2 = [x - halfWidth, y + halfWidth];
				var end2 = [x + halfWidth, y - halfWidth];

				if (isHovering2(start1, end1, mouseXY, 3) || isHovering2(start2, end2, mouseXY, 3)) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    stroke = _props.stroke,
			    strokeWidth = _props.strokeWidth,
			    strokeOpacity = _props.strokeOpacity,
			    hovering = _props.hovering,
			    textBox = _props.textBox;

			var _helper = helper(this.props, moreProps, ctx),
			    _helper2 = _slicedToArray(_helper, 2),
			    x = _helper2[0],
			    y = _helper2[1];

			this.closeIcon = { x: x, y: y };
			ctx.beginPath();

			ctx.lineWidth = hovering ? strokeWidth + 1 : strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			var halfWidth = textBox.closeIcon.width / 2;
			ctx.moveTo(x - halfWidth, y - halfWidth);
			ctx.lineTo(x + halfWidth, y + halfWidth);
			ctx.moveTo(x - halfWidth, y + halfWidth);
			ctx.lineTo(x + halfWidth, y - halfWidth);
			ctx.stroke();
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(props, moreProps, ctx) {
			var stroke = props.stroke,
			    strokeWidth = props.strokeWidth,
			    strokeOpacity = props.strokeOpacity,
			    fill = props.fill,
			    strokeDasharray = props.strokeDasharray,
			    text = props.text,
			    fontFamily = props.fontFamily,
			    fontSize = props.fontSize,
			    textAnchor = props.textAnchor;

			var _helper3 = helper(this.props, moreProps, {}),
			    _helper4 = _slicedToArray(_helper3, 3),
			    x = _helper4[0],
			    y = _helper4[1],
			    icon = _helper4[2];

			var line = React.createElement(Times, {
				stroke: stroke,
				strokeWidth: strokeWidth,
				x1: icon.x1,
				y1: icon.y1,
				x2: icon.x2,
				y2: icon.y2
			});

			var textCoordinate = React.createElement(
				"text",
				{
					key: 2,
					x: x,
					y: y,
					fontFamily: fontFamily,
					fontSize: fontSize,
					dy: ".32em",
					fill: stroke,
					textAnchor: textAnchor
				},
				text
			);

			return [textCoordinate, line];

			// return <circle cx={x} cy={y} r={r}
			// 			   strokeWidth={strokeWidth}
			// 			   stroke={stroke}
			// 			   strokeOpacity={strokeOpacity}
			// 			   fill={fill}
			// />;
		}
	}, {
		key: "render",
		value: function render() {
			var interactiveCursorClass = this.props.interactiveCursorClass;
			var show = this.props.show;
			var _props2 = this.props,
			    onHover = _props2.onHover,
			    onUnHover = _props2.onUnHover,
			    onClick = _props2.onClick;


			return show ? React.createElement(GenericChartComponent, { ref: this.saveNode,
				interactiveCursorClass: interactiveCursorClass,
				isHover: this.isHover,
				onClickWhenHover: onClick,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: getMouseCanvas,
				onHover: onHover,
				onUnHover: onUnHover,
				drawOn: ["pan", "mousemove", "drag"]
			}) : null;
		}
	}]);

	return ClickableShape;
}(Component);

function helper(props, moreProps) {
	var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var yValue = props.yValue,
	    text = props.text,
	    textBox = props.textBox,
	    at = props.at;
	var _moreProps$chartConfi = moreProps.chartConfig,
	    yScale = _moreProps$chartConfi.yScale,
	    width = _moreProps$chartConfi.width;


	var textWidth = 20;
	var y = yScale(yValue);
	var x = at === "left" ? textBox.left + textBox.padding.left : width - textBox.width - textBox.left + textBox.padding.left;

	var textRightBorder = x + textWidth + textBox.padding.right;
	var iconLeftBorder = textRightBorder + textBox.closeIcon.padding.left;
	var icon = {
		x1: iconLeftBorder,
		y1: y - textBox.closeIcon.width / 2,
		x2: iconLeftBorder + textBox.closeIcon.width,
		y2: y + textBox.closeIcon.width / 2
	};

	return [x, y, icon];
}

ClickableShape.propTypes = {
	at: PropTypes.oneOf(["left", "right"]),
	stroke: PropTypes.string.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	textBox: PropTypes.object.isRequired,
	hovering: PropTypes.bool,
	interactiveCursorClass: PropTypes.string,
	show: PropTypes.bool,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,
	onClick: PropTypes.func
};

ClickableShape.defaultProps = {
	at: 'right',
	show: false,
	fillOpacity: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};

export default ClickableShape;
//# sourceMappingURL=ClickableShape.js.map