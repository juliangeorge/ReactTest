/** @jsx React.DOM */
var React = require('react/addons');

var ModalBody = React.createClass({
  render: function() {
    return (
      <p>{this.props.modalData}</p>
    );
  }
});

module.exports = ModalBody;