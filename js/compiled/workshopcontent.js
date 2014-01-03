/** @jsx React.DOM */
var React = require('react/addons');

var WorkshopContent = React.createClass({displayName: 'WorkshopContent',
	handleClick: function(event) {
		this.props.clicked();
	},
	
	render: function() {
		return (
			React.DOM.div( {className:"row"}, 
				React.DOM.div( {className:"col-md-12"}, 
					" Concerns ",
					React.DOM.img( {src:"img/add.png", className:"pointer", onClick:this.handleClick})
				)
    	)
		);
	}
});

module.exports = WorkshopContent;