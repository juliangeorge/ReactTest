/** @jsx React.DOM */
var React = require('react/addons');

var WorkshopComment = React.createClass({displayName: 'WorkshopComment',
	handleClick: function(concern) {
		this.props.clicked(concern.target.dataset.id);
	},

	updateConcern: function(data) {
		var target = data.target;
		this.props.save(target.dataset.id,target.value);
	},

	render: function () {
		var test = this.props.concern.text;
		return (
			React.DOM.div( {'data-id':this.props.concern.id, className:"genericbox"}, 
				React.DOM.div( {className:"genericbox-title"}, 
					" Concern ",
					React.DOM.span(
						{className:"deleteConcern",
						onClick:this.handleClick,
						'data-id':this.props.concern.id}, "DELETE")
				),
				React.DOM.div(null, 
					React.DOM.textarea(
						{className:"textarea",
						placeholder:"«Add your concern here»",
						'data-id':this.props.concern.id,
						onChange:this.updateConcern,
						value:this.props.concern.text})
				)
			)
		);
	}
});

module.exports = WorkshopComment;