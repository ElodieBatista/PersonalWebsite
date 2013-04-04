app.Views.ResultView = Backbone.View.extend({
	render: function() {
		var objForTmpl = {items: this.model.order};

		if (this.model.error) {
			objForTmpl = this.model.error;
		}

		var template = _.template($('#tmpl-result').html(), objForTmpl);
		this.$el.html(template);

		return this;
	}
});