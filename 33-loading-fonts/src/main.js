console.log('log:  /src/main.js');

import React, {Component} from  'react';
import {render} from 'react-dom';

import { AppContainer as Hot } from 'react-hot-loader';

import styleBootstrap from 'style-bootstrap';

import Root from 'modules/root';


if (module.hot) {
    console.info('✅  HMR Enabled for <Root />.')
    render(
        <Hot><Root /></Hot>,
        document.getElementById('react-container')
    );

    module.hot.accept('modules/root', (opts) => {
        console.log('🔁 reloading <Root />...', opts);
        System.import('modules/root').then(
            ({ default: NewRoot }) => {
                render( <Hot><NewRoot /></Hot>, document.getElementById('react-container'));
            },
            err => {
                console.info('❌  HMR error (<Root />): ', err);
            }
        );
    });

} else {
    render( <Root />, document.getElementById('react-container'));
}
