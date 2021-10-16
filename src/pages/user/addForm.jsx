import React, { useEffect } from "react";
import {
    Form,
    Select,
    Input
} from 'antd'
const Item = Form.Item;
const Option = Select.Option
//要有错误提示  要用到高阶组件
const Addform = (props) => {
    const [form] = Form.useForm();
    //props.setForm(form)
    useEffect(() => {
        // Update the document title using the browser API
        props.setForm(form)
    })
    const { roles, user } = props
    const formItemLayout = {
        label: { span: 4 },
        wrapperCol: { span: 15 }
    }
    return (
        <Form form={form} {...formItemLayout}>
            <Item label='用户名' initialValue={user.username} name='username'>
                <Input placeholder='请输入用户名' />
            </Item>
            {
                user._id ? null : (<Item label='用户密码' initialValue={user.password}name='password'>
                    <Input placeholder='请输入密码' />
                </Item>
                )
            }
            <Item label='手机号' initialValue={user.phone} name='phone'>
                <Input placeholder='请输入手机号' />
            </Item>
            <Item label='邮箱' initialValue={user.email} name='email'>
                <Input placeholder='请输入邮箱' />
            </Item>
            <Item label='角色' initialValue={user.role_id} name='role_id'>
                <Select>
                    {
                        roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                    }
                </Select>
                
            </Item>
        </Form>
    )
}



export default Addform