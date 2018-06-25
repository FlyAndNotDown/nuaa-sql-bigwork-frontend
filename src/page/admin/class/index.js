import React from 'react';
import { Col, Breadcrumb, message, Popconfirm, Table, Modal, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FixedLayout } from "../../../component/layout/fixed-layout";
import { FixedRow } from "../../../component/layout/fixed-row";
import axios from 'axios';
import { serverConfig } from "../../../config";

export class AdminClassIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 数据
            data: [],
            // 被选中的行
            selectedKeys: [],
            // 是否加载完毕
            loadDown: false,

            // Modal显示情况
            addModalShow: false,
            modifyModalShow: false,

            // add Modal 中的数据
            addModalName: '',
            addModalTeacher: '',
            addModalGrade: '',
            addModalPlan: '',

            // modify Modal 中的数据
            modifyModalName: '',
            modifyModalTeacher: '',

            // Modal 处理中
            addModalDealing: false,
            modifyModalDealing: false
        };

        // 列信息
        this.cols = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '课程名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '任课老师',
            dataIndex: 'teacher',
            key: 'teacher'
        }, {
            title: '年级',
            dataIndex: 'grade',
            key: 'grade'
        }, {
            title: '计划人数',
            dataIndex: 'plan',
            key: 'plan'
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, record) => {
                return (
                    <Link to={`/admin/class/detail/${record.key}`}>查看已选学生</Link>
                );
            }
        }];
    }

    refresh() {
        this.setState({
            // 数据
            data: [],
            // 被选中的行
            selectedKeys: [],
            // 是否加载完毕
            loadDown: false,

            // Modal显示情况
            addModalShow: false,
            modifyModalShow: false,

            // add Modal 中的数据
            addModalName: '',
            addModalTeacher: '',
            addModalGrade: '',
            addModalPlanNum: '',

            // modify Modal 中的数据
            modifyModalName: '',
            modifyModalTeacher: '',
            modifyModalGrade: '',

            // Modal 处理中
            addModalDealing: false,
            modifyModalDealing: false
        });

        axios
            .post(`${serverConfig.url}/request/class/getAll`)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        data: res.data.result,
                        loadDown: true
                    });
                    console.log(this.state.data);
                } else {
                    message.error('数据加载失败，请检查网络连接');
                    this.setState({
                        loadDown: true
                    });
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
                            <Breadcrumb.Item><a>课程管理</a></Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className={'font-size-35px'}>课程管理</h1>
                        {this.state.loadDown ?
                            (<div>
                                <Button.Group>
                                    <Button type={'primary'}
                                            onClick={() => {
                                                this.setState({
                                                    addModalShow: true
                                                });
                                            }}>
                                        新增
                                    </Button>
                                    <Button type={'danger'}
                                            disabled={this.state.selectedKeys.length <= 0}
                                            onClick={() => {
                                                this.setState({
                                                    modifyModalShow: true
                                                });
                                            }}>
                                        修改选中
                                    </Button>
                                    <Popconfirm title={'确认删除'}
                                                okText={'确定'}
                                                cancelText={'点错了'}
                                                onConfirm={() => {
                                                    axios
                                                        .post(`${serverConfig.url}/request/class/delete`, {
                                                            ids: this.state.selectedKeys
                                                        })
                                                        .then((res) => {
                                                            if (res.data.success) {
                                                                message.success('删除成功!');
                                                                this.refresh();
                                                            } else {
                                                                message.error('删除失败');
                                                            }
                                                        });
                                                }}>
                                        <Button type={'danger'}
                                                disabled={this.state.selectedKeys.length <= 0}>
                                            删除选中
                                        </Button>
                                    </Popconfirm>
                                    <Button onClick={() => {
                                        this.refresh();
                                    }}>刷新</Button>
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
                            </div>) : null
                        }
                    </Col>
                </FixedRow>

                <Modal visible={this.state.addModalShow}
                       onCancel={() => {
                           this.setState({
                               addModalShow: false
                           });
                       }}
                       title={'新增学籍'}
                       okText={'提交'}
                       cancelText={'取消'}
                       onOk={() => {
                           this.setState({
                               addModalDealing: true
                           });
                           axios
                               .post(`${serverConfig.url}/request/class/add`, {
                                   name: this.state.addModalName,
                                   teacher: this.state.addModalTeacher,
                                   grade: this.state.addModalGrade,
                                   plan: parseInt(this.state.addModalPlan)
                               })
                               .then((res) => {
                                   if (res.data.success) {
                                       message.success('添加成功!');
                                       this.refresh();
                                   } else {
                                       message.error('添加失败!');
                                   }
                                   this.setState({
                                       addModalShow: false,
                                       addModalDealing: false,
                                       addModalName: '',
                                       addModalTeacher: '',
                                       addModalGrade: '',
                                       addModalPlan: ''
                                   });
                               });
                       }}
                       confirmLoading={this.state.addModalDealing}>
                    <Form>
                        <Form.Item label={'课程名'}>
                            <Input placeholder={'课程名'}
                                   value={this.state.addModalName}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalName: e.target.value
                                       });
                                   }}
                            />
                        </Form.Item>
                        <Form.Item label={'任课老师'}>
                            <Input placeholder={'任课老师'}
                                   value={this.state.addModalTeacher}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalTeacher: e.target.value
                                       });
                                   }}
                            />
                        </Form.Item>
                        <Form.Item label={'年级'}>
                            <Input placeholder={'年级'}
                                   value={this.state.addModalGrade}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalGrade: e.target.value
                                       });
                                   }}
                            />
                        </Form.Item>
                        <Form.Item label={'计划人数'}>
                            <Input placeholder={'计划人数'}
                                   value={this.state.addModalPlan}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalPlan: e.target.value
                                       });
                                   }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal visible={this.state.modifyModalShow}
                       onCancel={() => {
                           this.setState({
                               modifyModalShow: false
                           });
                       }} title={'批量修改'}
                       okText={'提交'}
                       cancelText={'取消'}
                       confirmLoading={this.state.modifyModalDealing}
                       onOk={() => {
                           this.setState({
                               modifyModalDealing: true
                           });
                           axios
                               .post(`${serverConfig.url}/request/class/modify`, {
                                   ids: this.state.selectedKeys,
                                   name: this.state.modifyModalName,
                                   teacher: this.state.modifyModalTeacher
                               })
                               .then((res) => {
                                   if (res.data.success) {
                                       message.success('修改成功');
                                       this.refresh();
                                   } else {
                                       message.error('修改失败');
                                   }
                                   this.setState({
                                       modifyModalDealing: false,
                                       modifyModalShow: false,
                                       modifyModalName: '',
                                       modifyModalTeacher: ''
                                   });
                               });
                       }}>
                    <Form>
                        <Form.Item label={'课程名'}>
                            <Input placeholder={'课程名'}
                                   value={this.state.modifyModalName}
                                   onChange={(e) => {
                                       this.setState({
                                           modifyModalName: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'任课老师'}>
                            <Input placeholder={'任课老师'}
                                   value={this.state.modifyModalTeacher}
                                   onChange={(e) => {
                                       this.setState({
                                           modifyModalTeacher: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </FixedLayout>
        );
    }
}