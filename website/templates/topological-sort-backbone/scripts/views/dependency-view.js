app.Views.DependencyView = Backbone.View.extend({
	events: {
		"change input[type=checkbox]": "onChange"
	},

	render: function() {
		var template = _.template($('#tmpl-dependency').html(), this.model);
		this.$el.html(template);
		return this;
	},

	// When a checkbox's selection change 
	onChange: function(event) {
		// Get if the checkbox is selected or not
		var isSelected = event.target.checked;

		// Trigger a custom even listened in DependenciesView
		this.trigger("selectionChanged", this.model.item, isSelected);
	},

	// Check/Uncheck the checkbox
	setRequired: function(val) {
		this.$("input[type=checkbox]").prop("checked", val);
	},

	// Disable/Enable the checkbox
	setDisabled: function(val) {
		this.$("input[type=checkbox]").prop("disabled", val);
	}
});