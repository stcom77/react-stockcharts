import React from "react";

var TimeIndicator = function TimeIndicator(_ref) {
	var width = _ref.width,
	    height = _ref.height,
	    fill = _ref.fill,
	    x = _ref.x,
	    y = _ref.y;

	if (!width || !height) {
		return null;
	}

	return React.createElement(
		"g",
		null,
		React.createElement("rect", { width: width, height: height, fill: fill, x: x, y: y }),
		React.createElement(
			"text",
			{
				key: 2,
				x: x,
				y: y + height / 2,
				fontSize: 12,
				dy: ".32em",
				fill: "white"
			},
			calcTimeToEnd(5)
		)
	);
};

export default TimeIndicator;

var calcTimeToEnd = function calcTimeToEnd(minutes) {
	var nowTimestamp = Math.floor(Date.now() / 1000);
	var divider = minutes * 60;
	var endTimestamp = (Math.floor(nowTimestamp / divider) + 1) * divider;
	return timeFormat(endTimestamp - nowTimestamp);
};

var num = function num(val) {
	val = Math.floor(val);
	return val < 10 ? "0" + val : val;
};

var timeFormat = function timeFormat(sec) {
	var hours = sec / 3600 % 24;
	var minutes = sec / 60 % 60;
	var seconds = sec % 60;

	return num(hours) + ":" + num(minutes) + ":" + num(seconds);
};
//# sourceMappingURL=TimeIndicator.js.map