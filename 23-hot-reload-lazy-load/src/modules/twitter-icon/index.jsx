console.log('log from module/twitter-icon/index.js');

import style from './index.css';
import imageSrc from './twitter-01.png';

import React, {Component} from  'react';
class TwitterIcon extends Component {
    render() {
        return (
            <div className={style['module-style']} >
                <img src={imageSrc}></img>
            </div>
       );
    }
};

export default TwitterIcon;
