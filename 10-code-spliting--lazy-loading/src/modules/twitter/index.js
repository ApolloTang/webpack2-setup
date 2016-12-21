console.log('log from twitter/index.js');
var elem = document.createElement("img");
var style = require('./index.css');
// console.log('style in modules/twitter: ', style);
elem.className = style['module-style'];
elem.src = require('images/img_01.png');
module.exports = elem;

