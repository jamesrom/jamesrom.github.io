var Chart = (function() {
	var self = {
		margins: {top: 30, bottom: 40, left: 0, right: 30}
	};

	self.height = function() {
		return $('#chart').height() - self.margins.top - self.margins.bottom;
	};

	self.width = function() {
		return $('#chart').width() - self.margins.left - self.margins.right;
	};

	var svg = d3.select('#chart')
		.append('svg:svg')
		.attr({width: '100%', height: '100%'})
		.append('g')
		.attr('transform', 'translate(' + self.margins.left + ',' + self.margins.top + ')');

	var xScale = d3.scale.linear()
		.domain([0, 1])
		.range([4, self.width()]);

	var axisScale = d3.scale.linear()
		.domain([0, 1])
		.range([8, self.width() + 4]);
	var yScale = d3.scale.linear()
		.domain([60, 0])
		.range([self.height(), 0]);

	var xAxis = d3.svg.axis()
		.scale(axisScale)
		.tickFormat(d3.format("d"))
		.orient('bottom');

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('right');

	svg.selectAll("line.grid").data(yScale.ticks()).enter()
		.append("line")
		.attr({
			'class': 'grid',
			'x1' : 4,
			'x2' : self.width(),
			'y1' : yScale,
			'y2' : yScale,
			'shape-rendering' : 'crispEdges',
		});

	svg.append('g')
		.attr('class', 'x axis')
		.attr('shape-rendering', 'crispEdges')
		.attr('transform', 'translate(-4,' + self.height() + ')');

	svg.append('g')
		.attr('shape-rendering', 'crispEdges')
		.attr('class', 'y axis')
		.attr('transform', 'translate(' + self.width() + ',0)');

	svg.selectAll('g.y.axis')
		.call(yAxis);

	// expose
	self.svg = svg;
	self.xScale = xScale;
	self.yScale = yScale;

	self.render = function(data) {
		var clicks = _.filter(data, 'is_click');
		Stats.resets = clicks.length;

		xScale.domain([0, clicks.length+1]);
		axisScale.domain([0, clicks.length+1]);
		svg.selectAll('g.x.axis')
			.call(xAxis);

		yPixel = _.flow(_.property('seconds_left'), yScale);
		flair = _.flow(_.property('seconds_left'), flairColor);

		var rect = svg.selectAll('rect.bar').data(clicks);
		rect.attr("class", "bar")
			.attr('x', function(d, i) {
				return xScale(i);
			})
			.attr('y', yPixel)
			.attr('width', function(d, i) {
				return xScale(i+1) - xScale(i);
			})
			.attr('height', function(d, i) {
				return yScale(60) - yPixel(d)
			})
			.attr('fill', flair);

		rect.enter()
			.append('rect')
			.attr("class", "bar")
			.attr('shape-rendering', 'crispEdges')
			.attr('x', function(d, i) {
				return xScale(i);
			})
			.attr('y', yPixel)
			.attr('width', function(d, i) {
				return xScale(i+1) - xScale(i);
			})
			.attr('height', function(d, i) {
				return yScale(60) - yPixel(d)
			})
			.attr('fill', flair);

		rect.exit()
			.remove();
	}

	self.resize = function() {
		xScale.range([4, self.width()]);
		axisScale.range([8, self.width() + 4]);
		yScale.range([Chart.height(), 0]);

		var grids = svg.selectAll("line.grid")
			.data(yScale.ticks());

		grids.attr({
				'class': 'grid',
				'x1' : 4,
				'x2' : self.width(),
				'y1' : yScale,
				'y2' : yScale,
				'shape-rendering' : 'crispEdges',
			})

		grids.enter()
			.append("line")
			.attr({
				'class': 'grid',
				'x1' : 4,
				'x2' : self.width(),
				'y1' : yScale,
				'y2' : yScale,
				'shape-rendering' : 'crispEdges',
			});

		grids.exit()
			.remove();

		svg.selectAll('g.x.axis')
			.attr('transform', 'translate(-4,' + Chart.height() + ')')
			.call(xAxis);
		svg.selectAll('g.y.axis')
			.attr('transform', 'translate(' + Chart.width() + ',0)')
			.call(yAxis);
	}

	return self;
}());