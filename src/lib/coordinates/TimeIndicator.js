import React from 'react';
import PropTypes from 'prop-types';

const TimeIndicator = ({ width, height, fill, x, y }) => {
	return (
		<g>
			<rect
				{...{ width, height, fill, x, y }}
			/>
			<text
				key={2}
				x={x}
				y={y + height / 2}
				fontSize={12}
				dy=".32em"
				fill="white"
			>
				{calcTimeToEnd(5)}
			</text>
		</g>
	);
};

TimeIndicator.propTypes = {};

export default TimeIndicator;

const calcTimeToEnd = (minutes) => {
	const nowTimestamp = Math.floor(Date.now() / 1000);
	const divider = minutes * 60;
	const endTimestamp = (Math.floor(nowTimestamp / divider) + 1) * divider;
	return timeFormat(endTimestamp - nowTimestamp);
};

const num = (val) => {
	val = Math.floor(val);
	return val < 10 ? `0${val}` : val;
};

const timeFormat = (sec) => {
	const hours = sec / 3600 % 24;
	const minutes = sec / 60 % 60;
	const seconds = sec % 60;

	return `${num(hours)}:${num(minutes)}:${num(seconds)}`;
};
