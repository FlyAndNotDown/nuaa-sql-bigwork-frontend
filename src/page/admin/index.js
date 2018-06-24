import React from 'react';
import { Form, Button, Select, Avatar } from 'antd';
import { CenterLayout } from "../../component/layout/center-layout";
import avatarImg from '../../img/avatar.jpg';

export class AdminIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'student'
        };
    }

    render() {
        return (
            <CenterLayout span={8}>
                <Form>
                    <Form.Item>
                        <h1 className={'text-align-center font-size-35px'}>
                            学生信息管理系统
                        </h1>
                        <h1 className={'text-align-center font-size-25px color-grey'}>
                            选择一项功能以开始
                        </h1>
                    </Form.Item>
                    <Form.Item>
                        <Select defaultValue={'student'} onChange={(value) => {
                            this.setState({
                                type: value
                            });
                        }}>
                            <Select.Option value={'student'}>学籍管理</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button className={'width-100'} type={'primary'} onClick={() => {
                            this.props.history.push(`/admin/${this.state.type}`);
                        }}>进入系统</Button>
                    </Form.Item>
                </Form>
                <div className={'affixBottom padding-left padding-left-40px'}>
                    <Avatar src={avatarImg}/>
                    <span className={'color-grey text-size-20px padding-left-10px'}>
                        Powered By John Kindem
                    </span>
                </div>
            </CenterLayout>
        );
    }
}