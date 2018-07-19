import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import { isHovering2, generateLine } from "./StraightLine";
import { hexToRGBA, getStrokeDasharray } from "../../utils";
import Times from './Times';

class ClickableShape extends Component {
	constructor(props) {
		super(props);
		this.saveNode = this.saveNode.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.renderSVG = this.renderSVG.bind(this);
		this.isHover = this.isHover.bind(this);
	}

	saveNode(node) {
		this.node = node;
	}

	isHover(moreProps) {
		const { mouseXY } = moreProps;
		if (this.closeIcon) {
			const { textBox } = this.props;
			const { x, y } = this.closeIcon;
			const halfWidth = textBox.closeIcon.width / 2;

			const start1 = [x - halfWidth, y - halfWidth];
			const end1 = [x + halfWidth, y + halfWidth];
			const start2 = [x - halfWidth, y + halfWidth];
			const end2 = [x + halfWidth, y - halfWidth];

			if (isHovering2(start1, end1, mouseXY, 3) || isHovering2(start2, end2, mouseXY, 3)) {
				return true;
			}
		}
		return false;
	}

	drawOnCanvas(ctx, moreProps) {
		const { stroke, strokeWidth, strokeOpacity, hovering, textBox } = this.props;

		const [x, y] = helper(this.props, moreProps, ctx);

		this.closeIcon = { x, y };
		ctx.beginPath();

		ctx.lineWidth = hovering ? strokeWidth + 1 : strokeWidth;
		ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
		const halfWidth = textBox.closeIcon.width / 2;
		ctx.moveTo(x - halfWidth, y - halfWidth);
		ctx.lineTo(x + halfWidth, y + halfWidth);
		ctx.moveTo(x - halfWidth, y + halfWidth);
		ctx.lineTo(x + halfWidth, y - halfWidth);
		ctx.stroke();
	}

	renderSVG(props, moreProps, ctx) {
		const { stroke, strokeWidth, strokeOpacity, fill, strokeDasharray, text, fontFamily, fontSize, textAnchor } = props;

    const [x, y, icon] = helper(this.props, moreProps, {});

    const line = (<Times
      stroke={stroke}
      strokeWidth={strokeWidth}
      x1={icon.x1}
      y1={icon.y1}
      x2={icon.x2}
      y2={icon.y2}
    />);

    const textCoordinate = (
      <text
        key={2}
        x={x}
        y={y}
        fontFamily={fontFamily}
        fontSize={fontSize}
        dy=".32em"
        fill={stroke}
        textAnchor={textAnchor}
      >
        {text}
      </text>
    );

    return [
      textCoordinate,
      line
    ];

    // return <circle cx={x} cy={y} r={r}
		// 			   strokeWidth={strokeWidth}
		// 			   stroke={stroke}
		// 			   strokeOpacity={strokeOpacity}
		// 			   fill={fill}
		// />;
	}

	render() {
		const { interactiveCursorClass } = this.props;
		const { show } = this.props;
		const { onHover, onUnHover, onClick } = this.props;

		return show
			? <GenericChartComponent ref={this.saveNode}
									 interactiveCursorClass={interactiveCursorClass}
									 isHover={this.isHover}
									 onClickWhenHover={onClick}
									 svgDraw={this.renderSVG}
									 canvasDraw={this.drawOnCanvas}
									 canvasToDraw={getMouseCanvas}
									 onHover={onHover}
									 onUnHover={onUnHover}
									 drawOn={["pan", "mousemove", "drag"]}
			/>
			: null;
	}
}

function helper(props, moreProps, ctx = {}) {
  const { yValue, text, textBox, at } = props;

  const { chartConfig: { yScale, width } } = moreProps;

  const textWidth = 20;
  const y = yScale(yValue);
  const x = at === "left" ? textBox.left + textBox.padding.left : (width - textBox.width - textBox.left + textBox.padding.left);

  const textRightBorder = x + textWidth + textBox.padding.right;
  const iconLeftBorder = textRightBorder + textBox.closeIcon.padding.left;
  const icon = {
    x1: iconLeftBorder,
    y1: y - (textBox.closeIcon.width / 2),
    x2: iconLeftBorder + textBox.closeIcon.width,
    y2: y + (textBox.closeIcon.width / 2)
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
	onClick: PropTypes.func,
};


ClickableShape.defaultProps = {
  at: 'right',
	show: false,
	fillOpacity: 1,
	strokeOpacity: 1,
	strokeWidth: 1,
};

export default ClickableShape;
