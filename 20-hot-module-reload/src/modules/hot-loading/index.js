console.log('log from module/hot-loading/index.js');

import React, {Component} from  'react';
class HotLoading extends Component {
    render() {
        return (
            <div>
                <h1> I am hot  </h1>
            </div>
       );
    }
};

export default HotLoading;
