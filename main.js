const { app, BrowserWindow } = require('electron');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// 数据库连接信息
let databaseConnection = {
    host: '127.0.0.1',
    port: '3306',
    user: 'kindem',
    password: '123456',
    database: 'student_info_manager',
    connectTimeout: 1000
};

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
server.post('/request/student/getAll', (req, res) => {
    let connection = mysql.createConnection(databaseConnection);
    connection.query('select * from student', (err, r) => {
        if (err) {
            connection.end();
            return res.json({
                success: false
            });
        }
        let result = [];
        r.map((item) => {
            result.push({
                key: item.id,
                id: item.id,
                number: item.number,
                name: item.name,
                college: item.college,
                major: item.major,
                sex: item.sex,
                grade: item.grade,
                gpa: item.gpa,
                phone: item.phone
            });
        });
        connection.end();
        return res.json({
            success: true,
            result: result
        });
    });
});
server.post('/request/student/delete', (req, res) => {
    // TODO
});
server.post('/request/student/add', (req, res) => {
    // TODO
});
server.post('/request/student/modify', (req, res) => {
    // TODO
});

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