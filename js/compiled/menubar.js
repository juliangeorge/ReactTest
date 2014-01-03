/** @jsx React.DOM */
var React = require('react/addons');
var MenuTile = require('./MenuTile');

var MenuBar = React.createClass({displayName: 'MenuBar',
  getInitialState: function () {
    var invitedByTile = {
      owner:        true,
      heading:      "Åge Tjelta Landråk",
      mainimg:      "img/icon_user_small.png",
      mainImgClass: "img",
      submain:      "",
      footer:       "Invited by",
      name:         "invitedByTile",
      data:         "Invited By"
    };

    var participantsTile = {
      invitee:       true,
      heading:      "anders.osthus@gmail.com",
      mainimg:      "img/icon_user_small.png",
      mainImgClass: "img",
      submain:      "",
      footer:       "1 of 2 participants",
      name:         "participantsTile",
      data:         "Participant"
    };

    var processTile = {
      process:       true,
      heading:      "Analyze Risk",
      mainimg:      "img/icon_circles.png",
      mainImgClass: "img down",
      submain:      "",
      footer:       "Process Step",
      name:         "processTile",
      data:         "Process"
    };

    var calendarTile = {
      calendar:     true,
      heading:      "December",
      main:         "28",
      submain:      "Saturday",
      footer:       "Deadline",
      name:         "calendarTile",
      data:         "Calendar"
    };

    return {
      invitedByTile: invitedByTile,
      participantsTile: participantsTile,
      processTile: processTile,
      calendarTile: calendarTile
    }
  },

  showModal: function(data) {
    this.props.showModal(data);
  },

  render: function() {
    return (
      React.DOM.div(null, 
        MenuTile( {showModal:this.props.showModal, tile:this.state.invitedByTile} ),
        MenuTile( {showModal:this.props.showModal, tile:this.state.participantsTile} ),
        MenuTile( {showModal:this.props.showModal, tile:this.state.processTile} ),
        MenuTile( {showModal:this.props.showModal, tile:this.state.calendarTile} )
      )
    );
  }
});

module.exports = MenuBar;