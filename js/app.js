require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');

var BottomMenu = React.createClass({displayName: 'BottomMenu',displayName: 'BottomMenu',
  submitClicked: function() {
    this.props.submit();
  },

  closeWindow: function() {
    window.open('', '_self');
    window.close();
  },

  render: function() {
    return (
      React.DOM.nav( {className:"navbar navbar-default navbar-fixed-bottom", role:"navigation"}, 
        React.DOM.ul( {className:"nav navbar-nav navbar-right"}, 
          React.DOM.li( {className:"close"}, React.DOM.button( {className:"close", onClick:this.closeWindow}, "Close")),
          React.DOM.li( {className:"lastItem send"}, React.DOM.button( {className:"send", onClick:this.submitClicked}, "Send all Concerns"))
        )
      )
    );
  }
});

module.exports = BottomMenu;
},{"react/addons":18}],2:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');
var MenuTile = require('./MenuTile');

var MenuBar = React.createClass({displayName: 'MenuBar',displayName: 'MenuBar',
  getInitialState: function () {
    var invitedByTile = {
      owner:        true,
      heading:      "Åge Tjelta Landråk",
      mainimg:      "img/icon_user_small.png",
      mainImgClass: "img",
      submain:      "",
      footer:       "Invited by",
      name:         "invitedByTile"
    };

    var participantsTile = {
      invitee:       true,
      heading:      "anders.osthus@gmail.com",
      mainimg:      "img/icon_user_small.png",
      mainImgClass: "img",
      submain:      "",
      footer:       "1 of 2 participants",
      name:         "participantsTile"
    };

    var processTile = {
      process:       true,
      heading:      "Analyze Risk",
      mainimg:      "img/icon_circles.png",
      mainImgClass: "img down",
      submain:      "",
      footer:       "Process Step",
      name:         "processTile"
    };

    var calendarTile = {
      calendar:     true,
      heading:      "December",
      main:         "28",
      submain:      "Saturday",
      footer:       "Deadline",
      name:         "calendarTile"
    };

    return {
      invitedByTile: invitedByTile,
      participantsTile: participantsTile,
      processTile: processTile,
      calendarTile: calendarTile
    }
  },

  render: function() {
    return (
      React.DOM.div(null, 
        MenuTile( {tile:this.state.invitedByTile} ),
        MenuTile( {tile:this.state.participantsTile} ),
        MenuTile( {tile:this.state.processTile} ),
        MenuTile( {tile:this.state.calendarTile} )
      )
    );
  }
});

module.exports = MenuBar;
},{"./MenuTile":3,"react/addons":18}],3:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');
var Slider = require('../vendor/slidr.js');

var MenuTile = React.createClass({displayName: 'MenuTile',displayName: 'MenuTile',
  componentDidMount: function() {
    var s = Slider.create(this.props.tile.name, {
      controls: 'none',
      overflow: false,
      timing: { 'cube': '1s ease-in' },
      transition: 'cube'
    });
    s.add('h', ['one', 'two', 'one'], 'cube').auto(10000);
    s.start();
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'tile': true,
      'owner': this.props.tile.owner,
      'invitee': this.props.tile.invitee,
      'process': this.props.tile.process,
      'calendar': this.props.tile.calendar,
      'visible-lg': true,
      'visible-md': true
    });

    var main = this.props.tile.mainimg
      ? React.DOM.img( {src:this.props.tile.mainimg, className:this.props.tile.mainImgClass})
      : React.DOM.div(null, 
          React.DOM.span( {className:"text large"}, this.props.tile.main),
          React.DOM.span( {className:"text"}, this.props.tile.submain)
        );

    return (
      React.DOM.div( {id:this.props.tile.name, className:"inline"}, 
        React.DOM.div( {className:classes, 'data-slidr':"one"}, 
          React.DOM.div( {className:"tile-content"}, 
            React.DOM.span( {className:"text"}, this.props.tile.heading),
            main
          ),
          React.DOM.div( {className:"tile-footer"}, 
            React.DOM.span( {className:"text"}, this.props.tile.footer)
          )
        ),
        React.DOM.div( {className:classes, 'data-slidr':"two"}, 
          React.DOM.div( {className:"tile-footer"}, 
            React.DOM.span( {className:"text"}, "Hei")
          )
        )
      )
    );
  }
});

module.exports = MenuTile;
},{"../vendor/slidr.js":13,"react/addons":18}],4:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');

var WorkshopComment = React.createClass({displayName: 'WorkshopComment',displayName: 'WorkshopComment',
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
			React.DOM.div( {'data-id':this.props.concern.id, className:"genericbox"}, 
				React.DOM.div( {className:"genericbox-title"}, 
					" Concern ",
					React.DOM.span(
						{className:"deleteConcern",
						onClick:this.handleClick,
						'data-id':this.props.concern.id}, "DELETE")
				),
				React.DOM.div(null, 
					React.DOM.textarea(
						{className:"textarea",
						placeholder:"«Add your concern here»",
						'data-id':this.props.concern.id,
						onChange:this.updateConcern,
						value:this.props.concern.text})
				)
			)
		);
	}
});

module.exports = WorkshopComment;
},{"react/addons":18}],5:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');

var WorkshopContent = React.createClass({displayName: 'WorkshopContent',displayName: 'WorkshopContent',
	handleClick: function(event) {
		this.props.clicked();
	},
	
	render: function() {
		return (
			React.DOM.div( {className:"row"}, 
				React.DOM.div( {className:"col-md-12"}, 
					" Concerns ",
					React.DOM.img( {src:"img/add.png", className:"pointer", onClick:this.handleClick})
				)
        	)
		);
	}
});

module.exports = WorkshopContent;
},{"react/addons":18}],6:[function(require,module,exports){
module.exports=require(1)
},{"react/addons":18}],7:[function(require,module,exports){
module.exports=require(2)
},{"./MenuTile":3,"react/addons":18}],8:[function(require,module,exports){
module.exports=require(3)
},{"../vendor/slidr.js":13,"react/addons":18}],9:[function(require,module,exports){
/** @jsx React.DOM */

(function (window) {
	'use strict';

	window.Utils = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
					.toString(16);
			}

			return uuid;
		},

		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},

		store: function (namespace, data) {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},

		extend: function () {
			var newObj = {};
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		}
	};

})(window);
},{}],10:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');
var MenuBar = require('./MenuBar');
var WorkshopComment = require('./WorkshopComment');
var WorkshopContent = require('./WorkshopContent');
var BottomMenu = require('./BottomMenu');
var Utils = require('Utils');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Workshop = React.createClass({displayName: 'Workshop',displayName: 'Workshop',
  getInitialState: function() {
    var concerns = this.resetConcerns();
    
    return {
      concerns: concerns
    }
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
      return (WorkshopComment(
                {clicked:that.deleteConcernClicked,
                save:that.updateConcern,
                concern:concern} ));
    });

		return (
      React.DOM.div( {className:"my-fluid-container"}, 
  			React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-5"}, 
            React.DOM.div( {className:"row"}, 
              React.DOM.img( {src:"img/logo.png", className:"mainImg"} ),
              React.DOM.div( {className:"col-xs-8 col-md-8 col-md-8"}, 
                React.DOM.div( {className:"row"}, 
                  React.DOM.span( {className:"title"}, "Input to Workshop")
                ),
                React.DOM.div( {className:"row"}, 
                  React.DOM.span( {className:"subtitle"}, "Final (?) end to end test")
                )
              )
            )
          ),
  				React.DOM.div( {className:"col-md-7"}, 
  					MenuBar(null )
  				)
  			),
        WorkshopContent( {clicked:this.addConcernClicked}),
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-12"}, 
            ReactTransitionGroup( {transitionName:"box"}, 
              concernList
            )
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

module.exports = Workshop;
},{"./BottomMenu":1,"./MenuBar":2,"./WorkshopComment":4,"./WorkshopContent":5,"Utils":"yTmIRM","react/addons":18}],11:[function(require,module,exports){
module.exports=require(4)
},{"react/addons":18}],12:[function(require,module,exports){
module.exports=require(5)
},{"react/addons":18}],13:[function(require,module,exports){
/*!
 * slidr v0.4.0 - A Javascript library for adding slide effects.
 * bchanx.com/slidr
 * MIT licensed
 *
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 */
(function(root, factory) {
  // CommonJS
  if (typeof exports === 'object') module['exports'] = factory();

  // AMD module
  else if (typeof define === 'function' && define['amd']) define(factory);

  // Browser globals
  else root['slidr'] = factory();

} (this, function() {
  'use strict';

  // Traverse [keys] in {object} to lookup a value, or null if nothing found.
  function lookup(obj, keys) {
    var result = obj;
    for (var k in keys) {
      if (!result || !result.hasOwnProperty(keys[k])) return null;
      result = result[keys[k]];
    }
    return (result === obj) ? null : result;
  }

  // Merge all properties from {arguments} and return the new {object}.
  function extend(/* arg1, arg2.. */) {
    var newobj = {};
    for (var i = 0, arg; arg = arguments[i]; i++) for (var a in arg) newobj[a] = arg[a];
    return newobj;
  }

  // Check whether node a contains node b.
  function contains(a, b) {
    return (a.contains) ? a.contains(b) : (a.compareDocumentPosition) ? a.compareDocumentPosition(b) & 16 : 0;
  }

  // Returns the tag name, normalized.
  function tagName(el) {
    return (el.tagName) ? el.tagName.toLowerCase() : null;
  }

  // Simple indexOf polyfill for IE8.
  function indexOf(list, val) {
    if (Array.prototype.indexOf) return list.indexOf(val);
    for (var i = 0, len = list.length; i < len; i++) if (list[i] === val) return i;
    return -1;
  }
  
  // Simple trim polyfill for IE8.
  function trim(str) {
    return ("".trim) ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }

  // Creates a document element, and sets any properties passed in.
  function createEl(tag, props) {
    var el = document.createElement(tag);
    for (var p in props) el[p] = props[p];
    return el;
  }

  // Add/rm class(es) on an element.
  function classname(el, type /* class1, class2... */) {
    var clsnames = trim(el.className);
    clsnames = (clsnames) ? clsnames.split(/\s+/) : [];
    for (var a = 2, cls, idx; cls = arguments[a]; a++) {
      idx = indexOf(clsnames, cls);
      if (type === 'add' && idx < 0) clsnames.push(cls);
      if (type === 'rm' && idx >= 0) clsnames.splice(idx, 1);
    }
    el.className = clsnames.join(' ');
    return el;
  }

  // Normalize a string. Strip spaces, single, and double quotes then return in alphabetical order.
  function normalize(str) {
    return str.replace(/[\s'"]/gi, '').split('').sort().join('');
  }

  // Set name:value attribute for an element.
  function setattr(el, name, value) {
    if (el && el.setAttribute) el.setAttribute(name, value);
    return el;
  }

  // Get attribute from an element.
  function getattr(el, name) {
    return (el && el.getAttribute) ? el.getAttribute(name) : null;
  }

  // If `prop` is a string, do a CSS lookup. Otherwise, add CSS styles to `el`.
  function css(el, prop) {
    if (typeof prop === 'string') {
      var view = (document.defaultView) ? document.defaultView.getComputedStyle(el) : el.currentStyle;
      var style = view[browser.fix(prop)];
      if (!style && prop === 'opacity') style = (view.filter) ? view.filter.split('=')[1].replace(')', '') : '1';
      if (style) {
        var val = style.slice(0, -2);
        return (style.slice(-2) === 'px' && !isNaN(parseInt(val)) && val.search('px') <= 0) ? parseInt(val) : style;
      }
      return 'none';
    }
    for (var p in prop) if (browser.fix(p)) el.style[browser.fix(p)] = prop[p];
    return el;
  }

  // Bind element event(s) to a callback.
  function bind(el, ev, callback, optUnbind) {
    if (typeof(ev) === 'string') ev = [ev];
    for (var i = 0, e, isAnimation; e = ev[i]; i++) {
      isAnimation = indexOf(browser.animations, e) > 0;
      e = (e === 'click' && 'ontouchstart' in window) ? 'touchend' : 
        (el.attachEvent && !isAnimation) ? 'on' + e : e;
      (el.attachEvent && !isAnimation) ? (optUnbind ? el.detachEvent(e, callback) : el.attachEvent(e, callback)) :
        (optUnbind ? el.removeEventListener(e, callback) : el.addEventListener(e, callback));
    }
  }

  // Unbind element event(s) to a callback.
  function unbind(el, ev, callback) {
    bind(el, ev, callback, true);
  }

  // Check whether element has border-box set.
  function borderbox(el) {
    return css(el, 'box-sizing') === 'border-box';
  }

  var browser = {

    // Vendor prefixes.
    prefixes: ['webkit', 'Moz', 'ms', 'O'],

    // CSS property cache.
    cache: {},

    // CSS keyframe cache.
    keyframes: {},

    // Flag for IE < 8.
    isIE: function() {
      if (browser.supports('filter') && !browser.supports('opacity')) browser.isIE = function() { return true; };
      else browser.isIE = function() { return false; };
      return browser.isIE();
    },

    // Reference to the document style element.
    styleEl: document.getElementsByTagName('html')[0]['style'],

    // Slidr CSS style sheet.
    styleSheet: (function() {
      var el = createEl('style', { 'type' : 'text/css' });
      document.getElementsByTagName('head')[0].appendChild(el);
      return el.sheet || el.styleSheet;
    }()),

    // Get browser specific stylesheet rules.
    cssRules: function() {
      browser.cssRules = function() { return browser.styleSheet.cssRules || browser.styleSheet.rules; };
      return browser.cssRules();
    },

    // Use browser specific insert for stylesheets.
    insertRule: function(rule) {
      if (browser.styleSheet.insertRule) {
        browser.insertRule = function(r) { browser.styleSheet.insertRule(r, browser.cssRules().length); };
      } else {
        browser.insertRule = function(r) {
          var split = r.split(' {');
          if (split.length === 2) {
            var left = split[0];
            var right = trim(split[1].replace(/;?\s?}$/g, ''));
            if (left && right) browser.styleSheet.addRule(left, right);
          }
        }
      }
      browser.insertRule(rule);
    },

    // Adds a CSS rule to our Slidr stylesheet.
    addCSSRule: function(name, rule, optSafe) {
      name = normalize(name);
      for (var r = 0, cssRule, cssName; cssRule = browser.cssRules()[r]; r++) {
        cssName = normalize((cssRule.name || cssRule.selectorText || cssRule.cssText.split(' {')[0] || ''));
        if (cssName === name) {
          if (!!optSafe || (normalize(cssRule.cssText) === normalize(rule))) return;
          browser.styleSheet.deleteRule(r);
          break;
        }
      }
      browser.insertRule(rule);
    },

    // Creates a CSS rule.
    createRule: function(name, props) {
      var rule = [name, '{'];
      for (var p in props) if (browser.fix(p, true)) rule.push(browser.fix(p, true) + ':' + props[p] + ';');
      rule.push('}');
      return rule.join(' ');
    },

    // Creates a CSS style.
    createStyle: function(name, props, optSafe) {
      browser.addCSSRule(name, browser.createRule(name, props), optSafe);
    },

    // Get browser prefix.
    prefix: function(prop) {
      return (prop.split('-').length === 3) ? '-' + prop.split('-')[1] + '-' : '';
    },

    // Creates a keyframe animation rule.
    createKeyframe: function(name, rules) {
      var animation = browser.fix('animation', true);
      if (animation && !browser.keyframes[name]) {
        var rule = ['@' + browser.prefix(animation) + 'keyframes ' + name + ' {'];
        for (var r in rules) rule.push(browser.createRule(r + '%', rules[r]));
        rule.push('}');
        browser.addCSSRule(name, rule.join(' '));
        browser.keyframes[name] = true;
      }
    },

    // Returns the browser supported property name, or null.
    fix: function(prop, forCSS) {
      if (!(prop in browser.cache)) {
        var parts = prop.split('-');
        for (var i = 0, p; p = parts[i]; i++) parts[i] = p[0].toUpperCase() + p.toLowerCase().slice(1);
        var domprop = parts.join('');
        domprop = domprop[0].toLowerCase() + domprop.slice(1);
        if (browser.styleEl[domprop] !== undefined) {
          browser.cache[prop] = { css: prop, dom: domprop };
        } else {
          domprop = parts.join('');
          for (i = 0; i < browser.prefixes.length; i++) {
            if (browser.styleEl[browser.prefixes[i] + domprop] !== undefined) {
              browser.cache[prop] = {
                css: '-' + browser.prefixes[i].toLowerCase() + '-' + prop, dom: browser.prefixes[i] + domprop
              };
            }
          }
        }
        if (!browser.cache[prop]) browser.cache[prop] = null;
      }
      return (browser.cache[prop] !== null) ? (forCSS) ? browser.cache[prop].css : browser.cache[prop].dom : null;
    },

    // Check whether all given css properties are supported in the browser.
    supports: function(/* prop1, prop2... */) {
      for (var i = 0, prop; prop = arguments[i]; i++) if (!browser.fix(prop)) return false;
      return true;
    },

    // Add CSS keyframes.
    add: {
      'fade': function(name, oStart, oEnd) {
        browser.createKeyframe(name, {
          '0': { 'opacity': oStart, 'visibility': 'visible' }, '100': { 'opacity': oEnd, 'visibility': 'hidden' }
        });
      },
      'linear': function(name, type, tStart, tEnd, oStart, oEnd) {
        browser.createKeyframe(name, {
          '0': { 'transform': 'translate' + tStart[0] + '(0%)',
            'opacity': (type === 'in' ? '0': oStart), 'visibility': 'visible' },
          '1': { 'transform': 'translate' + tStart + 'px)', 'opacity': oStart },
          '99': { 'transform': 'translate' + tEnd + 'px)', 'opacity': oEnd },
          '100': { 'transform': 'translate' + tEnd[0] + '(0%)',
            'opacity': (type === 'out' ? '0' : oEnd), 'visibility': 'hidden' }
        });
      },
      'cube': function(name, rStart, rEnd, tZ, oStart, oEnd) {
        browser.createKeyframe(name, {
          '0': { 'transform': 'rotate' + rStart + '0deg) translateZ(' + tZ + 'px)', 'opacity': oStart,
            'visibility': 'visible' },
          '100': { 'transform': 'rotate' + rEnd + '0deg) translateZ(' + tZ + 'px)', 'opacity': oEnd,
            'visibility': 'hidden' }
        });
      }
    },

    // CSS classnames for breadcrumbs/controls.
    classnames: function(cls) {
      return {
        main: cls,
        maincss: 'aside[id*="-' + cls + '"]',
        nav: 'slidr-' + cls,
        navcss: 'aside[id*="-' + cls + '"] .slidr-' + cls,
        data: 'data-slidr-' + cls,
        id: function(_, css) { return css ? 'aside[id="' + _.id + '-' + cls + '"]' : _.id + '-' + cls; }
      }
    },

    // Sanitize events for IE.
    sanitize: function(e) {
      e = e || window.event;
      if (!e.target) e.target = e.srcElement;
      if (!e.currentTarget) e.currentTarget = e.srcElement;
      if (!e.which && e.keyCode) e.which = e.keyCode;
      return e;
    },

    // Stop event propagation.
    stop: function(e) {
      e = e || window.event;
      e.cancelBubble = true;
      e.returnValue = false;
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      return false;
    },

    // Animationend events.
    animations:  ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd']
  };

  var transition = {

    // Available transitions.
    available: ['cube', 'fade', 'linear', 'none'],

    // Validates a given transition.
    validate: function(_, trans) {
      trans = trans || _.settings['transition'];
      return (indexOf(transition.available, trans) < 0 || !fx.supported[trans]) ? 'none' : trans;
    },

    // Get the direction transition for an element.
    get: function(_, el, type, dir) {
      return lookup(_.trans, [el, (type === 'in') ? slides.opposite(dir) : dir]);
    },

    // Sets the direction transition for an element.
    set: function(_, el, dir, trans) {
      trans = transition.validate(_, trans);
      if (!_.trans[el]) _.trans[el] = {};
      _.trans[el][dir] = trans;
      return trans;
    },

    // Applies a directional transition to an element entering/leaving the Slidr.
    apply: function(_, el, type, dir, trans) {
      breadcrumbs.update(_, el, type);
      fx.animate(_, el, trans, type, dir);
    }
  };

  var callback = {

    // Cache before/after hashes to prevent duplicate calls.
    cache: {},

    // Generate a unique hash string per metadata.
    hash: function(meta) {
      return [meta['id'], meta['in']['slidr'], meta['in']['trans'], meta['in']['dir'], meta['out']['slidr'],
        meta['out']['trans'], meta['out']['dir']].join('-');
    },

    // Generate callback metadata.
    meta: function(_, outs, ins, outdir, indir, outtrans, intrans) {
      return {
        'id': _.id,
        'in': { 'el': slides.get(_, ins).el, 'slidr': ins, 'trans': intrans, 'dir': indir },
        'out': { 'el': slides.get(_, outs).el, 'slidr': outs, 'trans': outtrans, 'dir': slides.opposite(outdir) }
      };
    },

    // Callback before a Slidr transition.
    before: function(_, meta) {
      var hash = callback.hash(meta);
      if (!callback.cache[hash]) callback.cache[hash] = {};
      if (!callback.cache[hash].before) {
        callback.cache[hash].before = true;
        var cb = _.settings['before'];
        if (typeof cb === 'function') cb(meta);
      }
    },

    // Callback after a Slidr animation.
    after: function(_, meta) {
      var hash = callback.hash(meta);
      if (!callback.cache[hash].after) {
        callback.cache[hash].after = true;
        var cb = _.settings['after'];
        if (typeof cb === 'function') callback.bindonce(cb, meta);
      }
    },

    // Bind after callback once.
    bindonce: function(cb, meta) {
      if (browser.supports('animation') && meta['in']['trans'] !== 'none') {
        var newCallback = function(e) {
          if (browser.keyframes[e.animationName]) {
            cb(meta);
            unbind(meta['in']['el'], browser.animations, newCallback);
            callback.reset(meta);
          }
        };
        bind(meta['in']['el'], browser.animations, newCallback);
      } else {
        cb(meta);
        callback.reset(meta);
      }
    },

    // Reset animation cache.
    reset: function(meta) {
      var hash = callback.hash(meta);
      callback.cache[hash].before = false;
      callback.cache[hash].after = false;
    }
  };

  var slides = {

    // Possible directions.
    directions: ['left', 'up', 'top', 'right', 'down', 'bottom'],

    // Check if next is a direction.
    isdir: function(next) {
      return indexOf(slides.directions, next) >= 0;
    },

    // Get the opoosite direction.
    opposite: function(dir) {
      var length = slides.directions.length;
      return slides.isdir(dir) ? slides.directions[(indexOf(slides.directions, dir) + length/2) % length] : null;
    },

    // Get slide metadata.
    get: function(_) {
      var args = [];
      for (var i = 1, a; (a = arguments[i++]) !== undefined; args.push(a)) {};
      return lookup(_.slides, args);
    },

    // Display our starting slide.
    display: function(_) {
      if (!_.displayed && slides.get(_, _.start)) {
        _.current = _.start;
        breadcrumbs.create(_);
        controls.create(_);
        fx.init(_, _.current, 'fade');
        fx.animate(_, _.current, 'fade', 'in');
        _.displayed = true;
        actions.controls(_, _.settings['controls']);
        if (!!_.settings['breadcrumbs']) actions.breadcrumbs(_);
      }
    },

    // Transition to the next slide.
    slide: function(_, next) {
      return slides.isdir(next) ? slides.go(_, slides.get(_, _.current, next), next, next) : slides.jump(_, next);
    },

    // Jump to a target slide.
    jump: function(_, el) {
      if (el && el !== _.current && slides.get(_, el)) {
        var cur = _.crumbs[_.current];
        var next = _.crumbs[el];
        var hdir = (cur.x < next.x) ? 'right' : (cur.x > next.x) ? 'left' : null;
        var vdir = (cur.y < next.y) ? 'up': (cur.y > next.y) ? 'down': null;
        var outdir = (transition.get(_, _.current, 'out', hdir)) ? hdir :
                     (transition.get(_, _.current, 'out', vdir)) ? vdir : null;
        var indir = (transition.get(_, el, 'in', hdir)) ? hdir :
                    (transition.get(_, el, 'in', vdir)) ? vdir : null;
        slides.go(_, el, outdir, indir, (outdir) ? null : 'fade', (indir) ? null : 'fade');
      }
    },

    // Go to a target slide.
    go: function(_, el, outdir, indir, opt_outtrans, opt_intrans) {
      if (_.current && el) {
        var intrans = opt_intrans || transition.get(_, el, 'in', indir);
        var outtrans = opt_outtrans || transition.get(_, _.current, 'out', outdir);
        var meta = callback.meta(_, _.current, el, outdir, indir, outtrans, intrans);
        callback.before(_, meta);
        transition.apply(_, el, 'in', indir, intrans);
        transition.apply(_, _.current, 'out', outdir, outtrans);
        callback.after(_, meta);
        _.current = el;
        controls.update(_);
        return true;
      }
      return false;
    },

    // Finds all valid slides (direct children with 'data-slidr' attributes).
    find: function(_, opt_asList) {
      var valid = (opt_asList) ? [] : {};
      for (var i = 0, slide, name; slide = _.slidr.childNodes[i]; i++) {
        name = getattr(slide, 'data-slidr');
        if (name) {
          if (opt_asList && indexOf(valid, name) < 0) valid.push(name);
          else if (!(name in valid)) valid[name] = slide;
        }
      }
      return valid;
    },

    // Validate the [ids] we're trying to add doesn't conflict with existing slide assignments.
    validate: function(_, ids, trans, valid, prev, next) {
      if (!ids || ids.constructor !== Array) return false;
      // For each slide we're trying to add, check it against our known mapping.
      for (var i = 0, current, newPrev, newNext, oldPrev, oldNext, 
           prevPrev, oldPrevTrans, oldNextTrans; current = ids[i]; i++) {
        if (!(current in valid)) return false;
        if (slides.get(_, current)) {
          newPrev = ids[i-1] || null;
          newNext = ids[i+1] || null;
          oldPrev = slides.get(_, current, prev);
          oldNext = slides.get(_, current, next);
          prevPrev = slides.get(_, newNext, prev);
          oldPrevTrans = transition.get(_, current, 'out', prev);
          oldNextTrans = transition.get(_, current, 'out', next);
          // Are we about to override an existing mapping?
          if ((oldNext && newNext && oldNext != newNext)
            || (oldPrev && newPrev && oldPrev != newPrev)
            || (prevPrev && prevPrev != current)
            || (newPrev && oldPrevTrans && oldPrevTrans != trans)
            || (newNext && oldNextTrans && oldNextTrans != trans)
          ) {
            return false;
          }
        }
      }
      return true;
    },

    // Adds a [list] of ids to our Slidr.
    add: function(_, ids, trans, valid, prev, next) {
      for (var i = 0, current; current = ids[i]; i++) {
        _.slides[current] = _.slides[current] || {};
        var s = slides.get(_, current);
        s.el = valid[current];
        if (ids[i-1]) {
          s[prev] = ids[i-1];
          transition.set(_, current, prev, trans);
        }
        if (ids[i+1]) {
          s[next] = ids[i+1];
          transition.set(_, current, next, trans);
        }
        fx.init(_, current, trans);
        _.start = (!_.start) ? current : _.start;
      }
      if (_.started) (!_.displayed) ? slides.display(_) : breadcrumbs.create(_);
      return true;
    }
  };

  var controls = {

    // Classnames
    cls: browser.classnames('control'),

    // Available control types.
    types: ['border', 'corner', 'none'],

    // Whether it's a valid control type.
    valid: function(ctrl) {
      return indexOf(controls.types, ctrl) >= 0;
    },

    // Create controls container.
    create: function(_) {
      if (_.slidr && !_.controls) {
        _.controls = css(classname(createEl('aside', { 'id': controls.cls.id(_) }), 'add', 'disabled'), {
          'opacity': '0',
          'filter': 'alpha(opacity=0)',
          'z-index': '0',
          'visibility': 'hidden',
          'pointer-events': 'none'
        });
        for (var n in _.nav) {
          _.nav[n] = setattr(classname(createEl('div'), 'add', controls.cls.nav, n), controls.cls.data, n);
          _.controls.appendChild(_.nav[n]);
        }
        controls.css(_);
        _.slidr.appendChild(_.controls);
        bind(_.controls, 'click', controls.onclick(_));
      }
    },

    // Controls CSS rules.
    css: function(_) {
      browser.createStyle(controls.cls.maincss, {
        'position': 'absolute',
        'bottom': css(_.slidr, 'padding-bottom') + 'px',
        'right': css(_.slidr, 'padding-right') + 'px',
        'padding': '10px',
        'box-sizing': 'border-box',
        'width': '75px',
        'height': '75px',
        'transform': 'translateZ(9998px)'
      }, true);
      browser.createStyle(controls.cls.maincss + '.disabled', {
        'transform': 'translateZ(0px) !important'
      }, true);
      browser.createStyle(controls.cls.maincss + '.breadcrumbs', {
        'left': css(_.slidr, 'padding-left') + 'px',
        'right': 'auto'
      }, true);
      browser.createStyle(controls.cls.maincss + '.border', {
        'bottom': '0',
        'right': '0',
        'left': '0',
        'width': '100%',
        'height': '100%'
      }, true);
      browser.createStyle(controls.cls.navcss, {
        'position': 'absolute',
        'pointer-events': 'auto',
        'cursor': 'pointer',
        'transition': 'opacity 0.2s linear'
      }, true);
      var disabled = {
        'opacity': '0.05',
        'cursor': 'auto'
      };
      if (browser.isIE()) disabled['display'] = 'none';
      browser.createStyle(controls.cls.navcss + '.disabled', disabled, true);

      var n, horizontal, pos, dir, ctrl, after, border, borderpad;
      for (n in _.nav) {
        horizontal = (n === 'left' || n === 'right');
        pos = (n === 'up') ? 'top' : (n === 'down') ? 'bottom' : n;
        dir = horizontal ? 'top' : 'left';

        ctrl = {
          'width': horizontal ? '22px': '16px',
          'height': horizontal ? '16px' : '22px',
          'tap-highlight-color': 'rgba(0, 0, 0, 0)',
          'touch-callout': 'none',
          'user-select': 'none'
        };
        ctrl[pos] = '0';
        ctrl[dir] = '50%';
        ctrl['margin-' + dir] = '-8px';
        browser.createStyle(controls.cls.navcss + '.' + n, ctrl, true);

        after = {
          'width': '0',
          'height': '0',
          'content': '""',
          'position': 'absolute',
          'border': '8px solid transparent'
        };
        after['border-' + slides.opposite(pos) + '-width'] = '12px';
        after['border-' + pos + '-width'] = '10px';
        after['border-' + slides.opposite(pos) + '-color'] = _.settings['theme'];
        after[pos] = '0';
        after[dir] = '50%';
        after['margin-' + dir] = '-8px';
        browser.createStyle(controls.cls.id(_, true) + ' .' + controls.cls.nav + '.' + n + ':after', after, true);

        border = {};
        border[horizontal ? 'height': 'width'] = '100%';
        border[dir] = '0';
        border['margin-' + dir] = '0';
        browser.createStyle(controls.cls.maincss + '.border .' + controls.cls.nav + '.' + n, border, true);

        borderpad = {};
        borderpad[pos] = css(_.slidr, 'padding-' + pos) + 'px';
        browser.createStyle(controls.cls.id(_, true) + '.border .' + controls.cls.nav + '.' + n, borderpad, true);
      }
    },

    // On click callback.
    onclick: function(_) {
      return function handler(e) { actions.slide(_, getattr(browser.sanitize(e).target, controls.cls.data)); };
    },

    // Update controls.
    update: function(_) {
      for (var n in _.nav) classname(_.nav[n], actions.canSlide(_, n) ? 'rm' : 'add', 'disabled');
    }
  };

  var breadcrumbs = {
  
    // Classnames
    cls: browser.classnames('breadcrumbs'),

    // Initialize breadcrumbs container.
    init: function(_) {
      if (_.slidr && !_.breadcrumbs) {
        _.breadcrumbs = css(classname(createEl('aside', { 'id': breadcrumbs.cls.id(_) }), 'add', 'disabled'), {
          'opacity': '0',
          'filter': 'alpha(opacity=0)',
          'z-index': '0',
          'pointer-events': 'none',
          'visibility': 'hidden'
        });
        breadcrumbs.css(_);
        _.slidr.appendChild(_.breadcrumbs);
        bind(_.breadcrumbs, 'click', breadcrumbs.onclick(_));
      }
    },

    // Breadcrumbs CSS rules.
    css: function(_) {
      browser.createStyle(breadcrumbs.cls.maincss, {
        'position': 'absolute',
        'bottom': css(_.slidr, 'padding-bottom') + 'px',
        'right': css(_.slidr, 'padding-right') + 'px',
        'padding': '10px',
        'box-sizing': 'border-box',
        'transform': 'translateZ(9999px)'
      }, true);
      browser.createStyle(breadcrumbs.cls.maincss + '.disabled', {
        'transform': 'translateZ(0px) !important'
      }, true);
      browser.createStyle(breadcrumbs.cls.navcss, {
        'padding': '0',
        'font-size': '0',
        'line-height': '0'
      }, true);
      browser.createStyle(breadcrumbs.cls.navcss + ' li', {
        'width': '10px',
        'height': '10px',
        'display': 'inline-block',
        'margin': '3px',
        'tap-highlight-color': 'rgba(0, 0, 0, 0)',
        'touch-callout': 'none',
        'user-select': 'none'
      }, true);
      browser.createStyle(breadcrumbs.cls.id(_, true) + ' .' + breadcrumbs.cls.nav + ' li.normal', {
        'border-radius': '100%',
        'border': '1px ' + _.settings['theme'] +' solid',
        'cursor': 'pointer',
        'pointer-events': 'auto'
      }, true);
      browser.createStyle(breadcrumbs.cls.id(_, true) + ' .' + breadcrumbs.cls.nav + ' li.active', {
        'width': '12px',
        'height': '12px',
        'margin': '2px',
        'background-color': _.settings['theme']
      }, true);
    },

    // On click callback.
    onclick: function(_) {
      return function handler(e) { actions.slide(_, getattr(browser.sanitize(e).target, breadcrumbs.cls.data)); };
    },

    // Breadcrumb offsets.
    offsets: {
      'right': { x: 1, y: 0 },
      'up': { x: 0, y: 1 },
      'left': { x: -1, y: 0 },
      'down': { x: 0, y: -1 }
    },

    // Find breadcrumbs.
    find: function(_, crumbs, bounds, el, x, y) {
      if (el) {
        if (!crumbs[el]) {
          crumbs[el] = { x: x, y: y };
          if (x < bounds.x.min) bounds.x.min = x;
          if (x > bounds.x.max) bounds.x.max = x;
          if (y < bounds.y.min) bounds.y.min = y;
          if (y > bounds.y.max) bounds.y.max = y;
        }
        el = slides.get(_, el);
        for (var o in breadcrumbs.offsets) {
          if (el[o] && !crumbs[el[o]]) {
            breadcrumbs.find(_, crumbs, bounds, el[o], x + breadcrumbs.offsets[o].x, y + breadcrumbs.offsets[o].y);
          }
        }
      }
    },

    // Update breadcrumbs.
    update: function(_, el, type) {
      classname(_.crumbs[el].el, type === 'in' ? 'add' : 'rm', 'active');
    },

    // Create breadcrumbs.
    create: function(_) {
      breadcrumbs.init(_);
      if (_.breadcrumbs) {
        var crumbs = {};
        var bounds = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        breadcrumbs.find(_, crumbs, bounds, _.start, 0, 0);
        bounds.x.modifier = 0 - bounds.x.min;
        bounds.y.modifier = 0 - bounds.y.min;
        var crumbsMap = {};
        for (var el in crumbs) {
          crumbs[el].x += bounds.x.modifier;
          crumbs[el].y += bounds.y.modifier;
          crumbsMap[crumbs[el].x + ',' + crumbs[el].y] = el;
        }
        var rows = bounds.y.max - bounds.y.min + 1;
        var columns = bounds.x.max - bounds.x.min + 1;
        while (_.breadcrumbs.firstChild) _.breadcrumbs.removeChild(_.breadcrumbs.firstChild);
        var ul = classname(createEl('ul'), 'add', breadcrumbs.cls.nav);
        var li = createEl('li');
        for (var r = rows - 1, ulclone; r >= 0; r--) {
          ulclone = ul.cloneNode(false);
          for (var c = 0, liclone, element; c < columns; c++) {
            liclone = li.cloneNode(false);
            element = crumbsMap[c + ',' + r];
            if (element) {
              classname(liclone, 'add', 'normal', element === _.current ? 'active' : null);
              setattr(liclone, breadcrumbs.cls.data, element);
              crumbs[element].el = liclone;
            }
            ulclone.appendChild(liclone);
          };
          _.breadcrumbs.appendChild(ulclone);
        }
        _.crumbs = crumbs;
      }
    }
  };

  var fx = {

    // CSS rules to apply to a slide on initialize.
    init: function(_, el, trans) {
      var s = slides.get(_, el);
      if (!s.initialized) {
        var display = css(s.el, 'display');
        var init = {
          'display': (display === 'none') ? 'block' : display,
          'visibility': 'hidden',
          'position': 'absolute',
          'opacity': '0',
          'filter': 'alpha(opacity=0)',
          'z-index': '0',
          'pointer-events': 'none',
          'backface-visibility': 'hidden',
          'transform-style': 'preserve-3d'
        }
        if (browser.isIE()) init = extend(init, {'display': 'none', 'visibility': 'visible'});
        s.initialized = true;
        css(s.el, init);
      }
    },

    // Properties defining animation support.
    supported: {
      'none': true,
      'fade': browser.supports('animation', 'opacity'),
      'linear': browser.supports('animation', 'opacity', 'transform'),
      'cube': browser.supports('animation', 'backface-visibility', 'opacity', 'transform', 'transform-style')
    },

    // Defines our slide animations.
    animation: {
      'fade': (function() {
        browser.add['fade']('slidr-fade-in', '0', '1');
        browser.add['fade']('slidr-fade-out', '1', '0');
      })(),
      'linear': {
        'in': {
          'left': function(name, w, o) { browser.add['linear'](name, 'in', 'X(-' + w, 'X(0', o, '1'); },
          'right': function(name, w, o) { browser.add['linear'](name, 'in', 'X(' + w, 'X(0', o, '1'); },
          'up': function(name, h, o) { browser.add['linear'](name, 'in', 'Y(-' + h, 'Y(0', o, '1'); },
          'down': function(name, h, o) { browser.add['linear'](name, 'in', 'Y(' + h, 'Y(0', o, '1'); }
        },
        'out': {
          'left': function(name, w, o) { browser.add['linear'](name, 'out', 'X(0', 'X(' + w, '1', o); },
          'right': function(name, w, o) { browser.add['linear'](name, 'out', 'X(0', 'X(-' + w, '1', o); },
          'up': function(name, h, o) { browser.add['linear'](name, 'out', 'Y(0', 'Y(' + h, '1', o); },
          'down': function(name, h, o) { browser.add['linear'](name, 'out', 'Y(0', 'Y(-' + h, '1', o); }
        }
      },
      'cube': {
        'in': {
          'left': function(name, w, o) { browser.add['cube'](name, 'Y(-9', 'Y(', w/2, o, '1'); },
          'right': function(name, w, o) { browser.add['cube'](name, 'Y(9', 'Y(', w/2, o, '1'); },
          'up': function(name, h, o) { browser.add['cube'](name, 'X(9', 'X(', h/2, o, '1'); },
          'down': function(name, h, o) { browser.add['cube'](name, 'X(-9', 'X(', h/2, o, '1'); }
        },
        'out': {
          'left': function(name, w, o) { browser.add['cube'](name, 'Y(', 'Y(9', w/2, '1', o); },
          'right': function(name, w, o) { browser.add['cube'](name, 'Y(', 'Y(-9', w/2, '1', o); },
          'up': function(name, h, o) { browser.add['cube'](name, 'X(', 'X(-9', h/2, '1', o); },
          'down': function(name, h, o) { browser.add['cube'](name, 'X(', 'X(9', h/2, '1', o); }
        }
      }
    },

    // Resolve keyframe animation name.
    name: function(_, target, trans, type, dir) {
      var parts = ['slidr', trans, type];
      if ((trans === 'linear' || trans === 'cube') && dir) {
        parts.push(dir);
        var opacity = (!!_.settings['fade']) ? '0' : '1';
        if (opacity === '0') parts.push('fade');
        var prop = (dir === 'up' || dir === 'down') ? 'h' : 'w';
        var s = (prop === 'h') ? size.getHeight(target) : size.getWidth(target);
        parts.push(prop, s);
        var keyframe = lookup(fx.animation, [trans, type, dir]);
        if (keyframe) keyframe(parts.join('-'), s, opacity);
      }
      return parts.join('-');
    },

    // Animate an `el` with `trans` effects coming [in|out] as `type` from direction `dir`.
    animate: function(_, el, trans, type, dir, opt_target, opt_z, opt_pointer) {
      var anim = {
        'opacity': (type === 'in') ? '1': '0',
        'filter': 'alpha(opacity=' + (type === 'in' ? '100': '0') + ')',
        'z-index': opt_z || (type === 'in' ? '1': '0'),
        'visibility': (type === 'in') ? 'visible': 'hidden',
        'pointer-events': opt_pointer || (type === 'in' ? 'auto': 'none')
      };
      if (browser.isIE()) anim = extend(anim, {'display': (type === 'in') ? 'block' : 'none', 'visibility': 'visible'});
      var target = opt_target || slides.get(_, el).el;
      var timing = _.settings['timing'][trans];
      if (fx.supported[trans] && timing) {
        var name = fx.name(_, target, trans, type, dir);
        anim['animation'] = (trans === 'none') ? 'none' : [name, timing].join(' ');
      }
      css(target, anim);
      if (slides.get(_, el) && browser.supports('transform')) fx.fixTranslateZ(_, target, type);
    },

    // Toggle translateZ on breadcrumbs/controls so it doesn't interfere with page flow.
    fixTranslateZ: function(_, el, opt_type) {
      var asides = el.getElementsByTagName('aside');
      if (asides.length) {
        for (var i = 0, aside, p, toggle, visibility; aside = asides[i]; i++) {
          if (!!aside.getAttribute('id')) {
            // Get the first parent data-slidr node, or use the current Slidr element.
            p = aside.parentNode;
            while (!getattr(p, 'data-slidr') && tagName(p) !== 'body') p = p.parentNode;
            if (tagName(p) === 'body') p = _.slidr;
            visibility = css(p, 'visibility');
            toggle = (opt_type === 'out' || !opt_type && visibility === 'hidden') ? 'add' :
                     (visibility === 'visible') ? 'rm' : null;
            if (toggle) classname(aside, toggle, 'disabled');
          }
        }
      }
    }
  };

  var size = {

    // Active Slidr's to listen for resize.
    active: {},

    // Add Slidr's we want to monitor.
    autoResize: function(_) {
      size.active[_.id] = { src: _, w: 0, h: 0, d: size.dynamic(_) };
    },

    // Check whether width and height should by dynamically updated.
    dynamic: function(_) {
      var clone = css(_.slidr.cloneNode(false), { 'position': 'absolute', 'opacity': '0', 'filter': 'alpha(opacity=0)' });
      var probe = css(createEl('div'), { 'width': '42px', 'height': '42px' });
      clone.appendChild(probe);
      _.slidr.parentNode.insertBefore(clone, _.slidr);
      var originalWidth = (borderbox(clone) ? size.extraWidth(_.slidr) : 0) + 42;
      var originalHeight = (borderbox(clone) ? size.extraHeight(_.slidr) : 0) + 42;
      var cloneWidth = css(clone, 'width');
      var cloneHeight = css(clone, 'height');
      var minWidth = css(clone, 'min-width');
      var minHeight = css(clone, 'min-height');
      var dynamic = {
        width: cloneWidth === 'auto' || cloneWidth === originalWidth || minWidth !== 0 && minWidth != 'auto',
        height: cloneHeight === 'auto' || cloneHeight === originalHeight || minHeight !== 0 && minHeight != 'auto'
      };
      _.slidr.parentNode.removeChild(clone);
      return dynamic;
    },

    // Grabs the element width/height margin.
    widthMargin: function(el) { return Math.max(0, css(el, 'margin-left')) + Math.max(0, css(el, 'margin-right')); },
    heightMargin: function(el) { return Math.max(0, css(el, 'margin-top')) + Math.max(0, css(el, 'margin-bottom')); },

    // Grabs the element width/height padding.
    widthPad: function(el) { return css(el, 'padding-left') + css(el, 'padding-right'); },
    heightPad: function(el) { return css(el, 'padding-top') + css(el, 'padding-bottom'); },

    // Grabs the element width/height border.
    widthBorder: function(el) { return css(el, 'border-left-width') + css(el, 'border-right-width'); },
    heightBorder: function(el) { return css(el, 'border-top-width') + css(el, 'border-bottom-width'); },

    // Grabs extra border-box padding.
    extraWidth: function(el) { return size.widthPad(el) + size.widthBorder(el); },
    extraHeight: function(el) { return size.heightPad(el) + size.heightBorder(el); },

    // Gets the element width/height.
    getWidth: function(el) {
      var w = css(el, 'width');
      if (browser.isIE() && w === 'auto' && el.offsetWidth) w = el.offsetWidth;
      if (w !== 'auto') w += (size.widthMargin(el) + (borderbox(el) ? 0 : size.extraWidth(el)));
      return w;
    },
    getHeight: function(el) {
      var h = css(el, 'height');
      if (browser.isIE() && h === 'auto' && el.offsetHeight) h = el.offsetHeight;
      if (h !== 'auto') h += (size.heightMargin(el) + (borderbox(el) ? 0 : size.extraHeight(el)));
      return h;
    },

    // Sets the width/height of our element.
    setWidth: function(el, w) {
      var prop = w;
      if (w !== 'auto' && w !== '') prop = (w + (borderbox(el) ? size.extraWidth(el) : 0)) + 'px';
      css(el, { width: prop });
      return w;
    },
    setHeight: function(el, h) {
      var prop = h;
      if (h !== 'auto' && h !== '') prop = (h + (borderbox(el) ? size.extraHeight(el) : 0)) + 'px';
      css(el, { height: prop });
      return h;
    }
  };

  var nav = {

    // Mouse events.
    mouse: {

      // Slidr's with mouseover.
      over: [],

      // Whether a slidr-id already has mouseover.
      isOver: function(id) { return indexOf(nav.mouse.over, id) >= 0; },

      // Add a slidr-id with mouseover event.
      add: function(id) { if (!nav.mouse.isOver(id)) nav.mouse.over.push(id); },

      // Remove a slidr-id from mouseover event.
      remove: function(id) { if (nav.mouse.isOver(id)) nav.mouse.over.splice(indexOf(nav.mouse.over, id), 1); },

      // Get the current top level Slidr being mouse'd over.
      current: function() {
        var c = nav.mouse.over[nav.mouse.over.length-1];
        for (var i = 0, l = nav.mouse.over.length, m = nav.mouse.over[i]; i < l; i++) if (contains(c, m)) c = m;
        return c;
      },

      // Track mouseenter/mouseleave events.
      track: function(el) {
        bind(el, 'mouseenter', function(e) { nav.mouse.add(browser.sanitize(e).currentTarget.id); });
        bind(el, 'mouseleave', function(e) { nav.mouse.remove(browser.sanitize(e).currentTarget.id); });
      }
    },

    // Keyboard events.
    keyboard: (function() {
      bind(document, 'keydown', function(e) {
        e = browser.sanitize(e);
        if (nav.mouse.current() && e.which <= 40 && e.which >= 37) {
          var c = INSTANCES[nav.mouse.current()];
          var dir = null;
          if (e.which === 40 && c['canSlide']('down')) { dir = 'down'; }
          else if (e.which === 39 && c['canSlide']('right')) { dir = 'right'; }
          else if (e.which === 38 && c['canSlide']('up')) { dir = 'up'; }
          else if (e.which === 37 && c['canSlide']('left')) { dir = 'left'; }
          if (dir) c['slide'](dir) && browser.stop(e);
        }
      });
    })(),

    // Touch events.
    touch: function(_) {
      var start = {};
      var delta = {};
      bind(_.slidr, 'touchstart', function(e) {
        e = browser.sanitize(e);
        start = { x: e.touches[0].pageX, y: e.touches[0].pageY, time: +new Date };
        delta = { x: 0, y: 0, duration: 0 };
      });
      bind(_.slidr, 'touchmove', function(e) {
        e = browser.sanitize(e);
        if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
        delta.x = e.touches[0].pageX - start.x;
        delta.y = e.touches[0].pageY - start.y;
        delta.duration = +new Date - start.time;
        if (delta.duration > 100 && (Math.abs(delta.x) + Math.abs(delta.y))/delta.duration < 0.25) return;
        browser.stop(e);
      });
      bind(_.slidr, 'touchend', function(e) {
        e = browser.sanitize(e);
        if (Number(+new Date - start.time) < 250) {
          var dx = Math.abs(delta.x);
          var dy = Math.abs(delta.y);
          var validH = dx > 20;
          var validV = dy > 20;
          var dirH = delta.x < 0 ? 'right': 'left';
          var dirV = delta.y < 0 ? 'down' : 'up';
          var dir = (validH && validV ? (dx > dy ? dirH : dirV) : (validH ? dirH : (validV ? dirV : null)));
          if (dir) actions.slide(_, dir);
          browser.stop(e);
        }
      });
    }
  };

  var actions = {

    // Starts a Slidr.
    start: function(_, opt_start) {
      if (!_.started && _.slidr) {
        var display = css(_.slidr, 'display');
        var position = css(_.slidr, 'position');
        var opacity = css(_.slidr, 'opacity');
        css(_.slidr, {
          'visibility': 'visible',
          'opacity': opacity,
          'filter': 'alpha(opacity=' + opacity * 100 + ')',
          'display': (display === 'inline-block' || display === 'inline') ? 'inline-block' : 'block',
          'position': (position === 'static') ? 'relative' : position,
          'overflow': (!!_.settings['overflow']) ? css(_.slidr, 'overflow') : 'hidden',
          'transition': 'height 0.05s ease-out, width 0.05s ease-out',
          'tap-highlight-color': 'rgba(0, 0, 0, 0)',
          'touch-callout': 'none'
        });
        if (!_.start) actions.add(_, _.settings['direction'], slides.find(_, true), _.settings['transition']);
        if (slides.get(_, opt_start)) _.start = opt_start;
        slides.display(_);
        size.autoResize(_);
        fx.fixTranslateZ(_, _.slidr);
        if (_.settings['keyboard']) nav.mouse.track(_.slidr);
        if (_.settings['touch']) nav.touch(_);
        _.started = true;
        controls.update(_);
      }
    },

    // Can we slide?
    canSlide: function(_, next) {
      return _.started && next && (slides.isdir(next) ? !!slides.get(_, _.current, next) : !!slides.get(_, next));
    },

    // Slide.
    slide: function(_, next) {
      if (actions.canSlide(_, next)) slides.slide(_, next);
    },

    // Adds a set of slides.
    add: function(_, direction, ids, opt_transition, opt_overwrite) {
      if (_.slidr) {
        var trans = transition.validate(_, opt_transition);
        var valid = slides.find(_);
        var prev = (direction === 'horizontal' || direction === 'h') ? 'left' : 'up';
        var next = (direction === 'horizontal' || direction === 'h') ? 'right' : 'down';
        if (!slides.validate(_, ids, trans, valid, prev, next) && !opt_overwrite) {
          console.warn('[Slidr] Error adding [' + direction + '] slides for [' + _.id + '].');
        } else {
          slides.add(_, ids, trans, valid, prev, next);
        }
      }
    },

    // Automatically transition between slides.
    auto: function(_, msec, direction) {
      if (_.started && slides.isdir(direction)) {
        actions.stop(_);
        _.auto = setInterval(function() { slides.slide(_, direction); }, msec);
      }
    },

    // Stops auto transitioning.
    stop: function(_) {
      if (_.started && _.auto) {
        clearInterval(_.auto);
        _.auto = null;
      }
    },

    // Toggle breadcrumbs.
    breadcrumbs: function(_) {
      if (_.breadcrumbs && _.displayed) {
        var type = css(_.breadcrumbs, 'opacity') === '0' ? 'in' : 'out';
        fx.animate(_, null, 'fade', type, null, _.breadcrumbs, '3', 'none');
        if (_.controls) classname(_.controls, type === 'in' ? 'add' : 'rm', 'breadcrumbs');
      }
    },

    // Toggle controls.
    controls: function(_, opt_scheme) {
      if (_.controls && _.displayed) {
        if (!controls.valid(opt_scheme)) opt_scheme = null;
        var hidden = css(_.controls, 'visibility') === 'hidden';
        var type = (opt_scheme && opt_scheme !== 'none') ? 'in' : 'out';
        if (type === 'out' && hidden) return;
        if (opt_scheme === 'border') classname(_.controls, 'add', 'border');
        else if (opt_scheme === 'corner') classname(_.controls, 'rm', 'border');
        fx.animate(_, null, 'fade', type, null, _.controls, '2', 'none');
      }
    }
  };

  // The Slidr constructor.
  var Slidr = function(id, el, settings) {

    var _ = {
      // Slidr id.
      id: id,

      // Reference to the Slidr element.
      slidr: el,

      // Reference to the Slidr breadcrumbs element.
      breadcrumbs: null,

      // Reference to the Slidr controller element.
      controls: null,

      // Settings for this Slidr.
      settings: settings,

      // Whether we've successfully called start().
      started: false,

      // Whether we've successfully called slides.display().
      displayed: false,

      // The slide to start at.
      start: null,

      // The current slide.
      current: null,

      // Whether auto() is currently active. Stores the timer interval id.
      auto: null,

      // A {mapping} of slides to their neighbors.
      slides: {},

      // A {mapping} of slides and their transition effects.
      trans: {},

      // A {mapping} of slides and their (x, y) position.
      crumbs: {},

      // Reference to the Slidr controller navigators.
      nav: { 'up': null, 'down': null, 'left': null, 'right': null }
    };

    var api = {

      /**
       * Start the Slidr!
       * Automatically finds slides to create if nothing was added prior to calling start().
       * @param {string} opt_start `data-slidr` id to start on.
       * @return {this}
       */
      'start': function(opt_start) {
        actions.start(_, opt_start);
        return this;
      },

      /**
       * Check whether we can slide.
       * @param {string} next a direction ('up', 'down', 'left', 'right') or a `data-slidr` id.
       * @return {boolean}
       */
      'canSlide': function(next) {
        return actions.canSlide(_, next);
      },

      /**
       * Slide!
       * @param {string} next a direction ('up', 'down', 'left', 'right') or a `data-slidr` id.
       * @return {this}
       */
      'slide': function(next) {
        actions.slide(_, next);
        return this;
      },

      /**
       * Adds a set of slides.
       * @param {string} direction `horizontal || h` or `vertical || v`.
       * @param {Array} ids A list of `data-slidr` id's to add to Slidr. Slides must be direct children of the Slidr.
       * @param {string=} opt_transition The transition to apply between the slides, or uses the default.
       * @param {boolean=} opt_overwrite Whether to overwrite existing slide mappings/transitions if conflicts occur.
       * @return {this}
       */
      'add': function(direction, ids, opt_transition, opt_overwrite) {
        actions.add(_, direction, ids, opt_transition, opt_overwrite);
        return this;
      },

      /**
       * Automatically advance to the next slide after a certain timeout. Calls start() if not already called.
       * @param {int=} opt_msec The number of millis between each slide transition. Defaults to 5000 (5 seconds).
       * @param {string=} opt_direction 'up', 'down', 'left', or 'right'. Defaults to 'right'.
       * @param {string=} opt_start The `data-slidr` id to start at (only works if auto is called to start the Slidr).
       * @return {this}
       */
      'auto': function(opt_msec, opt_direction, opt_start) {
        actions.start(_, opt_start);
        actions.auto(_, opt_msec || 5000, opt_direction || 'right');
        return this;
      },

      /**
       * Stop auto transition if it's turned on.
       * @return {this}
       */
      'stop': function() {
        actions.stop(_);
        return this;
      },

      /**
       * Set custom animation timings.
       * @param {string|Object} transition Either a transition name (i.e. 'cube'), or a {'transition': 'timing'} object.
       * @param {string=} opt_timing The new animation timing (i.e "0.5s ease-in"). Not required if transition is an object.
       * @return {this}
       */
      'timing': function(transition, opt_timing) {
        if (!!transition && transition.constructor === Object) {
          _.settings['timing'] = extend(_.settings['timing'], transition);
        } else if (typeof(transition) === 'string' && typeof(opt_timing) === 'string') {
          _.settings['timing'][transition] = opt_timing;
        }
        return this;
      },

      /**
       * Toggle breadcrumbs.
       * @return {this}
       */
      'breadcrumbs': function() {
        actions.breadcrumbs(_);
        return this;
      },

      /**
       * Toggle controls.
       * @param {string=} opt_scheme Toggle on/off if not present, else change scheme. `border`, `corner` or `none`.
       * @return {this}
       */
      'controls': function(opt_scheme) {
        actions.controls(_, opt_scheme);
        return this;
      }
    };

    return api;
  };

  // Global timer for dynamic sizing.
  var TIMER = setInterval((function watch() {
    var _, cur, index, el, width, height;
    for (index in size.active) {
      cur = size.active[index];
      _ = cur.src;
      if (!browser.isIE() && !contains(document, _.slidr)) {
        delete size.active[index];
        delete INSTANCES[_.id];
      } else if (css(_.slidr, 'visibility') === 'hidden') {
        size.active[index].w = size.setWidth(_.slidr, 0);
        size.active[index].h = size.setHeight(_.slidr, 0);
      } else if (slides.get(_, _.current)) {
        el = slides.get(_, _.current).el;
        width = size.getWidth(el);
        height = size.getHeight(el);
        if (cur.d.width && cur.w != width) size.active[index].w = size.setWidth(_.slidr, width);
        if (cur.d.height && cur.h != height) size.active[index].h = size.setHeight(_.slidr, height);
      }
    }
    return watch;
  })(), 250);

  // Current version.
  var VERSION = '0.4.0';

  // Active Slidr instances.
  var INSTANCES = {};

  // Callback no-op.
  var NOOP = function() {};

  // Slidr default settings.
  var DEFAULTS = {
    'after': NOOP,                // Callback function after a slide transition finishes.
    'before': NOOP,               // Callback function before a slide transition begins.
    'breadcrumbs': false,         // Show or hide breadcrumbs on start(). `true` or `false`.
    'controls': 'border',         // Show or hide control arrows on start(). `border`, `corner` or `none`.
    'direction': 'horizontal',    // The default direction for new slides. `horizontal` or `h`, `vertical` or `v`.
    'fade': true,                 // Whether slide transitions should fade in/out. `true` or `false`.
    'keyboard': false,            // Whether to enable keyboard navigation upon mouseover. `true` or `false`.
    'overflow': false,            // Whether to overflow transitions at slidr borders. `true` or `false`.
    'theme': '#fff',              // Sets color theme for breadcrumbs/controls. #hexcode or rgba(value).
    'timing': {},                 // Custom animation timings to apply. {'transition': 'timing'}.
    'touch': false,               // Whether to enable touch navigation for mobile devices. `true` or `false`.
    'transition': 'linear'        // The default transition to apply. `cube`, `linear`, `fade`, or `none`.
  };

  // Slidr default animation timings.
  var TIMING = {
    'none': 'none',
    'fade': '0.4s ease-out',
    'linear': '0.6s ease-out',
    'cube': '1s cubic-bezier(0.15, 0.9, 0.25, 1)'
  };

  // Global API.
  return {
    /**
     * Current version.
     * @return {string} major.minor.patch.
     */
    'version': function() {
      return VERSION;
    },

    /**
     * Available transitions.
     * @return {Array} of transitions.
     */
    'transitions': function() {
      return transition.available.slice(0);
    },

    /**
     * Creates and returns a Slidr.
     * Calling create on the same element twice returns the already instantiated Slidr.
     * @param {string} id The element id to turn into a Slidr.
     * @param {Object=} opt_settings Settings to apply.
     */
    'create': function(id, opt_settings) {
      var el = document.getElementById(id);
      if (!el) {
        console.warn('[Slidr] Could not find element with id [' + id + '].');
        return;
      }
      var settings = extend(DEFAULTS, opt_settings || {});
      settings['timing'] = extend(TIMING, settings['timing']);
      INSTANCES[id] = INSTANCES[id] || new Slidr(id, el, settings);
      return INSTANCES[id];
    }
  };

}));

},{}],"yTmIRM":[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
(function (window) {
  'use strict';

  window.Utils = {
    uuid: function () {
      /*jshint bitwise:false */
      var i, random;
      var uuid = '';

      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        }

        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
      }

      return uuid;
    },

    pluralize: function (count, word) {
      return count === 1 ? word : word + 's';
    },

    store: function (namespace, data) {
      if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      }

      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    },

    extend: function () {
      var newObj = {};
      for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
          }
        }
      }
      return newObj;
    }
  };
})(window);
; browserify_shim__define__module__export__(typeof Utils != "undefined" ? Utils : window.Utils);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

},{}],"Utils":[function(require,module,exports){
module.exports=require('yTmIRM');
},{}],16:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],17:[function(require,module,exports){
'use strict';

var copyProperties = require('./lib/copyProperties');

var WARNING_MESSAGE = (
  'It looks like you\'re trying to use jeffbski\'s React.js project.\n' +
  'The `react` npm package now points to the React JavaScript library for ' +
  'building user interfaces, not the React.js project for managing asynchronous ' +
  'control flow. If you\'re looking for that library, please npm install autoflow.'
);

function error() {
  throw new Error(WARNING_MESSAGE);
}

// Model the React.js project's public interface exactly.

function ReactJSShim() {
  error();
}

ReactJSShim.logEvents = error;
ReactJSShim.resolvePromises = error;
ReactJSShim.trackTasks = error;
ReactJSShim.createEventCollector = error;

// These could throw using defineProperty() but supporting older browsers will
// be painful. Additionally any error messages around this will contain the string
// so I think this is sufficient.
ReactJSShim.options = WARNING_MESSAGE;
ReactJSShim.events = WARNING_MESSAGE;

var ReactJSErrors = {
  wrap: function(module) {
    copyProperties(ReactJSShim, module);
    return ReactJSShim;
  }
};

module.exports = ReactJSErrors;

},{"./lib/copyProperties":106}],18:[function(require,module,exports){
var process=require("__browserify_process");module.exports = require('./lib/ReactWithAddons');
if ('production' !== process.env.NODE_ENV) {
  module.exports = require('./ReactJSErrors').wrap(module.exports);
}

},{"./ReactJSErrors":17,"./lib/ReactWithAddons":89,"__browserify_process":16}],19:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule $
 * @typechecks
 */

var ge = require("./ge");
var ex = require("./ex");

/**
 * Find a node by ID.
 *
 * If your application code depends on the existence of the element, use $,
 * which will throw if the element doesn't exist.
 *
 * If you're not sure whether or not the element exists, use ge instead, and
 * manually check for the element's existence in your application code.
 *
 * @param {string|DOMDocument|DOMElement|DOMTextNode|Comment} id
 * @return {DOMDocument|DOMElement|DOMTextNode|Comment}
 */
function $(id) {
  var element = ge(id);
  if (!element) {
    throw new Error(ex(
      'Tried to get element with id of "%s" but it is not present on the page.',
      id
    ));
  }
  return element;
}

module.exports = $;

},{"./ex":114,"./ge":118}],20:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSCore
 * @typechecks
 */

var invariant = require("./invariant");

/**
 * The CSSCore module specifies the API (and implements most of the methods)
 * that should be used when dealing with the display of elements (via their
 * CSS classes and visibility on screeni. It is an API focused on mutating the
 * display and not reading it as no logical state should be encoded in the
 * display of elements.
 */

/**
 * Tests whether the element has the class specified.
 *
 * Note: This function is not exported in CSSCore because CSS classNames should
 * not store any logical information about the element. Use DataStore to store
 * information on an element.
 *
 * @param {DOMElement} element the element to set the class on
 * @param {string} className the CSS className
 * @returns {boolean} true if the element has the class, false if not
 */
function hasClass(element, className) {
  if (element.classList) {
    return !!className && element.classList.contains(className);
  }
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

var CSSCore = {

  /**
   * Adds the class passed in to the element if it doesn't already have it.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  addClass: function(element, className) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !/\s/.test(className),
      'CSSCore.addClass takes only a single class name. "%s" contains ' +
      'multiple classes.', className
    ) : invariant(!/\s/.test(className)));

    if (className) {
      if (element.classList) {
        element.classList.add(className);
      } else if (!hasClass(element, className)) {
        element.className = element.className + ' ' + className;
      }
    }
    return element;
  },

  /**
   * Removes the class passed in from the element
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  removeClass: function(element, className) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !/\s/.test(className),
      'CSSCore.removeClass takes only a single class name. "%s" contains ' +
      'multiple classes.', className
    ) : invariant(!/\s/.test(className)));

    if (className) {
      if (element.classList) {
        element.classList.remove(className);
      } else if (hasClass(element, className)) {
        element.className = element.className
          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
          .replace(/\s+/g, ' ') // multiple spaces to one
          .replace(/^\s*|\s*$/g, ''); // trim the ends
      }
    }
    return element;
  },

  /**
   * Helper to add or remove a class from an element based on a condition.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @param {*} bool condition to whether to add or remove the class
   * @return {DOMElement} the element passed in
   */
  conditionClass: function(element, className, bool) {
    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
  }
};

module.exports = CSSCore;

},{"./invariant":127,"__browserify_process":16}],21:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSProperty
 */

"use strict";

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  fillOpacity: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  orphans: true,
  zIndex: true,
  zoom: true
};

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundImage: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    backgroundColor: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

module.exports = CSSProperty;

},{}],22:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CSSPropertyOperations
 * @typechecks static-only
 */

"use strict";

var CSSProperty = require("./CSSProperty");

var dangerousStyleValue = require("./dangerousStyleValue");
var escapeTextForBrowser = require("./escapeTextForBrowser");
var hyphenate = require("./hyphenate");
var memoizeStringOnly = require("./memoizeStringOnly");

var processStyleName = memoizeStringOnly(function(styleName) {
  return escapeTextForBrowser(hyphenate(styleName));
});

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {

  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   *
   * @param {object} styles
   * @return {?string}
   */
  createMarkupForStyles: function(styles) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   */
  setValueForStyles: function(node, styles) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

module.exports = CSSPropertyOperations;

},{"./CSSProperty":21,"./dangerousStyleValue":111,"./escapeTextForBrowser":113,"./hyphenate":126,"./memoizeStringOnly":135}],23:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CallbackRegistry
 * @typechecks static-only
 */

"use strict";

var listenerBank = {};

/**
 * Stores "listeners" by `registrationName`/`id`. There should be at most one
 * "listener" per `registrationName`/`id` in the `listenerBank`.
 *
 * Access listeners via `listenerBank[registrationName][id]`.
 *
 * @class CallbackRegistry
 * @internal
 */
var CallbackRegistry = {

  /**
   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {?function} listener The callback to store.
   */
  putListener: function(id, registrationName, listener) {
    var bankForRegistrationName =
      listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[id] = listener;
  },

  /**
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {string} id ID of the DOM element.
   */
  deleteAllListeners: function(id) {
    for (var registrationName in listenerBank) {
      delete listenerBank[registrationName][id];
    }
  },

  /**
   * This is needed for tests only. Do not use!
   */
  __purge: function() {
    listenerBank = {};
  }

};

module.exports = CallbackRegistry;

},{}],24:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ChangeEventPlugin
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPluginHub = require("./EventPluginHub");
var EventPropagators = require("./EventPropagators");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var SyntheticEvent = require("./SyntheticEvent");

var isEventSupported = require("./isEventSupported");
var isTextInputElement = require("./isTextInputElement");
var keyOf = require("./keyOf");

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf({onChange: null}),
      captured: keyOf({onChangeCapture: null})
    }
  }
};

/**
 * For IE shims
 */
var activeElement = null;
var activeElementID = null;
var activeElementValue = null;
var activeElementValueProp = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  return (
    elem.nodeName === 'SELECT' ||
    (elem.nodeName === 'INPUT' && elem.type === 'file')
  );
}

var doesChangeEventBubble = false;
if (ExecutionEnvironment.canUseDOM) {
  // See `handleChange` comment below
  doesChangeEventBubble = isEventSupported('change') && (
    !('documentMode' in document) || document.documentMode > 8
  );
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = SyntheticEvent.getPooled(
    eventTypes.change,
    activeElementID,
    nativeEvent
  );
  EventPropagators.accumulateTwoPhaseDispatches(event);

  // If change bubbled, we'd just bind to it like all the other events
  // and have it go through ReactEventTopLevelCallback. Since it doesn't, we
  // manually listen for the change event and so we have to enqueue and
  // process the abstract event manually.
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue();
}

function startWatchingForChangeEventIE8(target, targetID) {
  activeElement = target;
  activeElementID = targetID;
  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
}

function stopWatchingForChangeEventIE8() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
  activeElement = null;
  activeElementID = null;
}

function getTargetIDForChangeEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topChange) {
    return topLevelTargetID;
  }
}
function handleEventsForChangeEventIE8(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topFocus) {
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForChangeEventIE8();
    startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === topLevelTypes.topBlur) {
    stopWatchingForChangeEventIE8();
  }
}


/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events
  isInputEventSupported = isEventSupported('input') && (
    !('documentMode' in document) || document.documentMode > 9
  );
}

/**
 * (For old IE.) Replacement getter/setter for the `value` property that gets
 * set on the active element.
 */
var newValueProp =  {
  get: function() {
    return activeElementValueProp.get.call(this);
  },
  set: function(val) {
    // Cast to a string so we can do equality checks.
    activeElementValue = '' + val;
    activeElementValueProp.set.call(this, val);
  }
};

/**
 * (For old IE.) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetID) {
  activeElement = target;
  activeElementID = targetID;
  activeElementValue = target.value;
  activeElementValueProp = Object.getOwnPropertyDescriptor(
    target.constructor.prototype,
    'value'
  );

  Object.defineProperty(activeElement, 'value', newValueProp);
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For old IE.) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }

  // delete restores the original property definition
  delete activeElement.value;
  activeElement.detachEvent('onpropertychange', handlePropertyChange);

  activeElement = null;
  activeElementID = null;
  activeElementValue = null;
  activeElementValueProp = null;
}

/**
 * (For old IE.) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === activeElementValue) {
    return;
  }
  activeElementValue = value;

  manualDispatchChangeEvent(nativeEvent);
}

/**
 * If a `change` event should be fired, returns the target's ID.
 */
function getTargetIDForInputEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topInput) {
    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
    // what we want so fall through here and trigger an abstract event
    return topLevelTargetID;
  }
}

// For IE8 and IE9.
function handleEventsForInputEventIE(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topFocus) {
    // In IE8, we can capture almost all .value changes by adding a
    // propertychange handler and looking for events with propertyName
    // equal to 'value'
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === topLevelTypes.topBlur) {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetIDForInputEventIE(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topSelectionChange ||
      topLevelType === topLevelTypes.topKeyUp ||
      topLevelType === topLevelTypes.topKeyDown) {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    if (activeElement && activeElement.value !== activeElementValue) {
      activeElementValue = activeElement.value;
      return activeElementID;
    }
  }
}


/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  return (
    elem.nodeName === 'INPUT' &&
    (elem.type === 'checkbox' || elem.type === 'radio')
  );
}

function getTargetIDForClickEvent(
    topLevelType,
    topLevelTarget,
    topLevelTargetID) {
  if (topLevelType === topLevelTypes.topClick) {
    return topLevelTargetID;
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    var getTargetIDFunc, handleEventFunc;
    if (shouldUseChangeEvent(topLevelTarget)) {
      if (doesChangeEventBubble) {
        getTargetIDFunc = getTargetIDForChangeEvent;
      } else {
        handleEventFunc = handleEventsForChangeEventIE8;
      }
    } else if (isTextInputElement(topLevelTarget)) {
      if (isInputEventSupported) {
        getTargetIDFunc = getTargetIDForInputEvent;
      } else {
        getTargetIDFunc = getTargetIDForInputEventIE;
        handleEventFunc = handleEventsForInputEventIE;
      }
    } else if (shouldUseClickEvent(topLevelTarget)) {
      getTargetIDFunc = getTargetIDForClickEvent;
    }

    if (getTargetIDFunc) {
      var targetID = getTargetIDFunc(
        topLevelType,
        topLevelTarget,
        topLevelTargetID
      );
      if (targetID) {
        var event = SyntheticEvent.getPooled(
          eventTypes.change,
          targetID,
          nativeEvent
        );
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(
        topLevelType,
        topLevelTarget,
        topLevelTargetID
      );
    }
  }

};

module.exports = ChangeEventPlugin;

},{"./EventConstants":33,"./EventPluginHub":35,"./EventPropagators":38,"./ExecutionEnvironment":39,"./SyntheticEvent":94,"./isEventSupported":128,"./isTextInputElement":130,"./keyOf":134}],25:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule CompositionEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPropagators = require("./EventPropagators");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var ReactInputSelection = require("./ReactInputSelection");
var SyntheticCompositionEvent = require("./SyntheticCompositionEvent");

var getTextContentAccessor = require("./getTextContentAccessor");
var keyOf = require("./keyOf");

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var useCompositionEvent = ExecutionEnvironment.canUseDOM &&
  'CompositionEvent' in window;
var topLevelTypes = EventConstants.topLevelTypes;
var currentComposition = null;

// Events and their corresponding property names.
var eventTypes = {
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCompositionEnd: null}),
      captured: keyOf({onCompositionEndCapture: null})
    }
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCompositionStart: null}),
      captured: keyOf({onCompositionStartCapture: null})
    }
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCompositionUpdate: null}),
      captured: keyOf({onCompositionUpdateCapture: null})
    }
  }
};

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionStart:
      return eventTypes.compositionStart;
    case topLevelTypes.topCompositionEnd:
      return eventTypes.compositionEnd;
    case topLevelTypes.topCompositionUpdate:
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackStart(topLevelType, nativeEvent) {
  return (
    topLevelType === topLevelTypes.topKeyDown &&
    nativeEvent.keyCode === START_KEYCODE
  );
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case topLevelTypes.topKeyUp:
      // Command keys insert or clear IME input.
      return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
    case topLevelTypes.topKeyDown:
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return (nativeEvent.keyCode !== START_KEYCODE);
    case topLevelTypes.topKeyPress:
    case topLevelTypes.topMouseDown:
    case topLevelTypes.topBlur:
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Helper class stores information about selection and document state
 * so we can figure out what changed at a later date.
 *
 * @param {DOMEventTarget} root
 */
function FallbackCompositionState(root) {
  this.root = root;
  this.startSelection = ReactInputSelection.getSelection(root);
  this.startValue = this.getText();
}

/**
 * Get current text of input.
 *
 * @return {string}
 */
FallbackCompositionState.prototype.getText = function() {
  return this.root.value || this.root[getTextContentAccessor()];
};

/**
 * Text that has changed since the start of composition.
 *
 * @return {string}
 */
FallbackCompositionState.prototype.getData = function() {
  var endValue = this.getText();
  var prefixLength = this.startSelection.start;
  var suffixLength = this.startValue.length - this.startSelection.end;

  return endValue.substr(
    prefixLength,
    endValue.length - suffixLength - prefixLength
  );
};

/**
 * This plugin creates `onCompositionStart`, `onCompositionUpdate` and
 * `onCompositionEnd` events on inputs, textareas and contentEditable
 * nodes.
 */
var CompositionEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    var eventType;
    var data;

    if (useCompositionEvent) {
      eventType = getCompositionEventType(topLevelType);
    } else if (!currentComposition) {
      if (isFallbackStart(topLevelType, nativeEvent)) {
        eventType = eventTypes.start;
        currentComposition = new FallbackCompositionState(topLevelTarget);
      }
    } else if (isFallbackEnd(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionEnd;
      data = currentComposition.getData();
      currentComposition = null;
    }

    if (eventType) {
      var event = SyntheticCompositionEvent.getPooled(
        eventType,
        topLevelTargetID,
        nativeEvent
      );
      if (data) {
        // Inject data generated from fallback path into the synthetic event.
        // This matches the property of native CompositionEventInterface.
        event.data = data;
      }
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }
  }
};

module.exports = CompositionEventPlugin;

},{"./EventConstants":33,"./EventPropagators":38,"./ExecutionEnvironment":39,"./ReactInputSelection":68,"./SyntheticCompositionEvent":93,"./getTextContentAccessor":124,"./keyOf":134}],26:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMChildrenOperations
 * @typechecks static-only
 */

"use strict";

var Danger = require("./Danger");
var ReactMultiChildUpdateTypes = require("./ReactMultiChildUpdateTypes");

var getTextContentAccessor = require("./getTextContentAccessor");

/**
 * The DOM property to use when setting text content.
 *
 * @type {string}
 * @private
 */
var textContentAccessor = getTextContentAccessor() || 'NA';

/**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */
function insertChildAt(parentNode, childNode, index) {
  var childNodes = parentNode.childNodes;
  if (childNodes[index] === childNode) {
    return;
  }
  // If `childNode` is already a child of `parentNode`, remove it so that
  // computing `childNodes[index]` takes into account the removal.
  if (childNode.parentNode === parentNode) {
    parentNode.removeChild(childNode);
  }
  if (index >= childNodes.length) {
    parentNode.appendChild(childNode);
  } else {
    parentNode.insertBefore(childNode, childNodes[index]);
  }
}

/**
 * Operations for updating with DOM children.
 */
var DOMChildrenOperations = {

  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

  /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markupList List of markup strings.
   * @internal
   */
  processUpdates: function(updates, markupList) {
    var update;
    // Mapping from parent IDs to initial child orderings.
    var initialChildren = null;
    // List of children that will be moved or removed.
    var updatedChildren = null;

    for (var i = 0; update = updates[i]; i++) {
      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
          update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
        var updatedIndex = update.fromIndex;
        var updatedChild = update.parentNode.childNodes[updatedIndex];
        var parentID = update.parentID;

        initialChildren = initialChildren || {};
        initialChildren[parentID] = initialChildren[parentID] || [];
        initialChildren[parentID][updatedIndex] = updatedChild;

        updatedChildren = updatedChildren || [];
        updatedChildren.push(updatedChild);
      }
    }

    var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);

    // Remove updated children first so that `toIndex` is consistent.
    if (updatedChildren) {
      for (var j = 0; j < updatedChildren.length; j++) {
        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
      }
    }

    for (var k = 0; update = updates[k]; k++) {
      switch (update.type) {
        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
          insertChildAt(
            update.parentNode,
            renderedMarkup[update.markupIndex],
            update.toIndex
          );
          break;
        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
          insertChildAt(
            update.parentNode,
            initialChildren[update.parentID][update.fromIndex],
            update.toIndex
          );
          break;
        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
          update.parentNode[textContentAccessor] = update.textContent;
          break;
        case ReactMultiChildUpdateTypes.REMOVE_NODE:
          // Already removed by the for-loop above.
          break;
      }
    }
  }

};

module.exports = DOMChildrenOperations;

},{"./Danger":29,"./ReactMultiChildUpdateTypes":75,"./getTextContentAccessor":124}],27:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMProperty
 * @typechecks static-only
 */

/*jslint bitwise: true */

"use strict";

var invariant = require("./invariant");

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function(domPropertyConfig) {
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(
        domPropertyConfig.isCustomAttribute
      );
    }

    for (var propName in Properties) {
      ("production" !== process.env.NODE_ENV ? invariant(
        !DOMProperty.isStandardName[propName],
        'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' +
        '\'%s\' which has already been injected. You may be accidentally ' +
        'injecting the same DOM property config twice, or you may be ' +
        'injecting two configs that have conflicting property names.',
        propName
      ) : invariant(!DOMProperty.isStandardName[propName]));

      DOMProperty.isStandardName[propName] = true;

      var lowerCased = propName.toLowerCase();
      DOMProperty.getPossibleStandardName[lowerCased] = propName;

      var attributeName = DOMAttributeNames[propName];
      if (attributeName) {
        DOMProperty.getPossibleStandardName[attributeName] = propName;
      }

      DOMProperty.getAttributeName[propName] = attributeName || lowerCased;

      DOMProperty.getPropertyName[propName] =
        DOMPropertyNames[propName] || propName;

      var mutationMethod = DOMMutationMethods[propName];
      if (mutationMethod) {
        DOMProperty.getMutationMethod[propName] = mutationMethod;
      }

      var propConfig = Properties[propName];
      DOMProperty.mustUseAttribute[propName] =
        propConfig & DOMPropertyInjection.MUST_USE_ATTRIBUTE;
      DOMProperty.mustUseProperty[propName] =
        propConfig & DOMPropertyInjection.MUST_USE_PROPERTY;
      DOMProperty.hasSideEffects[propName] =
        propConfig & DOMPropertyInjection.HAS_SIDE_EFFECTS;
      DOMProperty.hasBooleanValue[propName] =
        propConfig & DOMPropertyInjection.HAS_BOOLEAN_VALUE;
      DOMProperty.hasPositiveNumericValue[propName] =
        propConfig & DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE;

      ("production" !== process.env.NODE_ENV ? invariant(
        !DOMProperty.mustUseAttribute[propName] ||
          !DOMProperty.mustUseProperty[propName],
        'DOMProperty: Cannot require using both attribute and property: %s',
        propName
      ) : invariant(!DOMProperty.mustUseAttribute[propName] ||
        !DOMProperty.mustUseProperty[propName]));
      ("production" !== process.env.NODE_ENV ? invariant(
        DOMProperty.mustUseProperty[propName] ||
          !DOMProperty.hasSideEffects[propName],
        'DOMProperty: Properties that have side effects must use property: %s',
        propName
      ) : invariant(DOMProperty.mustUseProperty[propName] ||
        !DOMProperty.hasSideEffects[propName]));
      ("production" !== process.env.NODE_ENV ? invariant(
        !DOMProperty.hasBooleanValue[propName] ||
          !DOMProperty.hasPositiveNumericValue[propName],
        'DOMProperty: Cannot have both boolean and positive numeric value: %s',
        propName
      ) : invariant(!DOMProperty.hasBooleanValue[propName] ||
        !DOMProperty.hasPositiveNumericValue[propName]));
    }
  }
};
var defaultValueCache = {};

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {

  /**
   * Checks whether a property name is a standard property.
   * @type {Object}
   */
  isStandardName: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties.
   * @type {Object}
   */
  getPossibleStandardName: {},

  /**
   * Mapping from normalized names to attribute names that differ. Attribute
   * names are used when rendering markup or with `*Attribute()`.
   * @type {Object}
   */
  getAttributeName: {},

  /**
   * Mapping from normalized names to properties on DOM node instances.
   * (This includes properties that mutate due to external factors.)
   * @type {Object}
   */
  getPropertyName: {},

  /**
   * Mapping from normalized names to mutation methods. This will only exist if
   * mutation cannot be set simply by the property or `setAttribute()`.
   * @type {Object}
   */
  getMutationMethod: {},

  /**
   * Whether the property must be accessed and mutated as an object property.
   * @type {Object}
   */
  mustUseAttribute: {},

  /**
   * Whether the property must be accessed and mutated using `*Attribute()`.
   * (This includes anything that fails `<propName> in <element>`.)
   * @type {Object}
   */
  mustUseProperty: {},

  /**
   * Whether or not setting a value causes side effects such as triggering
   * resources to be loaded or text selection changes. We must ensure that
   * the value is only set if it has changed.
   * @type {Object}
   */
  hasSideEffects: {},

  /**
   * Whether the property should be removed when set to a falsey value.
   * @type {Object}
   */
  hasBooleanValue: {},

  /**
   * Whether the property must be positive numeric or parse as a positive
   * numeric and should be removed when set to a falsey value.
   * @type {Object}
   */
  hasPositiveNumericValue: {},

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function(attributeName) {
    return DOMProperty._isCustomAttributeFunctions.some(
      function(isCustomAttributeFn) {
        return isCustomAttributeFn.call(null, attributeName);
      }
    );
  },

  /**
   * Returns the default property value for a DOM property (i.e., not an
   * attribute). Most default values are '' or false, but not all. Worse yet,
   * some (in particular, `type`) vary depending on the type of element.
   *
   * TODO: Is it better to grab all the possible properties when creating an
   * element to avoid having to create the same element twice?
   */
  getDefaultValueForProperty: function(nodeName, prop) {
    var nodeDefaults = defaultValueCache[nodeName];
    var testElement;
    if (!nodeDefaults) {
      defaultValueCache[nodeName] = nodeDefaults = {};
    }
    if (!(prop in nodeDefaults)) {
      testElement = document.createElement(nodeName);
      nodeDefaults[prop] = testElement[prop];
    }
    return nodeDefaults[prop];
  },

  injection: DOMPropertyInjection
};

module.exports = DOMProperty;

},{"./invariant":127,"__browserify_process":16}],28:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DOMPropertyOperations
 * @typechecks static-only
 */

"use strict";

var DOMProperty = require("./DOMProperty");

var escapeTextForBrowser = require("./escapeTextForBrowser");
var memoizeStringOnly = require("./memoizeStringOnly");

function shouldIgnoreValue(name, value) {
  return value == null ||
    DOMProperty.hasBooleanValue[name] && !value ||
    DOMProperty.hasPositiveNumericValue[name] && (isNaN(value) || value < 1);
}

var processAttributeNameAndPrefix = memoizeStringOnly(function(name) {
  return escapeTextForBrowser(name) + '="';
});

if ("production" !== process.env.NODE_ENV) {
  var reactProps = {
    __owner__: true,
    children: true,
    dangerouslySetInnerHTML: true,
    key: true,
    ref: true
  };
  var warnedProperties = {};

  var warnUnknownProperty = function(name) {
    if (reactProps[name] || warnedProperties[name]) {
      return;
    }

    warnedProperties[name] = true;
    var lowerCasedName = name.toLowerCase();

    // data-* attributes should be lowercase; suggest the lowercase version
    var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ?
      lowerCasedName : DOMProperty.getPossibleStandardName[lowerCasedName];

    // For now, only warn when we have a suggested correction. This prevents
    // logging too much when using transferPropsTo.
    if (standardName != null) {
      console.warn(
        'Unknown DOM property ' + name + '. Did you mean ' + standardName + '?'
      );
    }

  };
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMPropertyOperations = {

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function(name, value) {
    if (DOMProperty.isStandardName[name]) {
      if (shouldIgnoreValue(name, value)) {
        return '';
      }
      var attributeName = DOMProperty.getAttributeName[name];
      return processAttributeNameAndPrefix(attributeName) +
        escapeTextForBrowser(value) + '"';
    } else if (DOMProperty.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return processAttributeNameAndPrefix(name) +
        escapeTextForBrowser(value) + '"';
    } else if ("production" !== process.env.NODE_ENV) {
      warnUnknownProperty(name);
    }
    return null;
  },

  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */
  setValueForProperty: function(node, name, value) {
    if (DOMProperty.isStandardName[name]) {
      var mutationMethod = DOMProperty.getMutationMethod[name];
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (shouldIgnoreValue(name, value)) {
        this.deleteValueForProperty(node, name);
      } else if (DOMProperty.mustUseAttribute[name]) {
        node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
      } else {
        var propName = DOMProperty.getPropertyName[name];
        if (!DOMProperty.hasSideEffects[name] || node[propName] !== value) {
          node[propName] = value;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      if (value == null) {
        node.removeAttribute(DOMProperty.getAttributeName[name]);
      } else {
        node.setAttribute(name, '' + value);
      }
    } else if ("production" !== process.env.NODE_ENV) {
      warnUnknownProperty(name);
    }
  },

  /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForProperty: function(node, name) {
    if (DOMProperty.isStandardName[name]) {
      var mutationMethod = DOMProperty.getMutationMethod[name];
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (DOMProperty.mustUseAttribute[name]) {
        node.removeAttribute(DOMProperty.getAttributeName[name]);
      } else {
        var propName = DOMProperty.getPropertyName[name];
        var defaultValue = DOMProperty.getDefaultValueForProperty(
          node.nodeName,
          name
        );
        if (!DOMProperty.hasSideEffects[name] ||
            node[propName] !== defaultValue) {
          node[propName] = defaultValue;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      node.removeAttribute(name);
    } else if ("production" !== process.env.NODE_ENV) {
      warnUnknownProperty(name);
    }
  }

};

module.exports = DOMPropertyOperations;

},{"./DOMProperty":27,"./escapeTextForBrowser":113,"./memoizeStringOnly":135,"__browserify_process":16}],29:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Danger
 * @typechecks static-only
 */

/*jslint evil: true, sub: true */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var createNodesFromMarkup = require("./createNodesFromMarkup");
var emptyFunction = require("./emptyFunction");
var getMarkupWrap = require("./getMarkupWrap");
var invariant = require("./invariant");
var mutateHTMLNodeWithMarkup = require("./mutateHTMLNodeWithMarkup");

var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
var RESULT_INDEX_ATTR = 'data-danger-index';

/**
 * Extracts the `nodeName` from a string of markup.
 *
 * NOTE: Extracting the `nodeName` does not require a regular expression match
 * because we make assumptions about React-generated markup (i.e. there are no
 * spaces surrounding the opening tag and there is at least one attribute).
 *
 * @param {string} markup String of markup.
 * @return {string} Node name of the supplied markup.
 * @see http://jsperf.com/extract-nodename
 */
function getNodeName(markup) {
  return markup.substring(1, markup.indexOf(' '));
}

var Danger = {

  /**
   * Renders markup into an array of nodes. The markup is expected to render
   * into a list of root nodes. Also, the length of `resultList` and
   * `markupList` should be the same.
   *
   * @param {array<string>} markupList List of markup strings to render.
   * @return {array<DOMElement>} List of rendered nodes.
   * @internal
   */
  dangerouslyRenderMarkup: function(markupList) {
    ("production" !== process.env.NODE_ENV ? invariant(
      ExecutionEnvironment.canUseDOM,
      'dangerouslyRenderMarkup(...): Cannot render markup in a Worker ' +
      'thread. This is likely a bug in the framework. Please report ' +
      'immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    var nodeName;
    var markupByNodeName = {};
    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
    for (var i = 0; i < markupList.length; i++) {
      ("production" !== process.env.NODE_ENV ? invariant(
        markupList[i],
        'dangerouslyRenderMarkup(...): Missing markup.'
      ) : invariant(markupList[i]));
      nodeName = getNodeName(markupList[i]);
      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
      markupByNodeName[nodeName][i] = markupList[i];
    }
    var resultList = [];
    var resultListAssignmentCount = 0;
    for (nodeName in markupByNodeName) {
      if (!markupByNodeName.hasOwnProperty(nodeName)) {
        continue;
      }
      var markupListByNodeName = markupByNodeName[nodeName];

      // This for-in loop skips the holes of the sparse array. The order of
      // iteration should follow the order of assignment, which happens to match
      // numerical index order, but we don't rely on that.
      for (var resultIndex in markupListByNodeName) {
        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
          var markup = markupListByNodeName[resultIndex];

          // Push the requested markup with an additional RESULT_INDEX_ATTR
          // attribute.  If the markup does not start with a < character, it
          // will be discarded below (with an appropriate console.error).
          markupListByNodeName[resultIndex] = markup.replace(
            OPEN_TAG_NAME_EXP,
            // This index will be parsed back out below.
            '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
          );
        }
      }

      // Render each group of markup with similar wrapping `nodeName`.
      var renderNodes = createNodesFromMarkup(
        markupListByNodeName.join(''),
        emptyFunction // Do nothing special with <script> tags.
      );

      for (i = 0; i < renderNodes.length; ++i) {
        var renderNode = renderNodes[i];
        if (renderNode.hasAttribute &&
            renderNode.hasAttribute(RESULT_INDEX_ATTR)) {

          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
          renderNode.removeAttribute(RESULT_INDEX_ATTR);

          ("production" !== process.env.NODE_ENV ? invariant(
            !resultList.hasOwnProperty(resultIndex),
            'Danger: Assigning to an already-occupied result index.'
          ) : invariant(!resultList.hasOwnProperty(resultIndex)));

          resultList[resultIndex] = renderNode;

          // This should match resultList.length and markupList.length when
          // we're done.
          resultListAssignmentCount += 1;

        } else if ("production" !== process.env.NODE_ENV) {
          console.error(
            "Danger: Discarding unexpected node:",
            renderNode
          );
        }
      }
    }

    // Although resultList was populated out of order, it should now be a dense
    // array.
    ("production" !== process.env.NODE_ENV ? invariant(
      resultListAssignmentCount === resultList.length,
      'Danger: Did not assign to every index of resultList.'
    ) : invariant(resultListAssignmentCount === resultList.length));

    ("production" !== process.env.NODE_ENV ? invariant(
      resultList.length === markupList.length,
      'Danger: Expected markup to render %s nodes, but rendered %s.',
      markupList.length,
      resultList.length
    ) : invariant(resultList.length === markupList.length));

    return resultList;
  },

  /**
   * Replaces a node with a string of markup at its current position within its
   * parent. The markup must render into a single root node.
   *
   * @param {DOMElement} oldChild Child node to replace.
   * @param {string} markup Markup to render in place of the child node.
   * @internal
   */
  dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
    ("production" !== process.env.NODE_ENV ? invariant(
      ExecutionEnvironment.canUseDOM,
      'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' +
      'worker thread. This is likely a bug in the framework. Please report ' +
      'immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    ("production" !== process.env.NODE_ENV ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
    // createNodesFromMarkup() won't work if the markup is rooted by <html>
    // since it has special semantic meaning. So we use an alternatie strategy.
    if (oldChild.tagName.toLowerCase() === 'html') {
      mutateHTMLNodeWithMarkup(oldChild, markup);
      return;
    }
    var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }

};

module.exports = Danger;

},{"./ExecutionEnvironment":39,"./createNodesFromMarkup":108,"./emptyFunction":112,"./getMarkupWrap":121,"./invariant":127,"./mutateHTMLNodeWithMarkup":140,"__browserify_process":16}],30:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DefaultDOMPropertyConfig
 */

/*jslint bitwise: true*/

"use strict";

var DOMProperty = require("./DOMProperty");

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
var HAS_POSITIVE_NUMERIC_VALUE =
  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;

var DefaultDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(
    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
  ),
  Properties: {
    /**
     * Standard Properties
     */
    accept: null,
    accessKey: null,
    action: null,
    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    allowTransparency: MUST_USE_ATTRIBUTE,
    alt: null,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: null,
    autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    cellPadding: null,
    cellSpacing: null,
    charSet: MUST_USE_ATTRIBUTE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    className: MUST_USE_PROPERTY,
    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: MUST_USE_ATTRIBUTE,
    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    data: null, // For `<object />` acts as `src`.
    dateTime: MUST_USE_ATTRIBUTE,
    defer: HAS_BOOLEAN_VALUE,
    dir: null,
    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    draggable: null,
    encType: null,
    form: MUST_USE_ATTRIBUTE,
    frameBorder: MUST_USE_ATTRIBUTE,
    height: MUST_USE_ATTRIBUTE,
    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    href: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: MUST_USE_PROPERTY,
    label: null,
    lang: null,
    list: null,
    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    max: null,
    maxLength: MUST_USE_ATTRIBUTE,
    method: null,
    min: null,
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: null,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    rel: null,
    required: HAS_BOOLEAN_VALUE,
    role: MUST_USE_ATTRIBUTE,
    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: null,
    scrollLeft: MUST_USE_PROPERTY,
    scrollTop: MUST_USE_PROPERTY,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: null,
    src: null,
    step: null,
    style: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
    width: MUST_USE_ATTRIBUTE,
    wmode: MUST_USE_ATTRIBUTE,

    /**
     * Non-standard Properties
     */
    autoCapitalize: null, // Supported in Mobile Safari for keyboard hints
    autoCorrect: null, // Supported in Mobile Safari for keyboard hints

    /**
     * SVG Properties
     */
    cx: MUST_USE_ATTRIBUTE,
    cy: MUST_USE_ATTRIBUTE,
    d: MUST_USE_ATTRIBUTE,
    fill: MUST_USE_ATTRIBUTE,
    fx: MUST_USE_ATTRIBUTE,
    fy: MUST_USE_ATTRIBUTE,
    gradientTransform: MUST_USE_ATTRIBUTE,
    gradientUnits: MUST_USE_ATTRIBUTE,
    offset: MUST_USE_ATTRIBUTE,
    points: MUST_USE_ATTRIBUTE,
    r: MUST_USE_ATTRIBUTE,
    rx: MUST_USE_ATTRIBUTE,
    ry: MUST_USE_ATTRIBUTE,
    spreadMethod: MUST_USE_ATTRIBUTE,
    stopColor: MUST_USE_ATTRIBUTE,
    stopOpacity: MUST_USE_ATTRIBUTE,
    stroke: MUST_USE_ATTRIBUTE,
    strokeLinecap: MUST_USE_ATTRIBUTE,
    strokeWidth: MUST_USE_ATTRIBUTE,
    transform: MUST_USE_ATTRIBUTE,
    version: MUST_USE_ATTRIBUTE,
    viewBox: MUST_USE_ATTRIBUTE,
    x1: MUST_USE_ATTRIBUTE,
    x2: MUST_USE_ATTRIBUTE,
    x: MUST_USE_ATTRIBUTE,
    y1: MUST_USE_ATTRIBUTE,
    y2: MUST_USE_ATTRIBUTE,
    y: MUST_USE_ATTRIBUTE
  },
  DOMAttributeNames: {
    className: 'class',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    htmlFor: 'for',
    spreadMethod: 'spreadMethod',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strokeLinecap: 'stroke-linecap',
    strokeWidth: 'stroke-width',
    viewBox: 'viewBox'
  },
  DOMPropertyNames: {
    autoCapitalize: 'autocapitalize',
    autoComplete: 'autocomplete',
    autoCorrect: 'autocorrect',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    encType: 'enctype',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck'
  },
  DOMMutationMethods: {
    /**
     * Setting `className` to null may cause it to be set to the string "null".
     *
     * @param {DOMElement} node
     * @param {*} value
     */
    className: function(node, value) {
      node.className = value || '';
    }
  }
};

module.exports = DefaultDOMPropertyConfig;

},{"./DOMProperty":27}],31:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule DefaultEventPluginOrder
 */

"use strict";

 var keyOf = require("./keyOf");

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */
var DefaultEventPluginOrder = [
  keyOf({ResponderEventPlugin: null}),
  keyOf({SimpleEventPlugin: null}),
  keyOf({TapEventPlugin: null}),
  keyOf({EnterLeaveEventPlugin: null}),
  keyOf({ChangeEventPlugin: null}),
  keyOf({SelectEventPlugin: null}),
  keyOf({CompositionEventPlugin: null}),
  keyOf({AnalyticsEventPlugin: null}),
  keyOf({MobileSafariClickEventPlugin: null})
];

module.exports = DefaultEventPluginOrder;

},{"./keyOf":134}],32:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EnterLeaveEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPropagators = require("./EventPropagators");
var SyntheticMouseEvent = require("./SyntheticMouseEvent");

var ReactMount = require("./ReactMount");
var keyOf = require("./keyOf");

var topLevelTypes = EventConstants.topLevelTypes;
var getFirstReactDOM = ReactMount.getFirstReactDOM;

var eventTypes = {
  mouseEnter: {registrationName: keyOf({onMouseEnter: null})},
  mouseLeave: {registrationName: keyOf({onMouseLeave: null})}
};

var extractedEvents = [null, null];

var EnterLeaveEventPlugin = {

  eventTypes: eventTypes,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    if (topLevelType === topLevelTypes.topMouseOver &&
        (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== topLevelTypes.topMouseOut &&
        topLevelType !== topLevelTypes.topMouseOver) {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var from, to;
    if (topLevelType === topLevelTypes.topMouseOut) {
      from = topLevelTarget;
      to =
        getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) ||
        window;
    } else {
      from = window;
      to = topLevelTarget;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromID = from ? ReactMount.getID(from) : '';
    var toID = to ? ReactMount.getID(to) : '';

    var leave = SyntheticMouseEvent.getPooled(
      eventTypes.mouseLeave,
      fromID,
      nativeEvent
    );
    var enter = SyntheticMouseEvent.getPooled(
      eventTypes.mouseEnter,
      toID,
      nativeEvent
    );

    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

    extractedEvents[0] = leave;
    extractedEvents[1] = enter;

    return extractedEvents;
  }

};

module.exports = EnterLeaveEventPlugin;

},{"./EventConstants":33,"./EventPropagators":38,"./ReactMount":72,"./SyntheticMouseEvent":97,"./keyOf":134}],33:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventConstants
 */

"use strict";

var keyMirror = require("./keyMirror");

var PropagationPhases = keyMirror({bubbled: null, captured: null});

/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = keyMirror({
  topBlur: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topFocus: null,
  topInput: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topScroll: null,
  topSelectionChange: null,
  topSubmit: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topWheel: null
});

var EventConstants = {
  topLevelTypes: topLevelTypes,
  PropagationPhases: PropagationPhases
};

module.exports = EventConstants;

},{"./keyMirror":133}],34:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventListener
 */

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listens to bubbled events on a DOM node.
   *
   * @param {Element} el DOM element to register listener on.
   * @param {string} handlerBaseName 'click'/'mouseover'
   * @param {Function!} cb Callback function
   */
  listen: function(el, handlerBaseName, cb) {
    if (el.addEventListener) {
      el.addEventListener(handlerBaseName, cb, false);
    } else if (el.attachEvent) {
      el.attachEvent('on' + handlerBaseName, cb);
    }
  },

  /**
   * Listens to captured events on a DOM node.
   *
   * @see `EventListener.listen` for params.
   * @throws Exception if addEventListener is not supported.
   */
  capture: function(el, handlerBaseName, cb) {
    if (!el.addEventListener) {
      if ("production" !== process.env.NODE_ENV) {
        console.error(
          'You are attempting to use addEventListener ' +
          'in a browser that does not support it.' +
          'This likely means that you will not receive events that ' +
          'your application relies on (such as scroll).');
      }
      return;
    } else {
      el.addEventListener(handlerBaseName, cb, true);
    }
  }
};

module.exports = EventListener;

},{"__browserify_process":16}],35:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginHub
 */

"use strict";

var CallbackRegistry = require("./CallbackRegistry");
var EventPluginRegistry = require("./EventPluginRegistry");
var EventPluginUtils = require("./EventPluginUtils");
var EventPropagators = require("./EventPropagators");
var ExecutionEnvironment = require("./ExecutionEnvironment");

var accumulate = require("./accumulate");
var forEachAccumulated = require("./forEachAccumulated");
var invariant = require("./invariant");

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */
var executeDispatchesAndRelease = function(event) {
  if (event) {
    var executeDispatch = EventPluginUtils.executeDispatch;
    // Plugins can provide custom behavior when dispatching events.
    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
    if (PluginModule && PluginModule.executeDispatch) {
      executeDispatch = PluginModule.executeDispatch;
    }
    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {object} InjectedInstanceHandle
     * @public
     */
    injectInstanceHandle: EventPropagators.injection.injectInstanceHandle,

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  registrationNames: EventPluginRegistry.registrationNames,

  putListener: CallbackRegistry.putListener,

  getListener: CallbackRegistry.getListener,

  deleteListener: CallbackRegistry.deleteListener,

  deleteAllListeners: CallbackRegistry.deleteAllListeners,

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0, l = plugins.length; i < l; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(
          topLevelType,
          topLevelTarget,
          topLevelTargetID,
          nativeEvent
        );
        if (extractedEvents) {
          events = accumulate(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function(events) {
    if (events) {
      eventQueue = accumulate(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function() {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
    ("production" !== process.env.NODE_ENV ? invariant(
      !eventQueue,
      'processEventQueue(): Additional events were enqueued while processing ' +
      'an event queue. Support for this has not yet been implemented.'
    ) : invariant(!eventQueue));
  }

};

if (ExecutionEnvironment.canUseDOM) {
  window.EventPluginHub = EventPluginHub;
}

module.exports = EventPluginHub;

},{"./CallbackRegistry":23,"./EventPluginRegistry":36,"./EventPluginUtils":37,"./EventPropagators":38,"./ExecutionEnvironment":39,"./accumulate":103,"./forEachAccumulated":117,"./invariant":127,"__browserify_process":16}],36:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginRegistry
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Injectable ordering of event plugins.
 */
var EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!EventPluginOrder) {
    // Wait until an `EventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var PluginModule = namesToPlugins[pluginName];
    var pluginIndex = EventPluginOrder.indexOf(pluginName);
    ("production" !== process.env.NODE_ENV ? invariant(
      pluginIndex > -1,
      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
      'the plugin ordering, `%s`.',
      pluginName
    ) : invariant(pluginIndex > -1));
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      PluginModule.extractEvents,
      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
      'method, but `%s` does not.',
      pluginName
    ) : invariant(PluginModule.extractEvents));
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      ("production" !== process.env.NODE_ENV ? invariant(
        publishEventForPlugin(publishedEvents[eventName], PluginModule),
        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
        eventName,
        pluginName
      ) : invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule)));
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, PluginModule) {
  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, PluginModule);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, PluginModule);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, PluginModule) {
  ("production" !== process.env.NODE_ENV ? invariant(
    !EventPluginRegistry.registrationNames[registrationName],
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'registration name, `%s`.',
    registrationName
  ) : invariant(!EventPluginRegistry.registrationNames[registrationName]));
  EventPluginRegistry.registrationNames[registrationName] = PluginModule;
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from registration names to plugin modules.
   */
  registrationNames: {},

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function(InjectedEventPluginOrder) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !EventPluginOrder,
      'EventPluginRegistry: Cannot inject event plugin ordering more than once.'
    ) : invariant(!EventPluginOrder));
    // Clone the ordering so it cannot be dynamically mutated.
    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (namesToPlugins[pluginName] !== PluginModule) {
        ("production" !== process.env.NODE_ENV ? invariant(
          !namesToPlugins[pluginName],
          'EventPluginRegistry: Cannot inject two different event plugins ' +
          'using the same name, `%s`.',
          pluginName
        ) : invariant(!namesToPlugins[pluginName]));
        namesToPlugins[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function(event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNames[
        dispatchConfig.registrationName
      ] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry.registrationNames[
        dispatchConfig.phasedRegistrationNames[phase]
      ];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function() {
    EventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;
    var registrationNames = EventPluginRegistry.registrationNames;
    for (var registrationName in registrationNames) {
      if (registrationNames.hasOwnProperty(registrationName)) {
        delete registrationNames[registrationName];
      }
    }
  }

};

module.exports = EventPluginRegistry;

},{"./invariant":127,"__browserify_process":16}],37:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPluginUtils
 */

"use strict";

var EventConstants = require("./EventConstants");

var invariant = require("./invariant");

var topLevelTypes = EventConstants.topLevelTypes;

function isEndish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseUp ||
         topLevelType === topLevelTypes.topTouchEnd ||
         topLevelType === topLevelTypes.topTouchCancel;
}

function isMoveish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseMove ||
         topLevelType === topLevelTypes.topTouchMove;
}
function isStartish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseDown ||
         topLevelType === topLevelTypes.topTouchStart;
}

var validateEventDispatches;
if ("production" !== process.env.NODE_ENV) {
  validateEventDispatches = function(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var idsIsArr = Array.isArray(dispatchIDs);
    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
    var listenersLen = listenersIsArr ?
      dispatchListeners.length :
      dispatchListeners ? 1 : 0;

    ("production" !== process.env.NODE_ENV ? invariant(
      idsIsArr === listenersIsArr && IDsLen === listenersLen,
      'EventPluginUtils: Invalid `event`.'
    ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
  };
}

/**
 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
 * kept separate to conserve memory.
 */
function forEachEventDispatch(event, cb) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      cb(event, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    cb(event, dispatchListeners, dispatchIDs);
  }
}

/**
 * Default implementation of PluginModule.executeDispatch().
 * @param {SyntheticEvent} SyntheticEvent to handle
 * @param {function} Application-level callback
 * @param {string} domID DOM id to pass to the callback.
 */
function executeDispatch(event, listener, domID) {
  listener(event, domID);
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, executeDispatch) {
  forEachEventDispatch(event, executeDispatch);
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return id of the first dispatch execution who's listener returns true, or
 * null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchIDs[i])) {
        return dispatchIDs[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchIDs)) {
      return dispatchIDs;
    }
  }
  return null;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  ("production" !== process.env.NODE_ENV ? invariant(
    !Array.isArray(dispatchListener),
    'executeDirectDispatch(...): Invalid `event`.'
  ) : invariant(!Array.isArray(dispatchListener)));
  var res = dispatchListener ?
    dispatchListener(event, dispatchID) :
    null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {bool} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  executeDirectDispatch: executeDirectDispatch,
  hasDispatches: hasDispatches,
  executeDispatch: executeDispatch
};

module.exports = EventPluginUtils;

},{"./EventConstants":33,"./invariant":127,"__browserify_process":16}],38:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventPropagators
 */

"use strict";

var CallbackRegistry = require("./CallbackRegistry");
var EventConstants = require("./EventConstants");

var accumulate = require("./accumulate");
var forEachAccumulated = require("./forEachAccumulated");
var getListener = CallbackRegistry.getListener;
var PropagationPhases = EventConstants.PropagationPhases;

/**
 * Injected dependencies:
 */

/**
 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
 *   hierarchy given ids of the logical DOM elements involved.
 */
var injection = {
  InstanceHandle: null,
  injectInstanceHandle: function(InjectedInstanceHandle) {
    injection.InstanceHandle = InjectedInstanceHandle;
    if ("production" !== process.env.NODE_ENV) {
      injection.validate();
    }
  },
  validate: function() {
    var invalid = !injection.InstanceHandle||
      !injection.InstanceHandle.traverseTwoPhase ||
      !injection.InstanceHandle.traverseEnterLeave;
    if (invalid) {
      throw new Error('InstanceHandle not injected before use!');
    }
  }
};

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(id, event, propagationPhase) {
  var registrationName =
    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(id, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(domID, upwards, event) {
  if ("production" !== process.env.NODE_ENV) {
    if (!domID) {
      throw new Error('Dispatching id must not be null');
    }
    injection.validate();
  }
  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
  var listener = listenerAtPhase(domID, event, phase);
  if (listener) {
    event._dispatchListeners = accumulate(event._dispatchListeners, listener);
    event._dispatchIDs = accumulate(event._dispatchIDs, domID);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We can not perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    injection.InstanceHandle.traverseTwoPhase(
      event.dispatchMarker,
      accumulateDirectionalDispatches,
      event
    );
  }
}


/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(id, registrationName);
    if (listener) {
      event._dispatchListeners = accumulate(event._dispatchListeners, listener);
      event._dispatchIDs = accumulate(event._dispatchIDs, id);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event.dispatchMarker, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  if ("production" !== process.env.NODE_ENV) {
    injection.validate();
  }
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
  if ("production" !== process.env.NODE_ENV) {
    injection.validate();
  }
  injection.InstanceHandle.traverseEnterLeave(
    fromID,
    toID,
    accumulateDispatches,
    leave,
    enter
  );
}


function accumulateDirectDispatches(events) {
  if ("production" !== process.env.NODE_ENV) {
    injection.validate();
  }
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}



/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
  injection: injection
};

module.exports = EventPropagators;

},{"./CallbackRegistry":23,"./EventConstants":33,"./accumulate":103,"./forEachAccumulated":117,"__browserify_process":16}],39:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

"use strict";

var canUseDOM = typeof window !== 'undefined';

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

},{}],40:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule LinkedStateMixin
 * @typechecks static-only
 */

"use strict";

var ReactLink = require("./ReactLink");
var ReactStateSetters = require("./ReactStateSetters");

/**
 * A simple mixin around ReactLink.forState().
 */
var LinkedStateMixin = {
  /**
   * Create a ReactLink that's linked to part of this component's state. The
   * ReactLink will have the current value of this.state[key] and will call
   * setState() when a change is requested.
   *
   * @param {string} key state key to update. Note: you may want to use keyOf()
   * if you're using Google Closure Compiler advanced mode.
   * @return {ReactLink} ReactLink instance linking to the state.
   */
  linkState: function(key) {
    return new ReactLink(
      this.state[key],
      ReactStateSetters.createStateKeySetter(this, key)
    );
  }
};

module.exports = LinkedStateMixin;

},{"./ReactLink":70,"./ReactStateSetters":82}],41:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule LinkedValueMixin
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */
var LinkedValueMixin = {
  _assertLink: function() {
    ("production" !== process.env.NODE_ENV ? invariant(
      this.props.value == null && this.props.onChange == null,
      'Cannot provide a valueLink and a value or onChange event. If you ' +
        'want to use value or onChange, you probably don\'t want to use ' +
        'valueLink'
    ) : invariant(this.props.value == null && this.props.onChange == null));
  },

  /**
   * @return {*} current value of the input either from value prop or link.
   */
  getValue: function() {
    if (this.props.valueLink) {
      this._assertLink();
      return this.props.valueLink.value;
    }
    return this.props.value;
  },

  /**
   * @return {function} change callback either from onChange prop or link.
   */
  getOnChange: function() {
    if (this.props.valueLink) {
      this._assertLink();
      return this._handleLinkedValueChange;
    }
    return this.props.onChange;
  },

  /**
   * @param {SyntheticEvent} e change event to handle
   */
  _handleLinkedValueChange: function(e) {
    this.props.valueLink.requestChange(e.target.value);
  }
};

module.exports = LinkedValueMixin;

},{"./invariant":127,"__browserify_process":16}],42:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule MobileSafariClickEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");

var emptyFunction = require("./emptyFunction");

var topLevelTypes = EventConstants.topLevelTypes;

/**
 * Mobile Safari does not fire properly bubble click events on non-interactive
 * elements, which means delegated click listeners do not fire. The workaround
 * for this bug involves attaching an empty click listener on the target node.
 *
 * This particular plugin works around the bug by attaching an empty click
 * listener on `touchstart` (which does fire on every element).
 */
var MobileSafariClickEventPlugin = {

  eventTypes: null,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    if (topLevelType === topLevelTypes.topTouchStart) {
      var target = nativeEvent.target;
      if (target && !target.onclick) {
        target.onclick = emptyFunction;
      }
    }
  }

};

module.exports = MobileSafariClickEventPlugin;

},{"./EventConstants":33,"./emptyFunction":112}],43:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule PooledClass
 */

"use strict";

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function(instance) {
  var Klass = this;
  if (instance.destructor) {
    instance.destructor();
  }
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function(CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;

},{}],44:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule React
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactCurrentOwner = require("./ReactCurrentOwner");
var ReactDOM = require("./ReactDOM");
var ReactDOMComponent = require("./ReactDOMComponent");
var ReactDefaultInjection = require("./ReactDefaultInjection");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactMount = require("./ReactMount");
var ReactMultiChild = require("./ReactMultiChild");
var ReactPerf = require("./ReactPerf");
var ReactPropTypes = require("./ReactPropTypes");
var ReactServerRendering = require("./ReactServerRendering");
var ReactTextComponent = require("./ReactTextComponent");

ReactDefaultInjection.inject();

var React = {
  DOM: ReactDOM,
  PropTypes: ReactPropTypes,
  initializeTouchEvents: function(shouldUseTouch) {
    ReactMount.useTouchEvents = shouldUseTouch;
  },
  createClass: ReactCompositeComponent.createClass,
  constructAndRenderComponent: ReactMount.constructAndRenderComponent,
  constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
  renderComponent: ReactPerf.measure(
    'React',
    'renderComponent',
    ReactMount.renderComponent
  ),
  renderComponentToString: ReactServerRendering.renderComponentToString,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  unmountAndReleaseReactRootNode: ReactMount.unmountAndReleaseReactRootNode,
  isValidClass: ReactCompositeComponent.isValidClass,
  isValidComponent: ReactComponent.isValidComponent,
  __internals: {
    Component: ReactComponent,
    CurrentOwner: ReactCurrentOwner,
    DOMComponent: ReactDOMComponent,
    InstanceHandles: ReactInstanceHandles,
    Mount: ReactMount,
    MultiChild: ReactMultiChild,
    TextComponent: ReactTextComponent
  }
};

// Version exists only in the open-source version of React, not in Facebook's
// internal version.
React.version = '0.8.0';

module.exports = React;

},{"./ReactComponent":46,"./ReactCompositeComponent":49,"./ReactCurrentOwner":50,"./ReactDOM":51,"./ReactDOMComponent":53,"./ReactDefaultInjection":62,"./ReactInstanceHandles":69,"./ReactMount":72,"./ReactMultiChild":74,"./ReactPerf":77,"./ReactPropTypes":79,"./ReactServerRendering":81,"./ReactTextComponent":83}],45:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactChildren
 */

"use strict";

var PooledClass = require("./PooledClass");

var invariant = require("./invariant");
var traverseAllChildren = require("./traverseAllChildren");

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var threeArgumentPooler = PooledClass.threeArgumentPooler;

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.forEachFunction = forEachFunction;
  this.forEachContext = forEachContext;
}
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(traverseContext, child, name, i) {
  var forEachBookKeeping = traverseContext;
  forEachBookKeeping.forEachFunction.call(
    forEachBookKeeping.forEachContext, child, i);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {array} children
 * @param {function(*, int)} forEachFunc.
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }

  var traverseContext =
    ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, mapFunction, mapContext) {
  this.mapResult = mapResult;
  this.mapFunction = mapFunction;
  this.mapContext = mapContext;
}
PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);

function mapSingleChildIntoContext(traverseContext, child, name, i) {
  var mapBookKeeping = traverseContext;
  var mapResult = mapBookKeeping.mapResult;
  var mappedChild =
    mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
  // We found a component instance
  ("production" !== process.env.NODE_ENV ? invariant(
    !mapResult.hasOwnProperty(name),
    'ReactChildren.map(...): Encountered two children with the same key, ' +
    '`%s`. Children keys must be unique.',
    name
  ) : invariant(!mapResult.hasOwnProperty(name)));
  mapResult[name] = mappedChild;
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * TODO: This may likely break any calls to `ReactChildren.map` that were
 * previously relying on the fact that we guarded against null children.
 *
 * @param {array} children
 * @param {function(*, int)} mapFunction.
 * @param {*} mapContext Context for mapFunction.
 * @return {array} mirrored array with mapped children.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var mapResult = {};
  var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
  return mapResult;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren
};

module.exports = ReactChildren;

},{"./PooledClass":43,"./invariant":127,"./traverseAllChildren":145,"__browserify_process":16}],46:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponent
 */

"use strict";

var ReactComponentEnvironment = require("./ReactComponentEnvironment");
var ReactCurrentOwner = require("./ReactCurrentOwner");
var ReactOwner = require("./ReactOwner");
var ReactUpdates = require("./ReactUpdates");

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");
var merge = require("./merge");

/**
 * Every React component is in one of these life cycles.
 */
var ComponentLifeCycle = keyMirror({
  /**
   * Mounted components have a DOM node representation and are capable of
   * receiving new props.
   */
  MOUNTED: null,
  /**
   * Unmounted components are inactive and cannot receive new props.
   */
  UNMOUNTED: null
});

/**
 * Warn if there's no key explicitly set on dynamic arrays of children.
 * This allows us to keep track of children between updates.
 */

var ownerHasWarned = {};

/**
 * Warn if the component doesn't have an explicit key assigned to it.
 * This component is in an array. The array could grow and shrink or be
 * reordered. All children, that hasn't already been validated, are required to
 * have a "key" property assigned to it.
 *
 * @internal
 * @param {ReactComponent} component Component that requires a key.
 */
function validateExplicitKey(component) {
  if (component.__keyValidated__ || component.props.key != null) {
    return;
  }
  component.__keyValidated__ = true;

  // We can't provide friendly warnings for top level components.
  if (!ReactCurrentOwner.current) {
    return;
  }

  // Name of the component whose render method tried to pass children.
  var currentName = ReactCurrentOwner.current.constructor.displayName;
  if (ownerHasWarned.hasOwnProperty(currentName)) {
    return;
  }
  ownerHasWarned[currentName] = true;

  var message = 'Each child in an array should have a unique "key" prop. ' +
                'Check the render method of ' + currentName + '.';
  if (!component.isOwnedBy(ReactCurrentOwner.current)) {
    // Name of the component that originally created this child.
    var childOwnerName =
      component.props.__owner__ &&
      component.props.__owner__.constructor.displayName;

    // Usually the current owner is the offender, but if it accepts
    // children as a property, it may be the creator of the child that's
    // responsible for assigning it a key.
    message += ' It was passed a child from ' + childOwnerName + '.';
  }

  console.warn(message);
}

/**
 * Ensure that every component either is passed in a static location or, if
 * if it's passed in an array, has an explicit key property defined.
 *
 * @internal
 * @param {*} component Statically passed child of any type.
 * @return {boolean}
 */
function validateChildKeys(component) {
  if (Array.isArray(component)) {
    for (var i = 0; i < component.length; i++) {
      var child = component[i];
      if (ReactComponent.isValidComponent(child)) {
        validateExplicitKey(child);
      }
    }
  } else if (ReactComponent.isValidComponent(component)) {
    // This component was passed in a valid location.
    component.__keyValidated__ = true;
  }
}

/**
 * Components are the basic units of composition in React.
 *
 * Every component accepts a set of keyed input parameters known as "props" that
 * are initialized by the constructor. Once a component is mounted, the props
 * can be mutated using `setProps` or `replaceProps`.
 *
 * Every component is capable of the following operations:
 *
 *   `mountComponent`
 *     Initializes the component, renders markup, and registers event listeners.
 *
 *   `receiveComponent`
 *     Updates the rendered DOM nodes to match the given component.
 *
 *   `unmountComponent`
 *     Releases any resources allocated by this component.
 *
 * Components can also be "owned" by other components. Being owned by another
 * component means being constructed by that component. This is different from
 * being the child of a component, which means having a DOM representation that
 * is a child of the DOM representation of that component.
 *
 * @class ReactComponent
 */
var ReactComponent = {

  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid component.
   * @final
   */
  isValidComponent: function(object) {
    return !!(
      object &&
      typeof object.mountComponentIntoNode === 'function' &&
      typeof object.receiveComponent === 'function'
    );
  },

  /**
   * Generate a key string that identifies a component within a set.
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   * @internal
   */
  getKey: function(component, index) {
    if (component && component.props && component.props.key != null) {
      // Explicit key
      return '{' + component.props.key + '}';
    }
    // Implicit key determined by the index in the set
    return '[' + index + ']';
  },

  /**
   * @internal
   */
  LifeCycle: ComponentLifeCycle,

  /**
   * Injected module that provides ability to mutate individual properties.
   * Injected into the base class because many different subclasses need access
   * to this.
   *
   * @internal
   */
  DOMIDOperations: ReactComponentEnvironment.DOMIDOperations,

  /**
   * Optionally injectable environment dependent cleanup hook. (server vs.
   * browser etc). Example: A browser system caches DOM nodes based on component
   * ID and must remove that cache entry when this instance is unmounted.
   *
   * @private
   */
  unmountIDFromEnvironment: ReactComponentEnvironment.unmountIDFromEnvironment,

  /**
   * The "image" of a component tree, is the platform specific (typically
   * serialized) data that represents a tree of lower level UI building blocks.
   * On the web, this "image" is HTML markup which describes a construction of
   * low level `div` and `span` nodes. Other platforms may have different
   * encoding of this "image". This must be injected.
   *
   * @private
   */
  mountImageIntoNode: ReactComponentEnvironment.mountImageIntoNode,

  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction:
    ReactComponentEnvironment.ReactReconcileTransaction,

  /**
   * Base functionality for every ReactComponent constructor. Mixed into the
   * `ReactComponent` prototype, but exposed statically for easy access.
   *
   * @lends {ReactComponent.prototype}
   */
  Mixin: merge(ReactComponentEnvironment.Mixin, {

    /**
     * Checks whether or not this component is mounted.
     *
     * @return {boolean} True if mounted, false otherwise.
     * @final
     * @protected
     */
    isMounted: function() {
      return this._lifeCycleState === ComponentLifeCycle.MOUNTED;
    },

    /**
     * Sets a subset of the props.
     *
     * @param {object} partialProps Subset of the next props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     */
    setProps: function(partialProps, callback) {
      // Merge with `_pendingProps` if it exists, otherwise with existing props.
      this.replaceProps(
        merge(this._pendingProps || this.props, partialProps),
        callback
      );
    },

    /**
     * Replaces all of the props.
     *
     * @param {object} props New props.
     * @param {?function} callback Called after props are updated.
     * @final
     * @public
     */
    replaceProps: function(props, callback) {
      ("production" !== process.env.NODE_ENV ? invariant(
        !this.props.__owner__,
        'replaceProps(...): You called `setProps` or `replaceProps` on a ' +
        'component with an owner. This is an anti-pattern since props will ' +
        'get reactively updated when rendered. Instead, change the owner\'s ' +
        '`render` method to pass the correct value as props to the component ' +
        'where it is created.'
      ) : invariant(!this.props.__owner__));
      ("production" !== process.env.NODE_ENV ? invariant(
        this.isMounted(),
        'replaceProps(...): Can only update a mounted component.'
      ) : invariant(this.isMounted()));
      this._pendingProps = props;
      ReactUpdates.enqueueUpdate(this, callback);
    },

    /**
     * Base constructor for all React component.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.construct.call(this, ...)`.
     *
     * @param {?object} initialProps
     * @param {*} children
     * @internal
     */
    construct: function(initialProps, children) {
      this.props = initialProps || {};
      // Record the component responsible for creating this component.
      this.props.__owner__ = ReactCurrentOwner.current;
      // All components start unmounted.
      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;

      this._pendingProps = null;
      this._pendingCallbacks = null;

      // Children can be more than one argument
      var childrenLength = arguments.length - 1;
      if (childrenLength === 1) {
        if ("production" !== process.env.NODE_ENV) {
          validateChildKeys(children);
        }
        this.props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          if ("production" !== process.env.NODE_ENV) {
            validateChildKeys(arguments[i + 1]);
          }
          childArray[i] = arguments[i + 1];
        }
        this.props.children = childArray;
      }
    },

    /**
     * Initializes the component, renders markup, and registers event listeners.
     *
     * NOTE: This does not insert any nodes into the DOM.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.mountComponent.call(this, ...)`.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {ReactReconcileTransaction} transaction
     * @param {number} mountDepth number of components in the owner hierarchy.
     * @return {?string} Rendered markup to be inserted into the DOM.
     * @internal
     */
    mountComponent: function(rootID, transaction, mountDepth) {
      ("production" !== process.env.NODE_ENV ? invariant(
        !this.isMounted(),
        'mountComponent(%s, ...): Can only mount an unmounted component.',
        rootID
      ) : invariant(!this.isMounted()));
      var props = this.props;
      if (props.ref != null) {
        ReactOwner.addComponentAsRefTo(this, props.ref, props.__owner__);
      }
      this._rootNodeID = rootID;
      this._lifeCycleState = ComponentLifeCycle.MOUNTED;
      this._mountDepth = mountDepth;
      // Effectively: return '';
    },

    /**
     * Releases any resources allocated by `mountComponent`.
     *
     * NOTE: This does not remove any nodes from the DOM.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.unmountComponent.call(this)`.
     *
     * @internal
     */
    unmountComponent: function() {
      ("production" !== process.env.NODE_ENV ? invariant(
        this.isMounted(),
        'unmountComponent(): Can only unmount a mounted component.'
      ) : invariant(this.isMounted()));
      var props = this.props;
      if (props.ref != null) {
        ReactOwner.removeComponentAsRefFrom(this, props.ref, props.__owner__);
      }
      ReactComponent.unmountIDFromEnvironment(this._rootNodeID);
      this._rootNodeID = null;
      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
    },

    /**
     * Given a new instance of this component, updates the rendered DOM nodes
     * as if that instance was rendered instead.
     *
     * Subclasses that override this method should make sure to invoke
     * `ReactComponent.Mixin.receiveComponent.call(this, ...)`.
     *
     * @param {object} nextComponent Next set of properties.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    receiveComponent: function(nextComponent, transaction) {
      ("production" !== process.env.NODE_ENV ? invariant(
        this.isMounted(),
        'receiveComponent(...): Can only update a mounted component.'
      ) : invariant(this.isMounted()));
      this._pendingProps = nextComponent.props;
      this._performUpdateIfNecessary(transaction);
    },

    /**
     * Call `_performUpdateIfNecessary` within a new transaction.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    performUpdateIfNecessary: function() {
      var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
      transaction.perform(this._performUpdateIfNecessary, this, transaction);
      ReactComponent.ReactReconcileTransaction.release(transaction);
    },

    /**
     * If `_pendingProps` is set, update the component.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    _performUpdateIfNecessary: function(transaction) {
      if (this._pendingProps == null) {
        return;
      }
      var prevProps = this.props;
      this.props = this._pendingProps;
      this._pendingProps = null;
      this.updateComponent(transaction, prevProps);
    },

    /**
     * Updates the component's currently mounted representation.
     *
     * @param {ReactReconcileTransaction} transaction
     * @param {object} prevProps
     * @internal
     */
    updateComponent: function(transaction, prevProps) {
      var props = this.props;
      // If either the owner or a `ref` has changed, make sure the newest owner
      // has stored a reference to `this`, and the previous owner (if different)
      // has forgotten the reference to `this`.
      if (props.__owner__ !== prevProps.__owner__ ||
          props.ref !== prevProps.ref) {
        if (prevProps.ref != null) {
          ReactOwner.removeComponentAsRefFrom(
            this, prevProps.ref, prevProps.__owner__
          );
        }
        // Correct, even if the owner is the same, and only the ref has changed.
        if (props.ref != null) {
          ReactOwner.addComponentAsRefTo(this, props.ref, props.__owner__);
        }
      }
    },

    /**
     * Mounts this component and inserts it into the DOM.
     *
     * @param {string} rootID DOM ID of the root node.
     * @param {DOMElement} container DOM element to mount into.
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @final
     * @internal
     * @see {ReactMount.renderComponent}
     */
    mountComponentIntoNode: function(rootID, container, shouldReuseMarkup) {
      var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
      transaction.perform(
        this._mountComponentIntoNode,
        this,
        rootID,
        container,
        transaction,
        shouldReuseMarkup
      );
      ReactComponent.ReactReconcileTransaction.release(transaction);
    },

    /**
     * @param {string} rootID DOM ID of the root node.
     * @param {DOMElement} container DOM element to mount into.
     * @param {ReactReconcileTransaction} transaction
     * @param {boolean} shouldReuseMarkup If true, do not insert markup
     * @final
     * @private
     */
    _mountComponentIntoNode: function(
        rootID,
        container,
        transaction,
        shouldReuseMarkup) {
      var markup = this.mountComponent(rootID, transaction, 0);
      ReactComponent.mountImageIntoNode(markup, container, shouldReuseMarkup);
    },

    /**
     * Checks if this component is owned by the supplied `owner` component.
     *
     * @param {ReactComponent} owner Component to check.
     * @return {boolean} True if `owners` owns this component.
     * @final
     * @internal
     */
    isOwnedBy: function(owner) {
      return this.props.__owner__ === owner;
    },

    /**
     * Gets another component, that shares the same owner as this one, by ref.
     *
     * @param {string} ref of a sibling Component.
     * @return {?ReactComponent} the actual sibling Component.
     * @final
     * @internal
     */
    getSiblingByRef: function(ref) {
      var owner = this.props.__owner__;
      if (!owner || !owner.refs) {
        return null;
      }
      return owner.refs[ref];
    }
  })
};

module.exports = ReactComponent;

},{"./ReactComponentEnvironment":48,"./ReactCurrentOwner":50,"./ReactOwner":76,"./ReactUpdates":88,"./invariant":127,"./keyMirror":133,"./merge":136,"__browserify_process":16}],47:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponentBrowserEnvironment
 */

/*jslint evil: true */

"use strict";

var ReactDOMIDOperations = require("./ReactDOMIDOperations");
var ReactMarkupChecksum = require("./ReactMarkupChecksum");
var ReactMount = require("./ReactMount");
var ReactReconcileTransaction = require("./ReactReconcileTransaction");

var getReactRootElementInContainer = require("./getReactRootElementInContainer");
var invariant = require("./invariant");
var mutateHTMLNodeWithMarkup = require("./mutateHTMLNodeWithMarkup");


var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;


/**
 * Abstracts away all functionality of `ReactComponent` requires knowledge of
 * the browser context.
 */
var ReactComponentBrowserEnvironment = {
  /**
   * Mixed into every component instance.
   */
  Mixin: {
    /**
     * Returns the DOM node rendered by this component.
     *
     * @return {DOMElement} The root node of this component.
     * @final
     * @protected
     */
    getDOMNode: function() {
      ("production" !== process.env.NODE_ENV ? invariant(
        this.isMounted(),
        'getDOMNode(): A component must be mounted to have a DOM node.'
      ) : invariant(this.isMounted()));
      return ReactMount.getNode(this._rootNodeID);
    }
  },

  ReactReconcileTransaction: ReactReconcileTransaction,

  DOMIDOperations: ReactDOMIDOperations,

  /**
   * If a particular environment requires that some resources be cleaned up,
   * specify this in the injected Mixin. In the DOM, we would likely want to
   * purge any cached node ID lookups.
   *
   * @private
   */
  unmountIDFromEnvironment: function(rootNodeID) {
    ReactMount.purgeID(rootNodeID);
  },

  /**
   * @param {string} markup Markup string to place into the DOM Element.
   * @param {DOMElement} container DOM Element to insert markup into.
   * @param {boolean} shouldReuseMarkup Should reuse the existing markup in the
   * container if possible.
   */
  mountImageIntoNode: function(markup, container, shouldReuseMarkup) {
    ("production" !== process.env.NODE_ENV ? invariant(
      container && (
        container.nodeType === ELEMENT_NODE_TYPE ||
        container.nodeType === DOC_NODE_TYPE && ReactMount.allowFullPageRender
      ),
      'mountComponentIntoNode(...): Target container is not valid.'
    ) : invariant(container && (
      container.nodeType === ELEMENT_NODE_TYPE ||
      container.nodeType === DOC_NODE_TYPE && ReactMount.allowFullPageRender
    )));
    if (shouldReuseMarkup) {
      if (ReactMarkupChecksum.canReuseMarkup(
            markup,
            getReactRootElementInContainer(container))) {
        return;
      } else {
        if ("production" !== process.env.NODE_ENV) {
          console.warn(
            'React attempted to use reuse markup in a container but the ' +
            'checksum was invalid. This generally means that you are using ' +
            'server rendering and the markup generated on the server was ' +
            'not what the client was expecting. React injected new markup ' +
            'to compensate which works but you have lost many of the ' +
            'benefits of server rendering. Instead, figure out why the ' +
            'markup being generated is different on the client or server.'
          );
        }
      }
    }

    // You can't naively set the innerHTML of the entire document. You need
    // to mutate documentElement which requires doing some crazy tricks. See
    // mutateHTMLNodeWithMarkup()
    if (container.nodeType === DOC_NODE_TYPE) {
      mutateHTMLNodeWithMarkup(container.documentElement, markup);
      return;
    }

    // Asynchronously inject markup by ensuring that the container is not in
    // the document when settings its `innerHTML`.
    var parent = container.parentNode;
    if (parent) {
      var next = container.nextSibling;
      parent.removeChild(container);
      container.innerHTML = markup;
      if (next) {
        parent.insertBefore(container, next);
      } else {
        parent.appendChild(container);
      }
    } else {
      container.innerHTML = markup;
    }
  }
};

module.exports = ReactComponentBrowserEnvironment;

},{"./ReactDOMIDOperations":55,"./ReactMarkupChecksum":71,"./ReactMount":72,"./ReactReconcileTransaction":80,"./getReactRootElementInContainer":123,"./invariant":127,"./mutateHTMLNodeWithMarkup":140,"__browserify_process":16}],48:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactComponentEnvironment
 */

var ReactComponentBrowserEnvironment =
  require("./ReactComponentBrowserEnvironment");

var ReactComponentEnvironment = ReactComponentBrowserEnvironment;

module.exports = ReactComponentEnvironment;

},{"./ReactComponentBrowserEnvironment":47}],49:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactCompositeComponent
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactCurrentOwner = require("./ReactCurrentOwner");
var ReactErrorUtils = require("./ReactErrorUtils");
var ReactOwner = require("./ReactOwner");
var ReactPerf = require("./ReactPerf");
var ReactPropTransferer = require("./ReactPropTransferer");
var ReactUpdates = require("./ReactUpdates");

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");
var merge = require("./merge");
var mixInto = require("./mixInto");
var objMap = require("./objMap");

/**
 * Policies that describe methods in `ReactCompositeComponentInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base ReactCompositeComponent class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});

/**
 * Composite components are higher-level components that compose other composite
 * or native components.
 *
 * To create a new type of `ReactCompositeComponent`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactCompositeComponentInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will available on the prototype.
 *
 * @interface ReactCompositeComponentInterface
 * @internal
 */
var ReactCompositeComponentInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_ONCE,



  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,



  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props and state.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props and state will not require a component update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState) {
   *     return !equal(nextProps, this.props) || !equal(nextState, this.state);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props` and `this.state` to `nextProps` and `nextState`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,



  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared in the specification when defining classes
 * using `React.createClass`, they will not be on the component's prototype.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function(Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function(Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  propTypes: function(Constructor, propTypes) {
    Constructor.propTypes = propTypes;
  }
};

function validateMethodOverride(proto, name) {
  var specPolicy = ReactCompositeComponentInterface[name];

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactCompositeComponentMixin.hasOwnProperty(name)) {
    ("production" !== process.env.NODE_ENV ? invariant(
      specPolicy === SpecPolicy.OVERRIDE_BASE,
      'ReactCompositeComponentInterface: You are attempting to override ' +
      '`%s` from your class specification. Ensure that your method names ' +
      'do not overlap with React methods.',
      name
    ) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (proto.hasOwnProperty(name)) {
    ("production" !== process.env.NODE_ENV ? invariant(
      specPolicy === SpecPolicy.DEFINE_MANY ||
      specPolicy === SpecPolicy.DEFINE_MANY_MERGED,
      'ReactCompositeComponentInterface: You are attempting to define ' +
      '`%s` on your component more than once. This conflict may be due ' +
      'to a mixin.',
      name
    ) : invariant(specPolicy === SpecPolicy.DEFINE_MANY ||
    specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
  }
}


function validateLifeCycleOnReplaceState(instance) {
  var compositeLifeCycleState = instance._compositeLifeCycleState;
  ("production" !== process.env.NODE_ENV ? invariant(
    instance.isMounted() ||
      compositeLifeCycleState === CompositeLifeCycle.MOUNTING,
    'replaceState(...): Can only update a mounted or mounting component.'
  ) : invariant(instance.isMounted() ||
    compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
  ("production" !== process.env.NODE_ENV ? invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE,
    'replaceState(...): Cannot update during an existing state transition ' +
    '(such as within `render`). This could potentially cause an infinite ' +
    'loop so it is forbidden.'
  ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE));
  ("production" !== process.env.NODE_ENV ? invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING,
    'replaceState(...): Cannot update while unmounting component. This ' +
    'usually means you called setState() on an unmounted component.'
  ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
}

/**
 * Custom version of `mixInto` which handles policy validation and reserved
 * specification keys when building `ReactCompositeComponent` classses.
 */
function mixSpecIntoComponent(Constructor, spec) {
  var proto = Constructor.prototype;
  for (var name in spec) {
    var property = spec[name];
    if (!spec.hasOwnProperty(name) || !property) {
      continue;
    }
    validateMethodOverride(proto, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactCompositeComponent methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isCompositeComponentMethod = name in ReactCompositeComponentInterface;
      var isInherited = name in proto;
      var markedDontBind = property.__reactDontBind;
      var isFunction = typeof property === 'function';
      var shouldAutoBind =
        isFunction &&
        !isCompositeComponentMethod &&
        !isInherited &&
        !markedDontBind;

      if (shouldAutoBind) {
        if (!proto.__reactAutoBindMap) {
          proto.__reactAutoBindMap = {};
        }
        proto.__reactAutoBindMap[name] = property;
        proto[name] = property;
      } else {
        if (isInherited) {
          // For methods which are defined more than once, call the existing
          // methods before calling the new property.
          if (ReactCompositeComponentInterface[name] ===
              SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
        }
      }
    }
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeObjectsWithNoDuplicateKeys(one, two) {
  ("production" !== process.env.NODE_ENV ? invariant(
    one && two && typeof one === 'object' && typeof two === 'object',
    'mergeObjectsWithNoDuplicateKeys(): Cannot merge non-objects'
  ) : invariant(one && two && typeof one === 'object' && typeof two === 'object'));

  objMap(two, function(value, key) {
    ("production" !== process.env.NODE_ENV ? invariant(
      one[key] === undefined,
      'mergeObjectsWithNoDuplicateKeys(): ' +
      'Tried to merge two objects with the same key: %s',
      key
    ) : invariant(one[key] === undefined));
    one[key] = value;
  });
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    return mergeObjectsWithNoDuplicateKeys(
      one.apply(this, arguments),
      two.apply(this, arguments)
    );
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * `ReactCompositeComponent` maintains an auxiliary life cycle state in
 * `this._compositeLifeCycleState` (which can be null).
 *
 * This is different from the life cycle state maintained by `ReactComponent` in
 * `this._lifeCycleState`. The following diagram shows how the states overlap in
 * time. There are times when the CompositeLifeCycle is null - at those times it
 * is only meaningful to look at ComponentLifeCycle alone.
 *
 * Top Row: ReactComponent.ComponentLifeCycle
 * Low Row: ReactComponent.CompositeLifeCycle
 *
 * +-------+------------------------------------------------------+--------+
 * |  UN   |                    MOUNTED                           |   UN   |
 * |MOUNTED|                                                      | MOUNTED|
 * +-------+------------------------------------------------------+--------+
 * |       ^--------+   +------+   +------+   +------+   +--------^        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |    0--|MOUNTING|-0-|RECEIV|-0-|RECEIV|-0-|RECEIV|-0-|   UN   |--->0   |
 * |       |        |   |PROPS |   | PROPS|   | STATE|   |MOUNTING|        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |       |        |   |      |   |      |   |      |   |        |        |
 * |       +--------+   +------+   +------+   +------+   +--------+        |
 * |       |                                                      |        |
 * +-------+------------------------------------------------------+--------+
 */
var CompositeLifeCycle = keyMirror({
  /**
   * Components in the process of being mounted respond to state changes
   * differently.
   */
  MOUNTING: null,
  /**
   * Components in the process of being unmounted are guarded against state
   * changes.
   */
  UNMOUNTING: null,
  /**
   * Components that are mounted and receiving new props respond to state
   * changes differently.
   */
  RECEIVING_PROPS: null,
  /**
   * Components that are mounted and receiving new state are guarded against
   * additional state changes.
   */
  RECEIVING_STATE: null
});

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponentMixin = {

  /**
   * Base constructor for all composite component.
   *
   * @param {?object} initialProps
   * @param {*} children
   * @final
   * @internal
   */
  construct: function(initialProps, children) {
    // Children can be either an array or more than one argument
    ReactComponent.Mixin.construct.apply(this, arguments);
    this.state = null;
    this._pendingState = null;
    this._compositeLifeCycleState = null;
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function() {
    return ReactComponent.Mixin.isMounted.call(this) &&
      this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING;
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: ReactPerf.measure(
    'ReactCompositeComponent',
    'mountComponent',
    function(rootID, transaction, mountDepth) {
      ReactComponent.Mixin.mountComponent.call(
        this,
        rootID,
        transaction,
        mountDepth
      );
      this._compositeLifeCycleState = CompositeLifeCycle.MOUNTING;

      this._defaultProps = this.getDefaultProps ? this.getDefaultProps() : null;
      this._processProps(this.props);

      if (this.__reactAutoBindMap) {
        this._bindAutoBindMethods();
      }

      this.state = this.getInitialState ? this.getInitialState() : null;
      this._pendingState = null;
      this._pendingForceUpdate = false;

      if (this.componentWillMount) {
        this.componentWillMount();
        // When mounting, calls to `setState` by `componentWillMount` will set
        // `this._pendingState` without triggering a re-render.
        if (this._pendingState) {
          this.state = this._pendingState;
          this._pendingState = null;
        }
      }

      this._renderedComponent = this._renderValidatedComponent();

      // Done with mounting, `setState` will now trigger UI changes.
      this._compositeLifeCycleState = null;
      var markup = this._renderedComponent.mountComponent(
        rootID,
        transaction,
        mountDepth + 1
      );
      if (this.componentDidMount) {
        transaction.getReactMountReady().enqueue(this, this.componentDidMount);
      }
      return markup;
    }
  ),

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function() {
    this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
    if (this.componentWillUnmount) {
      this.componentWillUnmount();
    }
    this._compositeLifeCycleState = null;

    this._defaultProps = null;

    ReactComponent.Mixin.unmountComponent.call(this);
    this._renderedComponent.unmountComponent();
    this._renderedComponent = null;

    if (this.refs) {
      this.refs = null;
    }

    // Some existing components rely on this.props even after they've been
    // destroyed (in event handlers).
    // TODO: this.props = null;
    // TODO: this.state = null;
  },

  /**
   * Sets a subset of the state. Always use this or `replaceState` to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  setState: function(partialState, callback) {
    // Merge with `_pendingState` if it exists, otherwise with existing state.
    this.replaceState(
      merge(this._pendingState || this.state, partialState),
      callback
    );
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {object} completeState Next state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  replaceState: function(completeState, callback) {
    validateLifeCycleOnReplaceState(this);
    this._pendingState = completeState;
    ReactUpdates.enqueueUpdate(this, callback);
  },

  /**
   * Processes props by setting default values for unspecified props and
   * asserting that the props are valid.
   *
   * @param {object} props
   * @private
   */
  _processProps: function(props) {
    var propName;
    var defaultProps = this._defaultProps;
    for (propName in defaultProps) {
      if (!(propName in props)) {
        props[propName] = defaultProps[propName];
      }
    }
    var propTypes = this.constructor.propTypes;
    if (propTypes) {
      var componentName = this.constructor.displayName;
      for (propName in propTypes) {
        var checkProp = propTypes[propName];
        if (checkProp) {
          checkProp(props, propName, componentName);
        }
      }
    }
  },

  performUpdateIfNecessary: function() {
    var compositeLifeCycleState = this._compositeLifeCycleState;
    // Do not trigger a state transition if we are in the middle of mounting or
    // receiving props because both of those will already be doing this.
    if (compositeLifeCycleState === CompositeLifeCycle.MOUNTING ||
        compositeLifeCycleState === CompositeLifeCycle.RECEIVING_PROPS) {
      return;
    }
    ReactComponent.Mixin.performUpdateIfNecessary.call(this);
  },

  /**
   * If any of `_pendingProps`, `_pendingState`, or `_pendingForceUpdate` is
   * set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _performUpdateIfNecessary: function(transaction) {
    if (this._pendingProps == null &&
        this._pendingState == null &&
        !this._pendingForceUpdate) {
      return;
    }

    var nextProps = this.props;
    if (this._pendingProps != null) {
      nextProps = this._pendingProps;
      this._processProps(nextProps);
      this._pendingProps = null;

      this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_PROPS;
      if (this.componentWillReceiveProps) {
        this.componentWillReceiveProps(nextProps, transaction);
      }
    }

    this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_STATE;

    var nextState = this._pendingState || this.state;
    this._pendingState = null;

    if (this._pendingForceUpdate ||
        !this.shouldComponentUpdate ||
        this.shouldComponentUpdate(nextProps, nextState)) {
      this._pendingForceUpdate = false;
      // Will set `this.props` and `this.state`.
      this._performComponentUpdate(nextProps, nextState, transaction);
    } else {
      // If it's determined that a component should not update, we still want
      // to set props and state.
      this.props = nextProps;
      this.state = nextState;
    }

    this._compositeLifeCycleState = null;
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {object} nextProps Next object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {ReactReconcileTransaction} transaction
   * @private
   */
  _performComponentUpdate: function(nextProps, nextState, transaction) {
    var prevProps = this.props;
    var prevState = this.state;

    if (this.componentWillUpdate) {
      this.componentWillUpdate(nextProps, nextState, transaction);
    }

    this.props = nextProps;
    this.state = nextState;

    this.updateComponent(transaction, prevProps, prevState);

    if (this.componentDidUpdate) {
      transaction.getReactMountReady().enqueue(
        this,
        this.componentDidUpdate.bind(this, prevProps, prevState)
      );
    }
  },

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {object} prevProps
   * @param {?object} prevState
   * @internal
   * @overridable
   */
  updateComponent: ReactPerf.measure(
    'ReactCompositeComponent',
    'updateComponent',
    function(transaction, prevProps, prevState) {
      ReactComponent.Mixin.updateComponent.call(this, transaction, prevProps);
      var currentComponent = this._renderedComponent;
      var nextComponent = this._renderValidatedComponent();
      if (currentComponent.constructor === nextComponent.constructor) {
        currentComponent.receiveComponent(nextComponent, transaction);
      } else {
        // These two IDs are actually the same! But nothing should rely on that.
        var thisID = this._rootNodeID;
        var currentComponentID = currentComponent._rootNodeID;
        currentComponent.unmountComponent();
        this._renderedComponent = nextComponent;
        var nextMarkup = nextComponent.mountComponent(
          thisID,
          transaction,
          this._mountDepth + 1
        );
        ReactComponent.DOMIDOperations.dangerouslyReplaceNodeWithMarkupByID(
          currentComponentID,
          nextMarkup
        );
      }
    }
  ),

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldUpdateComponent`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */
  forceUpdate: function(callback) {
    var compositeLifeCycleState = this._compositeLifeCycleState;
    ("production" !== process.env.NODE_ENV ? invariant(
      this.isMounted() ||
        compositeLifeCycleState === CompositeLifeCycle.MOUNTING,
      'forceUpdate(...): Can only force an update on mounted or mounting ' +
        'components.'
    ) : invariant(this.isMounted() ||
      compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
    ("production" !== process.env.NODE_ENV ? invariant(
      compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
      compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING,
      'forceUpdate(...): Cannot force an update while unmounting component ' +
      'or during an existing state transition (such as within `render`).'
    ) : invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
    compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
    this._pendingForceUpdate = true;
    ReactUpdates.enqueueUpdate(this, callback);
  },

  /**
   * @private
   */
  _renderValidatedComponent: function() {
    var renderedComponent;
    ReactCurrentOwner.current = this;
    try {
      renderedComponent = this.render();
    } catch (error) {
      // IE8 requires `catch` in order to use `finally`.
      throw error;
    } finally {
      ReactCurrentOwner.current = null;
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      ReactComponent.isValidComponent(renderedComponent),
      '%s.render(): A valid ReactComponent must be returned. You may have ' +
      'returned null, undefined, an array, or some other invalid object.',
      this.constructor.displayName || 'ReactCompositeComponent'
    ) : invariant(ReactComponent.isValidComponent(renderedComponent)));
    return renderedComponent;
  },

  /**
   * @private
   */
  _bindAutoBindMethods: function() {
    for (var autoBindKey in this.__reactAutoBindMap) {
      if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
        continue;
      }
      var method = this.__reactAutoBindMap[autoBindKey];
      this[autoBindKey] = this._bindAutoBindMethod(ReactErrorUtils.guard(
        method,
        this.constructor.displayName + '.' + autoBindKey
      ));
    }
  },

  /**
   * Binds a method to the component.
   *
   * @param {function} method Method to be bound.
   * @private
   */
  _bindAutoBindMethod: function(method) {
    var component = this;
    var boundMethod = function() {
      return method.apply(component, arguments);
    };
    if ("production" !== process.env.NODE_ENV) {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          console.warn(
            'bind(): React component methods may only be bound to the ' +
            'component instance. See ' + componentName
          );
        } else if (arguments.length === 1) {
          console.warn(
            'bind(): You are binding a component method to the component. ' +
            'React does this for you automatically in a high-performance ' +
            'way, so you can safely remove this call. See ' + componentName
          );
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments =
          Array.prototype.slice.call(arguments, 1);
        return reboundMethod;
      };
    }
    return boundMethod;
  }
};

var ReactCompositeComponentBase = function() {};
mixInto(ReactCompositeComponentBase, ReactComponent.Mixin);
mixInto(ReactCompositeComponentBase, ReactOwner.Mixin);
mixInto(ReactCompositeComponentBase, ReactPropTransferer.Mixin);
mixInto(ReactCompositeComponentBase, ReactCompositeComponentMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactCompositeComponent
 * @extends ReactComponent
 * @extends ReactOwner
 * @extends ReactPropTransferer
 */
var ReactCompositeComponent = {

  LifeCycle: CompositeLifeCycle,

  Base: ReactCompositeComponentBase,

  /**
   * Creates a composite component class given a class specification.
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function(spec) {
    var Constructor = function() {};
    Constructor.prototype = new ReactCompositeComponentBase();
    Constructor.prototype.constructor = Constructor;
    mixSpecIntoComponent(Constructor, spec);

    ("production" !== process.env.NODE_ENV ? invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    ) : invariant(Constructor.prototype.render));

    if ("production" !== process.env.NODE_ENV) {
      if (Constructor.prototype.componentShouldUpdate) {
        console.warn(
          (spec.displayName || 'A component') + ' has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.'
         );
      }
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactCompositeComponentInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    var ConvenienceConstructor = function(props, children) {
      var instance = new Constructor();
      instance.construct.apply(instance, arguments);
      return instance;
    };
    ConvenienceConstructor.componentConstructor = Constructor;
    ConvenienceConstructor.originalSpec = spec;
    return ConvenienceConstructor;
  },

  /**
   * Checks if a value is a valid component constructor.
   *
   * @param {*}
   * @return {boolean}
   * @public
   */
  isValidClass: function(componentClass) {
    return componentClass instanceof Function &&
           'componentConstructor' in componentClass &&
           componentClass.componentConstructor instanceof Function;
  }
};

module.exports = ReactCompositeComponent;

},{"./ReactComponent":46,"./ReactCurrentOwner":50,"./ReactErrorUtils":64,"./ReactOwner":76,"./ReactPerf":77,"./ReactPropTransferer":78,"./ReactUpdates":88,"./invariant":127,"./keyMirror":133,"./merge":136,"./mixInto":139,"./objMap":141,"__browserify_process":16}],50:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactCurrentOwner
 */

"use strict";

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 *
 * The depth indicate how many composite components are above this render level.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

},{}],51:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOM
 * @typechecks static-only
 */

"use strict";

var ReactDOMComponent = require("./ReactDOMComponent");

var mergeInto = require("./mergeInto");
var objMapKeyVal = require("./objMapKeyVal");

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @param {string} tag Tag name (e.g. `div`).
 * @param {boolean} omitClose True if the close tag should be omitted.
 * @private
 */
function createDOMComponentClass(tag, omitClose) {
  var Constructor = function() {};
  Constructor.prototype = new ReactDOMComponent(tag, omitClose);
  Constructor.prototype.constructor = Constructor;
  Constructor.displayName = tag;

  var ConvenienceConstructor = function(props, children) {
    var instance = new Constructor();
    instance.construct.apply(instance, arguments);
    return instance;
  };
  ConvenienceConstructor.componentConstructor = Constructor;
  return ConvenienceConstructor;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOM = objMapKeyVal({
  a: false,
  abbr: false,
  address: false,
  area: false,
  article: false,
  aside: false,
  audio: false,
  b: false,
  base: false,
  bdi: false,
  bdo: false,
  big: false,
  blockquote: false,
  body: false,
  br: true,
  button: false,
  canvas: false,
  caption: false,
  cite: false,
  code: false,
  col: true,
  colgroup: false,
  data: false,
  datalist: false,
  dd: false,
  del: false,
  details: false,
  dfn: false,
  div: false,
  dl: false,
  dt: false,
  em: false,
  embed: true,
  fieldset: false,
  figcaption: false,
  figure: false,
  footer: false,
  form: false, // NOTE: Injected, see `ReactDOMForm`.
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  head: false,
  header: false,
  hr: true,
  html: false,
  i: false,
  iframe: false,
  img: true,
  input: true,
  ins: false,
  kbd: false,
  keygen: true,
  label: false,
  legend: false,
  li: false,
  link: false,
  main: false,
  map: false,
  mark: false,
  menu: false,
  menuitem: false, // NOTE: Close tag should be omitted, but causes problems.
  meta: true,
  meter: false,
  nav: false,
  noscript: false,
  object: false,
  ol: false,
  optgroup: false,
  option: false,
  output: false,
  p: false,
  param: true,
  pre: false,
  progress: false,
  q: false,
  rp: false,
  rt: false,
  ruby: false,
  s: false,
  samp: false,
  script: false,
  section: false,
  select: false,
  small: false,
  source: false,
  span: false,
  strong: false,
  style: false,
  sub: false,
  summary: false,
  sup: false,
  table: false,
  tbody: false,
  td: false,
  textarea: false, // NOTE: Injected, see `ReactDOMTextarea`.
  tfoot: false,
  th: false,
  thead: false,
  time: false,
  title: false,
  tr: false,
  track: true,
  u: false,
  ul: false,
  'var': false,
  video: false,
  wbr: false,

  // SVG
  circle: false,
  g: false,
  line: false,
  path: false,
  polyline: false,
  rect: false,
  svg: false,
  text: false
}, createDOMComponentClass);

var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(ReactDOM, componentClasses);
  }
};

ReactDOM.injection = injection;

module.exports = ReactDOM;

},{"./ReactDOMComponent":53,"./mergeInto":138,"./objMapKeyVal":142}],52:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMButton
 */

"use strict";

var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

var keyMirror = require("./keyMirror");

// Store a reference to the <button> `ReactDOMComponent`.
var button = ReactDOM.button;

var mouseListenerNames = keyMirror({
  onClick: true,
  onDoubleClick: true,
  onMouseDown: true,
  onMouseMove: true,
  onMouseUp: true,
  onClickCapture: true,
  onDoubleClickCapture: true,
  onMouseDownCapture: true,
  onMouseMoveCapture: true,
  onMouseUpCapture: true
});

/**
 * Implements a <button> native component that does not receive mouse events
 * when `disabled` is set.
 */
var ReactDOMButton = ReactCompositeComponent.createClass({

  render: function() {
    var props = {};

    // Copy the props; except the mouse listeners if we're disabled
    for (var key in this.props) {
      if (this.props.hasOwnProperty(key) &&
          (!this.props.disabled || !mouseListenerNames[key])) {
        props[key] = this.props[key];
      }
    }

    return button(props, this.props.children);
  }

});

module.exports = ReactDOMButton;

},{"./ReactCompositeComponent":49,"./ReactDOM":51,"./keyMirror":133}],53:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMComponent
 * @typechecks static-only
 */

"use strict";

var CSSPropertyOperations = require("./CSSPropertyOperations");
var DOMProperty = require("./DOMProperty");
var DOMPropertyOperations = require("./DOMPropertyOperations");
var ReactComponent = require("./ReactComponent");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactMultiChild = require("./ReactMultiChild");
var ReactMount = require("./ReactMount");
var ReactPerf = require("./ReactPerf");

var escapeTextForBrowser = require("./escapeTextForBrowser");
var invariant = require("./invariant");
var keyOf = require("./keyOf");
var merge = require("./merge");
var mixInto = require("./mixInto");

var putListener = ReactEventEmitter.putListener;
var deleteListener = ReactEventEmitter.deleteListener;
var registrationNames = ReactEventEmitter.registrationNames;

// For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES = {'string': true, 'number': true};

var STYLE = keyOf({style: null});

/**
 * @param {?object} props
 */
function assertValidProps(props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  ("production" !== process.env.NODE_ENV ? invariant(
    props.children == null || props.dangerouslySetInnerHTML == null,
    'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'
  ) : invariant(props.children == null || props.dangerouslySetInnerHTML == null));
  ("production" !== process.env.NODE_ENV ? invariant(
    props.style == null || typeof props.style === 'object',
    'The `style` prop expects a mapping from style properties to values, ' +
    'not a string.'
  ) : invariant(props.style == null || typeof props.style === 'object'));
}

/**
 * @constructor ReactDOMComponent
 * @extends ReactComponent
 * @extends ReactMultiChild
 */
function ReactDOMComponent(tag, omitClose) {
  this._tagOpen = '<' + tag;
  this._tagClose = omitClose ? '' : '</' + tag + '>';
  this.tagName = tag.toUpperCase();
}

ReactDOMComponent.Mixin = {

  /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {string} rootID The root DOM ID for this node.
   * @param {ReactReconcileTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {string} The computed markup.
   */
  mountComponent: ReactPerf.measure(
    'ReactDOMComponent',
    'mountComponent',
    function(rootID, transaction, mountDepth) {
      ReactComponent.Mixin.mountComponent.call(
        this,
        rootID,
        transaction,
        mountDepth
      );
      assertValidProps(this.props);
      return (
        this._createOpenTagMarkup() +
        this._createContentMarkup(transaction) +
        this._tagClose
      );
    }
  ),

  /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @return {string} Markup of opening tag.
   */
  _createOpenTagMarkup: function() {
    var props = this.props;
    var ret = this._tagOpen;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNames[propKey]) {
        putListener(this._rootNodeID, propKey, propValue);
      } else {
        if (propKey === STYLE) {
          if (propValue) {
            propValue = props.style = merge(props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
        }
        var markup =
          DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    var escapedID = escapeTextForBrowser(this._rootNodeID);
    return ret + ' ' + ReactMount.ATTR_NAME + '="' + escapedID + '">';
  },

  /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction} transaction
   * @return {string} Content markup.
   */
  _createContentMarkup: function(transaction) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = this.props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        return innerHTML.__html;
      }
    } else {
      var contentToUse =
        CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
      var childrenToUse = contentToUse != null ? null : this.props.children;
      if (contentToUse != null) {
        return escapeTextForBrowser(contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(
          childrenToUse,
          transaction
        );
        return mountImages.join('');
      }
    }
    return '';
  },

  receiveComponent: function(nextComponent, transaction) {
    assertValidProps(nextComponent.props);
    ReactComponent.Mixin.receiveComponent.call(
      this,
      nextComponent,
      transaction
    );
  },

  /**
   * Updates a native DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {object} prevProps
   * @internal
   * @overridable
   */
  updateComponent: ReactPerf.measure(
    'ReactDOMComponent',
    'updateComponent',
    function(transaction, prevProps) {
      ReactComponent.Mixin.updateComponent.call(this, transaction, prevProps);
      this._updateDOMProperties(prevProps);
      this._updateDOMChildren(prevProps, transaction);
    }
  ),

  /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   */
  _updateDOMProperties: function(lastProps) {
    var nextProps = this.props;
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) ||
         !lastProps.hasOwnProperty(propKey)) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = lastProps[propKey];
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
      } else if (registrationNames[propKey]) {
        deleteListener(this._rootNodeID, propKey);
      } else if (
          DOMProperty.isStandardName[propKey] ||
          DOMProperty.isCustomAttribute(propKey)) {
        ReactComponent.DOMIDOperations.deletePropertyByID(
          this._rootNodeID,
          propKey
        );
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
        continue;
      }
      if (propKey === STYLE) {
        if (nextProp) {
          nextProp = nextProps.style = merge(nextProp);
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) &&
                !nextProp.hasOwnProperty(styleName)) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) &&
                lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          styleUpdates = nextProp;
        }
      } else if (registrationNames[propKey]) {
        putListener(this._rootNodeID, propKey, nextProp);
      } else if (
          DOMProperty.isStandardName[propKey] ||
          DOMProperty.isCustomAttribute(propKey)) {
        ReactComponent.DOMIDOperations.updatePropertyByID(
          this._rootNodeID,
          propKey,
          nextProp
        );
      }
    }
    if (styleUpdates) {
      ReactComponent.DOMIDOperations.updateStylesByID(
        this._rootNodeID,
        styleUpdates
      );
    }
  },

  /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {ReactReconcileTransaction} transaction
   */
  _updateDOMChildren: function(lastProps, transaction) {
    var nextProps = this.props;

    var lastContent =
      CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
    var nextContent =
      CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;

    var lastHtml =
      lastProps.dangerouslySetInnerHTML &&
      lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml =
      nextProps.dangerouslySetInnerHTML &&
      nextProps.dangerouslySetInnerHTML.__html;

    // Note the use of `!=` which checks for null or undefined.
    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    // If we're switching from children to content/html or vice versa, remove
    // the old content
    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        ReactComponent.DOMIDOperations.updateInnerHTMLByID(
          this._rootNodeID,
          nextHtml
        );
      }
    } else if (nextChildren != null) {
      this.updateChildren(nextChildren, transaction);
    }
  },

  /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */
  unmountComponent: function() {
    ReactEventEmitter.deleteAllListeners(this._rootNodeID);
    ReactComponent.Mixin.unmountComponent.call(this);
    this.unmountChildren();
  }

};

mixInto(ReactDOMComponent, ReactComponent.Mixin);
mixInto(ReactDOMComponent, ReactDOMComponent.Mixin);
mixInto(ReactDOMComponent, ReactMultiChild.Mixin);

module.exports = ReactDOMComponent;

},{"./CSSPropertyOperations":22,"./DOMProperty":27,"./DOMPropertyOperations":28,"./ReactComponent":46,"./ReactEventEmitter":65,"./ReactMount":72,"./ReactMultiChild":74,"./ReactPerf":77,"./escapeTextForBrowser":113,"./invariant":127,"./keyOf":134,"./merge":136,"./mixInto":139,"__browserify_process":16}],54:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMForm
 */

"use strict";

var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");
var ReactEventEmitter = require("./ReactEventEmitter");
var EventConstants = require("./EventConstants");

// Store a reference to the <form> `ReactDOMComponent`.
var form = ReactDOM.form;

/**
 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
 * to capture it on the <form> element itself. There are lots of hacks we could
 * do to accomplish this, but the most reliable is to make <form> a
 * composite component and use `componentDidMount` to attach the event handlers.
 */
var ReactDOMForm = ReactCompositeComponent.createClass({
  render: function() {
    // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
    // `jshint` fails to parse JSX so in order for linting to work in the open
    // source repo, we need to just use `ReactDOM.form`.
    return this.transferPropsTo(form(null, this.props.children));
  },

  componentDidMount: function(node) {
    ReactEventEmitter.trapBubbledEvent(
      EventConstants.topLevelTypes.topSubmit,
      'submit',
      node
    );
  }
});

module.exports = ReactDOMForm;

},{"./EventConstants":33,"./ReactCompositeComponent":49,"./ReactDOM":51,"./ReactEventEmitter":65}],55:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMIDOperations
 * @typechecks static-only
 */

/*jslint evil: true */

"use strict";

var CSSPropertyOperations = require("./CSSPropertyOperations");
var DOMChildrenOperations = require("./DOMChildrenOperations");
var DOMPropertyOperations = require("./DOMPropertyOperations");
var ReactMount = require("./ReactMount");

var getTextContentAccessor = require("./getTextContentAccessor");
var invariant = require("./invariant");

/**
 * Errors for properties that should not be updated with `updatePropertyById()`.
 *
 * @type {object}
 * @private
 */
var INVALID_PROPERTY_ERRORS = {
  dangerouslySetInnerHTML:
    '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
  style: '`style` must be set using `updateStylesByID()`.'
};

/**
 * The DOM property to use when setting text content.
 *
 * @type {string}
 * @private
 */
var textContentAccessor = getTextContentAccessor() || 'NA';

var LEADING_SPACE = /^ /;

/**
 * Operations used to process updates to DOM nodes. This is made injectable via
 * `ReactComponent.DOMIDOperations`.
 */
var ReactDOMIDOperations = {

  /**
   * Updates a DOM node with new property values. This should only be used to
   * update DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A valid property name, see `DOMProperty`.
   * @param {*} value New value of the property.
   * @internal
   */
  updatePropertyByID: function(id, name, value) {
    var node = ReactMount.getNode(id);
    ("production" !== process.env.NODE_ENV ? invariant(
      !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
      'updatePropertyByID(...): %s',
      INVALID_PROPERTY_ERRORS[name]
    ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));

    // If we're updating to null or undefined, we should remove the property
    // from the DOM node instead of inadvertantly setting to a string. This
    // brings us in line with the same behavior we have on initial render.
    if (value != null) {
      DOMPropertyOperations.setValueForProperty(node, name, value);
    } else {
      DOMPropertyOperations.deleteValueForProperty(node, name);
    }
  },

  /**
   * Updates a DOM node to remove a property. This should only be used to remove
   * DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A property name to remove, see `DOMProperty`.
   * @internal
   */
  deletePropertyByID: function(id, name, value) {
    var node = ReactMount.getNode(id);
    ("production" !== process.env.NODE_ENV ? invariant(
      !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
      'updatePropertyByID(...): %s',
      INVALID_PROPERTY_ERRORS[name]
    ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
    DOMPropertyOperations.deleteValueForProperty(node, name, value);
  },

  /**
   * Updates a DOM node with new style values. If a value is specified as '',
   * the corresponding style property will be unset.
   *
   * @param {string} id ID of the node to update.
   * @param {object} styles Mapping from styles to values.
   * @internal
   */
  updateStylesByID: function(id, styles) {
    var node = ReactMount.getNode(id);
    CSSPropertyOperations.setValueForStyles(node, styles);
  },

  /**
   * Updates a DOM node's innerHTML.
   *
   * @param {string} id ID of the node to update.
   * @param {string} html An HTML string.
   * @internal
   */
  updateInnerHTMLByID: function(id, html) {
    var node = ReactMount.getNode(id);
    // HACK: IE8- normalize whitespace in innerHTML, removing leading spaces.
    // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
    node.innerHTML = html.replace(LEADING_SPACE, '&nbsp;');
  },

  /**
   * Updates a DOM node's text content set by `props.content`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} content Text content.
   * @internal
   */
  updateTextContentByID: function(id, content) {
    var node = ReactMount.getNode(id);
    node[textContentAccessor] = content;
  },

  /**
   * Replaces a DOM node that exists in the document with markup.
   *
   * @param {string} id ID of child to be replaced.
   * @param {string} markup Dangerous markup to inject in place of child.
   * @internal
   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
   */
  dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
    var node = ReactMount.getNode(id);
    DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
  },

  /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markup List of markup strings.
   * @internal
   */
  dangerouslyProcessChildrenUpdates: function(updates, markup) {
    for (var i = 0; i < updates.length; i++) {
      updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
    }
    DOMChildrenOperations.processUpdates(updates, markup);
  }

};

module.exports = ReactDOMIDOperations;

},{"./CSSPropertyOperations":22,"./DOMChildrenOperations":26,"./DOMPropertyOperations":28,"./ReactMount":72,"./getTextContentAccessor":124,"./invariant":127,"__browserify_process":16}],56:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMInput
 */

"use strict";

var DOMPropertyOperations = require("./DOMPropertyOperations");
var LinkedValueMixin = require("./LinkedValueMixin");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");
var ReactMount = require("./ReactMount");

var invariant = require("./invariant");
var merge = require("./merge");

// Store a reference to the <input> `ReactDOMComponent`.
var input = ReactDOM.input;

var instancesByReactID = {};

/**
 * Implements an <input> native component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */
var ReactDOMInput = ReactCompositeComponent.createClass({
  mixins: [LinkedValueMixin],

  getInitialState: function() {
    var defaultValue = this.props.defaultValue;
    return {
      checked: this.props.defaultChecked || false,
      value: defaultValue != null ? defaultValue : null
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onChange` handler.
    return !this._isChanging;
  },

  render: function() {
    // Clone `this.props` so we don't mutate the input.
    var props = merge(this.props);

    props.defaultChecked = null;
    props.defaultValue = null;
    props.checked =
      this.props.checked != null ? this.props.checked : this.state.checked;

    var value = this.getValue();
    props.value = value != null ? value : this.state.value;

    props.onChange = this._handleChange;

    return input(props, this.props.children);
  },

  componentDidMount: function(rootNode) {
    var id = ReactMount.getID(rootNode);
    instancesByReactID[id] = this;
  },

  componentWillUnmount: function() {
    var rootNode = this.getDOMNode();
    var id = ReactMount.getID(rootNode);
    delete instancesByReactID[id];
  },

  componentDidUpdate: function(prevProps, prevState, rootNode) {
    if (this.props.checked != null) {
      DOMPropertyOperations.setValueForProperty(
        rootNode,
        'checked',
        this.props.checked || false
      );
    }

    var value = this.getValue();
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
    }
  },

  _handleChange: function(event) {
    var returnValue;
    var onChange = this.getOnChange();
    if (onChange) {
      this._isChanging = true;
      returnValue = onChange(event);
      this._isChanging = false;
    }
    this.setState({
      checked: event.target.checked,
      value: event.target.value
    });

    var name = this.props.name;
    if (this.props.type === 'radio' && name != null) {
      var rootNode = this.getDOMNode();
      // If `rootNode.form` was non-null, then we could try `form.elements`,
      // but that sometimes behaves strangely in IE8. We could also try using
      // `form.getElementsByName`, but that will only return direct children
      // and won't include inputs that use the HTML5 `form=` attribute. Since
      // the input might not even be in a form, let's just use the global
      // `getElementsByName` to ensure we don't miss anything.
      var group = document.getElementsByName(name);
      for (var i = 0, groupLen = group.length; i < groupLen; i++) {
        var otherNode = group[i];
        if (otherNode === rootNode ||
            otherNode.nodeName !== 'INPUT' || otherNode.type !== 'radio' ||
            otherNode.form !== rootNode.form) {
          continue;
        }
        var otherID = ReactMount.getID(otherNode);
        ("production" !== process.env.NODE_ENV ? invariant(
          otherID,
          'ReactDOMInput: Mixing React and non-React radio inputs with the ' +
          'same `name` is not supported.'
        ) : invariant(otherID));
        var otherInstance = instancesByReactID[otherID];
        ("production" !== process.env.NODE_ENV ? invariant(
          otherInstance,
          'ReactDOMInput: Unknown radio button ID %s.',
          otherID
        ) : invariant(otherInstance));
        // In some cases, this will actually change the `checked` state value.
        // In other cases, there's no change but this forces a reconcile upon
        // which componentDidUpdate will reset the DOM property to whatever it
        // should be.
        otherInstance.setState({
          checked: false
        });
      }
    }

    return returnValue;
  }

});

module.exports = ReactDOMInput;

},{"./DOMPropertyOperations":28,"./LinkedValueMixin":41,"./ReactCompositeComponent":49,"./ReactDOM":51,"./ReactMount":72,"./invariant":127,"./merge":136,"__browserify_process":16}],57:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMOption
 */

"use strict";

var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

// Store a reference to the <option> `ReactDOMComponent`.
var option = ReactDOM.option;

/**
 * Implements an <option> native component that warns when `selected` is set.
 */
var ReactDOMOption = ReactCompositeComponent.createClass({

  componentWillMount: function() {
    // TODO (yungsters): Remove support for `selected` in <option>.
    if (this.props.selected != null) {
      if ("production" !== process.env.NODE_ENV) {
        console.warn(
          'Use the `defaultValue` or `value` props on <select> instead of ' +
          'setting `selected` on <option>.'
        );
      }
    }
  },

  render: function() {
    return option(this.props, this.props.children);
  }

});

module.exports = ReactDOMOption;

},{"./ReactCompositeComponent":49,"./ReactDOM":51,"__browserify_process":16}],58:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMSelect
 */

"use strict";

var LinkedValueMixin = require("./LinkedValueMixin");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

var invariant = require("./invariant");
var merge = require("./merge");

// Store a reference to the <select> `ReactDOMComponent`.
var select = ReactDOM.select;

/**
 * Validation function for `value` and `defaultValue`.
 * @private
 */
function selectValueType(props, propName, componentName) {
  if (props[propName] == null) {
    return;
  }
  if (props.multiple) {
    ("production" !== process.env.NODE_ENV ? invariant(
      Array.isArray(props[propName]),
      'The `%s` prop supplied to <select> must be an array if `multiple` is ' +
      'true.',
      propName
    ) : invariant(Array.isArray(props[propName])));
  } else {
    ("production" !== process.env.NODE_ENV ? invariant(
      !Array.isArray(props[propName]),
      'The `%s` prop supplied to <select> must be a scalar value if ' +
      '`multiple` is false.',
      propName
    ) : invariant(!Array.isArray(props[propName])));
  }
}

/**
 * If `value` is supplied, updates <option> elements on mount and update.
 * @private
 */
function updateOptions() {
  /*jshint validthis:true */
  var propValue = this.getValue();
  var value = propValue != null ? propValue : this.state.value;
  var options = this.getDOMNode().options;
  var selectedValue = '' + value;

  for (var i = 0, l = options.length; i < l; i++) {
    var selected = this.props.multiple ?
      selectedValue.indexOf(options[i].value) >= 0 :
      selected = options[i].value === selectedValue;

    if (selected !== options[i].selected) {
      options[i].selected = selected;
    }
  }
}

/**
 * Implements a <select> native component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * string. If `multiple` is true, the prop must be an array of strings.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect = ReactCompositeComponent.createClass({
  mixins: [LinkedValueMixin],

  propTypes: {
    defaultValue: selectValueType,
    value: selectValueType
  },

  getInitialState: function() {
    return {value: this.props.defaultValue || (this.props.multiple ? [] : '')};
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.props.multiple && nextProps.multiple) {
      this.setState({value: [this.state.value]});
    } else if (this.props.multiple && !nextProps.multiple) {
      this.setState({value: this.state.value[0]});
    }
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onChange` handler.
    return !this._isChanging;
  },

  render: function() {
    // Clone `this.props` so we don't mutate the input.
    var props = merge(this.props);

    props.onChange = this._handleChange;
    props.value = null;

    return select(props, this.props.children);
  },

  componentDidMount: updateOptions,

  componentDidUpdate: updateOptions,

  _handleChange: function(event) {
    var returnValue;
    var onChange = this.getOnChange();
    if (onChange) {
      this._isChanging = true;
      returnValue = onChange(event);
      this._isChanging = false;
    }

    var selectedValue;
    if (this.props.multiple) {
      selectedValue = [];
      var options = event.target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          selectedValue.push(options[i].value);
        }
      }
    } else {
      selectedValue = event.target.value;
    }

    this.setState({value: selectedValue});
    return returnValue;
  }

});

module.exports = ReactDOMSelect;

},{"./LinkedValueMixin":41,"./ReactCompositeComponent":49,"./ReactDOM":51,"./invariant":127,"./merge":136,"__browserify_process":16}],59:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMSelection
 */

"use strict";

var getNodeForCharacterOffset = require("./getNodeForCharacterOffset");
var getTextContentAccessor = require("./getTextContentAccessor");

/**
 * Get the appropriate anchor and focus node/offset pairs for IE.
 *
 * The catch here is that IE's selection API doesn't provide information
 * about whether the selection is forward or backward, so we have to
 * behave as though it's always forward.
 *
 * IE text differs from modern selection in that it behaves as though
 * block elements end with a new line. This means character offsets will
 * differ between the two APIs.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getIEOffsets(node) {
  var selection = document.selection;
  var selectedRange = selection.createRange();
  var selectedLength = selectedRange.text.length;

  // Duplicate selection so we can move range without breaking user selection.
  var fromStart = selectedRange.duplicate();
  fromStart.moveToElementText(node);
  fromStart.setEndPoint('EndToStart', selectedRange);

  var startOffset = fromStart.text.length;
  var endOffset = startOffset + selectedLength;

  return {
    start: startOffset,
    end: endOffset
  };
}

/**
 * @param {DOMElement} node
 * @return {?object}
 */
function getModernOffsets(node) {
  var selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);
  var rangeLength = currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var start = tempRange.toString().length;
  var end = start + rangeLength;

  // Detect whether the selection is backward.
  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;
  detectionRange.detach();

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

/**
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setIEOffsets(node, offsets) {
  var range = document.selection.createRange().duplicate();
  var start, end;

  if (typeof offsets.end === 'undefined') {
    start = offsets.start;
    end = start;
  } else if (offsets.start > offsets.end) {
    start = offsets.end;
    end = offsets.start;
  } else {
    start = offsets.start;
    end = offsets.end;
  }

  range.moveToElementText(node);
  range.moveStart('character', start);
  range.setEndPoint('EndToStart', range);
  range.moveEnd('character', end - start);
  range.select();
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setModernOffsets(node, offsets) {
  var selection = window.getSelection();

  var length = node[getTextContentAccessor()].length;
  var start = Math.min(offsets.start, length);
  var end = typeof offsets.end === 'undefined' ?
            start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }

    range.detach();
  }
}

var ReactDOMSelection = {
  /**
   * @param {DOMElement} node
   */
  getOffsets: function(node) {
    var getOffsets = document.selection ? getIEOffsets : getModernOffsets;
    return getOffsets(node);
  },

  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  setOffsets: function(node, offsets) {
    var setOffsets = document.selection ? setIEOffsets : setModernOffsets;
    setOffsets(node, offsets);
  }
};

module.exports = ReactDOMSelection;

},{"./getNodeForCharacterOffset":122,"./getTextContentAccessor":124}],60:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOMTextarea
 */

"use strict";

var DOMPropertyOperations = require("./DOMPropertyOperations");
var LinkedValueMixin = require("./LinkedValueMixin");
var ReactCompositeComponent = require("./ReactCompositeComponent");
var ReactDOM = require("./ReactDOM");

var invariant = require("./invariant");
var merge = require("./merge");

// Store a reference to the <textarea> `ReactDOMComponent`.
var textarea = ReactDOM.textarea;

/**
 * Implements a <textarea> native component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = ReactCompositeComponent.createClass({
  mixins: [LinkedValueMixin],

  getInitialState: function() {
    var defaultValue = this.props.defaultValue;
    // TODO (yungsters): Remove support for children content in <textarea>.
    var children = this.props.children;
    if (children != null) {
      if ("production" !== process.env.NODE_ENV) {
        console.warn(
          'Use the `defaultValue` or `value` props instead of setting ' +
          'children on <textarea>.'
        );
      }
      ("production" !== process.env.NODE_ENV ? invariant(
        defaultValue == null,
        'If you supply `defaultValue` on a <textarea>, do not pass children.'
      ) : invariant(defaultValue == null));
      if (Array.isArray(children)) {
        ("production" !== process.env.NODE_ENV ? invariant(
          children.length <= 1,
          '<textarea> can only have at most one child.'
        ) : invariant(children.length <= 1));
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    var value = this.getValue();
    return {
      // We save the initial value so that `ReactDOMComponent` doesn't update
      // `textContent` (unnecessary since we update value).
      // The initial value can be a boolean or object so that's why it's
      // forced to be a string.
      initialValue: '' + (value != null ? value : defaultValue),
      value: defaultValue
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onChange` handler.
    return !this._isChanging;
  },

  render: function() {
    // Clone `this.props` so we don't mutate the input.
    var props = merge(this.props);
    var value = this.getValue();

    ("production" !== process.env.NODE_ENV ? invariant(
      props.dangerouslySetInnerHTML == null,
      '`dangerouslySetInnerHTML` does not make sense on <textarea>.'
    ) : invariant(props.dangerouslySetInnerHTML == null));

    props.defaultValue = null;
    props.value = value != null ? value : this.state.value;
    props.onChange = this._handleChange;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.
    return textarea(props, this.state.initialValue);
  },

  componentDidUpdate: function(prevProps, prevState, rootNode) {
    var value = this.getValue();
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
    }
  },

  _handleChange: function(event) {
    var returnValue;
    var onChange = this.getOnChange();
    if (onChange) {
      this._isChanging = true;
      returnValue = onChange(event);
      this._isChanging = false;
    }
    this.setState({value: event.target.value});
    return returnValue;
  }

});

module.exports = ReactDOMTextarea;

},{"./DOMPropertyOperations":28,"./LinkedValueMixin":41,"./ReactCompositeComponent":49,"./ReactDOM":51,"./invariant":127,"./merge":136,"__browserify_process":16}],61:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultBatchingStrategy
 */

"use strict";

var ReactUpdates = require("./ReactUpdates");
var Transaction = require("./Transaction");

var emptyFunction = require("./emptyFunction");
var mixInto = require("./mixInto");

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

mixInto(ReactDefaultBatchingStrategyTransaction, Transaction.Mixin);
mixInto(ReactDefaultBatchingStrategyTransaction, {
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  }
});

var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function(callback, param) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      callback(param);
    } else {
      transaction.perform(callback, null, param);
    }
  }
};

module.exports = ReactDefaultBatchingStrategy;

},{"./ReactUpdates":88,"./Transaction":101,"./emptyFunction":112,"./mixInto":139}],62:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultInjection
 */

"use strict";

var ReactDOM = require("./ReactDOM");
var ReactDOMButton = require("./ReactDOMButton");
var ReactDOMForm = require("./ReactDOMForm");
var ReactDOMInput = require("./ReactDOMInput");
var ReactDOMOption = require("./ReactDOMOption");
var ReactDOMSelect = require("./ReactDOMSelect");
var ReactDOMTextarea = require("./ReactDOMTextarea");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactEventTopLevelCallback = require("./ReactEventTopLevelCallback");
var ReactPerf = require("./ReactPerf");

var DefaultDOMPropertyConfig = require("./DefaultDOMPropertyConfig");
var DOMProperty = require("./DOMProperty");

var ChangeEventPlugin = require("./ChangeEventPlugin");
var CompositionEventPlugin = require("./CompositionEventPlugin");
var DefaultEventPluginOrder = require("./DefaultEventPluginOrder");
var EnterLeaveEventPlugin = require("./EnterLeaveEventPlugin");
var EventPluginHub = require("./EventPluginHub");
var MobileSafariClickEventPlugin = require("./MobileSafariClickEventPlugin");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var SelectEventPlugin = require("./SelectEventPlugin");
var SimpleEventPlugin = require("./SimpleEventPlugin");

var ReactDefaultBatchingStrategy = require("./ReactDefaultBatchingStrategy");
var ReactUpdates = require("./ReactUpdates");

function inject() {
  ReactEventEmitter.TopLevelCallbackCreator = ReactEventTopLevelCallback;
  /**
   * Inject module for resolving DOM hierarchy and plugin ordering.
   */
  EventPluginHub.injection.injectEventPluginOrder(DefaultEventPluginOrder);
  EventPluginHub.injection.injectInstanceHandle(ReactInstanceHandles);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  EventPluginHub.injection.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    CompositionEventPlugin: CompositionEventPlugin,
    MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
    SelectEventPlugin: SelectEventPlugin
  });

  ReactDOM.injection.injectComponentClasses({
    button: ReactDOMButton,
    form: ReactDOMForm,
    input: ReactDOMInput,
    option: ReactDOMOption,
    select: ReactDOMSelect,
    textarea: ReactDOMTextarea
  });

  DOMProperty.injection.injectDOMPropertyConfig(DefaultDOMPropertyConfig);

  if ("production" !== process.env.NODE_ENV) {
    ReactPerf.injection.injectMeasure(require("./ReactDefaultPerf").measure);
  }

  ReactUpdates.injection.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  );
}

module.exports = {
  inject: inject
};

},{"./ChangeEventPlugin":24,"./CompositionEventPlugin":25,"./DOMProperty":27,"./DefaultDOMPropertyConfig":30,"./DefaultEventPluginOrder":31,"./EnterLeaveEventPlugin":32,"./EventPluginHub":35,"./MobileSafariClickEventPlugin":42,"./ReactDOM":51,"./ReactDOMButton":52,"./ReactDOMForm":54,"./ReactDOMInput":56,"./ReactDOMOption":57,"./ReactDOMSelect":58,"./ReactDOMTextarea":60,"./ReactDefaultBatchingStrategy":61,"./ReactDefaultPerf":63,"./ReactEventEmitter":65,"./ReactEventTopLevelCallback":67,"./ReactInstanceHandles":69,"./ReactPerf":77,"./ReactUpdates":88,"./SelectEventPlugin":90,"./SimpleEventPlugin":91,"__browserify_process":16}],63:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDefaultPerf
 * @typechecks static-only
 */

"use strict";

var performanceNow = require("./performanceNow");

var ReactDefaultPerf = {};

if ("production" !== process.env.NODE_ENV) {
  ReactDefaultPerf = {
    /**
     * Gets the stored information for a given object's function.
     *
     * @param {string} objName
     * @param {string} fnName
     * @return {?object}
     */
    getInfo: function(objName, fnName) {
      if (!this.info[objName] || !this.info[objName][fnName]) {
        return null;
      }
      return this.info[objName][fnName];
    },

    /**
     * Gets the logs pertaining to a given object's function.
     *
     * @param {string} objName
     * @param {string} fnName
     * @return {?array<object>}
     */
    getLogs: function(objName, fnName) {
      if (!this.getInfo(objName, fnName)) {
        return null;
      }
      return this.logs.filter(function(log) {
        return log.objName === objName && log.fnName === fnName;
      });
    },

    /**
     * Runs through the logs and builds an array of arrays, where each array
     * walks through the mounting/updating of each component underneath.
     *
     * @param {string} rootID The reactID of the root node, e.g. '.r[2cpyq]'
     * @return {array<array>}
     */
    getRawRenderHistory: function(rootID) {
      var history = [];
      /**
       * Since logs are added after the method returns, the logs are in a sense
       * upside-down: the inner-most elements from mounting/updating are logged
       * first, and the last addition to the log is the top renderComponent.
       * Therefore, we flip the logs upside down for ease of processing, and
       * reverse the history array at the end so the earliest event has index 0.
       */
      var logs = this.logs.filter(function(log) {
        return log.reactID.indexOf(rootID) === 0;
      }).reverse();

      var subHistory = [];
      logs.forEach(function(log, i) {
        if (i && log.reactID === rootID && logs[i - 1].reactID !== rootID) {
          subHistory.length && history.push(subHistory);
          subHistory = [];
        }
        subHistory.push(log);
      });
      if (subHistory.length) {
        history.push(subHistory);
      }
      return history.reverse();
    },

    /**
     * Runs through the logs and builds an array of strings, where each string
     * is a multiline formatted way of walking through the mounting/updating
     * underneath.
     *
     * @param {string} rootID The reactID of the root node, e.g. '.r[2cpyq]'
     * @return {array<string>}
     */
    getRenderHistory: function(rootID) {
      var history = this.getRawRenderHistory(rootID);

      return history.map(function(subHistory) {
        var headerString = (
          'log# Component (execution time) [bloat from logging]\n' +
          '================================================================\n'
        );
        return headerString + subHistory.map(function(log) {
          // Add two spaces for every layer in the reactID.
          var indents = '\t' + Array(log.reactID.split('.[').length).join('  ');
          var delta = _microTime(log.timing.delta);
          var bloat = _microTime(log.timing.timeToLog);

          return log.index + indents + log.name + ' (' + delta + 'ms)' +
            ' [' + bloat + 'ms]';
        }).join('\n');
      });
    },

    /**
     * Print the render history from `getRenderHistory` using console.log.
     * This is currently the best way to display perf data from
     * any React component; working on that.
     *
     * @param {string} rootID The reactID of the root node, e.g. '.r[2cpyq]'
     * @param {number} index
     */
    printRenderHistory: function(rootID, index) {
      var history = this.getRenderHistory(rootID);
      if (!history[index]) {
        console.warn(
          'Index', index, 'isn\'t available! ' +
          'The render history is', history.length, 'long.'
        );
        return;
      }
      console.log(
        'Loading render history #' + (index + 1) +
        ' of ' + history.length + ':\n' + history[index]
      );
    },

    /**
     * Prints the heatmap legend to console, showing how the colors correspond
     * with render times. This relies on console.log styles.
     */
    printHeatmapLegend: function() {
      if (!this.options.heatmap.enabled) {
        return;
      }
      var max = this.info.React
        && this.info.React.renderComponent
        && this.info.React.renderComponent.max;
      if (max) {
        var logStr = 'Heatmap: ';
        for (var ii = 0; ii <= 10 * max; ii += max) {
          logStr += '%c ' + (Math.round(ii) / 10) + 'ms ';
        }
        console.log(
          logStr,
          'background-color: hsla(100, 100%, 50%, 0.6);',
          'background-color: hsla( 90, 100%, 50%, 0.6);',
          'background-color: hsla( 80, 100%, 50%, 0.6);',
          'background-color: hsla( 70, 100%, 50%, 0.6);',
          'background-color: hsla( 60, 100%, 50%, 0.6);',
          'background-color: hsla( 50, 100%, 50%, 0.6);',
          'background-color: hsla( 40, 100%, 50%, 0.6);',
          'background-color: hsla( 30, 100%, 50%, 0.6);',
          'background-color: hsla( 20, 100%, 50%, 0.6);',
          'background-color: hsla( 10, 100%, 50%, 0.6);',
          'background-color: hsla(  0, 100%, 50%, 0.6);'
        );
      }
    },

    /**
     * Measure a given function with logging information, and calls a callback
     * if there is one.
     *
     * @param {string} objName
     * @param {string} fnName
     * @param {function} func
     * @return {function}
     */
    measure: function(objName, fnName, func) {
      var info = _getNewInfo(objName, fnName);

      var fnArgs = _getFnArguments(func);

      return function() {
        var timeBeforeFn = performanceNow();
        var fnReturn = func.apply(this, arguments);
        var timeAfterFn = performanceNow();

        /**
         * Hold onto arguments in a readable way: args[1] -> args.component.
         * args is also passed to the callback, so if you want to save an
         * argument in the log, do so in the callback.
         */
        var args = {};
        for (var i = 0; i < arguments.length; i++) {
          args[fnArgs[i]] = arguments[i];
        }

        var log = {
          index: ReactDefaultPerf.logs.length,
          fnName: fnName,
          objName: objName,
          timing: {
            before: timeBeforeFn,
            after: timeAfterFn,
            delta: timeAfterFn - timeBeforeFn
          }
        };

        ReactDefaultPerf.logs.push(log);

        /**
         * The callback gets:
         * - this (the component)
         * - the original method's arguments
         * - what the method returned
         * - the log object, and
         * - the wrapped method's info object.
         */
        var callback = _getCallback(objName, fnName);
        callback && callback(this, args, fnReturn, log, info);

        log.timing.timeToLog = performanceNow() - timeAfterFn;

        return fnReturn;
      };
    },

    /**
     * Holds information on wrapped objects/methods.
     * For instance, ReactDefaultPerf.info.React.renderComponent
     */
    info: {},

    /**
     * Holds all of the logs. Filter this to pull desired information.
     */
    logs: [],

    /**
     * Toggle settings for ReactDefaultPerf
     */
    options: {
      /**
       * The heatmap sets the background color of the React containers
       * according to how much total time has been spent rendering them.
       * The most temporally expensive component is set as pure red,
       * and the others are colored from green to red as a fraction
       * of that max component time.
       */
      heatmap: {
        enabled: true
      }
    }
  };

  /**
   * Gets a info area for a given object's function, adding a new one if
   * necessary.
   *
   * @param {string} objName
   * @param {string} fnName
   * @return {object}
   */
  var _getNewInfo = function(objName, fnName) {
    var info = ReactDefaultPerf.getInfo(objName, fnName);
    if (info) {
      return info;
    }
    ReactDefaultPerf.info[objName] = ReactDefaultPerf.info[objName] || {};

    return ReactDefaultPerf.info[objName][fnName] = {
      getLogs: function() {
        return ReactDefaultPerf.getLogs(objName, fnName);
      }
    };
  };

  /**
   * Gets a list of the argument names from a function's definition.
   * This is useful for storing arguments by their names within wrapFn().
   *
   * @param {function} fn
   * @return {array<string>}
   */
  var _getFnArguments = function(fn) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var fnStr = fn.toString().replace(STRIP_COMMENTS, '');
    fnStr = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
    return fnStr.match(/([^\s,]+)/g);
  };

  /**
   * Store common callbacks within ReactDefaultPerf.
   *
   * @param {string} objName
   * @param {string} fnName
   * @return {?function}
   */
  var _getCallback = function(objName, fnName) {
    switch (objName + '.' + fnName) {
      case 'React.renderComponent':
        return _renderComponentCallback;
      case 'ReactDOMComponent.mountComponent':
      case 'ReactDOMComponent.updateComponent':
        return _nativeComponentCallback;
      case 'ReactCompositeComponent.mountComponent':
      case 'ReactCompositeComponent.updateComponent':
        return _compositeComponentCallback;
      default:
        return null;
    }
  };

  /**
   * Callback function for React.renderComponent
   *
   * @param {object} component
   * @param {object} args
   * @param {?object} fnReturn
   * @param {object} log
   * @param {object} info
   */
  var _renderComponentCallback =
    function(component, args, fnReturn, log, info) {
    log.name = args.nextComponent.constructor.displayName || '[unknown]';
    log.reactID = fnReturn._rootNodeID || null;

    if (ReactDefaultPerf.options.heatmap.enabled) {
      var container = args.container;
      if (!container.loggedByReactDefaultPerf) {
        container.loggedByReactDefaultPerf = true;
        info.components = info.components || [];
        info.components.push(container);
      }

      container.count = container.count || 0;
      container.count += log.timing.delta;
      info.max = info.max || 0;
      if (container.count > info.max) {
        info.max = container.count;
        info.components.forEach(function(component) {
          _setHue(component, 100 - 100 * component.count / info.max);
        });
      } else {
        _setHue(container, 100 - 100 * container.count / info.max);
      }
    }
  };

  /**
   * Callback function for ReactDOMComponent
   *
   * @param {object} component
   * @param {object} args
   * @param {?object} fnReturn
   * @param {object} log
   * @param {object} info
   */
  var _nativeComponentCallback =
    function(component, args, fnReturn, log, info) {
    log.name = component.tagName || '[unknown]';
    log.reactID = component._rootNodeID;
  };

  /**
   * Callback function for ReactCompositeComponent
   *
   * @param {object} component
   * @param {object} args
   * @param {?object} fnReturn
   * @param {object} log
   * @param {object} info
   */
  var _compositeComponentCallback =
    function(component, args, fnReturn, log, info) {
    log.name = component.constructor.displayName || '[unknown]';
    log.reactID = component._rootNodeID;
  };

  /**
   * Using the hsl() background-color attribute, colors an element.
   *
   * @param {DOMElement} el
   * @param {number} hue [0 for red, 120 for green, 240 for blue]
   */
  var _setHue = function(el, hue) {
    el.style.backgroundColor = 'hsla(' + hue + ', 100%, 50%, 0.6)';
  };

  /**
   * Round to the thousandth place.
   * @param {number} time
   * @return {number}
   */
  var _microTime = function(time) {
    return Math.round(time * 1000) / 1000;
  };
}

module.exports = ReactDefaultPerf;

},{"./performanceNow":143,"__browserify_process":16}],64:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactErrorUtils
 * @typechecks
 */

var ReactErrorUtils = {
  /**
   * Creates a guarded version of a function. This is supposed to make debugging
   * of event handlers easier. This implementation provides only basic error
   * logging and re-throws the error.
   *
   * @param {function} func Function to be executed
   * @param {string} name The name of the guard
   * @return {function}
   */
  guard: function(func, name) {
    if ("production" !== process.env.NODE_ENV) {
      return function guarded() {
        try {
          return func.apply(this, arguments);
        } catch(ex) {
          console.error(name + ': ' + ex.message);
          throw ex;
        }
      };
    } else {
      return func;
    }
  }
};

module.exports = ReactErrorUtils;

},{"__browserify_process":16}],65:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventEmitter
 * @typechecks static-only
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventListener = require("./EventListener");
var EventPluginHub = require("./EventPluginHub");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var ReactEventEmitterMixin = require("./ReactEventEmitterMixin");
var ViewportMetrics = require("./ViewportMetrics");

var invariant = require("./invariant");
var isEventSupported = require("./isEventSupported");
var merge = require("./merge");

/**
 * Summary of `ReactEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap native browser events. We normalize
 *    and de-duplicate events to account for browser quirks.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 *                   .
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .                         +-----------+
 *       +           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.---------+         |                    +------------+
 * |     |      |    .    +----|---------+
 * +-----|------+    .         |      ^        +-----------+
 *       |           .         |      |        |Enter/Leave|
 *       +           .         |      +-------+|Plugin     |
 * +-------------+   .         v               +-----------+
 * | application |   .    +----------+
 * |-------------|   .    | callback |
 * |             |   .    | registry |
 * |             |   .    +----------+
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

/**
 * Traps top-level events by using event bubbling.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {DOMEventTarget} element Element on which to attach listener.
 * @internal
 */
function trapBubbledEvent(topLevelType, handlerBaseName, element) {
  EventListener.listen(
    element,
    handlerBaseName,
    ReactEventEmitter.TopLevelCallbackCreator.createTopLevelCallback(
      topLevelType
    )
  );
}

/**
 * Traps a top-level event by using event capturing.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {DOMEventTarget} element Element on which to attach listener.
 * @internal
 */
function trapCapturedEvent(topLevelType, handlerBaseName, element) {
  EventListener.capture(
    element,
    handlerBaseName,
    ReactEventEmitter.TopLevelCallbackCreator.createTopLevelCallback(
      topLevelType
    )
  );
}

/**
 * Listens to window scroll and resize events. We cache scroll values so that
 * application code can access them without triggering reflows.
 *
 * NOTE: Scroll events do not bubble.
 *
 * @private
 * @see http://www.quirksmode.org/dom/events/scroll.html
 */
function registerScrollValueMonitoring() {
  var refresh = ViewportMetrics.refreshScrollValues;
  EventListener.listen(window, 'scroll', refresh);
  EventListener.listen(window, 'resize', refresh);
}

/**
 * `ReactEventEmitter` is used to attach top-level event listeners. For example:
 *
 *   ReactEventEmitter.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */
var ReactEventEmitter = merge(ReactEventEmitterMixin, {

  /**
   * React references `ReactEventTopLevelCallback` using this property in order
   * to allow dependency injection.
   */
  TopLevelCallbackCreator: null,

  /**
   * Ensures that top-level event delegation listeners are installed.
   *
   * There are issues with listening to both touch events and mouse events on
   * the top-level, so we make the caller choose which one to listen to. (If
   * there's a touch top-level listeners, anchors don't receive clicks for some
   * reason, and only in some cases).
   *
   * @param {boolean} touchNotMouse Listen to touch events instead of mouse.
   * @param {DOMDocument} contentDocument DOM document to listen on
   */
  ensureListening: function(touchNotMouse, contentDocument) {
    ("production" !== process.env.NODE_ENV ? invariant(
      ExecutionEnvironment.canUseDOM,
      'ensureListening(...): Cannot toggle event listening in a Worker ' +
      'thread. This is likely a bug in the framework. Please report ' +
      'immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    ("production" !== process.env.NODE_ENV ? invariant(
      ReactEventEmitter.TopLevelCallbackCreator,
      'ensureListening(...): Cannot be called without a top level callback ' +
      'creator being injected.'
    ) : invariant(ReactEventEmitter.TopLevelCallbackCreator));
    // Call out to base implementation.
    ReactEventEmitterMixin.ensureListening.call(
      ReactEventEmitter,
      {
        touchNotMouse: touchNotMouse,
        contentDocument: contentDocument
      }
    );
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function(enabled) {
    ("production" !== process.env.NODE_ENV ? invariant(
      ExecutionEnvironment.canUseDOM,
      'setEnabled(...): Cannot toggle event listening in a Worker thread. ' +
      'This is likely a bug in the framework. Please report immediately.'
    ) : invariant(ExecutionEnvironment.canUseDOM));
    if (ReactEventEmitter.TopLevelCallbackCreator) {
      ReactEventEmitter.TopLevelCallbackCreator.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function() {
    return !!(
      ReactEventEmitter.TopLevelCallbackCreator &&
      ReactEventEmitter.TopLevelCallbackCreator.isEnabled()
    );
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {boolean} touchNotMouse Listen to touch events instead of mouse.
   * @param {DOMDocument} contentDocument Document which owns the container
   * @private
   * @see http://www.quirksmode.org/dom/events/keys.html.
   */
  listenAtTopLevel: function(touchNotMouse, contentDocument) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !contentDocument._isListening,
      'listenAtTopLevel(...): Cannot setup top-level listener more than once.'
    ) : invariant(!contentDocument._isListening));
    var topLevelTypes = EventConstants.topLevelTypes;
    var mountAt = contentDocument;

    registerScrollValueMonitoring();
    trapBubbledEvent(topLevelTypes.topMouseOver, 'mouseover', mountAt);
    trapBubbledEvent(topLevelTypes.topMouseDown, 'mousedown', mountAt);
    trapBubbledEvent(topLevelTypes.topMouseUp, 'mouseup', mountAt);
    trapBubbledEvent(topLevelTypes.topMouseMove, 'mousemove', mountAt);
    trapBubbledEvent(topLevelTypes.topMouseOut, 'mouseout', mountAt);
    trapBubbledEvent(topLevelTypes.topClick, 'click', mountAt);
    trapBubbledEvent(topLevelTypes.topDoubleClick, 'dblclick', mountAt);
    trapBubbledEvent(topLevelTypes.topContextMenu, 'contextmenu', mountAt);
    if (touchNotMouse) {
      trapBubbledEvent(topLevelTypes.topTouchStart, 'touchstart', mountAt);
      trapBubbledEvent(topLevelTypes.topTouchEnd, 'touchend', mountAt);
      trapBubbledEvent(topLevelTypes.topTouchMove, 'touchmove', mountAt);
      trapBubbledEvent(topLevelTypes.topTouchCancel, 'touchcancel', mountAt);
    }
    trapBubbledEvent(topLevelTypes.topKeyUp, 'keyup', mountAt);
    trapBubbledEvent(topLevelTypes.topKeyPress, 'keypress', mountAt);
    trapBubbledEvent(topLevelTypes.topKeyDown, 'keydown', mountAt);
    trapBubbledEvent(topLevelTypes.topInput, 'input', mountAt);
    trapBubbledEvent(topLevelTypes.topChange, 'change', mountAt);
    trapBubbledEvent(
      topLevelTypes.topSelectionChange,
      'selectionchange',
      mountAt
    );

    trapBubbledEvent(
      topLevelTypes.topCompositionEnd,
      'compositionend',
      mountAt
    );
    trapBubbledEvent(
      topLevelTypes.topCompositionStart,
      'compositionstart',
      mountAt
    );
    trapBubbledEvent(
      topLevelTypes.topCompositionUpdate,
      'compositionupdate',
      mountAt
    );

    if (isEventSupported('drag')) {
      trapBubbledEvent(topLevelTypes.topDrag, 'drag', mountAt);
      trapBubbledEvent(topLevelTypes.topDragEnd, 'dragend', mountAt);
      trapBubbledEvent(topLevelTypes.topDragEnter, 'dragenter', mountAt);
      trapBubbledEvent(topLevelTypes.topDragExit, 'dragexit', mountAt);
      trapBubbledEvent(topLevelTypes.topDragLeave, 'dragleave', mountAt);
      trapBubbledEvent(topLevelTypes.topDragOver, 'dragover', mountAt);
      trapBubbledEvent(topLevelTypes.topDragStart, 'dragstart', mountAt);
      trapBubbledEvent(topLevelTypes.topDrop, 'drop', mountAt);
    }

    if (isEventSupported('wheel')) {
      trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
    } else if (isEventSupported('mousewheel')) {
      trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
    } else {
      // Firefox needs to capture a different mouse scroll event.
      // @see http://www.quirksmode.org/dom/events/tests/scroll.html
      trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
    }

    // IE<9 does not support capturing so just trap the bubbled event there.
    if (isEventSupported('scroll', true)) {
      trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
    } else {
      trapBubbledEvent(topLevelTypes.topScroll, 'scroll', window);
    }

    if (isEventSupported('focus', true)) {
      trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
      trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
    } else if (isEventSupported('focusin')) {
      // IE has `focusin` and `focusout` events which bubble.
      // @see
      // http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
      trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
      trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
    }

    if (isEventSupported('copy')) {
      trapBubbledEvent(topLevelTypes.topCopy, 'copy', mountAt);
      trapBubbledEvent(topLevelTypes.topCut, 'cut', mountAt);
      trapBubbledEvent(topLevelTypes.topPaste, 'paste', mountAt);
    }
  },

  registrationNames: EventPluginHub.registrationNames,

  putListener: EventPluginHub.putListener,

  getListener: EventPluginHub.getListener,

  deleteListener: EventPluginHub.deleteListener,

  deleteAllListeners: EventPluginHub.deleteAllListeners,

  trapBubbledEvent: trapBubbledEvent,

  trapCapturedEvent: trapCapturedEvent

});


module.exports = ReactEventEmitter;

},{"./EventConstants":33,"./EventListener":34,"./EventPluginHub":35,"./ExecutionEnvironment":39,"./ReactEventEmitterMixin":66,"./ViewportMetrics":102,"./invariant":127,"./isEventSupported":128,"./merge":136,"__browserify_process":16}],66:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventEmitterMixin
 */

"use strict";

var EventPluginHub = require("./EventPluginHub");
var ReactUpdates = require("./ReactUpdates");

function runEventQueueInBatch(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue();
}

var ReactEventEmitterMixin = {
  /**
   * Whether or not `ensureListening` has been invoked.
   * @type {boolean}
   * @private
   */
  _isListening: false,

  /**
   * Function, must be implemented. Listens to events on the top level of the
   * application.
   *
   * @abstract
   *
   * listenAtTopLevel: null,
   */

  /**
   * Ensures that top-level event delegation listeners are installed.
   *
   * There are issues with listening to both touch events and mouse events on
   * the top-level, so we make the caller choose which one to listen to. (If
   * there's a touch top-level listeners, anchors don't receive clicks for some
   * reason, and only in some cases).
   *
   * @param {*} config Configuration passed through to `listenAtTopLevel`.
   */
  ensureListening: function(config) {
    if (!config.contentDocument._reactIsListening) {
      this.listenAtTopLevel(config.touchNotMouse, config.contentDocument);
      config.contentDocument._reactIsListening = true;
    }
  },

  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {object} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native environment event.
   */
  handleTopLevel: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var events = EventPluginHub.extractEvents(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent
    );

    // Event queue being processed in the same cycle allows `preventDefault`.
    ReactUpdates.batchedUpdates(runEventQueueInBatch, events);
  }
};

module.exports = ReactEventEmitterMixin;

},{"./EventPluginHub":35,"./ReactUpdates":88}],67:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactEventTopLevelCallback
 * @typechecks static-only
 */

"use strict";

var ReactEventEmitter = require("./ReactEventEmitter");
var ReactMount = require("./ReactMount");

var getEventTarget = require("./getEventTarget");

/**
 * @type {boolean}
 * @private
 */
var _topLevelListenersEnabled = true;

/**
 * Top-level callback creator used to implement event handling using delegation.
 * This is used via dependency injection.
 */
var ReactEventTopLevelCallback = {

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function(enabled) {
    _topLevelListenersEnabled = !!enabled;
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function() {
    return _topLevelListenersEnabled;
  },

  /**
   * Creates a callback for the supplied `topLevelType` that could be added as
   * a listener to the document. The callback computes a `topLevelTarget` which
   * should be the root node of a mounted React component where the listener
   * is attached.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @return {function} Callback for handling top-level events.
   */
  createTopLevelCallback: function(topLevelType) {
    return function(nativeEvent) {
      if (!_topLevelListenersEnabled) {
        return;
      }
      // TODO: Remove when synthetic events are ready, this is for IE<9.
      if (nativeEvent.srcElement &&
          nativeEvent.srcElement !== nativeEvent.target) {
        nativeEvent.target = nativeEvent.srcElement;
      }
      var topLevelTarget = ReactMount.getFirstReactDOM(
        getEventTarget(nativeEvent)
      ) || window;
      var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
      ReactEventEmitter.handleTopLevel(
        topLevelType,
        topLevelTarget,
        topLevelTargetID,
        nativeEvent
      );
    };
  }

};

module.exports = ReactEventTopLevelCallback;

},{"./ReactEventEmitter":65,"./ReactMount":72,"./getEventTarget":120}],68:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInputSelection
 */

"use strict";

var ReactDOMSelection = require("./ReactDOMSelection");

var containsNode = require("./containsNode");
var getActiveElement = require("./getActiveElement");

function isInDocument(node) {
  return containsNode(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */
var ReactInputSelection = {

  hasSelectionCapabilities: function(elem) {
    return elem && (
      (elem.nodeName === 'INPUT' && elem.type === 'text') ||
      elem.nodeName === 'TEXTAREA' ||
      elem.contentEditable === 'true'
    );
  },

  getSelectionInformation: function() {
    var focusedElem = getActiveElement();
    return {
      focusedElem: focusedElem,
      selectionRange:
          ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
          ReactInputSelection.getSelection(focusedElem) :
          null
    };
  },

  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */
  restoreSelection: function(priorSelectionInformation) {
    var curFocusedElem = getActiveElement();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem &&
        isInDocument(priorFocusedElem)) {
      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection.setSelection(
          priorFocusedElem,
          priorSelectionRange
        );
      }
      priorFocusedElem.focus();
    }
  },

  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */
  getSelection: function(input) {
    var selection;

    if ('selectionStart' in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else if (document.selection && input.nodeName === 'INPUT') {
      // IE8 input.
      var range = document.selection.createRange();
      // There can only be one selection per document in IE, so it must
      // be in our element.
      if (range.parentElement() === input) {
        selection = {
          start: -range.moveStart('character', -input.value.length),
          end: -range.moveEnd('character', -input.value.length)
        };
      }
    } else {
      // Content editable or old IE textarea.
      selection = ReactDOMSelection.getOffsets(input);
    }

    return selection || {start: 0, end: 0};
  },

  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */
  setSelection: function(input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (typeof end === 'undefined') {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else if (document.selection && input.nodeName === 'INPUT') {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    } else {
      ReactDOMSelection.setOffsets(input, offsets);
    }
  }
};

module.exports = ReactInputSelection;

},{"./ReactDOMSelection":59,"./containsNode":105,"./getActiveElement":119}],69:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactInstanceHandles
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

var SEPARATOR = '.';
var SEPARATOR_LENGTH = SEPARATOR.length;

/**
 * Maximum depth of traversals before we consider the possibility of a bad ID.
 */
var MAX_TREE_DEPTH = 100;

/**
 * Size of the reactRoot ID space. We generate random numbers for React root
 * IDs and if there's a collision the events and DOM update system will
 * get confused. If we assume 100 React components per page, and a user
 * loads 1 page per minute 24/7 for 50 years, with a mount point space of
 * 9,999,999 the likelihood of never having a collision is 99.997%.
 */
var GLOBAL_MOUNT_POINT_MAX = 9999999;

/**
 * Creates a DOM ID prefix to use when mounting React components.
 *
 * @param {number} index A unique integer
 * @return {string} React root ID.
 * @internal
 */
function getReactRootIDString(index) {
  return SEPARATOR + 'r[' + index.toString(36) + ']';
}

/**
 * Checks if a character in the supplied ID is a separator or the end.
 *
 * @param {string} id A React DOM ID.
 * @param {number} index Index of the character to check.
 * @return {boolean} True if the character is a separator or end of the ID.
 * @private
 */
function isBoundary(id, index) {
  return id.charAt(index) === SEPARATOR || index === id.length;
}

/**
 * Checks if the supplied string is a valid React DOM ID.
 *
 * @param {string} id A React DOM ID, maybe.
 * @return {boolean} True if the string is a valid React DOM ID.
 * @private
 */
function isValidID(id) {
  return id === '' || (
    id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR
  );
}

/**
 * Checks if the first ID is an ancestor of or equal to the second ID.
 *
 * @param {string} ancestorID
 * @param {string} descendantID
 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
 * @internal
 */
function isAncestorIDOf(ancestorID, descendantID) {
  return (
    descendantID.indexOf(ancestorID) === 0 &&
    isBoundary(descendantID, ancestorID.length)
  );
}

/**
 * Gets the parent ID of the supplied React DOM ID, `id`.
 *
 * @param {string} id ID of a component.
 * @return {string} ID of the parent, or an empty string.
 * @private
 */
function getParentID(id) {
  return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
}

/**
 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
 * supplied `destinationID`. If they are equal, the ID is returned.
 *
 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
 * @param {string} destinationID ID of the destination node.
 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
 * @private
 */
function getNextDescendantID(ancestorID, destinationID) {
  ("production" !== process.env.NODE_ENV ? invariant(
    isValidID(ancestorID) && isValidID(destinationID),
    'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',
    ancestorID,
    destinationID
  ) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
  ("production" !== process.env.NODE_ENV ? invariant(
    isAncestorIDOf(ancestorID, destinationID),
    'getNextDescendantID(...): React has made an invalid assumption about ' +
    'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',
    ancestorID,
    destinationID
  ) : invariant(isAncestorIDOf(ancestorID, destinationID)));
  if (ancestorID === destinationID) {
    return ancestorID;
  }
  // Skip over the ancestor and the immediate separator. Traverse until we hit
  // another separator or we reach the end of `destinationID`.
  var start = ancestorID.length + SEPARATOR_LENGTH;
  for (var i = start; i < destinationID.length; i++) {
    if (isBoundary(destinationID, i)) {
      break;
    }
  }
  return destinationID.substr(0, i);
}

/**
 * Gets the nearest common ancestor ID of two IDs.
 *
 * Using this ID scheme, the nearest common ancestor ID is the longest common
 * prefix of the two IDs that immediately preceded a "marker" in both strings.
 *
 * @param {string} oneID
 * @param {string} twoID
 * @return {string} Nearest common ancestor ID, or the empty string if none.
 * @private
 */
function getFirstCommonAncestorID(oneID, twoID) {
  var minLength = Math.min(oneID.length, twoID.length);
  if (minLength === 0) {
    return '';
  }
  var lastCommonMarkerIndex = 0;
  // Use `<=` to traverse until the "EOL" of the shorter string.
  for (var i = 0; i <= minLength; i++) {
    if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
      lastCommonMarkerIndex = i;
    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
      break;
    }
  }
  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
  ("production" !== process.env.NODE_ENV ? invariant(
    isValidID(longestCommonID),
    'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',
    oneID,
    twoID,
    longestCommonID
  ) : invariant(isValidID(longestCommonID)));
  return longestCommonID;
}

/**
 * Traverses the parent path between two IDs (either up or down). The IDs must
 * not be the same, and there must exist a parent path between them.
 *
 * @param {?string} start ID at which to start traversal.
 * @param {?string} stop ID at which to end traversal.
 * @param {function} cb Callback to invoke each ID with.
 * @param {?boolean} skipFirst Whether or not to skip the first node.
 * @param {?boolean} skipLast Whether or not to skip the last node.
 * @private
 */
function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
  start = start || '';
  stop = stop || '';
  ("production" !== process.env.NODE_ENV ? invariant(
    start !== stop,
    'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',
    start
  ) : invariant(start !== stop));
  var traverseUp = isAncestorIDOf(stop, start);
  ("production" !== process.env.NODE_ENV ? invariant(
    traverseUp || isAncestorIDOf(start, stop),
    'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' +
    'not have a parent path.',
    start,
    stop
  ) : invariant(traverseUp || isAncestorIDOf(start, stop)));
  // Traverse from `start` to `stop` one depth at a time.
  var depth = 0;
  var traverse = traverseUp ? getParentID : getNextDescendantID;
  for (var id = start; /* until break */; id = traverse(id, stop)) {
    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
      cb(id, traverseUp, arg);
    }
    if (id === stop) {
      // Only break //after// visiting `stop`.
      break;
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      depth++ < MAX_TREE_DEPTH,
      'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' +
      'traversing the React DOM ID tree. This may be due to malformed IDs: %s',
      start, stop
    ) : invariant(depth++ < MAX_TREE_DEPTH));
  }
}

/**
 * Manages the IDs assigned to DOM representations of React components. This
 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
 * order to simulate events).
 *
 * @internal
 */
var ReactInstanceHandles = {

  createReactRootID: function() {
    return getReactRootIDString(
      Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX)
    );
  },

  /**
   * Constructs a React ID by joining a root ID with a name.
   *
   * @param {string} rootID Root ID of a parent component.
   * @param {string} name A component's name (as flattened children).
   * @return {string} A React ID.
   * @internal
   */
  createReactID: function(rootID, name) {
    return rootID + SEPARATOR + name;
  },

  /**
   * Gets the DOM ID of the React component that is the root of the tree that
   * contains the React component with the supplied DOM ID.
   *
   * @param {string} id DOM ID of a React component.
   * @return {?string} DOM ID of the React component that is the root.
   * @internal
   */
  getReactRootIDFromNodeID: function(id) {
    var regexResult = /\.r\[[^\]]+\]/.exec(id);
    return regexResult && regexResult[0];
  },

  /**
   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
   * should would receive a `mouseEnter` or `mouseLeave` event.
   *
   * NOTE: Does not invoke the callback on the nearest common ancestor because
   * nothing "entered" or "left" that element.
   *
   * @param {string} leaveID ID being left.
   * @param {string} enterID ID being entered.
   * @param {function} cb Callback to invoke on each entered/left ID.
   * @param {*} upArg Argument to invoke the callback with on left IDs.
   * @param {*} downArg Argument to invoke the callback with on entered IDs.
   * @internal
   */
  traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
    var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
    if (ancestorID !== leaveID) {
      traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
    }
    if (ancestorID !== enterID) {
      traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
    }
  },

  /**
   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */
  traverseTwoPhase: function(targetID, cb, arg) {
    if (targetID) {
      traverseParentPath('', targetID, cb, arg, true, false);
      traverseParentPath(targetID, '', cb, arg, false, true);
    }
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _getFirstCommonAncestorID: getFirstCommonAncestorID,

  /**
   * Exposed for unit testing.
   * @private
   */
  _getNextDescendantID: getNextDescendantID,

  isAncestorIDOf: isAncestorIDOf,

  SEPARATOR: SEPARATOR

};

module.exports = ReactInstanceHandles;

},{"./invariant":127,"__browserify_process":16}],70:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactLink
 * @typechecks static-only
 */

"use strict";

/**
 * ReactLink encapsulates a common pattern in which a component wants to modify
 * a prop received from its parent. ReactLink allows the parent to pass down a
 * value coupled with a callback that, when invoked, expresses an intent to
 * modify that value. For example:
 *
 * React.createClass({
 *   getInitialState: function() {
 *     return {value: ''};
 *   },
 *   render: function() {
 *     var valueLink = new ReactLink(this.state.value, this._handleValueChange);
 *     return <input valueLink={valueLink} />;
 *   },
 *   this._handleValueChange: function(newValue) {
 *     this.setState({value: newValue});
 *   }
 * });
 *
 * We have provided some sugary mixins to make the creation and
 * consumption of ReactLink easier; see LinkedValueMixin and LinkedStateMixin.
 */

/**
 * @param {*} value current value of the link
 * @param {function} requestChange callback to request a change
 */
function ReactLink(value, requestChange) {
  this.value = value;
  this.requestChange = requestChange;
}

module.exports = ReactLink;

},{}],71:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMarkupChecksum
 */

"use strict";

var adler32 = require("./adler32");

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */
  addChecksumToMarkup: function(markup) {
    var checksum = adler32(markup);
    return markup.replace(
      '>',
      ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">'
    );
  },

  /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */
  canReuseMarkup: function(markup, element) {
    var existingChecksum = element.getAttribute(
      ReactMarkupChecksum.CHECKSUM_ATTR_NAME
    );
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};

module.exports = ReactMarkupChecksum;

},{"./adler32":104}],72:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMount
 */

"use strict";

var ReactEventEmitter = require("./ReactEventEmitter");
var ReactInstanceHandles = require("./ReactInstanceHandles");

var $ = require("./$");
var containsNode = require("./containsNode");
var getReactRootElementInContainer = require("./getReactRootElementInContainer");
var invariant = require("./invariant");

var SEPARATOR = ReactInstanceHandles.SEPARATOR;

var ATTR_NAME = 'data-reactid';
var nodeCache = {};

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;

/** Mapping from reactRootID to React component instance. */
var instancesByReactRootID = {};

/** Mapping from reactRootID to `container` nodes. */
var containersByReactRootID = {};

if ("production" !== process.env.NODE_ENV) {
  /** __DEV__-only mapping from reactRootID to root elements. */
  var rootElementsByReactRootID = {};
}

/**
 * @param {DOMElement} container DOM element that may contain a React component.
 * @return {?string} A "reactRoot" ID, if a React component is rendered.
 */
function getReactRootID(container) {
  var rootElement = getReactRootElementInContainer(container);
  return rootElement && ReactMount.getID(rootElement);
}

/**
 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
 * element can return its control whose name or ID equals ATTR_NAME. All
 * DOM nodes support `getAttributeNode` but this can also get called on
 * other objects so just return '' if we're given something other than a
 * DOM node (such as window).
 *
 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
 * @return {string} ID of the supplied `domNode`.
 */
function getID(node) {
  var id = internalGetID(node);
  if (id) {
    if (nodeCache.hasOwnProperty(id)) {
      var cached = nodeCache[id];
      if (cached !== node) {
        ("production" !== process.env.NODE_ENV ? invariant(
          !isValid(cached, id),
          'ReactMount: Two valid but unequal nodes with the same `%s`: %s',
          ATTR_NAME, id
        ) : invariant(!isValid(cached, id)));

        nodeCache[id] = node;
      }
    } else {
      nodeCache[id] = node;
    }
  }

  return id;
}

function internalGetID(node) {
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
}

/**
 * Sets the React-specific ID of the given node.
 *
 * @param {DOMElement} node The DOM node whose ID will be set.
 * @param {string} id The value of the ID attribute.
 */
function setID(node, id) {
  var oldID = internalGetID(node);
  if (oldID !== id) {
    delete nodeCache[oldID];
  }
  node.setAttribute(ATTR_NAME, id);
  nodeCache[id] = node;
}

/**
 * Finds the node with the supplied React-generated DOM ID.
 *
 * @param {string} id A React-generated DOM ID.
 * @return {DOMElement} DOM node with the suppled `id`.
 * @internal
 */
function getNode(id) {
  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
    nodeCache[id] = ReactMount.findReactNodeByID(id);
  }
  return nodeCache[id];
}

/**
 * A node is "valid" if it is contained by a currently mounted container.
 *
 * This means that the node does not have to be contained by a document in
 * order to be considered valid.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @param {string} id The expected ID of the node.
 * @return {boolean} Whether the node is contained by a mounted container.
 */
function isValid(node, id) {
  if (node) {
    ("production" !== process.env.NODE_ENV ? invariant(
      internalGetID(node) === id,
      'ReactMount: Unexpected modification of `%s`',
      ATTR_NAME
    ) : invariant(internalGetID(node) === id));

    var container = ReactMount.findReactContainerForID(id);
    if (container && containsNode(container, node)) {
      return true;
    }
  }

  return false;
}

/**
 * Causes the cache to forget about one React-specific ID.
 *
 * @param {string} id The ID to forget.
 */
function purgeID(id) {
  delete nodeCache[id];
}

/**
 * Mounting is the process of initializing a React component by creatings its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.renderComponent(component, $('container'));
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".r[3]">           <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount = {
  /**
   * Safety guard to prevent accidentally rendering over the entire HTML tree.
   */
  allowFullPageRender: false,

  /** Time spent generating markup. */
  totalInstantiationTime: 0,

  /** Time spent inserting markup into the DOM. */
  totalInjectionTime: 0,

  /** Whether support for touch events should be initialized. */
  useTouchEvents: false,

  /** Exposed for debugging purposes **/
  _instancesByReactRootID: instancesByReactRootID,

  /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */
  scrollMonitor: function(container, renderCallback) {
    renderCallback();
  },

  /**
   * Ensures that the top-level event delegation listener is set up. This will
   * be invoked some time before the first time any React component is rendered.
   * @param {DOMElement} container container we're rendering into
   *
   * @private
   */
  prepareEnvironmentForDOM: function(container) {
    ("production" !== process.env.NODE_ENV ? invariant(
      container && (
        container.nodeType === ELEMENT_NODE_TYPE ||
        container.nodeType === DOC_NODE_TYPE
      ),
      'prepareEnvironmentForDOM(...): Target container is not a DOM element.'
    ) : invariant(container && (
      container.nodeType === ELEMENT_NODE_TYPE ||
      container.nodeType === DOC_NODE_TYPE
    )));
    var doc = container.nodeType === ELEMENT_NODE_TYPE ?
      container.ownerDocument :
      container;
    ReactEventEmitter.ensureListening(ReactMount.useTouchEvents, doc);
  },

  /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */
  _updateRootComponent: function(
      prevComponent,
      nextComponent,
      container,
      callback) {
    var nextProps = nextComponent.props;
    ReactMount.scrollMonitor(container, function() {
      prevComponent.replaceProps(nextProps, callback);
    });

    if ("production" !== process.env.NODE_ENV) {
      // Record the root element in case it later gets transplanted.
      rootElementsByReactRootID[getReactRootID(container)] =
        getReactRootElementInContainer(container);
    }

    return prevComponent;
  },

  /**
   * Register a component into the instance map and start the events system.
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @return {string} reactRoot ID prefix
   */
  _registerComponent: function(nextComponent, container) {
    ReactMount.prepareEnvironmentForDOM(container);

    var reactRootID = ReactMount.registerContainer(container);
    instancesByReactRootID[reactRootID] = nextComponent;
    return reactRootID;
  },

  /**
   * Render a new component into the DOM.
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */
  _renderNewRootComponent: function(
      nextComponent,
      container,
      shouldReuseMarkup) {
    var reactRootID = ReactMount._registerComponent(nextComponent, container);
    nextComponent.mountComponentIntoNode(
      reactRootID,
      container,
      shouldReuseMarkup
    );

    if ("production" !== process.env.NODE_ENV) {
      // Record the root element in case it later gets transplanted.
      rootElementsByReactRootID[reactRootID] =
        getReactRootElementInContainer(container);
    }

    return nextComponent;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactComponent} nextComponent Component instance to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  renderComponent: function(nextComponent, container, callback) {
    var registeredComponent = instancesByReactRootID[getReactRootID(container)];

    if (registeredComponent) {
      if (registeredComponent.constructor === nextComponent.constructor) {
        return ReactMount._updateRootComponent(
          registeredComponent,
          nextComponent,
          container,
          callback
        );
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup =
      reactRootElement && ReactMount.isRenderedByReact(reactRootElement);

    var shouldReuseMarkup = containerHasReactMarkup && !registeredComponent;

    var component = ReactMount._renderNewRootComponent(
      nextComponent,
      container,
      shouldReuseMarkup
    );
    callback && callback();
    return component;
  },

  /**
   * Constructs a component instance of `constructor` with `initialProps` and
   * renders it into the supplied `container`.
   *
   * @param {function} constructor React component constructor.
   * @param {?object} props Initial props of the component instance.
   * @param {DOMElement} container DOM element to render into.
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  constructAndRenderComponent: function(constructor, props, container) {
    return ReactMount.renderComponent(constructor(props), container);
  },

  /**
   * Constructs a component instance of `constructor` with `initialProps` and
   * renders it into a container node identified by supplied `id`.
   *
   * @param {function} componentConstructor React component constructor
   * @param {?object} props Initial props of the component instance.
   * @param {string} id ID of the DOM element to render into.
   * @return {ReactComponent} Component instance rendered in the container node.
   */
  constructAndRenderComponentByID: function(constructor, props, id) {
    return ReactMount.constructAndRenderComponent(constructor, props, $(id));
  },

  /**
   * Registers a container node into which React components will be rendered.
   * This also creates the "reatRoot" ID that will be assigned to the element
   * rendered within.
   *
   * @param {DOMElement} container DOM element to register as a container.
   * @return {string} The "reactRoot" ID of elements rendered within.
   */
  registerContainer: function(container) {
    var reactRootID = getReactRootID(container);
    if (reactRootID) {
      // If one exists, make sure it is a valid "reactRoot" ID.
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      // No valid "reactRoot" ID found, create one.
      reactRootID = ReactInstanceHandles.createReactRootID();
    }
    containersByReactRootID[reactRootID] = container;
    return reactRootID;
  },

  /**
   * Unmounts and destroys the React component rendered in the `container`.
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */
  unmountComponentAtNode: function(container) {
    var reactRootID = getReactRootID(container);
    var component = instancesByReactRootID[reactRootID];
    if (!component) {
      return false;
    }
    ReactMount.unmountComponentFromNode(component, container);
    delete instancesByReactRootID[reactRootID];
    delete containersByReactRootID[reactRootID];
    if ("production" !== process.env.NODE_ENV) {
      delete rootElementsByReactRootID[reactRootID];
    }
    return true;
  },

  /**
   * @deprecated
   */
  unmountAndReleaseReactRootNode: function() {
    if ("production" !== process.env.NODE_ENV) {
      console.warn(
        'unmountAndReleaseReactRootNode() has been renamed to ' +
        'unmountComponentAtNode() and will be removed in the next ' +
        'version of React.'
      );
    }
    return ReactMount.unmountComponentAtNode.apply(this, arguments);
  },

  /**
   * Unmounts a component and removes it from the DOM.
   *
   * @param {ReactComponent} instance React component instance.
   * @param {DOMElement} container DOM element to unmount from.
   * @final
   * @internal
   * @see {ReactMount.unmountComponentAtNode}
   */
  unmountComponentFromNode: function(instance, container) {
    instance.unmountComponent();

    if (container.nodeType === DOC_NODE_TYPE) {
      container = container.documentElement;
    }

    // http://jsperf.com/emptying-a-node
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
  },

  /**
   * Finds the container DOM element that contains React component to which the
   * supplied DOM `id` belongs.
   *
   * @param {string} id The ID of an element rendered by a React component.
   * @return {?DOMElement} DOM element that contains the `id`.
   */
  findReactContainerForID: function(id) {
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    var container = containersByReactRootID[reactRootID];

    if ("production" !== process.env.NODE_ENV) {
      var rootElement = rootElementsByReactRootID[reactRootID];
      if (rootElement && rootElement.parentNode !== container) {
        ("production" !== process.env.NODE_ENV ? invariant(
          // Call internalGetID here because getID calls isValid which calls
          // findReactContainerForID (this function).
          internalGetID(rootElement) === reactRootID,
          'ReactMount: Root element ID differed from reactRootID.'
        ) : invariant(// Call internalGetID here because getID calls isValid which calls
        // findReactContainerForID (this function).
        internalGetID(rootElement) === reactRootID));

        var containerChild = container.firstChild;
        if (containerChild &&
            reactRootID === internalGetID(containerChild)) {
          // If the container has a new child with the same ID as the old
          // root element, then rootElementsByReactRootID[reactRootID] is
          // just stale and needs to be updated. The case that deserves a
          // warning is when the container is empty.
          rootElementsByReactRootID[reactRootID] = containerChild;
        } else {
          console.warn(
            'ReactMount: Root element has been removed from its original ' +
            'container. New container:', rootElement.parentNode
          );
        }
      }
    }

    return container;
  },

  /**
   * Finds an element rendered by React with the supplied ID.
   *
   * @param {string} id ID of a DOM node in the React component.
   * @return {DOMElement} Root DOM node of the React component.
   */
  findReactNodeByID: function(id) {
    var reactRoot = ReactMount.findReactContainerForID(id);
    return ReactMount.findComponentRoot(reactRoot, id);
  },

  /**
   * True if the supplied `node` is rendered by React.
   *
   * @param {*} node DOM Element to check.
   * @return {boolean} True if the DOM Element appears to be rendered by React.
   * @internal
   */
  isRenderedByReact: function(node) {
    if (node.nodeType !== 1) {
      // Not a DOMElement, therefore not a React component
      return false;
    }
    var id = ReactMount.getID(node);
    return id ? id.charAt(0) === SEPARATOR : false;
  },

  /**
   * Traverses up the ancestors of the supplied node to find a node that is a
   * DOM representation of a React component.
   *
   * @param {*} node
   * @return {?DOMEventTarget}
   * @internal
   */
  getFirstReactDOM: function(node) {
    var current = node;
    while (current && current.parentNode !== current) {
      if (ReactMount.isRenderedByReact(current)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  },

  /**
   * Finds a node with the supplied `id` inside of the supplied `ancestorNode`.
   * Exploits the ID naming scheme to perform the search quickly.
   *
   * @param {DOMEventTarget} ancestorNode Search from this root.
   * @pararm {string} id ID of the DOM representation of the component.
   * @return {DOMEventTarget} DOM node with the supplied `id`.
   * @internal
   */
  findComponentRoot: function(ancestorNode, id) {
    var firstChildren = [ancestorNode.firstChild];
    var childIndex = 0;

    while (childIndex < firstChildren.length) {
      var child = firstChildren[childIndex++];
      while (child) {
        var childID = ReactMount.getID(child);
        if (childID) {
          if (id === childID) {
            return child;
          } else if (ReactInstanceHandles.isAncestorIDOf(childID, id)) {
            // If we find a child whose ID is an ancestor of the given ID,
            // then we can be sure that we only want to search the subtree
            // rooted at this child, so we can throw out the rest of the
            // search state.
            firstChildren.length = childIndex = 0;
            firstChildren.push(child.firstChild);
            break;
          } else {
            // TODO This should not be necessary if the ID hierarchy is
            // correct, but is occasionally necessary if the DOM has been
            // modified in unexpected ways.
            firstChildren.push(child.firstChild);
          }
        } else {
          // If this child had no ID, then there's a chance that it was
          // injected automatically by the browser, as when a `<table>`
          // element sprouts an extra `<tbody>` child as a side effect of
          // `.innerHTML` parsing. Optimistically continue down this
          // branch, but not before examining the other siblings.
          firstChildren.push(child.firstChild);
        }
        child = child.nextSibling;
      }
    }

    if ("production" !== process.env.NODE_ENV) {
      console.error(
        'Error while invoking `findComponentRoot` with the following ' +
        'ancestor node:',
        ancestorNode
      );
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      false,
      'findComponentRoot(..., %s): Unable to find element. This probably ' +
      'means the DOM was unexpectedly mutated (e.g. by the browser).',
      id,
      ReactMount.getID(ancestorNode)
    ) : invariant(false));
  },


  /**
   * React ID utilities.
   */

  ATTR_NAME: ATTR_NAME,

  getReactRootID: getReactRootID,

  getID: getID,

  setID: setID,

  getNode: getNode,

  purgeID: purgeID,

  injection: {}
};

module.exports = ReactMount;

},{"./$":19,"./ReactEventEmitter":65,"./ReactInstanceHandles":69,"./containsNode":105,"./getReactRootElementInContainer":123,"./invariant":127,"__browserify_process":16}],73:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMountReady
 */

"use strict";

var PooledClass = require("./PooledClass");

var mixInto = require("./mixInto");

/**
 * A specialized pseudo-event module to help keep track of components waiting to
 * be notified when their DOM representations are available for use.
 *
 * This implements `PooledClass`, so you should never need to instantiate this.
 * Instead, use `ReactMountReady.getPooled()`.
 *
 * @param {?array<function>} initialCollection
 * @class ReactMountReady
 * @implements PooledClass
 * @internal
 */
function ReactMountReady(initialCollection) {
  this._queue = initialCollection || null;
}

mixInto(ReactMountReady, {

  /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked. This is used
   * to enqueue calls to `componentDidMount` and `componentDidUpdate`.
   *
   * @param {ReactComponent} component Component being rendered.
   * @param {function(DOMElement)} callback Invoked when `notifyAll` is invoked.
   * @internal
   */
  enqueue: function(component, callback) {
    this._queue = this._queue || [];
    this._queue.push({component: component, callback: callback});
  },

  /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */
  notifyAll: function() {
    var queue = this._queue;
    if (queue) {
      this._queue = null;
      for (var i = 0, l = queue.length; i < l; i++) {
        var component = queue[i].component;
        var callback = queue[i].callback;
        callback.call(component, component.getDOMNode());
      }
      queue.length = 0;
    }
  },

  /**
   * Resets the internal queue.
   *
   * @internal
   */
  reset: function() {
    this._queue = null;
  },

  /**
   * `PooledClass` looks for this.
   */
  destructor: function() {
    this.reset();
  }

});

PooledClass.addPoolingTo(ReactMountReady);

module.exports = ReactMountReady;

},{"./PooledClass":43,"./mixInto":139}],74:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMultiChild
 * @typechecks static-only
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactMultiChildUpdateTypes = require("./ReactMultiChildUpdateTypes");

var flattenChildren = require("./flattenChildren");

/**
 * Given a `curChild` and `newChild`, determines if `curChild` should be
 * updated as opposed to being destroyed or replaced.
 *
 * @param {?ReactComponent} curChild
 * @param {?ReactComponent} newChild
 * @return {boolean} True if `curChild` should be updated with `newChild`.
 * @protected
 */
function shouldUpdateChild(curChild, newChild) {
  return curChild && newChild && curChild.constructor === newChild.constructor;
}

/**
 * Updating children of a component may trigger recursive updates. The depth is
 * used to batch recursive updates to render markup more efficiently.
 *
 * @type {number}
 * @private
 */
var updateDepth = 0;

/**
 * Queue of update configuration objects.
 *
 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
 *
 * @type {array<object>}
 * @private
 */
var updateQueue = [];

/**
 * Queue of markup to be rendered.
 *
 * @type {array<string>}
 * @private
 */
var markupQueue = [];

/**
 * Enqueues markup to be rendered and inserted at a supplied index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */
function enqueueMarkup(parentID, markup, toIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: markupQueue.push(markup) - 1,
    textContent: null,
    fromIndex: null,
    toIndex: toIndex
  });
}

/**
 * Enqueues moving an existing element to another index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function enqueueMove(parentID, fromIndex, toIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    textContent: null,
    fromIndex: fromIndex,
    toIndex: toIndex
  });
}

/**
 * Enqueues removing an element at an index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function enqueueRemove(parentID, fromIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    textContent: null,
    fromIndex: fromIndex,
    toIndex: null
  });
}

/**
 * Enqueues setting the text content.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} textContent Text content to set.
 * @private
 */
function enqueueTextContent(parentID, textContent) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
    markupIndex: null,
    textContent: textContent,
    fromIndex: null,
    toIndex: null
  });
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue() {
  if (updateQueue.length) {
    ReactComponent.DOMIDOperations.dangerouslyProcessChildrenUpdates(
      updateQueue,
      markupQueue
    );
    clearQueue();
  }
}

/**
 * Clears any enqueued updates.
 *
 * @private
 */
function clearQueue() {
  updateQueue.length = 0;
  markupQueue.length = 0;
}

/**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */
var ReactMultiChild = {

  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function(nestedChildren, transaction) {
      var children = flattenChildren(nestedChildren);
      var mountImages = [];
      var index = 0;
      this._renderedChildren = children;
      for (var name in children) {
        var child = children[name];
        if (children.hasOwnProperty(name) && child) {
          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
          var rootID = this._rootNodeID + '.' + name;
          var mountImage = child.mountComponent(
            rootID,
            transaction,
            this._mountDepth + 1
          );
          child._mountImage = mountImage;
          child._mountIndex = index;
          mountImages.push(mountImage);
          index++;
        }
      }
      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function(nextContent) {
      updateDepth++;
      try {
        var prevChildren = this._renderedChildren;
        // Remove any rendered children.
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name) &&
              prevChildren[name]) {
            this._unmountChildByName(prevChildren[name], name);
          }
        }
        // Set new text content.
        this.setTextContent(nextContent);
      } catch (error) {
        updateDepth--;
        updateDepth || clearQueue();
        throw error;
      }
      updateDepth--;
      updateDepth || processQueue();
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function(nextNestedChildren, transaction) {
      updateDepth++;
      try {
        this._updateChildren(nextNestedChildren, transaction);
      } catch (error) {
        updateDepth--;
        updateDepth || clearQueue();
        throw error;
      }
      updateDepth--;
      updateDepth || processQueue();
    },

    /**
     * Improve performance by isolating this hot code path from the try/catch
     * block in `updateChildren`.
     *
     * @param {?object} nextNestedChildren Nested child maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function(nextNestedChildren, transaction) {
      var nextChildren = flattenChildren(nextNestedChildren);
      var prevChildren = this._renderedChildren;
      if (!nextChildren && !prevChildren) {
        return;
      }
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var lastIndex = 0;
      var nextIndex = 0;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (shouldUpdateChild(prevChild, nextChild)) {
          this.moveChild(prevChild, nextIndex, lastIndex);
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild.receiveComponent(nextChild, transaction);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            this._unmountChildByName(prevChild, name);
          }
          if (nextChild) {
            this._mountChildByNameAtIndex(
              nextChild, name, nextIndex, transaction
            );
          }
        }
        if (nextChild) {
          nextIndex++;
        }
      }
      // Remove children that are no longer present.
      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) &&
            prevChildren[name] &&
            !(nextChildren && nextChildren[name])) {
          this._unmountChildByName(prevChildren[name], name);
        }
      }
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted.
     *
     * @internal
     */
    unmountChildren: function() {
      var renderedChildren = this._renderedChildren;
      for (var name in renderedChildren) {
        var renderedChild = renderedChildren[name];
        if (renderedChild && renderedChild.unmountComponent) {
          renderedChild.unmountComponent();
        }
      }
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function(child, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @protected
     */
    createChild: function(child) {
      enqueueMarkup(this._rootNodeID, child._mountImage, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function(child) {
      enqueueRemove(this._rootNodeID, child._mountIndex);
    },

    /**
     * Sets this text content string.
     *
     * @param {string} textContent Text content to set.
     * @protected
     */
    setTextContent: function(textContent) {
      enqueueTextContent(this._rootNodeID, textContent);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildByNameAtIndex: function(child, name, index, transaction) {
      // Inlined for performance, see `ReactInstanceHandles.createReactID`.
      var rootID = this._rootNodeID + '.' + name;
      var mountImage = child.mountComponent(
        rootID,
        transaction,
        this._mountDepth + 1
      );
      child._mountImage = mountImage;
      child._mountIndex = index;
      this.createChild(child);
      this._renderedChildren = this._renderedChildren || {};
      this._renderedChildren[name] = child;
    },

    /**
     * Unmounts a rendered child by name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @param {string} name Name of the child in `this._renderedChildren`.
     * @private
     */
    _unmountChildByName: function(child, name) {
      if (ReactComponent.isValidComponent(child)) {
        this.removeChild(child);
        child._mountImage = null;
        child._mountIndex = null;
        child.unmountComponent();
        delete this._renderedChildren[name];
      }
    }

  }

};

module.exports = ReactMultiChild;

},{"./ReactComponent":46,"./ReactMultiChildUpdateTypes":75,"./flattenChildren":116}],75:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactMultiChildUpdateTypes
 */

var keyMirror = require("./keyMirror");

/**
 * When a component's children are updated, a series of update configuration
 * objects are created in order to batch and serialize the required changes.
 *
 * Enumerates all the possible types of update configurations.
 *
 * @internal
 */
var ReactMultiChildUpdateTypes = keyMirror({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  TEXT_CONTENT: null
});

module.exports = ReactMultiChildUpdateTypes;

},{"./keyMirror":133}],76:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactOwner
 */

"use strict";

var invariant = require("./invariant");

/**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */
var ReactOwner = {

  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid owner.
   * @final
   */
  isValidOwner: function(object) {
    return !!(
      object &&
      typeof object.attachRef === 'function' &&
      typeof object.detachRef === 'function'
    );
  },

  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function(component, ref, owner) {
    ("production" !== process.env.NODE_ENV ? invariant(
      ReactOwner.isValidOwner(owner),
      'addComponentAsRefTo(...): Only a ReactOwner can have refs.'
    ) : invariant(ReactOwner.isValidOwner(owner)));
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function(component, ref, owner) {
    ("production" !== process.env.NODE_ENV ? invariant(
      ReactOwner.isValidOwner(owner),
      'removeComponentAsRefFrom(...): Only a ReactOwner can have refs.'
    ) : invariant(ReactOwner.isValidOwner(owner)));
    // Check that `component` is still the current ref because we do not want to
    // detach the ref if another component stole it.
    if (owner.refs[ref] === component) {
      owner.detachRef(ref);
    }
  },

  /**
   * A ReactComponent must mix this in to have refs.
   *
   * @lends {ReactOwner.prototype}
   */
  Mixin: {

    /**
     * Lazily allocates the refs object and stores `component` as `ref`.
     *
     * @param {string} ref Reference name.
     * @param {component} component Component to store as `ref`.
     * @final
     * @private
     */
    attachRef: function(ref, component) {
      ("production" !== process.env.NODE_ENV ? invariant(
        component.isOwnedBy(this),
        'attachRef(%s, ...): Only a component\'s owner can store a ref to it.',
        ref
      ) : invariant(component.isOwnedBy(this)));
      var refs = this.refs || (this.refs = {});
      refs[ref] = component;
    },

    /**
     * Detaches a reference name.
     *
     * @param {string} ref Name to dereference.
     * @final
     * @private
     */
    detachRef: function(ref) {
      delete this.refs[ref];
    }

  }

};

module.exports = ReactOwner;

},{"./invariant":127,"__browserify_process":16}],77:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPerf
 * @typechecks static-only
 */

"use strict";

var ReactPerf = {
  /**
   * Boolean to enable/disable measurement. Set to false by default to prevent
   * accidental logging and perf loss.
   */
  enableMeasure: false,

  /**
   * Holds onto the measure function in use. By default, don't measure
   * anything, but we'll override this if we inject a measure function.
   */
  storedMeasure: _noMeasure,

  /**
   * Use this to wrap methods you want to measure.
   *
   * @param {string} objName
   * @param {string} fnName
   * @param {function} func
   * @return {function}
   */
  measure: function(objName, fnName, func) {
    if ("production" !== process.env.NODE_ENV) {
      var measuredFunc = null;
      return function() {
        if (ReactPerf.enableMeasure) {
          if (!measuredFunc) {
            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
          }
          return measuredFunc.apply(this, arguments);
        }
        return func.apply(this, arguments);
      };
    }
    return func;
  },

  injection: {
    /**
     * @param {function} measure
     */
    injectMeasure: function(measure) {
      ReactPerf.storedMeasure = measure;
    }
  }
};

if ("production" !== process.env.NODE_ENV) {
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
  ReactPerf.enableMeasure = ReactPerf.enableMeasure ||
    (/[?&]react_perf\b/).test(url);
}

/**
 * Simply passes through the measured function, without measuring it.
 *
 * @param {string} objName
 * @param {string} fnName
 * @param {function} func
 * @return {function}
 */
function _noMeasure(objName, fnName, func) {
  return func;
}

module.exports = ReactPerf;

},{"./ExecutionEnvironment":39,"__browserify_process":16}],78:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTransferer
 */

"use strict";

var emptyFunction = require("./emptyFunction");
var invariant = require("./invariant");
var joinClasses = require("./joinClasses");
var merge = require("./merge");

/**
 * Creates a transfer strategy that will merge prop values using the supplied
 * `mergeStrategy`. If a prop was previously unset, this just sets it.
 *
 * @param {function} mergeStrategy
 * @return {function}
 */
function createTransferStrategy(mergeStrategy) {
  return function(props, key, value) {
    if (!props.hasOwnProperty(key)) {
      props[key] = value;
    } else {
      props[key] = mergeStrategy(props[key], value);
    }
  };
}

/**
 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
 */
var TransferStrategies = {
  /**
   * Never transfer `children`.
   */
  children: emptyFunction,
  /**
   * Transfer the `className` prop by merging them.
   */
  className: createTransferStrategy(joinClasses),
  /**
   * Never transfer the `ref` prop.
   */
  ref: emptyFunction,
  /**
   * Transfer the `style` prop (which is an object) by merging them.
   */
  style: createTransferStrategy(merge)
};

/**
 * ReactPropTransferer are capable of transferring props to another component
 * using a `transferPropsTo` method.
 *
 * @class ReactPropTransferer
 */
var ReactPropTransferer = {

  TransferStrategies: TransferStrategies,

  /**
   * @lends {ReactPropTransferer.prototype}
   */
  Mixin: {

    /**
     * Transfer props from this component to a target component.
     *
     * Props that do not have an explicit transfer strategy will be transferred
     * only if the target component does not already have the prop set.
     *
     * This is usually used to pass down props to a returned root component.
     *
     * @param {ReactComponent} component Component receiving the properties.
     * @return {ReactComponent} The supplied `component`.
     * @final
     * @protected
     */
    transferPropsTo: function(component) {
      ("production" !== process.env.NODE_ENV ? invariant(
        component.props.__owner__ === this,
        '%s: You can\'t call transferPropsTo() on a component that you ' +
        'don\'t own, %s. This usually means you are calling ' +
        'transferPropsTo() on a component passed in as props or children.',
        this.constructor.displayName,
        component.constructor.displayName
      ) : invariant(component.props.__owner__ === this));

      var props = {};
      for (var thatKey in component.props) {
        if (component.props.hasOwnProperty(thatKey)) {
          props[thatKey] = component.props[thatKey];
        }
      }
      for (var thisKey in this.props) {
        if (!this.props.hasOwnProperty(thisKey)) {
          continue;
        }
        var transferStrategy = TransferStrategies[thisKey];
        if (transferStrategy) {
          transferStrategy(props, thisKey, this.props[thisKey]);
        } else if (!props.hasOwnProperty(thisKey)) {
          props[thisKey] = this.props[thisKey];
        }
      }
      component.props = props;
      return component;
    }

  }

};

module.exports = ReactPropTransferer;

},{"./emptyFunction":112,"./invariant":127,"./joinClasses":132,"./merge":136,"__browserify_process":16}],79:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactPropTypes
 */

"use strict";

var createObjectFrom = require("./createObjectFrom");
var invariant = require("./invariant");

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyLink = React.createClass({
 *     propTypes: {
 *       // An optional string or URI prop named "href".
 *       href: function(props, propName, componentName) {
 *         var propValue = props[propName];
 *         invariant(
 *           propValue == null ||
 *           typeof propValue === 'string' ||
 *           propValue instanceof URI,
 *           'Invalid `%s` supplied to `%s`, expected string or URI.',
 *           propName,
 *           componentName
 *         );
 *       }
 *     },
 *     render: function() { ... }
 *   });
 *
 * @internal
 */
var Props = {

  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),

  oneOf: createEnumTypeChecker,

  instanceOf: createInstanceTypeChecker

};

var ANONYMOUS = '<<anonymous>>';

function createPrimitiveTypeChecker(expectedType) {
  function validatePrimitiveType(propValue, propName, componentName) {
    var propType = typeof propValue;
    if (propType === 'object' && Array.isArray(propValue)) {
      propType = 'array';
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      propType === expectedType,
      'Invalid prop `%s` of type `%s` supplied to `%s`, expected `%s`.',
      propName,
      propType,
      componentName,
      expectedType
    ) : invariant(propType === expectedType));
  }
  return createChainableTypeChecker(validatePrimitiveType);
}

function createEnumTypeChecker(expectedValues) {
  var expectedEnum = createObjectFrom(expectedValues);
  function validateEnumType(propValue, propName, componentName) {
    ("production" !== process.env.NODE_ENV ? invariant(
      expectedEnum[propValue],
      'Invalid prop `%s` supplied to `%s`, expected one of %s.',
      propName,
      componentName,
      JSON.stringify(Object.keys(expectedEnum))
    ) : invariant(expectedEnum[propValue]));
  }
  return createChainableTypeChecker(validateEnumType);
}

function createInstanceTypeChecker(expectedClass) {
  function validateInstanceType(propValue, propName, componentName) {
    ("production" !== process.env.NODE_ENV ? invariant(
      propValue instanceof expectedClass,
      'Invalid prop `%s` supplied to `%s`, expected instance of `%s`.',
      propName,
      componentName,
      expectedClass.name || ANONYMOUS
    ) : invariant(propValue instanceof expectedClass));
  }
  return createChainableTypeChecker(validateInstanceType);
}

function createChainableTypeChecker(validate) {
  function createTypeChecker(isRequired) {
    function checkType(props, propName, componentName) {
      var propValue = props[propName];
      if (propValue != null) {
        // Only validate if there is a value to check.
        validate(propValue, propName, componentName || ANONYMOUS);
      } else {
        ("production" !== process.env.NODE_ENV ? invariant(
          !isRequired,
          'Required prop `%s` was not specified in `%s`.',
          propName,
          componentName || ANONYMOUS
        ) : invariant(!isRequired));
      }
    }
    if (!isRequired) {
      checkType.isRequired = createTypeChecker(true);
    }
    return checkType;
  }
  return createTypeChecker(false);
}

module.exports = Props;

},{"./createObjectFrom":109,"./invariant":127,"__browserify_process":16}],80:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactReconcileTransaction
 * @typechecks static-only
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");
var PooledClass = require("./PooledClass");
var ReactEventEmitter = require("./ReactEventEmitter");
var ReactInputSelection = require("./ReactInputSelection");
var ReactMountReady = require("./ReactMountReady");
var Transaction = require("./Transaction");

var mixInto = require("./mixInto");

/**
 * Ensures that, when possible, the selection range (currently selected text
 * input) is not disturbed by performing the transaction.
 */
var SELECTION_RESTORATION = {
  /**
   * @return {Selection} Selection information.
   */
  initialize: ReactInputSelection.getSelectionInformation,
  /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */
  close: ReactInputSelection.restoreSelection
};

/**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */
var EVENT_SUPPRESSION = {
  /**
   * @return {boolean} The enabled status of `ReactEventEmitter` before the
   * reconciliation.
   */
  initialize: function() {
    var currentlyEnabled = ReactEventEmitter.isEnabled();
    ReactEventEmitter.setEnabled(false);
    return currentlyEnabled;
  },

  /**
   * @param {boolean} previouslyEnabled Enabled status of `ReactEventEmitter`
   *   before the reconciliation occured. `close` restores the previous value.
   */
  close: function(previouslyEnabled) {
    ReactEventEmitter.setEnabled(previouslyEnabled);
  }
};

/**
 * Provides a `ReactMountReady` queue for collecting `onDOMReady` callbacks
 * during the performing of the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function() {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function() {
    this.reactMountReady.notifyAll();
  }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [
  SELECTION_RESTORATION,
  EVENT_SUPPRESSION,
  ON_DOM_READY_QUEUEING
];

/**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 * - Restores selection range.
 *
 * Future:
 * - Restore document/overflow scroll positions that were unintentionally
 *   modified via DOM insertions above the top viewport boundary.
 * - Implement/integrate with customized constraint based layout system and keep
 *   track of which dimensions must be remeasured.
 *
 * @class ReactReconcileTransaction
 */
function ReactReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = ReactMountReady.getPooled(null);
}

var Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap proceedures.
   *   TODO: convert to array<TransactionWrapper>
   */
  getTransactionWrappers: function() {
    if (ExecutionEnvironment.canUseDOM) {
      return TRANSACTION_WRAPPERS;
    } else {
      return [];
    }
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   *   TODO: convert to ReactMountReady
   */
  getReactMountReady: function() {
    return this.reactMountReady;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be resused.
   */
  destructor: function() {
    ReactMountReady.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};


mixInto(ReactReconcileTransaction, Transaction.Mixin);
mixInto(ReactReconcileTransaction, Mixin);

PooledClass.addPoolingTo(ReactReconcileTransaction);

module.exports = ReactReconcileTransaction;

},{"./ExecutionEnvironment":39,"./PooledClass":43,"./ReactEventEmitter":65,"./ReactInputSelection":68,"./ReactMountReady":73,"./Transaction":101,"./mixInto":139}],81:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @typechecks static-only
 * @providesModule ReactServerRendering
 */
"use strict";

var ReactComponent = require("./ReactComponent");
var ReactInstanceHandles = require("./ReactInstanceHandles");
var ReactMarkupChecksum = require("./ReactMarkupChecksum");
var ReactReconcileTransaction = require("./ReactReconcileTransaction");

var invariant = require("./invariant");

/**
 * @param {ReactComponent} component
 * @param {function} callback
 */
function renderComponentToString(component, callback) {
  // We use a callback API to keep the API async in case in the future we ever
  // need it, but in reality this is a synchronous operation.

  ("production" !== process.env.NODE_ENV ? invariant(
    ReactComponent.isValidComponent(component),
    'renderComponentToString(): You must pass a valid ReactComponent.'
  ) : invariant(ReactComponent.isValidComponent(component)));

  ("production" !== process.env.NODE_ENV ? invariant(
    typeof callback === 'function',
    'renderComponentToString(): You must pass a function as a callback.'
  ) : invariant(typeof callback === 'function'));

  var id = ReactInstanceHandles.createReactRootID();
  var transaction = ReactReconcileTransaction.getPooled();
  transaction.reinitializeTransaction();
  try {
    transaction.perform(function() {
      var markup = component.mountComponent(id, transaction, 0);
      markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
      callback(markup);
    }, null);
  } finally {
    ReactReconcileTransaction.release(transaction);
  }
}

module.exports = {
  renderComponentToString: renderComponentToString
};

},{"./ReactComponent":46,"./ReactInstanceHandles":69,"./ReactMarkupChecksum":71,"./ReactReconcileTransaction":80,"./invariant":127,"__browserify_process":16}],82:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactStateSetters
 */

"use strict";

var ReactStateSetters = {
  /**
   * Returns a function that calls the provided function, and uses the result
   * of that to set the component's state.
   *
   * @param {ReactCompositeComponent} component
   * @param {function} funcReturningState Returned callback uses this to
   *                                      determine how to update state.
   * @return {function} callback that when invoked uses funcReturningState to
   *                    determined the object literal to setState.
   */
  createStateSetter: function(component, funcReturningState) {
    return function(a, b, c, d, e, f) {
      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
      if (partialState) {
        component.setState(partialState);
      }
    };
  },

  /**
   * Returns a single-argument callback that can be used to update a single
   * key in the component's state.
   *
   * Note: this is memoized function, which makes it inexpensive to call.
   *
   * @param {ReactCompositeComponent} component
   * @param {string} key The key in the state that you should update.
   * @return {function} callback of 1 argument which calls setState() with
   *                    the provided keyName and callback argument.
   */
  createStateKeySetter: function(component, key) {
    // Memoize the setters.
    var cache = component.__keySetters || (component.__keySetters = {});
    return cache[key] || (cache[key] = createStateKeySetter(component, key));
  }
};

function createStateKeySetter(component, key) {
  // Partial state is allocated outside of the function closure so it can be
  // reused with every call, avoiding memory allocation when this function
  // is called.
  var partialState = {};
  return function stateKeySetter(value) {
    partialState[key] = value;
    component.setState(partialState);
  };
}

ReactStateSetters.Mixin = {
  /**
   * Returns a function that calls the provided function, and uses the result
   * of that to set the component's state.
   *
   * For example, these statements are equivalent:
   *
   *   this.setState({x: 1});
   *   this.createStateSetter(function(xValue) {
   *     return {x: xValue};
   *   })(1);
   *
   * @param {function} funcReturningState Returned callback uses this to
   *                                      determine how to update state.
   * @return {function} callback that when invoked uses funcReturningState to
   *                    determined the object literal to setState.
   */
  createStateSetter: function(funcReturningState) {
    return ReactStateSetters.createStateSetter(this, funcReturningState);
  },

  /**
   * Returns a single-argument callback that can be used to update a single
   * key in the component's state.
   *
   * For example, these statements are equivalent:
   *
   *   this.setState({x: 1});
   *   this.createStateKeySetter('x')(1);
   *
   * Note: this is memoized function, which makes it inexpensive to call.
   *
   * @param {string} key The key in the state that you should update.
   * @return {function} callback of 1 argument which calls setState() with
   *                    the provided keyName and callback argument.
   */
  createStateKeySetter: function(key) {
    return ReactStateSetters.createStateKeySetter(this, key);
  }
};

module.exports = ReactStateSetters;

},{}],83:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactTextComponent
 * @typechecks static-only
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactMount = require("./ReactMount");

var escapeTextForBrowser = require("./escapeTextForBrowser");
var mixInto = require("./mixInto");

/**
 * Text nodes violate a couple assumptions that React makes about components:
 *
 *  - When mounting text into the DOM, adjacent text nodes are merged.
 *  - Text nodes cannot be assigned a React root ID.
 *
 * This component is used to wrap strings in elements so that they can undergo
 * the same reconciliation that is applied to elements.
 *
 * TODO: Investigate representing React components in the DOM with text nodes.
 *
 * @class ReactTextComponent
 * @extends ReactComponent
 * @internal
 */
var ReactTextComponent = function(initialText) {
  this.construct({text: initialText});
};

mixInto(ReactTextComponent, ReactComponent.Mixin);
mixInto(ReactTextComponent, {

  /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction} transaction
   * @param {number} mountDepth number of components in the owner hierarchy
   * @return {string} Markup for this text node.
   * @internal
   */
  mountComponent: function(rootID, transaction, mountDepth) {
    ReactComponent.Mixin.mountComponent.call(
      this,
      rootID,
      transaction,
      mountDepth
    );
    return (
      '<span ' + ReactMount.ATTR_NAME + '="' + escapeTextForBrowser(rootID) + '">' +
        escapeTextForBrowser(this.props.text) +
      '</span>'
    );
  },

  /**
   * Updates this component by updating the text content.
   *
   * @param {object} nextComponent Contains the next text content.
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  receiveComponent: function(nextComponent, transaction) {
    var nextProps = nextComponent.props;
    if (nextProps.text !== this.props.text) {
      this.props.text = nextProps.text;
      ReactComponent.DOMIDOperations.updateTextContentByID(
        this._rootNodeID,
        nextProps.text
      );
    }
  }

});

module.exports = ReactTextComponent;

},{"./ReactComponent":46,"./ReactMount":72,"./escapeTextForBrowser":113,"./mixInto":139}],84:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactTransitionEvents
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;
  for (var baseEventName in EVENT_NAME_MAP) {
    var baseEvents = EVENT_NAME_MAP[baseEventName];
    for (var styleName in baseEvents) {
      if (styleName in style) {
        endEvents.push(baseEvents[styleName]);
        break;
      }
    }
  }
}

if (ExecutionEnvironment.canUseDOM) {
  detectEvents();
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var ReactTransitionEvents = {
  addEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function(endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },

  removeEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function(endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

module.exports = ReactTransitionEvents;

},{"./ExecutionEnvironment":39}],85:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactTransitionGroup
 */

"use strict";

var React = require("./React");
var ReactTransitionableChild = require("./ReactTransitionableChild");
var ReactTransitionKeySet = require("./ReactTransitionKeySet");

var ReactTransitionGroup = React.createClass({

  propTypes: {
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool,
    onTransition: React.PropTypes.func,
    component: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      transitionEnter: true,
      transitionLeave: true,
      component: React.DOM.span
    };
  },

  componentWillMount: function() {
    // _transitionGroupCurrentKeys stores the union of previous *and* next keys.
    // If this were a component we'd store it as state, however, since this must
    // be a mixin, we need to keep the result of the union of keys in each
    // call to animateChildren() which happens in render(), so we can't
    // call setState() in there.
    this._transitionGroupCurrentKeys = {};
  },

  componentDidUpdate: function() {
    if (this.props.onTransition) {
      this.props.onTransition();
    }
  },

  /**
   * Render some children in a transitionable way.
   */
  renderTransitionableChildren: function(sourceChildren) {
    var children = {};
    var childMapping = ReactTransitionKeySet.getChildMapping(sourceChildren);

    var currentKeys = ReactTransitionKeySet.mergeKeySets(
      this._transitionGroupCurrentKeys,
      ReactTransitionKeySet.getKeySet(sourceChildren)
    );

    for (var key in currentKeys) {
      // Here is how we keep the nodes in the DOM. ReactTransitionableChild
      // knows how to hold onto its child if it changes to undefined. Here, we
      // may look up an old key in the new children, and it may switch to
      // undefined. React's reconciler will keep the ReactTransitionableChild
      // instance alive such that we can animate it.
      if (childMapping[key] || this.props.transitionLeave) {
        children[key] = ReactTransitionableChild({
          name: this.props.transitionName,
          enter: this.props.transitionEnter,
          onDoneLeaving: this._handleDoneLeaving.bind(this, key)
        }, childMapping[key]);
      }
    }

    this._transitionGroupCurrentKeys = currentKeys;

    return children;
  },

  _handleDoneLeaving: function(key) {
    // When the leave animation finishes, we should blow away the actual DOM
    // node.
    delete this._transitionGroupCurrentKeys[key];
    this.forceUpdate();
  },

  render: function() {
    return this.transferPropsTo(
      this.props.component(
        {
          transitionName: null,
          transitionEnter: null,
          transitionLeave: null,
          component: null
        },
        this.renderTransitionableChildren(this.props.children)
      )
    );
  }
});

module.exports = ReactTransitionGroup;

},{"./React":44,"./ReactTransitionKeySet":86,"./ReactTransitionableChild":87}],86:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @typechecks static-only
 * @providesModule ReactTransitionKeySet
 */

"use strict";

var ReactChildren = require("./ReactChildren");

var MERGE_KEY_SETS_TAIL_SENTINEL = {};

var ReactTransitionKeySet = {
  /**
   * Given `this.props.children`, return an object mapping key to child. Just
   * simple syntactic sugar around ReactChildren.map().
   *
   * @param {*} children `this.props.children`
   * @return {object} Mapping of key to child
   */
  getChildMapping: function(children) {
    return ReactChildren.map(children, function(child) {
      return child;
    });
  },

  /**
   * Simple syntactic sugar to get an object with keys of all of `children`.
   * Does not have references to the children themselves.
   *
   * @param {*} children `this.props.children`
   * @return {object} Mapping of key to the value "true"
   */
  getKeySet: function(children) {
    return ReactChildren.map(children, function() {
      return true;
    });
  },

  /**
   * When you're adding or removing children some may be added or removed in the
   * same render pass. We want ot show *both* since we want to simultaneously
   * animate elements in and out. This function takes a previous set of keys
   * and a new set of keys and merges them with its best guess of the correct
   * ordering. In the future we may expose some of the utilities in
   * ReactMultiChild to make this easy, but for now React itself does not
   * directly have this concept of the union of prevChildren and nextChildren
   * so we implement it here.
   *
   * @param {object} prev prev child keys as returned from
   * `ReactTransitionKeySet.getKeySet()`.
   * @param {object} next next child keys as returned from
   * `ReactTransitionKeySet.getKeySet()`.
   * @return {object} a key set that contains all keys in `prev` and all keys
   * in `next` in a reasonable order.
   */
  mergeKeySets: function(prev, next) {
    prev = prev || {};
    next = next || {};

    var keySet = {};
    var prevKeys = Object.keys(prev).concat([MERGE_KEY_SETS_TAIL_SENTINEL]);
    var nextKeys = Object.keys(next).concat([MERGE_KEY_SETS_TAIL_SENTINEL]);
    var i;
    for (i = 0; i < prevKeys.length - 1; i++) {
      var prevKey = prevKeys[i];
      if (next[prevKey]) {
        continue;
      }

      // This key is not in the new set. Place it in our
      // best guess where it should go. We do this by searching
      // for a key after the current one in prevKeys that is
      // still in nextKeys, and inserting right before it.
      // I know this is O(n^2), but this is not a particularly
      // hot code path.
      var insertPos = -1;

      for (var j = i + 1; j < prevKeys.length; j++) {
        insertPos = nextKeys.indexOf(prevKeys[j]);
        if (insertPos >= 0) {
          break;
        }
      }

      // Insert before insertPos
      nextKeys.splice(insertPos, 0, prevKey);
    }

    for (i = 0; i < nextKeys.length - 1; i++) {
      keySet[nextKeys[i]] = true;
    }

    return keySet;
  }
};

module.exports = ReactTransitionKeySet;

},{"./ReactChildren":45}],87:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactTransitionableChild
 */

"use strict";

var React = require("./React");
var CSSCore = require("./CSSCore");
var ReactTransitionEvents = require("./ReactTransitionEvents");

// We don't remove the element from the DOM until we receive an animationend or
// transitionend event. If the user screws up and forgets to add an animation
// their node will be stuck in the DOM forever, so we detect if an animation
// does not start and if it doesn't, we just call the end listener immediately.
var TICK = 17;
var NO_EVENT_TIMEOUT = 5000;

var noEventListener = null;

if ("production" !== process.env.NODE_ENV) {
  noEventListener = function() {
    console.warn(
      'transition(): tried to perform an animation without ' +
      'an animationend or transitionend event after timeout (' +
      NO_EVENT_TIMEOUT + 'ms). You should either disable this ' +
      'transition in JS or add a CSS animation/transition.'
    );
  };
}

/**
 * This component is simply responsible for watching when its single child
 * changes to undefined and animating the old child out. It does this by
 * recording its old child in savedChildren when it detects this event is about
 * to occur.
 */
var ReactTransitionableChild = React.createClass({
  /**
   * Perform an actual DOM transition. This takes care of a few things:
   * - Adding the second CSS class to trigger the transition
   * - Listening for the finish event
   * - Cleaning up the css (unless noReset is true)
   */
  transition: function(animationType, noReset, finishCallback) {
    var node = this.getDOMNode();
    var className = this.props.name + '-' + animationType;
    var activeClassName = className + '-active';
    var noEventTimeout = null;

    var endListener = function() {
      if ("production" !== process.env.NODE_ENV) {
        clearTimeout(noEventTimeout);
      }

      // If this gets invoked after the component is unmounted it's OK.
      if (!noReset) {
        // Usually this means you're about to remove the node if you want to
        // leave it in its animated state.
        CSSCore.removeClass(node, className);
        CSSCore.removeClass(node, activeClassName);
      }

      ReactTransitionEvents.removeEndEventListener(node, endListener);

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      finishCallback && finishCallback();
    };

    ReactTransitionEvents.addEndEventListener(node, endListener);

    CSSCore.addClass(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClass(activeClassName);

    if ("production" !== process.env.NODE_ENV) {
      noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
    }
  },

  queueClass: function(className) {
    this.classNameQueue.push(className);

    if (this.props.runNextTick) {
      this.props.runNextTick(this.flushClassNameQueue);
      return;
    }

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },

  flushClassNameQueue: function() {
    if (this.isMounted()) {
      this.classNameQueue.forEach(
        CSSCore.addClass.bind(CSSCore, this.getDOMNode())
      );
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  componentWillMount: function() {
    this.classNameQueue = [];
  },

  componentWillUnmount: function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.children && this.props.children) {
      this.savedChildren = this.props.children;
    }
  },

  componentDidMount: function(node) {
    if (this.props.enter) {
      this.transition('enter');
    }
  },

  componentDidUpdate: function(prevProps, prevState, node) {
    if (prevProps.children && !this.props.children) {
      this.transition('leave', true, this.props.onDoneLeaving);
    }
  },

  render: function() {
    return this.props.children || this.savedChildren;
  }
});

module.exports = ReactTransitionableChild;

},{"./CSSCore":20,"./React":44,"./ReactTransitionEvents":84,"__browserify_process":16}],88:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactUpdates
 */

"use strict";

var invariant = require("./invariant");

var dirtyComponents = [];

var batchingStrategy = null;

function ensureBatchingStrategy() {
  ("production" !== process.env.NODE_ENV ? invariant(batchingStrategy, 'ReactUpdates: must inject a batching strategy') : invariant(batchingStrategy));
}

function batchedUpdates(callback, param) {
  ensureBatchingStrategy();
  batchingStrategy.batchedUpdates(callback, param);
}

/**
 * Array comparator for ReactComponents by owner depth
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountDepthComparator(c1, c2) {
  return c1._mountDepth - c2._mountDepth;
}

function runBatchedUpdates() {
  // Since reconciling a component higher in the owner hierarchy usually (not
  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
  // them before their children by sorting the array.

  dirtyComponents.sort(mountDepthComparator);

  for (var i = 0; i < dirtyComponents.length; i++) {
    // If a component is unmounted before pending changes apply, ignore them
    // TODO: Queue unmounts in the same list to avoid this happening at all
    var component = dirtyComponents[i];
    if (component.isMounted()) {
      // If performUpdateIfNecessary happens to enqueue any new updates, we
      // shouldn't execute the callbacks until the next render happens, so
      // stash the callbacks first
      var callbacks = component._pendingCallbacks;
      component._pendingCallbacks = null;
      component.performUpdateIfNecessary();
      if (callbacks) {
        for (var j = 0; j < callbacks.length; j++) {
          callbacks[j].call(component);
        }
      }
    }
  }
}

function clearDirtyComponents() {
  dirtyComponents.length = 0;
}

function flushBatchedUpdates() {
  // Run these in separate functions so the JIT can optimize
  try {
    runBatchedUpdates();
  } catch (e) {
    // IE 8 requires catch to use finally.
    throw e;
  } finally {
    clearDirtyComponents();
  }
}

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component, callback) {
  ("production" !== process.env.NODE_ENV ? invariant(
    !callback || typeof callback === "function",
    'enqueueUpdate(...): You called `setProps`, `replaceProps`, ' +
    '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
    'isn\'t callable.'
  ) : invariant(!callback || typeof callback === "function"));
  ensureBatchingStrategy();

  if (!batchingStrategy.isBatchingUpdates) {
    component.performUpdateIfNecessary();
    callback && callback();
    return;
  }

  dirtyComponents.push(component);

  if (callback) {
    if (component._pendingCallbacks) {
      component._pendingCallbacks.push(callback);
    } else {
      component._pendingCallbacks = [callback];
    }
  }
}

var ReactUpdatesInjection = {
  injectBatchingStrategy: function(_batchingStrategy) {
    ("production" !== process.env.NODE_ENV ? invariant(
      _batchingStrategy,
      'ReactUpdates: must provide a batching strategy'
    ) : invariant(_batchingStrategy));
    ("production" !== process.env.NODE_ENV ? invariant(
      typeof _batchingStrategy.batchedUpdates === 'function',
      'ReactUpdates: must provide a batchedUpdates() function'
    ) : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
    ("production" !== process.env.NODE_ENV ? invariant(
      typeof _batchingStrategy.isBatchingUpdates === 'boolean',
      'ReactUpdates: must provide an isBatchingUpdates boolean attribute'
    ) : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection
};

module.exports = ReactUpdates;

},{"./invariant":127,"__browserify_process":16}],89:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactWithAddons
 */

/**
 * This module exists purely in the open source project, and is meant as a way
 * to create a separate standalone build of React. This build has "addons", or
 * functionality we've built and think might be useful but doesn't have a good
 * place to live inside React core.
 */

"use strict";

var LinkedStateMixin = require("./LinkedStateMixin");
var React = require("./React");
var ReactTransitionGroup = require("./ReactTransitionGroup");

var cx = require("./cx");

React.addons = {
  classSet: cx,
  LinkedStateMixin: LinkedStateMixin,
  TransitionGroup: ReactTransitionGroup
};

module.exports = React;


},{"./LinkedStateMixin":40,"./React":44,"./ReactTransitionGroup":85,"./cx":110}],90:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SelectEventPlugin
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPluginHub = require("./EventPluginHub");
var EventPropagators = require("./EventPropagators");
var ExecutionEnvironment = require("./ExecutionEnvironment");
var ReactInputSelection = require("./ReactInputSelection");
var SyntheticEvent = require("./SyntheticEvent");

var getActiveElement = require("./getActiveElement");
var isTextInputElement = require("./isTextInputElement");
var keyOf = require("./keyOf");
var shallowEqual = require("./shallowEqual");

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf({onSelect: null}),
      captured: keyOf({onSelectCapture: null})
    }
  }
};

var useSelectionChange = false;

if (ExecutionEnvironment.canUseDOM) {
  useSelectionChange = 'onselectionchange' in document;
}

var activeElement = null;
var activeElementID = null;
var activeNativeEvent = null;
var lastSelection = null;
var mouseDown = false;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @param {object}
 */
function getSelection(node) {
  if ('selectionStart' in node &&
      ReactInputSelection.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  } else {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior).
  if (mouseDown || activeElement != getActiveElement()) {
    return;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(
      eventTypes.select,
      activeElementID,
      nativeEvent
    );

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }
}

/**
 * Handle deferred event. And manually dispatch synthetic events.
 */
function dispatchDeferredSelectEvent() {
  if (!activeNativeEvent) {
    return;
  }

  var syntheticEvent = constructSelectEvent(activeNativeEvent);
  activeNativeEvent = null;

  // Enqueue and process the abstract event manually.
  if (syntheticEvent) {
    EventPluginHub.enqueueEvents(syntheticEvent);
    EventPluginHub.processEventQueue();
  }
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    switch (topLevelType) {
      // Track the input node that has focus.
      case topLevelTypes.topFocus:
        if (isTextInputElement(topLevelTarget) ||
            topLevelTarget.contentEditable === 'true') {
          activeElement = topLevelTarget;
          activeElementID = topLevelTargetID;
          lastSelection = null;
        }
        break;
      case topLevelTypes.topBlur:
        activeElement = null;
        activeElementID = null;
        lastSelection = null;
        break;

      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case topLevelTypes.topMouseDown:
        mouseDown = true;
        break;
      case topLevelTypes.topContextMenu:
      case topLevelTypes.topMouseUp:
        mouseDown = false;
        return constructSelectEvent(nativeEvent);

      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't).
      case topLevelTypes.topSelectionChange:
        return constructSelectEvent(nativeEvent);

      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry.
      case topLevelTypes.topKeyDown:
        if (!useSelectionChange) {
          activeNativeEvent = nativeEvent;
          setTimeout(dispatchDeferredSelectEvent, 0);
        }
        break;
    }
  }
};

module.exports = SelectEventPlugin;

},{"./EventConstants":33,"./EventPluginHub":35,"./EventPropagators":38,"./ExecutionEnvironment":39,"./ReactInputSelection":68,"./SyntheticEvent":94,"./getActiveElement":119,"./isTextInputElement":130,"./keyOf":134,"./shallowEqual":144}],91:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SimpleEventPlugin
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPropagators = require("./EventPropagators");
var SyntheticClipboardEvent = require("./SyntheticClipboardEvent");
var SyntheticEvent = require("./SyntheticEvent");
var SyntheticFocusEvent = require("./SyntheticFocusEvent");
var SyntheticKeyboardEvent = require("./SyntheticKeyboardEvent");
var SyntheticMouseEvent = require("./SyntheticMouseEvent");
var SyntheticTouchEvent = require("./SyntheticTouchEvent");
var SyntheticUIEvent = require("./SyntheticUIEvent");
var SyntheticWheelEvent = require("./SyntheticWheelEvent");

var invariant = require("./invariant");
var keyOf = require("./keyOf");

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  blur: {
    phasedRegistrationNames: {
      bubbled: keyOf({onBlur: true}),
      captured: keyOf({onBlurCapture: true})
    }
  },
  click: {
    phasedRegistrationNames: {
      bubbled: keyOf({onClick: true}),
      captured: keyOf({onClickCapture: true})
    }
  },
  contextMenu: {
    phasedRegistrationNames: {
      bubbled: keyOf({onContextMenu: true}),
      captured: keyOf({onContextMenuCapture: true})
    }
  },
  copy: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCopy: true}),
      captured: keyOf({onCopyCapture: true})
    }
  },
  cut: {
    phasedRegistrationNames: {
      bubbled: keyOf({onCut: true}),
      captured: keyOf({onCutCapture: true})
    }
  },
  doubleClick: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDoubleClick: true}),
      captured: keyOf({onDoubleClickCapture: true})
    }
  },
  drag: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDrag: true}),
      captured: keyOf({onDragCapture: true})
    }
  },
  dragEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragEnd: true}),
      captured: keyOf({onDragEndCapture: true})
    }
  },
  dragEnter: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragEnter: true}),
      captured: keyOf({onDragEnterCapture: true})
    }
  },
  dragExit: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragExit: true}),
      captured: keyOf({onDragExitCapture: true})
    }
  },
  dragLeave: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragLeave: true}),
      captured: keyOf({onDragLeaveCapture: true})
    }
  },
  dragOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragOver: true}),
      captured: keyOf({onDragOverCapture: true})
    }
  },
  dragStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDragStart: true}),
      captured: keyOf({onDragStartCapture: true})
    }
  },
  drop: {
    phasedRegistrationNames: {
      bubbled: keyOf({onDrop: true}),
      captured: keyOf({onDropCapture: true})
    }
  },
  focus: {
    phasedRegistrationNames: {
      bubbled: keyOf({onFocus: true}),
      captured: keyOf({onFocusCapture: true})
    }
  },
  input: {
    phasedRegistrationNames: {
      bubbled: keyOf({onInput: true}),
      captured: keyOf({onInputCapture: true})
    }
  },
  keyDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({onKeyDown: true}),
      captured: keyOf({onKeyDownCapture: true})
    }
  },
  keyPress: {
    phasedRegistrationNames: {
      bubbled: keyOf({onKeyPress: true}),
      captured: keyOf({onKeyPressCapture: true})
    }
  },
  keyUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({onKeyUp: true}),
      captured: keyOf({onKeyUpCapture: true})
    }
  },
  // Note: We do not allow listening to mouseOver events. Instead, use the
  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
  mouseDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseDown: true}),
      captured: keyOf({onMouseDownCapture: true})
    }
  },
  mouseMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseMove: true}),
      captured: keyOf({onMouseMoveCapture: true})
    }
  },
  mouseUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMouseUp: true}),
      captured: keyOf({onMouseUpCapture: true})
    }
  },
  paste: {
    phasedRegistrationNames: {
      bubbled: keyOf({onPaste: true}),
      captured: keyOf({onPasteCapture: true})
    }
  },
  scroll: {
    phasedRegistrationNames: {
      bubbled: keyOf({onScroll: true}),
      captured: keyOf({onScrollCapture: true})
    }
  },
  submit: {
    phasedRegistrationNames: {
      bubbled: keyOf({onSubmit: true}),
      captured: keyOf({onSubmitCapture: true})
    }
  },
  touchCancel: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchCancel: true}),
      captured: keyOf({onTouchCancelCapture: true})
    }
  },
  touchEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchEnd: true}),
      captured: keyOf({onTouchEndCapture: true})
    }
  },
  touchMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchMove: true}),
      captured: keyOf({onTouchMoveCapture: true})
    }
  },
  touchStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchStart: true}),
      captured: keyOf({onTouchStartCapture: true})
    }
  },
  wheel: {
    phasedRegistrationNames: {
      bubbled: keyOf({onWheel: true}),
      captured: keyOf({onWheelCapture: true})
    }
  }
};

var topLevelEventsToDispatchConfig = {
  topBlur:        eventTypes.blur,
  topClick:       eventTypes.click,
  topContextMenu: eventTypes.contextMenu,
  topCopy:        eventTypes.copy,
  topCut:         eventTypes.cut,
  topDoubleClick: eventTypes.doubleClick,
  topDrag:        eventTypes.drag,
  topDragEnd:     eventTypes.dragEnd,
  topDragEnter:   eventTypes.dragEnter,
  topDragExit:    eventTypes.dragExit,
  topDragLeave:   eventTypes.dragLeave,
  topDragOver:    eventTypes.dragOver,
  topDragStart:   eventTypes.dragStart,
  topDrop:        eventTypes.drop,
  topFocus:       eventTypes.focus,
  topInput:       eventTypes.input,
  topKeyDown:     eventTypes.keyDown,
  topKeyPress:    eventTypes.keyPress,
  topKeyUp:       eventTypes.keyUp,
  topMouseDown:   eventTypes.mouseDown,
  topMouseMove:   eventTypes.mouseMove,
  topMouseUp:     eventTypes.mouseUp,
  topPaste:       eventTypes.paste,
  topScroll:      eventTypes.scroll,
  topSubmit:      eventTypes.submit,
  topTouchCancel: eventTypes.touchCancel,
  topTouchEnd:    eventTypes.touchEnd,
  topTouchMove:   eventTypes.touchMove,
  topTouchStart:  eventTypes.touchStart,
  topWheel:       eventTypes.wheel
};

var SimpleEventPlugin = {

  eventTypes: eventTypes,

  /**
   * Same as the default implementation, except cancels the event when return
   * value is false.
   *
   * @param {object} Event to be dispatched.
   * @param {function} Application-level callback.
   * @param {string} domID DOM ID to pass to the callback.
   */
  executeDispatch: function(event, listener, domID) {
    var returnValue = listener(event, domID);
    if (returnValue === false) {
      event.stopPropagation();
      event.preventDefault();
    }
  },

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch(topLevelType) {
      case topLevelTypes.topInput:
      case topLevelTypes.topSubmit:
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent;
        break;
      case topLevelTypes.topKeyDown:
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topKeyUp:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case topLevelTypes.topBlur:
      case topLevelTypes.topFocus:
        EventConstructor = SyntheticFocusEvent;
        break;
      case topLevelTypes.topClick:
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
        /* falls through */
      case topLevelTypes.topContextMenu:
      case topLevelTypes.topDoubleClick:
      case topLevelTypes.topDrag:
      case topLevelTypes.topDragEnd:
      case topLevelTypes.topDragEnter:
      case topLevelTypes.topDragExit:
      case topLevelTypes.topDragLeave:
      case topLevelTypes.topDragOver:
      case topLevelTypes.topDragStart:
      case topLevelTypes.topDrop:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topMouseMove:
      case topLevelTypes.topMouseUp:
        EventConstructor = SyntheticMouseEvent;
        break;
      case topLevelTypes.topTouchCancel:
      case topLevelTypes.topTouchEnd:
      case topLevelTypes.topTouchMove:
      case topLevelTypes.topTouchStart:
        EventConstructor = SyntheticTouchEvent;
        break;
      case topLevelTypes.topScroll:
        EventConstructor = SyntheticUIEvent;
        break;
      case topLevelTypes.topWheel:
        EventConstructor = SyntheticWheelEvent;
        break;
      case topLevelTypes.topCopy:
      case topLevelTypes.topCut:
      case topLevelTypes.topPaste:
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      EventConstructor,
      'SimpleEventPlugin: Unhandled event type, `%s`.',
      topLevelType
    ) : invariant(EventConstructor));
    var event = EventConstructor.getPooled(
      dispatchConfig,
      topLevelTargetID,
      nativeEvent
    );
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }

};

module.exports = SimpleEventPlugin;

},{"./EventConstants":33,"./EventPropagators":38,"./SyntheticClipboardEvent":92,"./SyntheticEvent":94,"./SyntheticFocusEvent":95,"./SyntheticKeyboardEvent":96,"./SyntheticMouseEvent":97,"./SyntheticTouchEvent":98,"./SyntheticUIEvent":99,"./SyntheticWheelEvent":100,"./invariant":127,"./keyOf":134,"__browserify_process":16}],92:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticClipboardEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

module.exports = SyntheticClipboardEvent;


},{"./SyntheticEvent":94}],93:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticCompositionEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent(
  dispatchConfig,
  dispatchMarker,
  nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(
  SyntheticCompositionEvent,
  CompositionEventInterface
);

module.exports = SyntheticCompositionEvent;


},{"./SyntheticEvent":94}],94:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticEvent
 * @typechecks static-only
 */

"use strict";

var PooledClass = require("./PooledClass");

var emptyFunction = require("./emptyFunction");
var getEventTarget = require("./getEventTarget");
var merge = require("./merge");
var mergeInto = require("./mergeInto");

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: getEventTarget,
  currentTarget: null,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 */
function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  this.dispatchConfig = dispatchConfig;
  this.dispatchMarker = dispatchMarker;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      this[propName] = nativeEvent[propName];
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ?
    nativeEvent.defaultPrevented :
    nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
}

mergeInto(SyntheticEvent.prototype, {

  preventDefault: function() {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function() {
    var event = this.nativeEvent;
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function() {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function() {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      this[propName] = null;
    }
    this.dispatchConfig = null;
    this.dispatchMarker = null;
    this.nativeEvent = null;
  }

});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function(Class, Interface) {
  var Super = this;

  var prototype = Object.create(Super.prototype);
  mergeInto(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = merge(Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

module.exports = SyntheticEvent;

},{"./PooledClass":43,"./emptyFunction":112,"./getEventTarget":120,"./merge":136,"./mergeInto":138}],95:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticFocusEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

module.exports = SyntheticFocusEvent;

},{"./SyntheticUIEvent":99}],96:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticKeyboardEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  'char': null,
  key: null,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  // Legacy Interface
  charCode: null,
  keyCode: null,
  which: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

module.exports = SyntheticKeyboardEvent;

},{"./SyntheticUIEvent":99}],97:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticMouseEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");
var ViewportMetrics = require("./ViewportMetrics");

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  button: function(event) {
    // Webkit, Firefox, IE9+
    // which:  1 2 3
    // button: 0 1 2 (standard)
    var button = event.button;
    if ('which' in event) {
      return button;
    }
    // IE<9
    // which:  undefined
    // button: 0 0 0
    // button: 1 4 2 (onmouseup)
    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function(event) {
    return event.relatedTarget || (
      event.fromElement === event.srcElement ?
        event.toElement :
        event.fromElement
    );
  },
  // "Proprietary" Interface.
  pageX: function(event) {
    return 'pageX' in event ?
      event.pageX :
      event.clientX + ViewportMetrics.currentScrollLeft;
  },
  pageY: function(event) {
    return 'pageY' in event ?
      event.pageY :
      event.clientY + ViewportMetrics.currentScrollTop;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

module.exports = SyntheticMouseEvent;

},{"./SyntheticUIEvent":99,"./ViewportMetrics":102}],98:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticTouchEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticUIEvent = require("./SyntheticUIEvent");

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

module.exports = SyntheticTouchEvent;

},{"./SyntheticUIEvent":99}],99:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: null,
  detail: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

},{"./SyntheticEvent":94}],100:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule SyntheticWheelEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticMouseEvent = require("./SyntheticMouseEvent");

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function(event) {
    // NOTE: IE<9 does not support x-axis delta.
    return (
      'deltaX' in event ? event.deltaX :
      // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
      'wheelDeltaX' in event ? -event.wheelDeltaX : 0
    );
  },
  deltaY: function(event) {
    return (
      // Normalize (up is positive).
      'deltaY' in event ? -event.deltaY :
      // Fallback to `wheelDeltaY` for Webkit.
      'wheelDeltaY' in event ? event.wheelDeltaY :
      // Fallback to `wheelDelta` for IE<9.
      'wheelDelta' in event ? event.wheelDelta : 0
    );
  },
  deltaZ: null,
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

module.exports = SyntheticWheelEvent;

},{"./SyntheticMouseEvent":97}],101:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Transaction
 */

"use strict";

var invariant = require("./invariant");

/**
 * `Transaction` creates a black box that is able to wrap any method such that
 * certain invariants are maintained before and after the method is invoked
 * (Even if an exception is thrown while invoking the wrapped method). Whoever
 * instantiates a transaction can provide enforcers of the invariants at
 * creation time. The `Transaction` class itself will supply one additional
 * automatic invariant for you - the invariant that any transaction instance
 * should not be ran while it is already being ran. You would typically create a
 * single instance of a `Transaction` for reuse multiple times, that potentially
 * is used to wrap several different methods. Wrappers are extremely simple -
 * they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * Bonus:
 * - Reports timing metrics by method name and wrapper index.
 *
 * Use cases:
 * - Preserving the input selection ranges before/after reconciliation.
 *   Restoring selection even in the event of an unexpected error.
 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
 *   while guaranteeing that afterwards, the event system is reactivated.
 * - Flushing a queue of collected DOM mutations to the main UI thread after a
 *   reconciliation takes place in a worker thread.
 * - Invoking any collected `componentDidRender` callbacks after rendering new
 *   content.
 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
 * - (Future use case): Layout calculations before and after DOM upates.
 *
 * Transactional plugin API:
 * - A module that has an `initialize` method that returns any precomputation.
 * - and a `close` method that accepts the precomputation. `close` is invoked
 *   when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */
var Mixin = {
  /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */
  reinitializeTransaction: function() {
    this.transactionWrappers = this.getTransactionWrappers();
    if (!this.wrapperInitData) {
      this.wrapperInitData = [];
    } else {
      this.wrapperInitData.length = 0;
    }
    if (!this.timingMetrics) {
      this.timingMetrics = {};
    }
    this.timingMetrics.methodInvocationTime = 0;
    if (!this.timingMetrics.wrapperInitTimes) {
      this.timingMetrics.wrapperInitTimes = [];
    } else {
      this.timingMetrics.wrapperInitTimes.length = 0;
    }
    if (!this.timingMetrics.wrapperCloseTimes) {
      this.timingMetrics.wrapperCloseTimes = [];
    } else {
      this.timingMetrics.wrapperCloseTimes.length = 0;
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function() {
    return !!this._isInTransaction;
  },

  /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} args... Arguments to pass to the method (optional).
   *                           Helps prevent need to bind in many cases.
   * @return Return value from `method`.
   */
  perform: function(method, scope, a, b, c, d, e, f) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !this.isInTransaction(),
      'Transaction.perform(...): Cannot initialize a transaction when there ' +
      'is already an outstanding transaction.'
    ) : invariant(!this.isInTransaction()));
    var memberStart = Date.now();
    var errorToThrow = null;
    var ret;
    try {
      this.initializeAll();
      ret = method.call(scope, a, b, c, d, e, f);
    } catch (error) {
      // IE8 requires `catch` in order to use `finally`.
      errorToThrow = error;
    } finally {
      var memberEnd = Date.now();
      this.methodInvocationTime += (memberEnd - memberStart);
      try {
        this.closeAll();
      } catch (closeError) {
        // If `method` throws, prefer to show that stack trace over any thrown
        // by invoking `closeAll`.
        errorToThrow = errorToThrow || closeError;
      }
    }
    if (errorToThrow) {
      throw errorToThrow;
    }
    return ret;
  },

  initializeAll: function() {
    this._isInTransaction = true;
    var transactionWrappers = this.transactionWrappers;
    var wrapperInitTimes = this.timingMetrics.wrapperInitTimes;
    var errorToThrow = null;
    for (var i = 0; i < transactionWrappers.length; i++) {
      var initStart = Date.now();
      var wrapper = transactionWrappers[i];
      try {
        this.wrapperInitData[i] = wrapper.initialize ?
          wrapper.initialize.call(this) :
          null;
      } catch (initError) {
        // Prefer to show the stack trace of the first error.
        errorToThrow = errorToThrow || initError;
        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
      } finally {
        var curInitTime = wrapperInitTimes[i];
        var initEnd = Date.now();
        wrapperInitTimes[i] = (curInitTime || 0) + (initEnd - initStart);
      }
    }
    if (errorToThrow) {
      throw errorToThrow;
    }
  },

  /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */
  closeAll: function() {
    ("production" !== process.env.NODE_ENV ? invariant(
      this.isInTransaction(),
      'Transaction.closeAll(): Cannot close transaction when none are open.'
    ) : invariant(this.isInTransaction()));
    var transactionWrappers = this.transactionWrappers;
    var wrapperCloseTimes = this.timingMetrics.wrapperCloseTimes;
    var errorToThrow = null;
    for (var i = 0; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var closeStart = Date.now();
      var initData = this.wrapperInitData[i];
      try {
        if (initData !== Transaction.OBSERVED_ERROR) {
          wrapper.close && wrapper.close.call(this, initData);
        }
      } catch (closeError) {
        // Prefer to show the stack trace of the first error.
        errorToThrow = errorToThrow || closeError;
      } finally {
        var closeEnd = Date.now();
        var curCloseTime = wrapperCloseTimes[i];
        wrapperCloseTimes[i] = (curCloseTime || 0) + (closeEnd - closeStart);
      }
    }
    this.wrapperInitData.length = 0;
    this._isInTransaction = false;
    if (errorToThrow) {
      throw errorToThrow;
    }
  }
};

var Transaction = {

  Mixin: Mixin,

  /**
   * Token to look for to determine if an error occured.
   */
  OBSERVED_ERROR: {}

};

module.exports = Transaction;

},{"./invariant":127,"__browserify_process":16}],102:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ViewportMetrics
 */

"use strict";

var getUnboundedScrollPosition = require("./getUnboundedScrollPosition");

var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function() {
    var scrollPosition = getUnboundedScrollPosition(window);
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

},{"./getUnboundedScrollPosition":125}],103:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule accumulate
 */

"use strict";

var invariant = require("./invariant");

/**
 * Accumulates items that must not be null or undefined.
 *
 * This is used to conserve memory by avoiding array allocations.
 *
 * @return {*|array<*>} An accumulation of items.
 */
function accumulate(current, next) {
  ("production" !== process.env.NODE_ENV ? invariant(
    next != null,
    'accumulate(...): Accumulated items must be not be null or undefined.'
  ) : invariant(next != null));
  if (current == null) {
    return next;
  } else {
    // Both are not empty. Warning: Never call x.concat(y) when you are not
    // certain that x is an Array (x could be a string with concat method).
    var currentIsArray = Array.isArray(current);
    var nextIsArray = Array.isArray(next);
    if (currentIsArray) {
      return current.concat(next);
    } else {
      if (nextIsArray) {
        return [current].concat(next);
      } else {
        return [current, next];
      }
    }
  }
}

module.exports = accumulate;

},{"./invariant":127,"__browserify_process":16}],104:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule adler32
 */

/* jslint bitwise:true */

"use strict";

var MOD = 65521;

// This is a clean-room implementation of adler32 designed for detecting
// if markup is not what we expect it to be. It does not need to be
// cryptographically strong, only reasonable good at detecting if markup
// generated on the server is different than that on the client.
function adler32(data) {
  var a = 1;
  var b = 0;
  for (var i = 0; i < data.length; i++) {
    a = (a + data.charCodeAt(i)) % MOD;
    b = (b + a) % MOD;
  }
  return a | (b << 16);
}

module.exports = adler32;

},{}],105:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule containsNode
 * @typechecks
 */

var isTextNode = require("./isTextNode");

/*jslint bitwise:true */

/**
 * Checks if a given DOM node contains or is another DOM node.
 *
 * @param {?DOMNode} outerNode Outer DOM node.
 * @param {?DOMNode} innerNode Inner DOM node.
 * @return {boolean} True if `outerNode` contains or is `innerNode`.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if (outerNode.contains) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

},{"./isTextNode":131}],106:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule copyProperties
 */

/**
 * Copy properties from one or more objects (up to 5) into the first object.
 * This is a shallow copy. It mutates the first object and also returns it.
 *
 * NOTE: `arguments` has a very significant performance penalty, which is why
 * we don't support unlimited arguments.
 */
function copyProperties(obj, a, b, c, d, e, f) {
  obj = obj || {};

  if ("production" !== process.env.NODE_ENV) {
    if (f) {
      throw new Error('Too many arguments passed to copyProperties');
    }
  }

  var args = [a, b, c, d, e];
  var ii = 0, v;
  while (args[ii]) {
    v = args[ii++];
    for (var k in v) {
      obj[k] = v[k];
    }

    // IE ignores toString in object iteration.. See:
    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
      obj.toString = v.toString;
    }
  }

  return obj;
}

module.exports = copyProperties;

},{"__browserify_process":16}],107:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createArrayFrom
 * @typechecks
 */

/**
 * NOTE: if you are a previous user of this function, it has been considered
 * unsafe because it's inconsistent across browsers for some inputs.
 * Instead use `Array.isArray()`.
 *
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj &&
    // arrays are objects, NodeLists are functions in Safari
    (typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    ('length' in obj) &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    (typeof obj.nodeType != 'number') &&
    (
      // a real array
      (// HTMLCollection/NodeList
      (Array.isArray(obj) ||
      // arguments
      ('callee' in obj) || 'item' in obj))
    )
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFrom = require('createArrayFrom');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFrom(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * This is also good for converting certain pseudo-arrays, like `arguments` or
 * HTMLCollections, into arrays.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFrom(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  }
  if (obj.item) {
    // IE does not support Array#slice on HTMLCollections
    var l = obj.length, ret = new Array(l);
    while (l--) { ret[l] = obj[l]; }
    return ret;
  }
  return Array.prototype.slice.call(obj);
}

module.exports = createArrayFrom;

},{}],108:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createNodesFromMarkup
 * @typechecks
 */

/*jslint evil: true, sub: true */

var ExecutionEnvironment = require("./ExecutionEnvironment");

var createArrayFrom = require("./createArrayFrom");
var getMarkupWrap = require("./getMarkupWrap");
var invariant = require("./invariant");

/**
 * Dummy container used to render all markup.
 */
var dummyNode =
  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

/**
 * Pattern used by `getNodeName`.
 */
var nodeNamePattern = /^\s*<(\w+)/;

/**
 * Extracts the `nodeName` of the first element in a string of markup.
 *
 * @param {string} markup String of markup.
 * @return {?string} Node name of the supplied markup.
 */
function getNodeName(markup) {
  var nodeNameMatch = markup.match(nodeNamePattern);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

/**
 * Creates an array containing the nodes rendered from the supplied markup. The
 * optionally supplied `handleScript` function will be invoked once for each
 * <script> element that is rendered. If no `handleScript` function is supplied,
 * an exception is thrown if any <script> elements are rendered.
 *
 * @param {string} markup A string of valid HTML markup.
 * @param {?function} handleScript Invoked once for each rendered <script>.
 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
 */
function createNodesFromMarkup(markup, handleScript) {
  var node = dummyNode;
  ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
  var nodeName = getNodeName(markup);

  var wrap = nodeName && getMarkupWrap(nodeName);
  if (wrap) {
    node.innerHTML = wrap[1] + markup + wrap[2];

    var wrapDepth = wrap[0];
    while (wrapDepth--) {
      node = node.lastChild;
    }
  } else {
    node.innerHTML = markup;
  }

  var scripts = node.getElementsByTagName('script');
  if (scripts.length) {
    ("production" !== process.env.NODE_ENV ? invariant(
      handleScript,
      'createNodesFromMarkup(...): Unexpected <script> element rendered.'
    ) : invariant(handleScript));
    createArrayFrom(scripts).forEach(handleScript);
  }

  var nodes = createArrayFrom(node.childNodes);
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return nodes;
}

module.exports = createNodesFromMarkup;

},{"./ExecutionEnvironment":39,"./createArrayFrom":107,"./getMarkupWrap":121,"./invariant":127,"__browserify_process":16}],109:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule createObjectFrom
 */

/**
 * Construct an object from an array of keys
 * and optionally specified value or list of values.
 *
 *  >>> createObjectFrom(['a','b','c']);
 *  {a: true, b: true, c: true}
 *
 *  >>> createObjectFrom(['a','b','c'], false);
 *  {a: false, b: false, c: false}
 *
 *  >>> createObjectFrom(['a','b','c'], 'monkey');
 *  {c:'monkey', b:'monkey' c:'monkey'}
 *
 *  >>> createObjectFrom(['a','b','c'], [1,2,3]);
 *  {a: 1, b: 2, c: 3}
 *
 *  >>> createObjectFrom(['women', 'men'], [true, false]);
 *  {women: true, men: false}
 *
 * @param   Array   list of keys
 * @param   mixed   optional value or value array.  defaults true.
 * @returns object
 */
function createObjectFrom(keys, values /* = true */) {
  if ("production" !== process.env.NODE_ENV) {
    if (!Array.isArray(keys)) {
      throw new TypeError('Must pass an array of keys.');
    }
  }

  var object = {};
  var isArray = Array.isArray(values);
  if (typeof values == 'undefined') {
    values = true;
  }

  for (var ii = keys.length; ii--;) {
    object[keys[ii]] = isArray ? values[ii] : values;
  }
  return object;
}

module.exports = createObjectFrom;

},{"__browserify_process":16}],110:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule cx
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).map(function(className) {
      return classNames[className] ? className : '';
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

module.exports = cx;

},{}],111:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule dangerousStyleValue
 * @typechecks static-only
 */

"use strict";

var CSSProperty = require("./CSSProperty");

/**
 * Convert a value into the proper css writable value. The `styleName` name
 * name should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} styleName CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(styleName, value) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || CSSProperty.isUnitlessNumber[styleName]) {
    return '' + value; // cast to string
  }

  return value + 'px';
}

module.exports = dangerousStyleValue;

},{"./CSSProperty":21}],112:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule emptyFunction
 */

var copyProperties = require("./copyProperties");

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

copyProperties(emptyFunction, {
  thatReturns: makeEmptyFunction,
  thatReturnsFalse: makeEmptyFunction(false),
  thatReturnsTrue: makeEmptyFunction(true),
  thatReturnsNull: makeEmptyFunction(null),
  thatReturnsThis: function() { return this; },
  thatReturnsArgument: function(arg) { return arg; }
});

module.exports = emptyFunction;

},{"./copyProperties":106}],113:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule escapeTextForBrowser
 * @typechecks static-only
 */

"use strict";

var ESCAPE_LOOKUP = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  "\"": "&quot;",
  "'": "&#x27;",
  "/": "&#x2f;"
};

var ESCAPE_REGEX = /[&><"'\/]/g;

function escaper(match) {
  return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextForBrowser(text) {
  return ('' + text).replace(ESCAPE_REGEX, escaper);
}

module.exports = escapeTextForBrowser;

},{}],114:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ex
 * @typechecks
 * @nostacktrace
 */

/**
 * This function transforms error message with arguments into plain text error
 * message, so that it can be passed to window.onerror without losing anything.
 * It can then be transformed back by `erx()` function.
 *
 * Usage:
 *   throw new Error(ex('Error %s from %s', errorCode, userID));
 *
 * @param {string} errorMessage
 */

var ex = function(errorMessage/*, arg1, arg2, ...*/) {
  var args = Array.prototype.slice.call(arguments).map(function(arg) {
    return String(arg);
  });
  var expectedLength = errorMessage.split('%s').length - 1;

  if (expectedLength !== args.length - 1) {
    // something wrong with the formatting string
    return ex('ex args number mismatch: %s', JSON.stringify(args));
  }

  return ex._prefix + JSON.stringify(args) + ex._suffix;
};

ex._prefix = '<![EX[';
ex._suffix = ']]>';

module.exports = ex;

},{}],115:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule filterAttributes
 * @typechecks static-only
 */

/*jslint evil: true */

'use strict';

/**
 * Like filter(), but for a DOM nodes attributes. Returns an array of
 * the filter DOMAttribute objects. Does some perf related this like
 * caching attributes.length.
 *
 * @param {DOMElement} node Node whose attributes you want to filter
 * @return {array} array of DOM attribute objects.
 */
function filterAttributes(node, func, context) {
  var attributes = node.attributes;
  var numAttributes = attributes.length;
  var accumulator = [];
  for (var i = 0; i < numAttributes; i++) {
    var attr = attributes.item(i);
    if (func.call(context, attr)) {
      accumulator.push(attr);
    }
  }
  return accumulator;
}

module.exports = filterAttributes;

},{}],116:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule flattenChildren
 */

"use strict";

var invariant = require("./invariant");
var traverseAllChildren = require("./traverseAllChildren");

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 */
function flattenSingleChildIntoContext(traverseContext, child, name) {
  // We found a component instance.
  var result = traverseContext;
  ("production" !== process.env.NODE_ENV ? invariant(
    !result.hasOwnProperty(name),
    'flattenChildren(...): Encountered two children with the same key, `%s`. ' +
    'Children keys must be unique.',
    name
  ) : invariant(!result.hasOwnProperty(name)));
  result[name] = child;
}

/**
 * Flattens children that are typically specified as `props.children`.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children) {
  if (children == null) {
    return children;
  }
  var result = {};
  traverseAllChildren(children, flattenSingleChildIntoContext, result);
  return result;
}

module.exports = flattenChildren;

},{"./invariant":127,"./traverseAllChildren":145,"__browserify_process":16}],117:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule forEachAccumulated
 */

"use strict";

/**
 * @param {array} an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */
var forEachAccumulated = function(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};

module.exports = forEachAccumulated;

},{}],118:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ge
 */

/**
 * Find a node by ID.  Optionally search a sub-tree outside of the document
 *
 * Use ge if you're not sure whether or not the element exists. You can test
 * for existence yourself in your application code.
 *
 * If your application code depends on the existence of the element, use $
 * instead, which will throw in DEV if the element doesn't exist.
 */
function ge(arg, root, tag) {
  return typeof arg != 'string' ? arg :
    !root ? document.getElementById(arg) :
    _geFromSubtree(arg, root, tag);
}

function _geFromSubtree(id, root, tag) {
  var elem, children, ii;

  if (_getNodeID(root) == id) {
    return root;
  } else if (root.getElementsByTagName) {
    // All Elements implement this, which does an iterative DFS, which is
    // faster than recursion and doesn't run into stack depth issues.
    children = root.getElementsByTagName(tag || '*');
    for (ii = 0; ii < children.length; ii++) {
      if (_getNodeID(children[ii]) == id) {
        return children[ii];
      }
    }
  } else {
    // DocumentFragment does not implement getElementsByTagName, so
    // recurse over its children. Its children must be Elements, so
    // each child will use the getElementsByTagName case instead.
    children = root.childNodes;
    for (ii = 0; ii < children.length; ii++) {
      elem = _geFromSubtree(id, children[ii]);
      if (elem) {
        return elem;
      }
    }
  }

  return null;
}

/**
 * Return the ID value for a given node. This allows us to avoid issues
 * with forms that contain inputs with name="id".
 *
 * @return string (null if attribute not set)
 */
function _getNodeID(node) {
  // #document and #document-fragment do not have getAttributeNode.
  var id = node.getAttributeNode && node.getAttributeNode('id');
  return id ? id.value : null;
}

module.exports = ge;

},{}],119:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getActiveElement
 * @typechecks
 */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 */
function getActiveElement() /*?DOMElement*/ {
  try {
    return document.activeElement;
  } catch (e) {
    return null;
  }
}

module.exports = getActiveElement;


},{}],120:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getEventTarget
 * @typechecks static-only
 */

"use strict";

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;
  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

},{}],121:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getMarkupWrap
 */

var ExecutionEnvironment = require("./ExecutionEnvironment");

var invariant = require("./invariant");

/**
 * Dummy container used to detect which wraps are necessary.
 */
var dummyNode =
  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

/**
 * Some browsers cannot use `innerHTML` to render certain elements standalone,
 * so we wrap them, render the wrapped nodes, then extract the desired node.
 *
 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
 */
var shouldWrap = {
  // Force wrapping for SVG elements because if they get created inside a <div>,
  // they will be initialized in the wrong namespace (and will not display).
  'circle': true,
  'g': true,
  'line': true,
  'path': true,
  'polyline': true,
  'rect': true,
  'text': true
};

var selectWrap = [1, '<select multiple="true">', '</select>'];
var tableWrap = [1, '<table>', '</table>'];
var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var svgWrap = [1, '<svg>', '</svg>'];

var markupWrap = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': selectWrap,
  'option': selectWrap,

  'caption': tableWrap,
  'colgroup': tableWrap,
  'tbody': tableWrap,
  'tfoot': tableWrap,
  'thead': tableWrap,

  'td': trWrap,
  'th': trWrap,

  'circle': svgWrap,
  'g': svgWrap,
  'line': svgWrap,
  'path': svgWrap,
  'polyline': svgWrap,
  'rect': svgWrap,
  'text': svgWrap
};

/**
 * Gets the markup wrap configuration for the supplied `nodeName`.
 *
 * NOTE: This lazily detects which wraps are necessary for the current browser.
 *
 * @param {string} nodeName Lowercase `nodeName`.
 * @return {?array} Markup wrap configuration, if applicable.
 */
function getMarkupWrap(nodeName) {
  ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
  if (!markupWrap.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!shouldWrap.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      dummyNode.innerHTML = '<link />';
    } else {
      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    shouldWrap[nodeName] = !dummyNode.firstChild;
  }
  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
}


module.exports = getMarkupWrap;

},{"./ExecutionEnvironment":39,"./invariant":127,"__browserify_process":16}],122:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getNodeForCharacterOffset
 */

"use strict";

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */
function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType == 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

module.exports = getNodeForCharacterOffset;

},{}],123:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getReactRootElementInContainer
 */

"use strict";

var DOC_NODE_TYPE = 9;

/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 *                                           a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

module.exports = getReactRootElementInContainer;

},{}],124:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getTextContentAccessor
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    contentKey = 'innerText' in document.createElement('div') ?
      'innerText' :
      'textContent';
  }
  return contentKey;
}

module.exports = getTextContentAccessor;

},{"./ExecutionEnvironment":39}],125:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule getUnboundedScrollPosition
 * @typechecks
 */

"use strict";

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */
function getUnboundedScrollPosition(scrollable) {
  if (scrollable === window) {
    return {
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop  || document.body.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

module.exports = getUnboundedScrollPosition;

},{}],126:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule hyphenate
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

},{}],127:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule invariant
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf style format and arguments to provide information about
 * what broke and what you were expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

function invariant(condition) {
  if (!condition) {
    throw new Error('Invariant Violation');
  }
}

module.exports = invariant;

if ("production" !== process.env.NODE_ENV) {
  var invariantDev = function(condition, format, a, b, c, d, e, f) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }

    if (!condition) {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      throw new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }
  };

  module.exports = invariantDev;
}

},{"__browserify_process":16}],128:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isEventSupported
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

var testNode, useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  testNode = document.createElement('div');
  useHasFeature =
    document.implementation &&
    document.implementation.hasFeature &&
    // `hasFeature` always returns true in Firefox 19+.
    document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!testNode || (capture && !testNode.addEventListener)) {
    return false;
  }
  var element = document.createElement('div');

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in element;

  if (!isSupported) {
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
    if (typeof element[eventName] !== 'undefined') {
      element[eventName] = undefined;
    }
    element.removeAttribute(eventName);
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  element = null;
  return isSupported;
}

module.exports = isEventSupported;

},{"./ExecutionEnvironment":39}],129:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isNode
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  return !!(object && (
    typeof Node !== 'undefined' ? object instanceof Node :
      typeof object === 'object' &&
      typeof object.nodeType === 'number' &&
      typeof object.nodeName === 'string'
  ));
}

module.exports = isNode;

},{}],130:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isTextInputElement
 */

"use strict";

/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */
var supportedInputTypes = {
  'color': true,
  'date': true,
  'datetime': true,
  'datetime-local': true,
  'email': true,
  'month': true,
  'number': true,
  'password': true,
  'range': true,
  'search': true,
  'tel': true,
  'text': true,
  'time': true,
  'url': true,
  'week': true
};

function isTextInputElement(elem) {
  return elem && (
    (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type]) ||
    elem.nodeName === 'TEXTAREA'
  );
}

module.exports = isTextInputElement;

},{}],131:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule isTextNode
 * @typechecks
 */

var isNode = require("./isNode");

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

},{"./isNode":129}],132:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule joinClasses
 * @typechecks static-only
 */

"use strict";

/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} classes
 * @return {string}
 */
function joinClasses(className/*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      nextClass && (className += ' ' + nextClass);
    }
  }
  return className;
}

module.exports = joinClasses;

},{}],133:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

},{"./invariant":127,"__browserify_process":16}],134:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without loosing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};


module.exports = keyOf;

},{}],135:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule memoizeStringOnly
 * @typechecks static-only
 */

"use strict";

/**
 * Memoizes the return value of a function that accepts one string argument.
 *
 * @param {function} callback
 * @return {function}
 */
function memoizeStringOnly(callback) {
  var cache = {};
  return function(string) {
    if (cache.hasOwnProperty(string)) {
      return cache[string];
    } else {
      return cache[string] = callback.call(this, string);
    }
  };
}

module.exports = memoizeStringOnly;

},{}],136:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule merge
 */

"use strict";

var mergeInto = require("./mergeInto");

/**
 * Shallow merges two structures into a return value, without mutating either.
 *
 * @param {?object} one Optional object with properties to merge from.
 * @param {?object} two Optional object with properties to merge from.
 * @return {object} The shallow extension of one by two.
 */
var merge = function(one, two) {
  var result = {};
  mergeInto(result, one);
  mergeInto(result, two);
  return result;
};

module.exports = merge;

},{"./mergeInto":138}],137:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeHelpers
 *
 * requiresPolyfills: Array.isArray
 */

"use strict";

var invariant = require("./invariant");
var keyMirror = require("./keyMirror");

/**
 * Maximum number of levels to traverse. Will catch circular structures.
 * @const
 */
var MAX_MERGE_DEPTH = 36;

/**
 * We won't worry about edge cases like new String('x') or new Boolean(true).
 * Functions are considered terminals, and arrays are not.
 * @param {*} o The item/object/value to test.
 * @return {boolean} true iff the argument is a terminal.
 */
var isTerminal = function(o) {
  return typeof o !== 'object' || o === null;
};

var mergeHelpers = {

  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

  isTerminal: isTerminal,

  /**
   * Converts null/undefined values into empty object.
   *
   * @param {?Object=} arg Argument to be normalized (nullable optional)
   * @return {!Object}
   */
  normalizeMergeArg: function(arg) {
    return arg === undefined || arg === null ? {} : arg;
  },

  /**
   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
   * likely the caller's fault. If this function is ever called with anything
   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
   *
   * @param {*} one Array to merge into.
   * @param {*} two Array to merge from.
   */
  checkMergeArrayArgs: function(one, two) {
    ("production" !== process.env.NODE_ENV ? invariant(
      Array.isArray(one) && Array.isArray(two),
      'Critical assumptions about the merge functions have been violated. ' +
      'This is the fault of the merge functions themselves, not necessarily ' +
      'the callers.'
    ) : invariant(Array.isArray(one) && Array.isArray(two)));
  },

  /**
   * @param {*} one Object to merge into.
   * @param {*} two Object to merge from.
   */
  checkMergeObjectArgs: function(one, two) {
    mergeHelpers.checkMergeObjectArg(one);
    mergeHelpers.checkMergeObjectArg(two);
  },

  /**
   * @param {*} arg
   */
  checkMergeObjectArg: function(arg) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !isTerminal(arg) && !Array.isArray(arg),
      'Critical assumptions about the merge functions have been violated. ' +
      'This is the fault of the merge functions themselves, not necessarily ' +
      'the callers.'
    ) : invariant(!isTerminal(arg) && !Array.isArray(arg)));
  },

  /**
   * Checks that a merge was not given a circular object or an object that had
   * too great of depth.
   *
   * @param {number} Level of recursion to validate against maximum.
   */
  checkMergeLevel: function(level) {
    ("production" !== process.env.NODE_ENV ? invariant(
      level < MAX_MERGE_DEPTH,
      'Maximum deep merge depth exceeded. You may be attempting to merge ' +
      'circular structures in an unsupported way.'
    ) : invariant(level < MAX_MERGE_DEPTH));
  },

  /**
   * Checks that the supplied merge strategy is valid.
   *
   * @param {string} Array merge strategy.
   */
  checkArrayStrategy: function(strategy) {
    ("production" !== process.env.NODE_ENV ? invariant(
      strategy === undefined || strategy in mergeHelpers.ArrayStrategies,
      'You must provide an array strategy to deep merge functions to ' +
      'instruct the deep merge how to resolve merging two arrays.'
    ) : invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies));
  },

  /**
   * Set of possible behaviors of merge algorithms when encountering two Arrays
   * that must be merged together.
   * - `clobber`: The left `Array` is ignored.
   * - `indexByIndex`: The result is achieved by recursively deep merging at
   *   each index. (not yet supported.)
   */
  ArrayStrategies: keyMirror({
    Clobber: true,
    IndexByIndex: true
  })

};

module.exports = mergeHelpers;

},{"./invariant":127,"./keyMirror":133,"__browserify_process":16}],138:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mergeInto
 * @typechecks static-only
 */

"use strict";

var mergeHelpers = require("./mergeHelpers");

var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;

/**
 * Shallow merges two structures by mutating the first parameter.
 *
 * @param {object} one Object to be merged into.
 * @param {?object} two Optional object with properties to merge from.
 */
function mergeInto(one, two) {
  checkMergeObjectArg(one);
  if (two != null) {
    checkMergeObjectArg(two);
    for (var key in two) {
      if (!two.hasOwnProperty(key)) {
        continue;
      }
      one[key] = two[key];
    }
  }
}

module.exports = mergeInto;

},{"./mergeHelpers":137}],139:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mixInto
 */

"use strict";

/**
 * Simply copies properties to the prototype.
 */
var mixInto = function(constructor, methodBag) {
  var methodName;
  for (methodName in methodBag) {
    if (!methodBag.hasOwnProperty(methodName)) {
      continue;
    }
    constructor.prototype[methodName] = methodBag[methodName];
  }
};

module.exports = mixInto;

},{}],140:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule mutateHTMLNodeWithMarkup
 * @typechecks static-only
 */

/*jslint evil: true */

'use strict';

var createNodesFromMarkup = require("./createNodesFromMarkup");
var filterAttributes = require("./filterAttributes");
var invariant = require("./invariant");

/**
 * You can't set the innerHTML of a document. Unless you have
 * this function.
 *
 * @param {DOMElement} node with tagName == 'html'
 * @param {string} markup markup string including <html>.
 */
function mutateHTMLNodeWithMarkup(node, markup) {
  ("production" !== process.env.NODE_ENV ? invariant(
    node.tagName.toLowerCase() === 'html',
    'mutateHTMLNodeWithMarkup(): node must have tagName of "html", got %s',
    node.tagName
  ) : invariant(node.tagName.toLowerCase() === 'html'));

  markup = markup.trim();
  ("production" !== process.env.NODE_ENV ? invariant(
    markup.toLowerCase().indexOf('<html') === 0,
    'mutateHTMLNodeWithMarkup(): markup must start with <html'
  ) : invariant(markup.toLowerCase().indexOf('<html') === 0));

  // First let's extract the various pieces of markup.
  var htmlOpenTagEnd = markup.indexOf('>') + 1;
  var htmlCloseTagStart = markup.lastIndexOf('<');
  var htmlOpenTag = markup.substring(0, htmlOpenTagEnd);
  var innerHTML = markup.substring(htmlOpenTagEnd, htmlCloseTagStart);

  // Now for the fun stuff. Pass through both sets of attributes and
  // bring them up-to-date. We get the new set by creating a markup
  // fragment.
  var shouldExtractAttributes = htmlOpenTag.indexOf(' ') > -1;
  var attributeHolder = null;

  if (shouldExtractAttributes) {
    // We extract the attributes by creating a <span> and evaluating
    // the node.
    attributeHolder = createNodesFromMarkup(
      htmlOpenTag.replace('html ', 'span ') + '</span>'
    )[0];

    // Add all attributes present in attributeHolder
    var attributesToSet = filterAttributes(
      attributeHolder,
      function(attr) {
        return node.getAttributeNS(attr.namespaceURI, attr.name) !== attr.value;
      }
    );
    attributesToSet.forEach(function(attr) {
      node.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
    });
  }

  // Remove all attributes not present in attributeHolder
  var attributesToRemove = filterAttributes(
    node,
    function(attr) {
      // Remove all attributes if attributeHolder is null or if it does not have
      // the desired attribute.
      return !(
        attributeHolder &&
          attributeHolder.hasAttributeNS(attr.namespaceURI, attr.name)
      );
    }
  );
  attributesToRemove.forEach(function(attr) {
    node.removeAttributeNS(attr.namespaceURI, attr.name);
  });

  // Finally, set the inner HTML. No tricks needed. Do this last to
  // minimize likelihood of triggering reflows.
  node.innerHTML = innerHTML;
}

module.exports = mutateHTMLNodeWithMarkup;

},{"./createNodesFromMarkup":108,"./filterAttributes":115,"./invariant":127,"__browserify_process":16}],141:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule objMap
 */

"use strict";

/**
 * For each key/value pair, invokes callback func and constructs a resulting
 * object which contains, for every key in obj, values that are the result of
 * of invoking the function:
 *
 *   func(value, key, iteration)
 *
 * @param {?object} obj Object to map keys over
 * @param {function} func Invoked for each key/val pair.
 * @param {?*} context
 * @return {?object} Result of mapping or null if obj is falsey
 */
function objMap(obj, func, context) {
  if (!obj) {
    return null;
  }
  var i = 0;
  var ret = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = func.call(context, obj[key], key, i++);
    }
  }
  return ret;
}

module.exports = objMap;

},{}],142:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule objMapKeyVal
 */

"use strict";

/**
 * Behaves the same as `objMap` but invokes func with the key first, and value
 * second. Use `objMap` unless you need this special case.
 * Invokes func as:
 *
 *   func(key, value, iteration)
 *
 * @param {?object} obj Object to map keys over
 * @param {!function} func Invoked for each key/val pair.
 * @param {?*} context
 * @return {?object} Result of mapping or null if obj is falsey
 */
function objMapKeyVal(obj, func, context) {
  if (!obj) {
    return null;
  }
  var i = 0;
  var ret = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = func.call(context, key, obj[key], i++);
    }
  }
  return ret;
}

module.exports = objMapKeyVal;

},{}],143:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule performanceNow
 * @typechecks static-only
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

/**
 * Detect if we can use window.performance.now() and gracefully
 * fallback to Date.now() if it doesn't exist.
 * We need to support Firefox < 15 for now due to Facebook's webdriver
 * infrastructure.
 */
var performance = null;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.webkitPerformance;
}

if (!performance || !performance.now) {
  performance = Date;
}

var performanceNow = performance.now.bind(performance);

module.exports = performanceNow;

},{"./ExecutionEnvironment":39}],144:[function(require,module,exports){
/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule shallowEqual
 */

"use strict";

/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) &&
        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B'a keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

module.exports = shallowEqual;

},{}],145:[function(require,module,exports){
var process=require("__browserify_process");/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule traverseAllChildren
 */

"use strict";

var ReactComponent = require("./ReactComponent");
var ReactTextComponent = require("./ReactTextComponent");

var invariant = require("./invariant");

/**
 * TODO: Test that:
 * 1. `mapChildren` transforms strings and numbers into `ReactTextComponent`.
 * 2. it('should fail when supplied duplicate key', function() {
 * 3. That a single child and an array with one item have the same key pattern.
 * });
 */

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!number} indexSoFar Number of children encountered until this point.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
var traverseAllChildrenImpl =
  function(children, nameSoFar, indexSoFar, callback, traverseContext) {
    var subtreeCount = 0;  // Count of children found in the current subtree.
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var nextName = nameSoFar + ReactComponent.getKey(child, i);
        var nextIndex = indexSoFar + subtreeCount;
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          nextIndex,
          callback,
          traverseContext
        );
      }
    } else {
      var type = typeof children;
      var isOnlyChild = nameSoFar === '';
      // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows
      var storageName = isOnlyChild ?
        ReactComponent.getKey(children, 0):
        nameSoFar;
      if (children === null || children === undefined || type === 'boolean') {
        // All of the above are perceived as null.
        callback(traverseContext, null, storageName, indexSoFar);
        subtreeCount = 1;
      } else if (children.mountComponentIntoNode) {
        callback(traverseContext, children, storageName, indexSoFar);
        subtreeCount = 1;
      } else {
        if (type === 'object') {
          ("production" !== process.env.NODE_ENV ? invariant(
            !children || children.nodeType !== 1,
            'traverseAllChildren(...): Encountered an invalid child; DOM ' +
            'elements are not valid children of React components.'
          ) : invariant(!children || children.nodeType !== 1));
          for (var key in children) {
            if (children.hasOwnProperty(key)) {
              subtreeCount += traverseAllChildrenImpl(
                children[key],
                nameSoFar + '{' + key + '}',
                indexSoFar + subtreeCount,
                callback,
                traverseContext
              );
            }
          }
        } else if (type === 'string') {
          var normalizedText = new ReactTextComponent(children);
          callback(traverseContext, normalizedText, storageName, indexSoFar);
          subtreeCount += 1;
        } else if (type === 'number') {
          var normalizedNumber = new ReactTextComponent('' + children);
          callback(traverseContext, normalizedNumber, storageName, indexSoFar);
          subtreeCount += 1;
        }
      }
    }
    return subtreeCount;
  };

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children !== null && children !== undefined) {
    traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
  }
}

module.exports = traverseAllChildren;

},{"./ReactComponent":46,"./ReactTextComponent":83,"./invariant":127,"__browserify_process":16}]},{},[6,7,8,9,10,11,12])