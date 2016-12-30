console.log('log:  /src/modules/root.js');

import React, {Component} from  'react';
import { AppContainer as Hot } from 'react-hot-loader'

import style from './index.less';
import ModuleA from 'modules/module-a';
import FontTest from 'modules/font-test';

class Root extends Component {
    constructor () {
        super(...arguments);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            TwitterIcon: null,
            ModuleA: null,
            FontTest: null
        };
    }

    componentDidMount() {
        if (module.hot) {
            // ModuleA
            console.info('✅  HMR Enabled for <ModuleA />.');
            this.setState( {ModuleA:(<Hot><ModuleA /></Hot>)});

            module.hot.accept('modules/module-a', (opts) => {
                console.log('🔁 reloading Module A...', opts);

                System.import('modules/module-a').then(
                    ({ default: ModuleA_new }) => {
                        this.setState( {ModuleA: ( <Hot><ModuleA_new /></Hot>)})
                    },
                    err => { console.info('❌  HMR error (<ModuleA />): ', err); }
                );
            });

            // FontTest
            console.info('✅  HMR Enabled for <FontTest />.');
            this.setState( {FontTest:(<Hot><FontTest /></Hot>)});

            module.hot.accept('modules/font-test', (opts) => {
                console.log('🔁 reloading <FontTest />...', opts);

                System.import('modules/font-test').then(
                    ({ default: FontTest_new }) => {
                        this.setState( {FontTest: ( <Hot><FontTest_new /></Hot>)})
                    },
                    err => { console.info('❌  HMR error (<FontTest />): ', err); }
                );
            });
        } else {
            this.setState( {ModuleA:(<ModuleA />)});
            this.setState( {FontTest:(<FontTest />)});
        }
    }

    handleClick() {
        if (this.state.TwitterIcon === null) {
            if (module.hot) {
                console.info('✅  HMR Enabled for <TwitterIcon />.');

                System.import('modules/twitter-icon').then(
                    ({ default: TwitterIcon }) => { this.setState({TwitterIcon: (<Hot><TwitterIcon /></Hot>)}); }
                );

                module.hot.accept('modules/twitter-icon', (opts) => {
                    console.log('🔁 reloading <TwitterIcon />...', opts);

                    System.import('modules/twitter-icon').then(
                        ({ default: TwitterIcon_new }) => {
                            this.setState( {TwitterIcon: ( <Hot><TwitterIcon_new /></Hot>)})
                        },
                        err => { console.info('❌  HMR error (<TwitterIcon_new />): ', err); }
                    );
                });
            } else {
                System.import('modules/twitter-icon').then(
                    ({ default: TwitterIcon }) => { this.setState({TwitterIcon: (<TwitterIcon />)}); }
                );
            }
        };
    }

    render() {
        console.log('yyxxx: ', style);
        return (
            <div className={style.root}>
                <div>This is Root</div>
                <button onClick={this.handleClick}>click me to lazy load</button>
                { this.state.TwitterIcon ? this.state.TwitterIcon : null }
                { this.state.ModuleA ? this.state.ModuleA : null }
                { this.state.FontTest ? this.state.FontTest : null }
            </div>
        );
    }
};


export default Root;
