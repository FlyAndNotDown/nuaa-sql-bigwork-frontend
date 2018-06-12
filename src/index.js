import React from 'react';
import ReactDom from 'react-dom'
import { MainRouter } from './router';
// 引入全局配置
import './css';

ReactDom.render(
    <MainRouter/>,
    document.getElementById('root')
);
