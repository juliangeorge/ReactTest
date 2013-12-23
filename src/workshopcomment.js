/** @jsx React.DOM */

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
		return (
			<div data-id={this.props.concern.id} className="genericbox">
				<div className="genericbox-title">
					Concern
					<span
						className="deleteConcern"
						onClick={this.handleClick}
						data-id={this.props.concern.id}>DELETE</span>
				</div>
				<div>
					<textarea
						className="textarea"
						placeholder="«Add your concern here»"
						data-id={this.props.concern.id}
						onChange={this.updateConcern}
						value={this.props.concern.text}></textarea>
				</div>
			</div>
		);
	}
});