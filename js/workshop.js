/** @jsx React.DOM */

var Workshop = React.createClass({displayName: 'Workshop',
  getInitialState: function() {
    var concerns = Utils.store('uxrisk-concerns');

    for (var i = 0; i < 6; i++) {
      var newConcern = {
        id: Utils.uuid(),
        text: ""
      };

      concerns = concerns.concat([newConcern]);
    };
    
    return {
      concerns: concerns
    }
  },

  deleteConcernClicked: function(concern) {
    var newConcerns = this.state.concerns.filter(function (candidate) {
      return candidate.id !== concern;
    });

    if(newConcerns.length === 0) {
      var newConcern = {
        id: Utils.uuid(),
        text: ""
      };
      newConcerns = newConcerns.concat([newConcern]);
    }

    this.setState({concerns: newConcerns});
  },

  addConcernClicked: function(order) {
    var newConcern = {
      id: Utils.uuid(),
      text: ""
    };

    var newConcerns = this.state.concerns.concat([newConcern]);
    this.setState({concerns: newConcerns});
  },

  updateConcern: function(id, value) {
    var newConcerns = this.state.concerns.map(function (concern) {
      return concern.id !== id ? concern : Utils.extend({}, concern, {text: value});
    });

    this.setState({concerns: newConcerns});
  },

  submitConcern: function() {
    console.log("submit");
  },

	render: function() {
    var that = this;
    var concernList = this.state.concerns.map(function(concern) {
      return (WorkshopComment(
                {clicked:that.deleteConcernClicked,
                save:that.updateConcern,
                concern:concern} ));
    });

		return (
      React.DOM.div( {className:"my-fluid-container"}, 
  			React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-6"}, 
            React.DOM.div( {className:"row"}, 
              React.DOM.div( {className:"col-md-2"}, 
                React.DOM.img( {src:"img/logo.png"} )
              ),
              React.DOM.div( {className:"col-md-10"}, 
                React.DOM.div( {className:"row"}, 
                  React.DOM.span( {className:"title"}, "Input to Workshop")
                ),
                React.DOM.div( {className:"row"}, 
                  React.DOM.span( {className:"subtitle"}, "Final (?) end to end test")
                )
              )
            )
          ),
  				React.DOM.div( {className:"col-md-6"}, 
  					MenuBar(null )
  				)
  			),
        WorkshopContent( {clicked:this.addConcernClicked}),
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-12"}, 
            concernList
          )
        ),
        BottomMenu( {submit:this.submitConcern})
      )
		);
	}
});

React.renderComponent(
	Workshop(null ),
	document.getElementById('main')
);