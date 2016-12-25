console.log('log from main');

import React, {Component} from  'react';
import {render} from 'react-dom';

import Root from 'root';
import { AppContainer as Hot } from 'react-hot-loader'

if (module.hot) {
    console.info('✅  HMR Enabled.')
    render(
        <Hot><Root /></Hot>,
        document.getElementById('react-container')
    );

    module.hot.accept('./root', (opts) => {
        console.log('🔁 reloading...', opts);

        // const NewRoot = require('./root').default;
        // render( <Hot><NewRoot /></Hot>, document.getElementById('react-container'));

        System.import('./root').then(
            ({ default: NewRoot }) => {
                render( <Hot><NewRoot /></Hot>, document.getElementById('react-container'));
            },
            err => {
                console.info('❌  HMR error: ', err);
            }
        );
    });

} else {
    render( <Root />, document.getElementById('react-container'));
}
