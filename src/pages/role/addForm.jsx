import React, {useEffect } from "react";
import {
    Form,
  
    Input
} from 'antd'

const Item = Form.Item;

//要有错误提示  要用到高阶组件
const Addform = (props) => {


    const [form] = Form.useForm();
    //props.setForm(form)


    useEffect(() => {
        // Update the document title using the browser API
        props.setForm(form)

    });




    return (
        <Form form={form} >
            
            <Item 
            label='角色名称'
            name='roleName' rules={[{ required: true,message: '角色名称必须输入' }]}>
                <Input placeholder='请输入角色名称'  initialvalue='' />
            </Item>
        </Form>
    )


}

export default Addform