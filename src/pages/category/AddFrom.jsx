import React, {useEffect } from "react";
import {
    Form,
    Select,
    Input
} from 'antd'

const Item = Form.Item;
const Option = Select.Option;
//要有错误提示  要用到高阶组件
const Addform = (props) => {


    const [form] = Form.useForm();
    //props.setForm(form)


    useEffect(() => {
        // Update the document title using the browser API
        props.setForm(form)

    });



    const { categorys, parentId } = props

    return (
        <Form form={form}>
            <Item initialValue={parentId} name='parentId'>
                <Select>
                    <Option value='0'>一级分类</Option>
                    {
                        categorys.map(c =>
                            <Option value={c._id} key={c._id}>{c.name}</Option>
                        )
                    }
                </Select>
            </Item>
            <Item name='categoryName' rules={[{ required: true,message: '分类名称必须输入' }]}>
                <Input placeholder='请输入分类名称'  initialvalue='' />
            </Item>
        </Form>
    )


}

export default Addform