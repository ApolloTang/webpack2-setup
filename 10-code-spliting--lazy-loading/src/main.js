console.log('log from main');

var style_main = require('./main.css');
// console.log('style_main: ', style_main);

var helper = require('util/helper');
console.log('helper: ', helper )


var _ = require('lodash');
console.log('_.VERSION: ', _.VERSION);

var myVendor = require('./vendor/my-vendor.js');
console.log('myVendor.name: ', myVendor.name);


// =========================================================
// 09 code spliting, lazy load with System.import()


// var elem_twitterImg = require('./modules/twitter');
// document.getElementById("app-container").appendChild(elem_twitterImg);

const appContainer = document.getElementById("app-container");
var btn = document.createElement("button");
btn.innerHTML = 'click to lazy load';
appContainer.appendChild(btn);
btn.addEventListener('click', function(){
    console.log('click');
    System.import('./modules/twitter').then( (elem_twitterImg) => {
        console.log('elem_twitterImg: ', elem_twitterImg);
        document.getElementById("app-container").appendChild(elem_twitterImg);
    });
});
