import React from 'react';
import { Layout } from 'antd';

export class FixedLayout extends React.Component {
    static localClassName = 'width-900px height-100 margin-0-auto background-color-main';

    render() {
        return (
            <Layout className={
                this.props.className ?
                    FixedLayout.localClassName + ' ' + this.props.className :
                    FixedLayout.localClassName
            }>
                {this.props.children}
            </Layout>
        );
    }
}