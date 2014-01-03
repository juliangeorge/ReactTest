var Workshop = require('../compiled/Workshop');
var Missing = require('../compiled/Missing');
var Router = require('../src/router');
 
// Home & Missing are React Components
 
Router.set404(Missing)
 
Router.start(document.body, {
  '': Workshop,
  'workshop': Workshop
})