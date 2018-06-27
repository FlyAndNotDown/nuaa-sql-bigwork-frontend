import React from 'react';
import { message, Col, Breadcrumb, Form, Table, Modal, Input, Button, Spin } from 'antd';
import { serverConfig } from "../../../config";
import { FixedLayout } from "../../../component/layout/fixed-layout";
import { FixedRow } from "../../../component/layout/fixed-row";
import axios from 'axios';
import { Link } from 'react-router-dom';

export class AdminClassDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedKeys: [],
            loadDown: false,

            modalShow: false,
            modalDealing: false,
            modalGpa: ''
        };

        this.cols = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '学号',
            dataIndex: 'number',
            key: 'number'
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '学院',
            dataIndex: 'college',
            key: 'college'
        }, {
            title: '专业',
            dataIndex: 'major',
            key: 'major'
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex'
        }, {
            title: '年级',
            dataIndex: 'grade',
            key: 'grade'
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone'
        }, {
            title: '绩点',
            dataIndex: 'gpa',
            key: 'gpa',
            render: (text) => {
                return (<a>
                    {!text || text === '' ? '未设定成绩' : text}
                </a>);
            }
        }];
    }

    refresh() {
        this.setState({
            data: [],
            selectedKeys: [],
            loadDown: false
        });

        axios
            .post(`${serverConfig.url}/request/user/getLoginInfo`)
            .then((res) => {
                if (res.data.login) {
                    if (res.data.admin) {
                        axios
                            .post(`${serverConfig.url}/request/select/getStudentsByClass`, {
                                class: this.props.match.params.class
                            })
                            .then((res) => {
                                if (res.data.success) {
                                    this.setState({
                                        data: res.data.result,
                                        loadDown: true
                                    });
                                } else {
                                    message.error('获取数据失败');
                                    this.setState({
                                        loadDown: true
                                    });
                                }
                            });
                    } else {
                        this.props.history.push('/');
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
                            <Breadcrumb.Item><Link to={'/admin'}>管理员</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={'/admin/class'}>选课系统</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><a>已选学生</a></Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className={'font-size-35px'}>
                            课程 - {this.props.match.params.name} - 已选学生
                        </h1>
                        {this.state.loadDown ? (
                            <div>
                                <Button.Group>
                                    <Button type={'primary'}
                                            disabled={!(this.state.selectedKeys.length > 0)}
                                            onClick={() => {
                                                this.setState({
                                                    modalShow: true
                                                });
                                            }}>
                                        设定成绩
                                    </Button>
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
                                       rowSelection={{
                                           onChange: (selectedRowKeys) => {
                                               this.setState({
                                                   selectedKeys: selectedRowKeys
                                               });
                                           }
                                       }}
                                />
                            </div>
                        ) : (
                            <div><Spin/></div>
                        )}
                    </Col>
                </FixedRow>

                <Modal visible={this.state.modalShow}
                       onCancel={() => {
                           this.setState({
                               modalShow: false
                           });
                       }} title={'设定成绩'}
                       okText={'提交'} cancelText={'取消'}
                       confirmLoading={this.state.modalDealing}
                       onOk={() => {
                           this.setState({
                               modalDealing: true
                           });
                           axios
                               .post(`${serverConfig.url}/request/select/setGpa`, {
                                   class: this.props.match.params.class,
                                   students: this.state.selectedKeys,
                                   gpa: this.state.gpa
                               })
                               .then((res) => {
                                   if (res.data.success) {
                                       message.success('设定成功');
                                       this.setState({
                                           modalShow: false,
                                           modalDealing: false
                                       });
                                       this.refresh();
                                   } else {
                                       this.setState({
                                           modalDealing: false
                                       });
                                       message.error('设定失败');
                                   }
                               });
                       }}>
                    <Form>
                        <Form.Item label={'绩点'}>
                            <Input placeholder={'绩点'}
                                   value={this.state.gpa}
                                   onChange={(e) => {
                                       this.setState({
                                           gpa: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </FixedLayout>
        );
    }
}