console.log('log from modules/module-a/index.js');

import React, {Component} from  'react';
import style from './index.css';


class ModuleA extends Component {
    render() {
        return (
            <div className={style['module-A']}>
                <p>This is module A xx</p>
            </div>
       );
    }
};

export default ModuleA;
