var Settings = (function() {
	var self = {};

	self.show = function() {
		$('#settings').show();
	}

	self.hide = function() {
		$('#settings').hide();
	}

	self.resize = function() {
		$('#settings')
			.css('top', ($(window).height() - $('#settings').outerHeight()) / 2)
			.css('left', ($(window).width() - $('#settings').outerWidth()) / 2)
	}
	
	$('#settings button.close').click(self.hide);

	return self;
}())
