import React from 'react';
import { CenterLayout } from "../../component/layout/center-layout";
import { Form, Button, Select } from 'antd';
import { serverConfig } from "../../config";
import axios from 'axios';

export class StudentIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            loadDown: false,
            type: 'info'
        };
    }

    componentDidMount() {
        axios
            .post(`${serverConfig.url}/request/user/getLoginInfo`)
            .then((res) => {
                if (res.data.login) {
                    if (res.data.admin) {
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            username: res.data.username,
                            loadDown: true
                        });
                    }
                } else {
                    this.props.history.push('/');
                }
            });
    }

    render() {
        return (
            <CenterLayout span={8}>
                {this.state.loadDown ?
                    (<Form>
                        <Form.Item>
                            <h1 className={'text-align-center font-size-35px'}>
                                你好，{this.state.username}同学
                            </h1>
                            <h1 className={'text-align-center font-size-25px color-grey'}>
                                选择一项功能以开始
                            </h1>
                        </Form.Item>
                        <Form.Item>
                            <Select defaultValue={'info'} onChange={(value) => {
                                this.setState({type: value});
                            }}>
                                <Select.Option value={'info'}>个人信息管理</Select.Option>
                                <Select.Option value={'select'}>选课系统</Select.Option>
                                <Select.Option value={'class'}>修读课程</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button className={'width-45 float-left'} type={'primary'} onClick={() => {
                                this.props.history.push(`/student/${this.state.type}/`);
                            }}>进入系统</Button><Button className={'width-45 float-right'} onClick={() => {
                                this.props.history.push('/');
                            }}>退出系统</Button>
                        </Form.Item>
                    </Form>) : null
                }
            </CenterLayout>
        );
    }
}