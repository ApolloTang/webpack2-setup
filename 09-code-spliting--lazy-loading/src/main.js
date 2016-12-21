console.log('log from main');

var style_main = require('./main.css');
console.log('style_main: ', style_main);


var helper = require('util/helper');
console.log('helper: ', helper )

// The following are loaded from bundle.vendor.js
// both lodash and myVender variable are added to global
//
// Note that you have no control of
// the order of script tag inject to index.html by HtmlWebpackPlugin.
// In this case bundle.vendor.js is inject after bundle.main.js

try {
    console.log('_.VERSION: ', _.VERSION);
} catch (e) {
    console.warn('[!] lodash not loaded');
}

try {
    console.log('my-vender: ', myVender.name);
} catch (e) {
    console.warn('[!] myVender not loaded');
}

setTimeout(function(){
    console.log('myVender.name: ', myVender.name);
    console.log('_.VERSION: ', _.VERSION);
}, 1000);

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


