app.Views.ItemsView = Backbone.View.extend({
	initialize: function() {
		// Bind 'this' to all methods
		_.bindAll(this,
			"onSelected",
			"render",
			"appendOne",
			"appendAll"
		);

		// Listen to the event "add" on the model (collection)
		this.listenTo(this.model.items, 'add', this.appendOne);

		this.selectedItem = null;
	},

	render: function() {
		this.appendAll();
		return this;
	},
	
	// Append an Item
  appendOne: function(item) {
    // Create a Subview for the Item
    var itemView = new app.Views.ItemView({ model: {
    	item: item
    }});

    // Listen to the event "selected" on the ItemView
    this.listenTo(itemView, 'selected', this.onSelected);

    // Render the subview
    itemView.render();
    this.$el.append(itemView.$el);
  },

  // Append all the Model's Items
  appendAll: function() {
		this.$el.html("");
		this.model.items.models.forEach(this.appendOne);
  },

  // When an Item is selected in the ItemView, save it
  onSelected: function(itemView) {
		this.selectedItem = itemView.model.item;

		// Trigger a custom event listened in DependenciesView
		this.trigger('selectedItemChanged', this.selectedItem);
	}
});