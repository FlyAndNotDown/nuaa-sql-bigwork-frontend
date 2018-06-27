import React from 'react';
import { Col, Breadcrumb, Input, Form } from 'antd';
import { Link } from  'react-router-dom';
import { FixedLayout } from "../../../component/layout/fixed-layout";
import { FixedRow } from "../../../component/layout/fixed-row";
import { serverConfig } from "../../../config";
import axios from 'axios';

export class AdminScriptIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
            log: ''
        };
    }

    render() {
        return (
            <FixedLayout>
                <FixedRow>
                    <Col>
                        <Breadcrumb className={'font-size-20px'}>
                            <Breadcrumb.Item><Link to={'/'}>登录</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={'/admin'}>管理员</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><a>手动SQL查询</a></Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className={'font-size-35px'}>手动SQL查询</h1>
                        <FixedRow>
                            <Col span={18} offset={3}>
                                <h1 className={'text-align-center font-size-25px color-grey'}>
                                    输入你的SQL语句以执行
                                </h1>
                                <Form>
                                    <Form.Item>
                                        <Input.Search
                                            placeholder={'输入你的SQL语句，不需要加分号'}
                                            enterButton
                                            onSearch={(sql) => {
                                                axios
                                                    .post(`${serverConfig.url}/request/sql/do`, {
                                                        sql: sql
                                                    })
                                                    .then((res) => {
                                                        if (res.data.success) {
                                                            this.setState((pre) => {
                                                                let newThing = '';
                                                                newThing += `[SQL ${pre.count} 状态] 成功!\n`;
                                                                if (res.data.result.length === 0) {
                                                                    newThing += `[SQL ${pre.count} 结果] 空集\n`;
                                                                } else {
                                                                    res.data.result.map((t, no) => {
                                                                        newThing += `[SQL ${pre.count} 结果 ${no + 1}] ${JSON.stringify(t)}\n`
                                                                    });
                                                                }
                                                                newThing += '\n';
                                                                return {
                                                                    count: pre.count + 1,
                                                                    log: pre.log + newThing
                                                                };
                                                            });
                                                        } else {
                                                            this.setState((pre) => ({
                                                                count: pre.count + 1,
                                                                log: pre.log + `[SQL ${pre.count} 状态] 失败!\n` +
                                                                `[SQL ${pre.count} 原因] ${JSON.stringify(res.data.err)}\n\n`
                                                            }));
                                                        }
                                                    });
                                            }}/>
                                    </Form.Item>
                                    <br/>
                                    <Form.Item>
                                        <Input.TextArea
                                            autosize={{
                                                minRows: 18,
                                                maxRows: 18
                                            }}
                                            readOnly
                                            value={this.state.log}/>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </FixedRow>
                    </Col>
                </FixedRow>
            </FixedLayout>
        );
    }
}