import React from 'react';
import { FixedLayout } from "../../../component/layout/fixed-layout";
import { FixedRow } from "../../../component/layout/fixed-row";
import { Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export class StudentSelectIndexPage extends React.Component {
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
                            <Breadcrumb.Item><a>选课系统</a></Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </FixedRow>
            </FixedLayout>
        );
    }
}