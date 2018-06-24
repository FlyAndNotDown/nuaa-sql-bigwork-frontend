const { app, BrowserWindow } = require('electron');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// 数据库连接信息
let dbConnectionInfo = {
    host: '127.0.0.1',
    port: '3306',
    user: 'kindem',
    password: '123456',
    database: 'student_info_manager',
    connectTimeout: 1000
};
// 管理员密码hash
let adminPasswordHash = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

// 全局异常处理
process.on('uncaughtException', (err) => {
    console.log(err);
});

// 浏览器引用
let window;

// 本地服务器
let server = express();
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else next();
});
server.use(cookieParser());
server.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.post('/request/user/login', (req, res) => {
    // 获取参数
    let args = req.body;
    // 先看看是不是管理员账户
    if (args.username === 'admin') {
        // 验证密码
        if (args.password === adminPasswordHash) {
            req.session.login = true;
            req.session.admin = true;
            return res.json({
                success: true
            });
        } else {
            return res.json({
                success: false
            });
        }
    } else {
        // 查找学生数据库中是否有匹配的学号，如果有则获取他的信息
        let connection = mysql.createConnection(dbConnectionInfo);
        let sql = 'select * from student where number = ? limit 1';
        connection.query(sql, [args.username], (err, result) => {
            if (err) {
                connection.end();
                return res.json({
                    success: false
                });
            }
            // TODO
            console.log(result);
        });
    }
});
server.post('/request/student/getAll', (req, res) => {
    let connection = mysql.createConnection(dbConnectionInfo);
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
server.post('/request/student/add', (req, res) => {
    // 建立连接
    let args = req.body;
    let connection = mysql.createConnection(dbConnectionInfo);
    let sql = 'insert into student(number, name, college, major, sex, grade, gpa, phone) ' +
        'values(?, ?, ?, ?, ?, ?, ?, ?)';
    let params = [];
    params.push(args.number);
    params.push(args.name);
    params.push(args.college);
    params.push(args.major);
    params.push(args.sex);
    params.push(args.grade);
    params.push(args.gpa);
    params.push(args.phone);
    connection.query(sql, params, (err) => {
        setTimeout(() => {
            if (err) {
                connection.end();
                return res.json({
                    success: false
                });
            }
            connection.end();
            return res.json({
                success: true
            });
        }, 1000);
    });
});
server.post('/request/student/delete', (req, res) => {
    let args = req.body;
    let connection = mysql.createConnection(dbConnectionInfo);
    let idList = '';
    args.ids.map((id, no) => {
        if (no === args.ids.length - 1)
            idList += id;
        else
            idList += `${id},`;
    });
    let sql = `delete from student where id in (${idList})`;
    connection.query(sql, (err) => {
        if (err) {
            connection.end();
            return res.json({
                success: false
            });
        }
        connection.end();
        return res.json({
            success: true
        });
    });
});
server.post('/request/student/modify', (req, res) => {
    let args = req.body;
    let connection = mysql.createConnection(dbConnectionInfo);
    let suc = true;
    let idList = '';
    args.ids.map((id, no) => {
        if (no === args.ids.length - 1)
            idList += id;
        else
            idList += `${id},`;
    });
    let sqls = [
        `update student set number = ? where id in (${idList})`,
        `update student set name = ? where id in (${idList})`,
        `update student set college = ? where id in (${idList})`,
        `update student set major = ? where id in (${idList})`,
        `update student set sex = ? where id in (${idList})`,
        `update student set grade = ? where id in (${idList})`,
        `update student set gpa = ? where id in (${idList})`,
        `update student set phone = ? where id in (${idList})`
    ];
    let params = [
        args.number === '' ? null : [args.number],
        args.name === '' ? null : [args.name],
        args.college === '' ? null : [args.college],
        args.major === '' ? null : [args.major],
        args.sex === '' ? null : [args.sex],
        args.grade === '' ? null : [args.grade],
        args.gpa === -1 ? null : [args.gpa],
        args.phone === '' ? null : [args.phone]
    ];
    for (let i = 0; i < 8; i++)
        if (params[i])
            connection.query(sqls[i], params[i], (err) => {
                if (err) suc = false;
            });

    setTimeout(() => {
        connection.end();
        res.json({
            success: suc
        });
    }, 1000);
});

// 创建浏览器窗口函数
let createWindow = () => {
    // 创建浏览器窗口
    window = new BrowserWindow({
        width: 1200,

        height: 900
    });

    // 加载应用中的index.html文件
    // window.loadFile('./build/index.html/login');
    window.loadURL('http://localhost:3000/login');

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