const { app, BrowserWindow } = require('electron');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// 全局异常处理
process.on('uncaughtException', (err) => {
    console.log(err);
});

// 浏览器引用
let window;

// 本地服务器
let server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// 创建浏览器窗口函数
let createWindow = () => {
    // 创建浏览器窗口
    window = new BrowserWindow({
        width: 1200,

        height: 900
    });

    // 加载应用中的index.html文件
    // window.loadFile('./build/index.html/');
    window.loadURL('http://localhost:3000/');

    // 当window被关闭时，除掉window的引用
    window.on('closed', () => {
        window = null;
    });

    // 本地服务器开启监听
    server.listen(45000);
};

// 当app准备就绪时候开启窗口
app.on('ready', createWindow);

// 当全部窗口都被关闭之后推出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 在macos上，单击dock图标并且没有其他窗口打开的时候，重新创建一个窗口
app.on('activate', () => {
    if (window == null) {
        createWindow();
    }
});