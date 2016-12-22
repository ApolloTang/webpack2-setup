console.log('log from main');

var style_main = require('./main.css');


import _ from 'lodash';
console.log('_.VERSION: ', _.VERSION);

import myVendor from  './vendor/my-vendor.js';
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
    System.import('./modules/twitter').then(
        ({ default: elem_twitterImg }) => {
            console.log('elem_twitterImg: ', elem_twitterImg);
            document.getElementById("app-container").appendChild(elem_twitterImg);
        }
    );
});


// =========================================================
// 13-ES6
//
const n = {o: 'o', p:'p'};
const m = {...n};
const testSpread = () => ({...n});
console.log ('test es7 spread: ', testSpread());



// =========================================================
// 14-tree-shaking
//
import {used, constants} from 'util/helper';
console.log('helper.constants: ', constants );
console.log('helper.used: ', used() );
