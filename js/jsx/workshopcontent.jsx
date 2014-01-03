/** @jsx React.DOM */
var React = require('react/addons');

var WorkshopContent = React.createClass({
	handleClick: function(event) {
		this.props.clicked();
	},
	
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					Concerns
					<img src="img/add.png" className="pointer" onClick={this.handleClick}/>
				</div>
    	</div>
		);
	}
});

module.exports = WorkshopContent;