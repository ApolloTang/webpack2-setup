console.log('log from main');


// var elem = document.createElement("img");
// elem.src = require('./images/img_01.png');
// document.getElementById("app-container").appendChild(elem);

var style_main = require('./main.css');
console.log('style_main: ', style_main);

var elem_twitterImg = require('./modules/twitter');
document.getElementById("app-container").appendChild(elem_twitterImg);



