import React,{useEffect} from "react";
import{
    Form,    
    Input
}from 'antd'

const Item=Form.Item;

const ChangeForm=(props)=>{
  
    const [form] = Form.useForm();
    //props.setForm(form)
    
    
    useEffect(() => {
        // Update the document title using the browser API
        props.setForm(form)
        
      });
    
    
        //const {getFieldInstance}=this.props.Form;
    
    //console.log(categoryName)
   
    
        
        return(
            <Form form={form} >
                
                <Item name='categoryName'                  
                rules={[
                    {
                      required: true,
                      message: 'Please input !',
                    },
                  ]} >
                <Input  placeholder="请输入" />
                </Item>
            </Form>
        )

    
}
export default ChangeForm
