/** @jsx React.DOM */
var React = require('react/addons');
var MenuBar = require('./MenuBar');
var WorkshopComment = require('./WorkshopComment');
var WorkshopContent = require('./WorkshopContent');
var BottomMenu = require('./BottomMenu');
var Modal = require('./Modal');
var Utils = require('Utils');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Workshop = React.createClass({
  getInitialState: function() {
    var concerns = this.resetConcerns();
    
    return {
      concerns: concerns,
      isModalVisible: false
    }
  },

  showModal: function() {
    //isModalVisible = true;
    this.setState({isModalVisible: true});
  },

  hideModal: function() {
    //isModalVisible = false;
    this.setState({isModalVisible: false});
  },

  resetConcerns: function() {
    var concerns = Utils.store('uxrisk-concerns');

    for (var i = 0; i < 6; i++) {
      var newConcern = {
        id: Utils.uuid(),
        text: ""
      };

      concerns = concerns.concat([newConcern]);
    };

    return concerns;
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
    console.log(this.state.concerns);
    var concerns = this.resetConcerns();
    this.setState({concerns: concerns});
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
          <div className="col-md-5">
            <div className="row">
              <img src="img/logo.png" className="mainImg" />
              <div className="col-xs-8 col-md-8 col-md-8">
                <div className="row">
                  <span className="title">Input to Workshop</span>
                </div>
                <div className="row">
                  <span className="subtitle">Final (?) end to end test</span>
                </div>
              </div>
            </div>
          </div>
  				<div className="col-md-7">
  					<MenuBar />
  				</div>
  			</div>
        <WorkshopContent clicked={this.addConcernClicked}/>
        <div className="row">
          <div className="col-md-12">
            <ReactTransitionGroup transitionName="box">
              
              {this.state.concerns.map(function(concern) {
                return (<WorkshopComment
                  key={concern.id}
                  clicked={that.deleteConcernClicked}
                  save={that.updateConcern}
                  concern={concern} />);
              })}
            </ReactTransitionGroup>
          </div>
        </div>
        <Modal isVisible={this.state.isModalVisible} closeAction={this.hideModal} />
        <BottomMenu submit={this.submitConcern}/>
      </div>
		);
	}
});

module.exports = Workshop;