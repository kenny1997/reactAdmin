import React,{Component} from "react"
import './login.less'
import logo from '../../assets/imagines/logo.png'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
//import { withRouter } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from "react-router-dom";

const Item=Form.Item;
export default class Login extends Component{
    
  
    onFinish=async(values)=>{
      
      console.log('提交ajax')
      const {username,password}=values

      const response=await reqLogin(username,password)
      const result=response.data
      console.log(result)
      if(result.status===0){
        message.success('登录成功')

        const user=result.data
        memoryUtils.user=user//保存在内存中
        storageUtils.saveUser(user)//保存在store
        console.log(user)
        this.props.history.push('/')
        console.log(this)
      } else{
        message.error(result.msg)
      }

    }
    render(){
      //如果已经登录自动到管理界面
      const user=memoryUtils.user
      
      if(user&&user._id){
        return <Redirect to='/' />

      }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
      name="normal_login"
      className="login-form"
      onFinish={this.onFinish}
      initialValues={{
        remember: true,
        username:'admin',
        password:'admin'
      }}
      
     
    >
      <Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
          {
            min: 4,
            message: '至少为四位',
          },
          {
            max: 12,
            message: '最多12',
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '字母下换线数字',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
   

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>

                </section>
            
            </div>
        )
    }

}

