if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/modules/module-a/index.js'); // eslint-disable-line no-console
}

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
