if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/main.js'); // eslint-disable-line no-console
}

import React, {Component} from  'react';
import {render} from 'react-dom';

import { AppContainer as Hot } from 'react-hot-loader';

import fonts from 'common/fonts';

import Root from 'modules/root';


if (module.hot) {
    console.info('✅  HMR Enabled for <Root />.'); // eslint-disable-line no-console

    render(
        <Hot><Root /></Hot>,
        document.getElementById('react-container')
    );

    module.hot.accept('modules/root', (opts) => {
        console.log('🔁 reloading <Root />...', opts); // eslint-disable-line no-console

        System.import('modules/root').then(
            ({ default: NewRoot }) => {
                render( <Hot><NewRoot /></Hot>, document.getElementById('react-container'));
            },
            err => {
                console.info('❌  HMR error (<Root />): ', err); // eslint-disable-line no-console
            }
        );
    });

} else {
    render( <Root />, document.getElementById('react-container'));
}
