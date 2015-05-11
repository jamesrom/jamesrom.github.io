var Settings = (function() {
  var self = {};

  self.collapsed = true;

  $("#collapse-settings").change(function(element) {
    self.collapsed = !element.currentTarget.checked;
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
      $('#stats')
        .addClass('small')
        .css('left', timerView.offset().left)
        .css('top', timerView.offset().top + timerView.outerHeight());
    }
    $('#settings')
      .removeClass('small')
      .css('left', timerView.offset().left + timerView.outerWidth() + 10)
      .css('top', Chart.margins.top - 10);
  };

  return self;
}());