(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // TODO: Define a function that hides all main section elements, and then reveals just the #about section:
    $('#about').show().siblings().hide();
  };

  module.aboutController = aboutController;
})(window);
