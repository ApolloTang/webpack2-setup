console.log('log from modules/module-a/index.js');

import React, {Component} from  'react';
import style from './index.less';

class ModuleA extends Component {
    render() {
        return (
            <div className={style['module-A']}>
                <p>This is module A</p>
            </div>
       );
    }
};

export default ModuleA;
