var Stats = (function() {
	var self = {};

	self.render = function() {
		_(self)
			.keys()
			.filter(function(key) {
				return key != "render" && key != "resize";
			})
			.each(function(key, i) {
				$('#' + key).text(self[key]);
			})
			.value();

		self.resize();
		Timer.resize();
	}

	self.resize = function() {
		$('#stats')
			.css('left', ($('#chart').offset().left))
			.css('top', Chart.margins.top);
	}

	return self;
}());