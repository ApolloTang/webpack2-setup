console.log('log from main');


// var elem = document.createElement("img");
// elem.src = require('./images/img_01.png');
// document.getElementById("app-container").appendChild(elem);

var elem_twitterImg = require('./modules/twitter');
document.getElementById("app-container").appendChild(elem_twitterImg);

var _ = require('lodash');

console.log('lodash: ', _);

