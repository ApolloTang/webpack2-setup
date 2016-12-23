console.log('log from main');


// =========================================================
// 18-react
//

import React, {Component} from  'react';
import {render} from 'react-dom';
import Root from 'root';
import { AppContainer as Hot } from 'react-hot-loader'

render(
    <Hot><Root /></Hot>,
    document.getElementById('react-container')
);

if (module.hot) {
    module.hot.accept('./root', () => {
        console.log('---- HOT RELOADING ----');
        const NewRoot = require('./root').default;
        render( <Hot><NewRoot /></Hot>, document.getElementById('react-container'));
    });
}
