import React from 'react';
import { FixedLayout } from "../../../component/layout/fixed-layout";
import { FixedRow } from "../../../component/layout/fixed-row";
import { Col, Breadcrumb, Row, Form, Input, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverConfig } from "../../../config";

export class StudentInfoIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadDown: false,

            id: -1,
            number: '',
            name: '',
            college: '',
            major: '',
            sex: '',
            grade: '',
            gpa: '',
            phone: ''
        };
    }

    refresh() {
        this.setState({
            loadDown: false,

            id: -1,
            number: '',
            name: '',
            college: '',
            major: '',
            sex: '',
            grade: '',
            gpa: '',
            phone: ''
        });

        axios
            .post(`${serverConfig.url}/request/user/getLoginInfo`)
            .then((res) => {
                if (res.data.login) {
                    if (res.data.admin) {
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            id: res.data.id
                        });
                        axios
                            .post(`${serverConfig.url}/request/student/get`, {
                                id: this.state.id
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.setState({
                                        loadDown: true,
                                        number: res.data.result.number,
                                        name: res.data.result.name,
                                        college: res.data.result.college,
                                        major: res.data.result.major,
                                        sex: res.data.result.sex,
                                        grade: res.data.result.grade,
                                        gpa: res.data.result.gpa.toString(),
                                        phone: res.data.result.phone
                                    });
                                } else {
                                    message.error('获取用户信息失败');
                                }
                            });
                    }
                } else {
                    this.props.history.push('/');
                }
            });
    }

    componentDidMount() {
        this.refresh();
    }

    render() {
        return (
            <FixedLayout>
                <FixedRow>
                    <Col>
                        <Breadcrumb className={'font-size-20px'}>
                            <Breadcrumb.Item><Link to={'/'}>登录</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={'/student'}>学生</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><a>个人信息管理</a></Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className={'font-size-35px'}>个人信息管理</h1>
                    </Col>
                    <Row>
                        <Col span={10} offset={7}>
                            <Form className={'margin-top-40px'}>
                                <Form.Item>
                                    学号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'学号'} value={this.state.number}/>
                                </Form.Item>
                                <Form.Item>
                                    姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'姓名'} value={this.state.name}/>
                                </Form.Item>
                                <Form.Item>
                                    学院:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'学院'} value={this.state.college}/>
                                </Form.Item>
                                <Form.Item>
                                    专业:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'专业'} value={this.state.major}/>
                                </Form.Item>
                                <Form.Item>
                                    性别:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'性别'} value={this.state.sex}/>
                                </Form.Item>
                                <Form.Item>
                                    年级:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'年级'} value={this.state.grade}/>
                                </Form.Item>
                                <Form.Item>
                                    绩点:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'} disabled placeholder={'绩点'} value={this.state.gpa}/>
                                </Form.Item>
                                <Form.Item>
                                    电话:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input className={'width-85'}placeholder={'电话'} value={this.state.phone}
                                           onChange={(e) => {
                                               this.setState({
                                                   phone: e.target.value
                                               });
                                           }}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type={'primary'} className={'width-45 float-left'} onClick={() => {
                                        axios
                                            .post(`${serverConfig.url}/request/student/modify`, {
                                                ids: [this.state.id],
                                                number: '',
                                                name: '',
                                                college: '',
                                                major: '',
                                                sex: '',
                                                grade: '',
                                                gpa: '-1',
                                                phone: this.state.phone
                                            })
                                            .then((res) => {
                                                if (res.data.success) {
                                                    message.success('修改成功');
                                                    this.refresh();
                                                } else {
                                                    message.error('修改失败');
                                                }
                                            });
                                    }}>
                                        修改信息
                                    </Button>
                                    <Button type={'danger'} className={'width-45 float-right'} onClick={() => {
                                        this.props.history.push('/student');
                                    }}>
                                        退出
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </FixedRow>
            </FixedLayout>
        );
    }
}