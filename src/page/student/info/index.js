import React from 'react';
import { FixedLayout } from "../../../component/layout/fixed-layout";
import { FixedRow } from "../../../component/layout/fixed-row";
import { Col, Breadcrumb, Row, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

export class StudentInfoIndexPage extends React.Component {
    constructor(props) {
        super(props);
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
                        <Col span={12} offset={6}>
                            <br/>
                            <Form>
                                <Form.Item>
                                    <Input disabled/>
                                </Form.Item>
                            </Form>
                            <Form>
                                <Form.Item>
                                    <Input disabled/>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </FixedRow>
            </FixedLayout>
        );
    }
}