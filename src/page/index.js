import React from 'react';
import { Form, Input, Avatar, Icon, Button, message } from 'antd';
import { CenterLayout } from "../component/layout/center-layout";
import avatarImg from '../img/avatar.jpg';
import axios from 'axios';
import { serverConfig } from "../config";
import sha256 from 'js-sha256';

export class IndexPage extends React.Component {
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
                            欢迎来到教务系统
                        </h1>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder={'用户名'} prefix={<Icon type={'user'}/>} value={this.state.username}
                               onChange={(e) => { this.setState({username: e.target.value}); }}/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder={'密码'} prefix={<Icon type={'key'}/>}
                               value={this.state.password} type={'password'}
                               onChange={(e) => { this.setState({password: e.target.value}); }}/>
                    </Form.Item>
                    <Form.Item>
                        <Button className={'width-100'} type={'primary'} onClick={() => {
                            // 进行登录校验
                            axios
                                .post(`${serverConfig.url}/request/user/login`, {
                                    username: this.state.username,
                                    password: sha256(this.state.password)
                                })
                                .then((res) => {
                                    // 如果登录成功了
                                    if (res.data.success) {
                                        message.success('登录成功，即将为您跳转');
                                        setTimeout(() => {
                                            // 如果是管理员
                                            if (res.data.admin) {
                                                this.props.history.push('/admin');
                                            } else {
                                                this.props.history.push('/student');
                                            }
                                        }, 1000);
                                    } else {
                                        message.error('用户名或密码错误');
                                    }
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
