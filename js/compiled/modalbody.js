/** @jsx React.DOM */
var React = require('react/addons');

var ModalBody = React.createClass({displayName: 'ModalBody',
  render: function() {
    return (
      React.DOM.p(null, this.props.modalData)
    );
  }
});

module.exports = ModalBody;