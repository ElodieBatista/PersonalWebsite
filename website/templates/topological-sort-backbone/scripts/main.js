window.app = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  // Create the main view and the home route
  init: function() {
    var items = new app.Collections.ItemCollection();

    // Main View
    var view = new app.Views.TopologicalSortView({
      model: items
    });
    
    // Render the main view on visit the home page
    var router = new app.Routers.HomeRouter();
    router.on('route:home', function() {
    	view.render();
    });
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  // Start
  app.init();
});