import React, {Component} from  'react';

import style from './root.css';

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
        const A = this.state.A
        return (
            <div className={style.main}>
                <div>This is React component Root</div>
                <button onClick={this.handleClick}>click me to lazy load</button>
                { A ? <A/> : null }
            </div>
       );
    }
};


export default Root;
