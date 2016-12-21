console.log('log from main');

var style_main = require('./main.css');
// console.log('style_main: ', style_main);

var elem_twitterImg = require('./modules/twitter');
document.getElementById("app-container").appendChild(elem_twitterImg);

var helper = require('util/helper');
console.log('helper: ', helper )

// // The following are loaded from bundle.vendor.js
// // both lodash and myVender variable are added to global
// //
// // Note that you have no control of
// // the order of script tag inject to index.html by HtmlWebpackPlugin.
// // In this case bundle.vendor.js is inject after bundle.main.js
//
// try {
//     console.log('_.VERSION: ', _.VERSION);
// } catch (e) {
//     console.warn('[!] lodash not loaded');
// }
//
// try {
//     console.log('my-vender: ', myVender.name);
// } catch (e) {
//     console.warn('[!] myVender not loaded');
// }
//
// setTimeout(function(){
//     console.log('myVender.name: ', myVender.name);
//     console.log('_.VERSION: ', _.VERSION);
// }, 1000);

var _ = require('lodash');
console.log('_.VERSION: ', _.VERSION);

var myVendor = require('./vendor/my-vendor.js');
console.log('myVendor.name: ', myVendor.name);
