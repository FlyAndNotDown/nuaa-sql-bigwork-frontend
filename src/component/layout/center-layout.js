import React from 'react';
import { Row, Col } from 'antd';
import { FixedLayout } from "./fixed-layout";

export class CenterLayout extends React.Component {
    render() {
        return (
            <FixedLayout className={
                this.props.className ?
                    this.props.className : null
            }>
                <Row className={
                    this.props.rowClassName ?
                        'width-100 margin-auto-auto ' + this.props.rowClassName:
                        'width-100 margin-auto-auto'
                }>
                    <Col span={this.props.span} offset={
                        this.props.span % 2 === 0 ?
                            (24 - this.props.span ) / 2 :
                            (24 - this.props.span + 1) / 2
                    }>
                        {this.props.children}
                    </Col>
                </Row>
            </FixedLayout>
        );
    }
}