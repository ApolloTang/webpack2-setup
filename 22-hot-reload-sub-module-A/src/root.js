import React, {Component} from  'react';
import { AppContainer as Hot } from 'react-hot-loader'

import style from './root.css';
import ModuleA from './modules/module-a';

class Root extends Component {
    constructor () {
        super(...arguments);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            A: null,
            ModuleA: null
        };
    }

    componentDidMount() {
        if (module.hot) {
            console.info('✅  HMR Enabled for <ModuleA />.');
            this.setState( {ModuleA:(<Hot><ModuleA /></Hot>)});

            module.hot.accept('./modules/module-a', (opts) => {
                console.log('🔁 reloading Module A...', opts);

                System.import('./modules/module-a').then(
                    ({ default: ModuleA_new }) => {
                        this.setState( {ModuleA: ( <Hot><ModuleA_new /></Hot>)})
                    },
                    err => { console.info('❌  HMR error (<ModuleA />): ', err); }
                );
            });
        } else {
            this.setState( {ModuleA:(<ModuleA />)});
        }
    }

    handleClick() {
        System.import('./modules/twitter-react').then(
            ({ default: TwitterReact }) => { this.setState({A:TwitterReact}) }
        );
    }

    render() {
        const style = require('./root.css')
        const A = this.state.A
        return (
            <div className={style.root}>
                <div>This is Root</div>
                <button onClick={this.handleClick}>click me to lazy load</button>
                { A ? <A/> : null }
                { this.state.ModuleA ? this.state.ModuleA : null }
            </div>
       );
    }
};


export default Root;
