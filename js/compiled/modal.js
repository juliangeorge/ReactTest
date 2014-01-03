/** @jsx React.DOM */
var React = require('react/addons');
var ModalBody = require('./ModalBody');

var Modal = React.createClass({displayName: 'Modal',
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
      React.DOM.div( {className:classes, id:"myModal", tabIndex:"-1", role:"dialog", 'aria-labelledby':"myModalLabel", 'aria-hidden':ariaHide, style:show}, 
        React.DOM.div( {className:"modal-dialog"}, 
          React.DOM.div( {className:"modal-content"}, 
            React.DOM.div( {className:"modal-header"}, 
              React.DOM.button( {type:"button", className:"close", 'data-dismiss':"modal", 'aria-hidden':ariaHide, onClick:this.hideModal}, "×"),
              React.DOM.h4( {className:"modal-title", id:"myModalLabel"}, "Modal title")
            ),
            React.DOM.div( {className:"modal-body"}, 
              ModalBody( {modalData:this.props.modalData} )
            ),
            React.DOM.div( {className:"modal-footer"}, 
              React.DOM.button( {type:"button", className:"btn btn-default", 'data-dismiss':"modal"}, "Close"),
              React.DOM.button( {type:"button", className:"btn btn-primary"}, "Save changes")
            )
          )
        )
      )
    );
  }
});

module.exports = Modal;