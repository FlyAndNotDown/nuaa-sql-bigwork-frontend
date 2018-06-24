import React from 'react';
import { Form, Input, Avatar, Icon, Button } from 'antd';
import { CenterLayout } from "../component/layout/center-layout";
import avatarImg from '../img/avatar.jpg';
import axios from 'axios';
import { serverConfig } from "../config";

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <CenterLayout span={8}>
                <Form>
                    <Form.Item>
                        <h1 className={'text-align-center font-size-35px'}>
                            学生信息管理系统
                        </h1>
                        <h1 className={'text-align-center font-size-25px color-grey'}>
                            输入你账户以开始
                        </h1>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder={'用户名'} prefix={<Icon type={'user'}/>} value={this.state.username}
                               onChange={(e) => { this.setState({username: e.target.value}); }}/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder={'密码'} prefix={<Icon type={'key'}/>} value={this.state.password}
                               onChange={(e) => { this.setState({password: e.target.value}); }}/>
                    </Form.Item>
                    <Form.Item>
                        <Button className={'width-100'} type={'primary'} onClick={() => {
                            // 进行登录校验
                            axios
                                .post(`${serverConfig.url}/request/user/login`, {
                                    username: this.state.username,
                                    password: this.state.password
                                })
                                .then((res) => {

                                });
                        }}>登录</Button>
                    </Form.Item>
                </Form>
                <div className={'affixBottom padding-left padding-left-40px'}>
                    <Avatar src={avatarImg}/>
                    <span className={'color-grey text-size-20px padding-left-10px'}>
                        Powered By John Kindem
                    </span>
                </div>
            </CenterLayout>
        );
    }
}