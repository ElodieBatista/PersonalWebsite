app.Views.TopologicalSortView = Backbone.View.extend({
	el: "#page",

	events: {
		"submit form#add-item": "addItem",
		"click #btn-sort": "sortItems"
	},

	initialize: function() {
		// Bind 'this' to all methods
		_.bindAll(this, 
			"addItem",
			"sortItems",
			"render"
		);

		this.idCount = this.model.length;
	},

	render: function() {
		// Create a Subview to contain the Items
		this.itemsView = new app.Views.ItemsView({ model: {
    	items: this.model
    }});
    
    // Render the subview and add the result in the html
    this.itemsView.render();
    this.$("#list-item").html(this.itemsView.$el);

    // Create a Subview to contain the Dependencies
    var dependenciesView = new app.Views.DependenciesView({ model: {
    	items: this.model,
    	itemsView: this.itemsView
    }});

    // Render the subview and add the result in the html
    dependenciesView.render();
    this.$("#list-dependency").html(dependenciesView.$el);

    return this;
	},

	// Add an Item to the Model
	addItem: function(e) {
		e.preventDefault();

		var depName = e.target["depName"].value;

		// Check that the name is not empty
		if (!this.isItemNameValid(depName)) {
			alert("This name is not correct or already used.");
		} else {
			// Create a new Item
			var newItem = new app.Models.ItemModel({ 
					id: this.idCount++,
					name: depName
				}
			);

			// Add the new Item to the Model
			this.model.add(newItem);

			// Empty the input text
			e.target["depName"].value = "";
		}
	},

	// Check if we can add an Item possessing this name in the collection
	isItemNameValid: function(itemName) {
		return (itemName !== "" && 
			// Returns the first model in the collection that matches the passed attributes
			this.model.where({name: itemName}).length === 0);
	},

	// Sort all Items
	sortItems: function() {
		if (this.model.length > 0) {
			var result = this.model.topologicalSort();

			if (!this.resultView) {
				// Create a Subview to contain the Items sorted - the result of the Topological Sort algorithm
				this.resultView = new app.Views.ResultView({ model: result });
			}
			
			this.resultView.model = result;

	    // Render the subview and add the result in the html
	    this.resultView.render();
	    this.$("#result-sort").html(this.resultView.$el);
	  } else {
	  	alert("Please, add some items.");
	  }
	}
});