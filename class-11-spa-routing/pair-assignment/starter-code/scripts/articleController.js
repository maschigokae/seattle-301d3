(function(module) {
  var articlesController = {};

  // TODO: Create the `articles` table when the controller first loads,
  //  with the code that used to be in index.html:

  articlesController.index = function() {
    // DONE: Complete this function that kicks off the fetching and rendering
    //  of articles, using the same
    //  code that used to be in index.html:
    Article.createTable();
    Article.fetchAll(articleView.initIndexPage);

    // DONE: But wait! There's more: Also be sure to hide all the main section
    //  elements, and reveal the articles section:
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
