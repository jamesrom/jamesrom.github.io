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
		$('#timer').show();
		timerEnd = moment().add(seconds_left * 1000);

		if (seconds_left >= 0) {
			updateTitle(seconds_left);
		}
		else {
			updateTitle("??");
		}
		updateBar();
		
		if (!animating) {
			animate();
		}
	}

	function animate() {
		animating = true;
		// Limit framerate with setTimeout
		setTimeout(function () {
			var timer = (timerEnd - moment());
			timerBar.attr('fill', flairColor(timer / 1000));
			if (timer >= 0) {
				timerBar.attr('y', function() {
					return Chart.yScale(timer / 1000);
				});
			}
			else {
				timerBar.attr('y', function() {
					return Chart.yScale(0);
				});
			}

			if (timer >= 0) {
				$('#timer').text(fmtSeconds(timer / 1000));
				timerBar.attr('height', function(d, i) {
					return Chart.yScale(60) - Chart.yScale(timer / 1000);
				})
				}
			else {
				$('#timer').text("??");
				timerBar.attr('height', function(d, i) {
					return Chart.yScale(60);
				})
			}
			;
			requestAnimationFrame(animate);
		}, 1000 / 30); // 30 fps
	}

	self.resize = function() {
		var statsView = $('#stats');

		if ($(window).width() < 400) {
			$('#timer')
				.addClass('small')
				.css('left', statsView.offset().left)
				.css('top', statsView.offset().top + statsView.outerHeight() + 5);
			return;
		}

		$('#timer')
			.removeClass('small')
			.css('left', statsView.offset().left + statsView.outerWidth() + 10)
			.css('top', Chart.margins.top - 10);
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

	function updateTitle(seconds_left) {
		// Update the title of the page to display seconds left.
		document.title = '[' + seconds_left + 's] ' + baseTitle;
		$('#favicon')
			.prop('type', 'image/x-icon')
			.prop('href', flairIcon(seconds_left));
	}

	function flairIcon(seconds) {
		if (seconds > 51) {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEWCAICoc3EUAAAAC0lEQVR4XmMgEQAAADAAAYFIpkQAAAAASUVORK5CYII=';
		}
		if (seconds > 41) {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAg8ey1KFBAAAAC0lEQVR4XmMgEQAAADAAAYFIpkQAAAAASUVORK5CYII=';
		}
		if (seconds > 31) {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUCvgGpv1oUAAAAC0lEQVR4XmMgEQAAADAAAYFIpkQAAAAASUVORK5CYII=';
		}
		if (seconds > 21) {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEXl2QBYqVHHAAAAC0lEQVR4XmMgEQAAADAAAYFIpkQAAAAASUVORK5CYII=';
		}
		if (seconds > 11) {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEXllQAEZVHOAAAAC0lEQVR4XmMgEQAAADAAAYFIpkQAAAAASUVORK5CYII=';
		}

		return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEXlAAAIUy+RAAAAC0lEQVR4XmMgEQAAADAAAYFIpkQAAAAASUVORK5CYII=';
	}
	
	self.updateBar = updateBar;

	return self;
}());
