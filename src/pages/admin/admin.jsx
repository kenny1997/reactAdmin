import React,{Component} from "react"
import { Redirect ,Route,Switch} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils"
import { Layout } from "antd"
import LeftNav from "../../components/left-nav"
import Header from "../../components/header"
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import Product from '../product/product'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'



const {Footer,Sider,Content}=Layout

export default class Admin extends Component{
    
    render(){
        const user=memoryUtils.user
        if(!user||!user._id){
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>

                    <Header>header</Header>
                    <Content style={{margin:20, backgroundColor:'#FFF'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/> 
                            <Route path='/role' component={Role}/> 
                            <Route path='/user' component={User}/> 
                            <Route path='/order' component={Order}/> 
                            <Route path='/charts/bar' component={Bar}/> 
                            <Route path='/charts/line' component={Line}/> 
                            <Route path='/charts/pie' component={Pie}/> 
                            <Redirect to='/home' />
                        </Switch>
                        
                        
                        
                    </Content>
                    <Footer style={{textAlign:'center',color:'#aaaaaa'}}>footer</Footer>
                </Layout>





            </Layout>
        )
    }

}