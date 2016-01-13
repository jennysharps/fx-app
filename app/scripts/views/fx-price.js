define([
	'backbone'
], function(Backbone) {
	var view = {};

	view.initialize = function() {
		console.log('Photo detail view initialized');
	};

	view.template = _.template($("#PhotoViewTemplate").html());
	//view.template = _.template($("#PhotoViewTemplate").html());

	/*view.el = '#main';*/

	view.tagName = 'tr';

	view.render = function() {
		this.el.innerHTML = this.template(this.model.toJSON());
		return this;
	};

	/*view.className = 'media photo-item';*/

	/*view.attributes = function() {
		return {
			'data-client-id': this.model.cid
		}
	};*/

	return Backbone.View.extend(view);
});