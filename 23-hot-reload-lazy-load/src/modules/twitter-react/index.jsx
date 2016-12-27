console.log('log from module/twitter-react/index.js');

import style from './index.css';
import imageSrc from './twitter-react-img_01.png';

import React, {Component} from  'react';
class TwitterReact extends Component {
    render() {
        return (
            <div className={style['module-style']} >
                sadfdsafd
                <img src={imageSrc}></img>
            </div>
       );
    }
};

export default TwitterReact;
