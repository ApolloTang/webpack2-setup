if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/module/twitter-icon/index.js'); // eslint-disable-line no-console
}

import style from './index.less';
import imageSrc from './twitter-01.png';

import React, {Component} from  'react';
class TwitterIcon extends Component {
    render() {
        return (
            <div className={style['module-style']} >
                <img src="imgs/twitter-01.png"></img>
            </div>
       );
    }
};

export default TwitterIcon;
