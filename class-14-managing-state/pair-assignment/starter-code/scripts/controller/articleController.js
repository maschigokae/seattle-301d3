(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    debugger;
    articleView.index(ctx.articles);
    console.log(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // When we load a URI that has a route of something like "articles/some-id", the route controller first hands off control to this method. When the loadById method is invoked, it takes the id field from our SQL data, the specific id number from that id field in the URi we clicked on, and passes that into Article.findWhere. the findWhere method was defined in article.js so that it can take any data field from our SQL database that we want to pass in later when we invoke it, such as here. The next couple of methods in this file do the exact same thing, only using different SQL data fields and values, mapped back to different routes in our routes.js file. In practice, this means that as a user we can click on an article URI, go back in our browser history, or share the URI with a friend, and the routes contained in the URI, including dynamic components such as the id, will map to the correct data in our database.

  // the articleData variable functions as an intermediary between the database data and our next controller method. It persists the data we get back from our SQL database to the context object, which gets passed on to our next callback in the chain.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      console.log(article);
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method does the exact same thing as the method above, just with a different route controller that kicks off a different method! To give a shortened version of the description above, it intercepts a URI like "author/joe-schmoe" and queries the SQL database for the author field and specific author in that data set using the findWhere method. The authorData variable takes the data and persists it on the context. Then 'next()' is called and the relavent data moves along to the next callback back on the routes controller, in this case articlesController.index, which grabs the article data and hands it off to the View.

  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Exact same pattern as the last two. Even simpler: the route controller grabs the route from the URI, hands control to this method, which grabs the category field and specific category name from our data, which we use our catagoryData funciton to persist on the context object, which gets passed to the next (i.e. "next()") callback, which goes back to our next callback in our routes controller, which passes off control to the view. Whew!!!
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
