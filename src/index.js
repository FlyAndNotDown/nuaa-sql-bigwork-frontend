import React from 'react';
import ReactDom from 'react-dom'
import { MainRouter } from './router';
import axios from 'axios';

// 引入全局配置和css配置
import './css';

// axios发送请求默认带cookie
axios.defaults.withCredentials = true;

ReactDom.render(
    <MainRouter/>,
    document.getElementById('root')
);
