if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/module/font-test/index.js'); // eslint-disable-line no-console
}

import React, {Component} from  'react';
import style from './index.less';

class ModuleA extends Component {
    render() {
        return (
            <div className={style['module-style']}>
                <h3>This is a module to test font</h3>
                <p>Default</p>
                <p className="thin">RobotoThin</p>
                <p className="light">RobotoLight</p>
                <p className="regular">RobotoRegular</p>
                <p className="medium">RobotoMedium</p>
                <p className="bold">RobotoBold</p>
                <p className="black">RobotoBlack</p>
                <div>
                    <h3>Test font awesome </h3>
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                        <i className="fa fa-area-chart"></i>
                </div>

            </div>
       );
    }
};

export default ModuleA;

