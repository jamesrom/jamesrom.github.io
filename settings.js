var Settings = (function() {
	var self = {};

	self.collapsed = true;

	$("#collapse-settings").click(function(element) {
		self.collapsed = !self.collapsed;
		self.render();
	});

	$("#sorted").change(function(element) {
		Chart.sorted= element.currentTarget.checked;
		Chart.render(data);
	});

	self.clear = function() {
		if (window.confirm("Do you want to clear data?")) {
			data = [];
		}
	};

	self.render = function() {
		if (self.collapsed) {
			$("#settings-menu").hide();
		} else {
			$("#settings-menu").show();
		}

		self.resize();
	};

	self.resize = function() {
		var timerView = $("#timer");
		if ($(window).width() < 400) {
			$('#settings')
				.addClass('small')
				.css('left', timerView.offset().left + timerView.outerWidth() + 5)
				.css('top', timerView.offset().top);
				return;
		}

		$('#settings')
			.removeClass('small')
			.css('left', timerView.offset().left + timerView.outerWidth() + 10)
			.css('top', timerView.offset().top);
	};

	return self;
}());
