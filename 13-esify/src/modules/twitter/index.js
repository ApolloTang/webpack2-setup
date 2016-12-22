console.log('log from twitter/index.js');
const elem = document.createElement("img");
const style = require('./index.css');
// console.log('style in modules/twitter: ', style);
elem.className = style['module-style'];
elem.src = require('images/img_01.png');
export default elem;

