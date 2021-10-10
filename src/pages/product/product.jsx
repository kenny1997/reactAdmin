import React,{Component} from 'react'
//shangpin路由
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import './product.less'
import { Switch,Route ,Redirect} from 'react-router-dom'
import ProductDetail from './detail'
export default class Product extends Component {
    render() {
        return (

            <Switch> 
                <Route  path='/product' component={ProductHome} exact/>
                <Route  path='/product/addupdate' component={ProductAddUpdate}/>

                <Route exact path='/product/detail' component={ProductDetail}/>

                <Redirect to='/product' />

            </Switch>
        )



    }


}