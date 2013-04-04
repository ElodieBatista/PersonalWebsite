app.Views.DependenciesView = Backbone.View.extend({
    initialize: function() {
		// Bind 'this' to all methods
		_.bindAll(this, 
			"isRequired",
			"onSelectedItemChanged",
			"onSelectionChanged",
			"appendOne",
			"appendAll"
		);

		this.listenTo(this.model.items, "add", this.appendOne);
		this.listenTo(this.model.itemsView, "selectedItemChanged", this.onSelectedItemChanged);
	},

	render: function() {
		return this;
	},
	
	// Append a Dependency Item
  appendOne: function(item) {
  	// If the dependencyViews already exist
		if (this.dependencyViews) {
	  	// Create a Subview for the Dependency Item
	  	var dependencyView = new app.Views.DependencyView({ model: {
	  		item: item,
	  		isRequired: this.isRequired(item),
	  		isDisabled: this.isDisabled(item)
	  	}});
	  	this.dependencyViews.push(dependencyView);

	  	// Listen to the event "selectionChanged" on the DependencyView
	  	this.listenTo(dependencyView, 'selectionChanged', this.onSelectionChanged);

	  	// Render the subview
	  	dependencyView.render();
	  	this.$el.append(dependencyView.$el);
	  }
  },

  // Append all the Model's Dependency Items
  appendAll: function() {
		this.$el.html("");
		this.dependencyViews = [];
		this.model.items.models.forEach(this.appendOne);
  },

    // Returns if the given Dependency Item is required by the selected item
	isRequired: function(item) {
		if (this.model.itemsView.selectedItem === null) {
			return false;
		} else {
			return (this.model.itemsView.selectedItem.get("require")[item.get("id")] || false);
		}
	},

	// Returns if the given Dependency Item must be disabled
	isDisabled: function(item) {
		if (this.model.itemsView.selectedItem === null) {
			return false;
		}

		// An Item can't require itself
		if (this.model.itemsView.selectedItem.get("id") === item.get("id")) {
			return true;
		}

		// Check if the Dependency Item already requires the selected Item
		if (item.get("require")[this.model.itemsView.selectedItem.get("id")]) {
			return true;
		}

		return false;
	},

	// When an Item selection change
	onSelectedItemChanged: function() {
		var that = this;

		// If the dependencyViews already exist, update them
		if (this.dependencyViews) {
			// For each Dependency Item
			this.dependencyViews.forEach(function(dependencyView) {
				// Set it is required or not
				dependencyView.setRequired(that.isRequired(dependencyView.model.item));

				// Set it is disabled or not
				dependencyView.setDisabled(that.isDisabled(dependencyView.model.item));
			});
		// Create them
		} else {
			this.appendAll();
		}
	},

	// When a Dependency Item is selected in the DependencyView, set it is required or not
	onSelectionChanged: function(item, isSelected) {
		this.model.itemsView.selectedItem.get("require")[item.get("id")] = isSelected;
	}
});