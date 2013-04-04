app.Models.ItemModel = Backbone.Model.extend({
	// Defaults values
	defaults: function() {
		return {
			id: 0,
			name: "",
			require: {}
		};
	},

	toString: function() { 
		return this.get("name"); 
	}
});
