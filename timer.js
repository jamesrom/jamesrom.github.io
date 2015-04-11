var Timer = (function() {
	var self = {};
	var fmtSeconds = d3.format(".3n");
	var animating;
	var baseTitle = document.title;
	
	var timerEnd;
	var timerBar = Chart.svg.append('rect')
		.attr('class', 'timer-bar')
		.attr('x', 1)
		.attr('y', 1)
		.attr('width', 1)
		.attr('height', 1)
		.attr('fill', '#FFF')
		.attr('shape-rendering', 'crispEdges');

	self.sync = function(seconds_left) {
		timerEnd = moment().add(seconds_left * 1000);
		updateBar();
		
		if (!animating) {
			animate();
		}
	}

	function animate() {
		animating = true;
		var timer = (timerEnd - moment());
		timerBar
			.attr('y', function() {
				return Chart.yScale(timer / 1000);
			})
			.attr('height', function(d, i) {
				return Chart.yScale(60) - Chart.yScale(timer / 1000);
			})
			.attr('fill', flairColor(timer / 1000));
		$('#timer').text(fmtSeconds(timer / 1000));
		document.title = '[' + Math.ceil(timer / 1000) + 's] ' + baseTitle;
		requestAnimationFrame(animate);
	}

	self.resize = function() {
		if ($(window).width() < 400) {
			$('#timer')
				.addClass('small')
				.css('left', $('#stats').offset().left)
				.css('top', $('#stats').offset().top + $('#stats').outerHeight());
			return;
		}

		$('#timer')
			.removeClass('small')
			.css('left', ($('#stats').offset().left + $('#stats').outerWidth()))
			.css('top', Chart.margins.top - 4);
	}
	
	//Used to update timer bar externally when zooming/scrolling
	function updateBar() {
		timerBar
			.attr('x', function(d, i) {
				return Chart.xScale(Stats.resets);
			})
			.attr('width', function(d, i) {
				return Chart.xScale(Stats.resets) - Chart.xScale(Stats.resets - 1);
			});
	}
	
	self.updateBar = updateBar;

	return self;
}());