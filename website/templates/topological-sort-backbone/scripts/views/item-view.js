app.Views.ItemView = Backbone.View.extend({
	events: {
		'change input[type=radio]': 'onChange'
	},

	render: function() {
		var template = _.template($('#tmpl-item').html(), this.model);
		this.$el.html(template);
		return this;
	},

	// When radio button's selection change
	onChange: function() {
		// Trigger a custom event listened in ItemsView
		this.trigger('selected', this);
	}
});