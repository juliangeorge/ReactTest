/** @jsx React.DOM */
var React = require('react/addons');

var Modal = React.createClass({
  hideModal: function() {
    this.props.closeAction();
  },

  render: function() {
    var show = {display:'none'};
    var ariaHide = true;
    if(this.props.isVisible === true) {
      show.display = 'block';
      ariaHide = false;
    }

    var cx = React.addons.classSet;
    var classes = cx({
      'modal': true,
      'fade': true,
      'in': this.props.isVisible
    });

    return (
      <div className={classes} id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden={ariaHide} style={show}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden={ariaHide} onClick={this.hideModal}>&times;</button>
              <h4 className="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;