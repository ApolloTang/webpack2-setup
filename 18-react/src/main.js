console.log('log from main');

import style from './main.css';

// =========================================================
// 18-react
//

import React, {Component} from  'react';
import {render} from 'react-dom';

class Main extends Component {
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
        const A = this.state.A
        return (
            <div className={style.main}>
                <div>This is React component Main</div>
                <button onClick={this.handleClick}>click me to lazy load</button>
                { A ? <A/> : null }
            </div>
       );
    }
};

render( <Main />, document.getElementById('react-container'));

