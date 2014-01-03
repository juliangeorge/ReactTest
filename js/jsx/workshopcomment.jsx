/** @jsx React.DOM */
var React = require('react/addons');

var WorkshopComment = React.createClass({
	handleClick: function(concern) {
		this.props.clicked(concern.target.dataset.id);
	},

	updateConcern: function(data) {
		var target = data.target;
		this.props.save(target.dataset.id,target.value);
	},

	render: function () {
		var test = this.props.concern.text;
		var key = this.props.concern.id;
		return (
			<div key={key} data-id={key} className="genericbox">
				<div className="genericbox-title">
					Concern
					<span
						className="deleteConcern"
						onClick={this.handleClick}
						data-id={key}>DELETE</span>
				</div>
				<div>
					<textarea
						className="textarea"
						placeholder="«Add your concern here»"
						data-id={key}
						onChange={this.updateConcern}
						value={this.props.concern.text}></textarea>
				</div>
			</div>
		);
	}
});

module.exports = WorkshopComment;