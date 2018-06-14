import React from 'react';
import { Table, Button, Row, Col, Breadcrumb, Modal, message } from 'antd';
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
            loadDown: false
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
            data: [{
                key: 1,
                id: 1,
                number: '161520311',
                name: '黄文麒',
                college: '计算机科学与技术学院',
                major: '信息安全',
                sex: '男',
                grade: '大三',
                gpa: '3.0',
                phone: '15651603126'
            }],
            selectedKeys: [],
            loadDown: true
        });

        // TODO 发送请求获取数据，当获取数据完毕设置loadDown为true
        axios
            .post('/request/student/getAll')
            .then((res) => {

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
                                    <Button type={'primary'}>新增</Button>
                                    <Button type={'danger'}
                                            disabled={this.state.selectedKeys.length <= 0}>
                                        修改选中
                                    </Button>
                                    <Button type={'danger'}
                                            disabled={this.state.selectedKeys.length <= 0}>
                                        删除选中
                                    </Button>
                                    <Button>刷新</Button>
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
            </FixedLayout>
        );
    }
}