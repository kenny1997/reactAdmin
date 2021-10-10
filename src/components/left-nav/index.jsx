import React, { Component } from "react";
import { Link ,withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/imagines/logo.png'
import {  Menu,  } from 'antd';
//左侧导航栏
import menuList from '../../config/menucConfig'
import {
 // DesktopOutlined,
  PieChartOutlined,
 // FileOutlined,
 // TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
//const { Header, Content, Footer, Sider } = Layout;

class LeftNav extends Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  //根据数组生成标签
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
          <Link to={item.key}>
          {item.title}
          </Link>
        </Menu.Item>

        )
      } else {
        return (
          <SubMenu key={item.key} icon={<UserOutlined />} title={item.title}>
              
             {/*  <Menu.Item key="item.key" icon={<PieChartOutlined />}>
              <Link to={item.key} />
             {item.title}</Menu.Item> */}
              
              
                {this.getMenuNodes(item.children)}
              
            </SubMenu>
            
        
    )
  }
})

  }


render() {
  //得到当前请求路径
  const path=this.props.location.pathname;
 // const { collapsed } = this.state;
  return (

    <div className="left">
      <Link to='/' className="leftHeader">
        <img src={logo} alt="logo" />
        <h1>kenny后台</h1>
      </Link>

      
        
         
          <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to='/home'>
              首页
              </Link>
            </Menu.Item>
            
            <SubMenu key="sub1" icon={<UserOutlined />} title="商品">
              
              <Menu.Item key="/category" icon={<PieChartOutlined />}>
                <Link to='/category' />
                品类管理</Menu.Item>
              
              
              <Menu.Item key="/product" icon={<PieChartOutlined />}>
              <Link to='/product' />
                商品管理</Menu.Item>
              
            </SubMenu>
            
            <Menu.Item key="/user" icon={<FileOutlined />}>
              <Link to='/user'>用户管理</Link>
            </Menu.Item>
            
            
            <Menu.Item key="/role" icon={<FileOutlined />}>
              角色管理<Link to='/role' />
            </Menu.Item>
            
            <SubMenu key="sub2" icon={<TeamOutlined />} title="图形图表">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="7">Team 2</Menu.Item>
            </SubMenu> */}
            {
              this.getMenuNodes(menuList)

            }
          </Menu>
        
        {/*   <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout> */}
      


    </div>

  )
}
}
//高阶组件包装非路由组件
//向路由组件传递history location match
export default withRouter(LeftNav)