import React from 'react';
import { Table, Button, Row, Col, Breadcrumb, Modal, message, Form, Input, Popconfirm } from 'antd';
import { FixedLayout } from "../../component/layout/fixed-layout";
import { Link } from 'react-router-dom';
import axios from 'axios';

export class StudentIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 数据,
            data: [],
            // 被选中的行
            selectedKeys: [],
            // 是否加载完毕
            loadDown: false,

            // Modal显示情况
            addModalShow: false,
            modifyModalShow: false,

            // add Modal 中的数据
            addModalNumber: '',
            addModalName: '',
            addModalCollege: '',
            addModalMajor: '',
            addModalSex: '',
            addModalGrade: '',
            addModalGpa: '',
            addModalPhone: '',
            
            // modify Modal中的数据
            modifyModalNumber: '',
            modifyModalName: '',
            modifyModalCollege: '',
            modifyModalMajor: '',
            modifyModalSex: '',
            modifyModalGrade: '',
            modifyModalGpa: '',
            modifyModalPhone: '',

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
            title: '绩点',
            dataIndex: 'gpa',
            key: 'gpa'
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone'
        }];
    }

    refresh() {
        this.setState({
            data: [],
            selectedKeys: [],
            loadDown: false
        });

        axios
            .post('/request/student/getAll')
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        data: res.data.result,
                        loadDown: true
                    });
                } else {
                    message.error('数据加载失败，请检查网络连接!');
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
                <Row className={'width-100 height-100 margin-60px-auto'}>
                    <Col>
                        <Breadcrumb className={'font-size-20px'}>
                            <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={'/'}>学籍管理</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className={'font-size-35px'}>学籍详情</h1>
                        {this.state.loadDown ?
                            (<div>
                                <Button.Group>
                                    <Button type={'primary'}
                                            onClick={() => {
                                                this.setState({
                                                    addModalShow: true
                                                });
                                            }}>新增</Button>
                                    <Button type={'danger'}
                                            disabled={this.state.selectedKeys.length <= 0}
                                            onClick={() => {
                                                this.setState({
                                                    modifyModalShow: true
                                                });
                                            }}>
                                        修改选中
                                    </Button>
                                    <Popconfirm title={'确定删除?'}
                                                okText={'确定'}
                                                cancelText={'点错了'}
                                                onConfirm={() => {
                                                    // TODO
                                                }}
                                                onCancel={() => {
                                                    // TODO
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
                </Row>

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
                            // 发送数据到后台
                            axios
                                .post('request/student/add', {
                                    number: this.state.addModalNumber,
                                    name: this.state.addModalName,
                                    college: this.state.addModalCollege,
                                    major: this.state.addModalMajor,
                                    sex: this.state.addModalSex,
                                    grade: this.state.addModalGrade,
                                    gpa: parseFloat(this.state.addModalGpa),
                                    phone: this.state.addModalPhone
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
                                        addModalNumber: '',
                                        addModalName: '',
                                        addModalCollege: '',
                                        addModalMajor: '',
                                        addModalSex: '',
                                        addModalGrade: '',
                                        addModalGpa: '',
                                        addModalPhone: ''
                                    });
                                });
                        }}
                       confirmLoading={this.state.addModalDealing}>
                    <Form layout={'inline'}>
                        <Form.Item label={'学号'}>
                            <Input placeholder={'学号'}
                                   value={this.state.addModalNumber}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalNumber: e.target.value
                                       });
                                       console.log(JSON.stringify(this.state));
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'姓名'}>
                            <Input placeholder={'姓名'}
                                   value={this.state.addModalName}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalName: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'学院'}>
                            <Input placeholder={'学院'}
                                   value={this.state.addModalCollege}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalCollege: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'专业'}>
                            <Input placeholder={'专业'}
                                   value={this.state.addModalMajor}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalMajor: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'性别'}>
                            <Input placeholder={'性别'}
                                   value={this.state.addModalSex}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalSex: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'年级'}>
                            <Input placeholder={'年级'}
                                   value={this.state.addModalGrade}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalGrade: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'绩点'}>
                            <Input placeholder={'绩点'}
                                   value={this.state.addModalGpa}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalGpa: e.target.value
                                       });
                                   }}/>
                        </Form.Item>
                        <Form.Item label={'手机'}>
                            <Input placeholder={'手机'}
                                   value={this.state.addModalPhone}
                                   onChange={(e) => {
                                       this.setState({
                                           addModalPhone: e.target.value
                                       });
                                   }}/>
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
                           // TODO
                       }}>
                    <Form layout={'inline'}>
                        <Form.Item label={'学号'}>
                            <Input placeholder={'学号'}/>
                        </Form.Item>
                        <Form.Item label={'姓名'}>
                            <Input placeholder={'姓名'}/>
                        </Form.Item>
                        <Form.Item label={'学院'}>
                            <Input placeholder={'学院'}/>
                        </Form.Item>
                        <Form.Item label={'专业'}>
                            <Input placeholder={'专业'}/>
                        </Form.Item>
                        <Form.Item label={'性别'}>
                            <Input placeholder={'性别'}/>
                        </Form.Item>
                        <Form.Item label={'年级'}>
                            <Input placeholder={'年级'}/>
                        </Form.Item>
                        <Form.Item label={'绩点'}>
                            <Input placeholder={'绩点'}/>
                        </Form.Item>
                        <Form.Item label={'手机'}>
                            <Input placeholder={'手机'}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </FixedLayout>
        );
    }
}