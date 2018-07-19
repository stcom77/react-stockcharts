import React, { Component } from "react";
import PropTypes from "prop-types";
import { drawOnCanvas, renderSVG } from "./EdgeCoordinateV3";

import GenericChartComponent from "../GenericChartComponent";
import { getAxisCanvas } from "../GenericComponent";
import { functor, strokeDashTypes } from "../utils";

class AlertCoordinate extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
	}

	drawOnCanvas(ctx, moreProps) {
		const props = helper(this.props, moreProps);
		drawOnCanvas(ctx, props);
	}

	renderSVG(moreProps) {
		const props = helper(this.props, moreProps);
		return renderSVG(props);
	}

	handleMouseOver = (e) => {
		console.log(e);
	}

	render() {
		return <GenericChartComponent
			clip={false}
			svgDraw={this.renderSVG}
			canvasDraw={this.drawOnCanvas}
			canvasToDraw={getAxisCanvas}
			drawOn={["pan"]}
			onMouseOver={this.handleMouseOver}
		/>;
	}
}

AlertCoordinate.propTypes = {
	displayFormat: PropTypes.func.isRequired,
	yAxisPad: PropTypes.number,
	rectWidth: PropTypes.number,
	rectHeight: PropTypes.number,
	orient: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	at: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	price: PropTypes.number,
	dx: PropTypes.number,
	arrowWidth: PropTypes.number,
	opacity: PropTypes.number,
	lineOpacity: PropTypes.number,
	lineStroke: PropTypes.string,
	lineStrokeWidth: PropTypes.number,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	fill: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),
	stroke: PropTypes.string,
	strokeOpacity: PropTypes.number,
	strokeWidth: PropTypes.number,
	textFill: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
	]),
};

AlertCoordinate.defaultProps = {
	yAxisPad: 0,
	rectWidth: 50,
	rectHeight: 20,
	orient: "left",
	at: "left",
	price: 0,
	dx: 0,
	arrowWidth: 0,
	fill: "#BAB8b8",
	opacity: 1,
	lineOpacity: 0.2,
	lineStroke: "#000000",
	lineStrokeWidth: 1,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 13,
	textFill: "#FFFFFF",
	strokeOpacity: 1,
	strokeWidth: 1,
	strokeDasharray: "Solid",
};

function helper(props, moreProps) {
	const { width } = moreProps;
	const { chartConfig: { yScale } } = moreProps;
	const [lowerYValue, upperYValue] = yScale.domain();

	const { price, stroke, strokeDasharray, strokeOpacity, strokeWidth } = props;
	const { orient, at, rectWidth, rectHeight, displayFormat, dx } = props;
	const { fill, opacity, fontFamily, fontSize, textFill, arrowWidth, lineOpacity, lineStroke, lineStrokeWidth } = props;

	const x1 = 0, x2 = width;
	const edgeAt = (at === "right")
		? width
		: 0;

	const type = "horizontal";

	const y = yScale(price);
	const show = (price <= upperYValue && price >= lowerYValue);

	const coordinate = displayFormat(yScale.invert(y));
	const hideLine = false;

	const coordinateProps = {
		coordinate,
		show,
		type,
		orient,
		edgeAt,
		hideLine,
		lineOpacity,
		lineStroke,
		lineStrokeWidth,
		lineStrokeDasharray: strokeDasharray,
		stroke,
		strokeOpacity,
		strokeWidth,
		fill: functor(fill)(price),
		textFill: functor(textFill)(price),
		opacity, fontFamily, fontSize,
		rectWidth,
		rectHeight,
		arrowWidth,
		dx,
		x1,
		x2,
		y1: y,
		y2: y,
	};
	return coordinateProps;
}

export default AlertCoordinate;
