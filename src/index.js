import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
//读取user看登录了没
const user=storageUtils.getUser()
memoryUtils.user=user
ReactDOM.render(<App />, document.getElementById('root'));


