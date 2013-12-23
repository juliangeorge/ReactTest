/** @jsx React.DOM */

var Workshop = React.createClass({
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
      return (<WorkshopComment
                clicked={that.deleteConcernClicked}
                save={that.updateConcern}
                concern={concern} />);
    });

		return (
      <div className="my-fluid-container">
  			<div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2">
                <img src="img/logo.png" />
              </div>
              <div className="col-md-10">
                <div className="row">
                  <span className="title">Input to Workshop</span>
                </div>
                <div className="row">
                  <span className="subtitle">Final (?) end to end test</span>
                </div>
              </div>
            </div>
          </div>
  				<div className="col-md-6">
  					<MenuBar />
  				</div>
  			</div>
        <WorkshopContent clicked={this.addConcernClicked}/>
        <div className="row">
          <div className="col-md-12">
            {concernList}
          </div>
        </div>
        <BottomMenu submit={this.submitConcern}/>
      </div>
		);
	}
});

React.renderComponent(
	<Workshop />,
	document.getElementById('main')
);