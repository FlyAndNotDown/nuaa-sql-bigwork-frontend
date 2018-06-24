import React from 'react';
import {  } from 'antd';
import { CenterLayout } from "../component/layout/center-layout";
import axios from 'axios';
import { serverConfig } from "../config";

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            str: ''
        };
    }

    render() {
        return (
            <div>
                <CenterLayout span={8}>

                </CenterLayout>
            </div>
        );
    }
}