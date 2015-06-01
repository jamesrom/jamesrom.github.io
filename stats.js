var Stats = (function() {
	var self = {};

	self.clicks = 0;
	self.resets = 0;
	
	self.total_reds = 0;
	self.red_percentage = "(0.000%)";
	self.total_oranges = 0;
	self.orange_percentage = "(0.000%)";
	self.total_yellows = 0;
	self.yellow_percentage = "(0.000%)";
	self.total_greens = 0;
	self.green_percentage = "(0.000%)";
	self.total_blues = 0;
	self.blue_percentage = "(0.000%)";
	self.total_purples = 0;
	self.purple_percentage = "(0.000%)";
	self.sum_of_times = 0;
	self.lowest_time = 60;
	self.sum_of_times = 0;
	self.average_time = 0;
	self.resets_per_minute = 0;
	self.median_click_time = 0;

	self.render = function() {
		_(self)
			.keys()
			.filter(function(key) {
				return key != "render" && key != "resize";
			})
			.each(function(key, i) {
				$('#stats .' + key).text(self[key]);
			})
			.value();

		self.resize();
		Timer.resize();
		Settings.resize();
	};

	self.resize = function() {
		if ($(window).width() < 400) {
			$('#stats')
				.addClass('small')
				.css('left', ($('#chart').offset().left))
				.css('top', Chart.margins.top - 5);
			return;
		}

		$('#stats')
			.removeClass('small')
			.css('left', ($('#chart').offset().left))
			.css('top', Chart.margins.top - 10);
	}

	return self;
}());
