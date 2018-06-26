import React from 'react';
import { message, Table, Button, Col, Breadcrumb, Spin } from 'antd';
import { FixedLayout } from "../../../component/layout/fixed-layout";
import axios from 'axios';
import { serverConfig } from "../../../config";
import { FixedRow } from "../../../component/layout/fixed-row";
import { Link } from 'react-router-dom';

export class StudentClassIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedKeys: [],
            loadDown: false,
        };

        this.cols = [{
            title: '课程编号',
            dataIndex: 'id',
            key: 'id',
            render: (text) => {
                return (<span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {text}
                </span>);
            }
        }, {
            title: '课程名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '任课老师',
            dataIndex: 'teacher',
            key: 'teacher'
        }, {
            title: '绩点',
            dataIndex: 'gpa',
            key: 'gpa',
            render: (text) => {
                if (!text || text === '') {
                    return (<a>
                        成绩未出
                    </a>);
                } else {
                    return <a>
                        {text}
                    </a>;
                }
            }
        }];
    }

    refresh() {
        this.setState({
            data: [],
            selectedKeys: [],
            loadDown: false,
        });

        axios
            .post(`${serverConfig.url}/request/user/getLoginInfo`)
            .then((res) => {
                if (res.data.login) {
                    if (res.data.admin) {
                        this.props.history.push('/');
                    } else {
                        axios
                            .post(`${serverConfig.url}/request/class/getSelected`)
                            .then((res) => {
                                if (res.data.success) {
                                    this.setState({
                                        data: res.data.result,
                                        loadDown: true
                                    });
                                } else {
                                    this.setState({
                                        loadDown: true
                                    });
                                    message.error('数据加载失败');
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
                            <Breadcrumb.Item><a>修读课程</a></Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className={'font-size-35px'}>修读课程</h1>
                        {this.state.loadDown ?
                            (<div>
                                <Button.Group>
                                    <Button onClick={() => {
                                        this.refresh();
                                    }}>
                                        刷新
                                    </Button>
                                </Button.Group>
                                <Table className={'margin-top-10px'}
                                       columns={this.cols}
                                       dataSource={this.state.data}
                                       size={'middle'}
                                       bordered
                                />
                            </div>) : (<div><Spin/></div>)
                        }
                    </Col>
                </FixedRow>
            </FixedLayout>
        );
    }
}