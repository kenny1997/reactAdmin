import React, { Component } from 'react';
//import { Button,message } from 'antd';
//import 'antd/dist/antd.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component{

  render(){
    return (
      <BrowserRouter>
        <Switch>{/* 1111*/}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}