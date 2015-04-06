var data = [];
var clicks = [];
var chart, xScale, yScale, xAxis, yAxis, axisScale;
var timerBar, animating = false;
var sock;
var fmt = d3.format("0,000");


function init() {
	$(window).on('resize', resize);
	Stats.start = moment().format("YYYY-MM-DD HH:mm:ss");
	resize();
}

function flairColor(seconds) {
	if (seconds > 51) {
		return '#820080';
	}
	if (seconds > 41) {
		return '#0083C7';
	}
	if (seconds > 31) {
		return '#02be01';
	}
	if (seconds > 21) {
		return '#E5D900';
	}
	if (seconds > 11) {
		return '#e59500';
	}

	return '#e50000';
}

function resize() {
	Chart.resize();
	Stats.resize();
	Timer.resize();

	if ($(window).width() < 400) {
		$('.footer.twitter, .footer.web').hide();
	}
	else {
		$('.footer.twitter, .footer.web').show();
	}
}