import React, { Component } from "react";
import './index.less'
import { formateDate } from '../../utils/dataUtils'
import { reqWeather } from "../../api";
import { withRouter } from "react-router-dom";
import menuList from '../../config/menucConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Modal, Select } from 'antd'
import LinkButton from "../link-button";
import sun from '../../assets/imagines/晴天.png'


class Header extends Component {
    state = {
        currentTime: Date.now(),
        weather: '',
        city:'广州'

    }
    getTime = () => {
        this.IntervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({
                currentTime
            })
        }, 1000)
    }
    getWeather = async (value) => {
        //console.log(value)
        let code=440100;
        if(value==='gz') {code=440100;}
        if(value==='bj') {code=110101;}
        if(value==='sz') {code=440300;}
        if(value==='sh') {code=310100;}
        
        const { weather,city } = await reqWeather(code)
        this.setState({
            weather,
            city
        })
    }
    getTitle = (path) => {
        let title
        menuList.forEach(menu => {
            if (menu.key === path) { title = menu.title }
            else if (menu.children) {
                menu.children.forEach(item => {
                    if (path.indexOf(item.key) === 0) {
                        title = item.title
                    }
                })
            }
        })
        return title
    }
    logout = () => {
        Modal.confirm({
            content: '确定退出吗?', onOk: () => {
                console.log('OK')
                // 移除保存的 user 
                storageUtils.removeUser()
                memoryUtils.user = {} // 跳转到 login 
                this.props.history.replace('/login')
            },
            onCancel() { console.log('Cancel') },
        })
    }
    //第一次render之后执行  在这里一般启动定时器或者发ajax
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.IntervalId)
    }

    render() {
        const { currentTime, weather } = this.state
        const { Option } = Select;
        const path = this.props.location.pathname
        const title = this.getTitle(path)




        return (
            <div className="header">
                <div className='header-top'>
                    <span>欢迎 admin</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>

                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span className='header-bottom-right-weather'> <Select  defaultValue="gz" onChange={this.getWeather}>
                            <Option value="gz">广州</Option>
                            <Option value="sz">深圳</Option>
                            <Option value="sh">上海</Option>               
                            <Option value="bj">北京</Option>
                        </Select>
                        </span>
                        <span>当前时间{currentTime}</span>
                        <img src={sun} alt="晴天" />
                        <span>天气{weather}</span>

                    </div>

                </div>

            </div>
        )
    }
}



export default withRouter(Header)