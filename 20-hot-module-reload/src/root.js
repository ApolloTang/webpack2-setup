import React, {Component} from  'react';

import style from './root.css';
import ModuleA from './modules/module-a';

class Root extends Component {
    constructor () {
        super(...arguments);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            A: null
        };
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
                <ModuleA />
            </div>
       );
    }
};


export default Root;
