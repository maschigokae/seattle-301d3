(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // TODO: Define a function that hides all main section elements, and then reveals just the #about section:
    
    //note: temp placeholders below...
    $('most-stuff').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
