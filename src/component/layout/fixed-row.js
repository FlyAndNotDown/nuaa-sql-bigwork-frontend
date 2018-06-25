import React from 'react';
import { Row } from 'antd';

export class FixedRow extends React.Component {
    constructor(props) {
        super(props);

        this.className = 'width-100 height-100 margin-60px-auto';
    }

    render() {
        return (
            <Row className={this.props.className ?
                this.className + ` ${this.props.className}` :
                this.className}>
                {this.props.children}
            </Row>
        );
    }
}