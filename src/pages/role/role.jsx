import React,{Component} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
}from 'antd'
import { reqAddRole, reqRoles } from '../../api'

import Addform from './addForm'
import { PAGE_SIZE } from '../../utils/constants'
//role路由
export default class Role extends Component {
    state={
        roles:[],
        role:{},
        isShow:0
    }
    initColumn=()=>{
        this.columns=[
            {
                title:'角色列表',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time'
            },
            {
                title:'授权时间',
                dataIndex:'auth_time'
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            },


        ]
    }
    getRoles=async()=>{
        let result=await reqRoles()
        //console.log(result.data)
        if(result.data.status===0){
            this.setState({
                roles:result.data.data
            })
        }
    }
    addRole=async()=>{
        const roleName=this.form.getFieldValue("roleName")
        const result=await reqAddRole(roleName)
        console.log(result)
        if(result.data.status===0){
            message.success(`添加角色${roleName}成功`)
            this.getRoles()
        }else{
            message.error('添加失败')
        }
        this.setState({
            isShow:0
        })
    }

    componentWillMount(){
        this.initColumn()
      
    }
    componentDidMount(){
        this.getRoles()
    }
    onRow=(role)=>{
        return{
            onClick:event=>{
                this.setState({
                    role
                })
            }
        }
    }



    render() {
        const {roles,role,isShow}=this.state
        const title=(
            <span>
                <Button type='primary'onClick={()=>this.setState({
                    isShow:1
                })
                }>创建角色</Button>&nbsp;&nbsp;
                <Button type='primary' disabled={!role._id}>设置角色权限</Button>
            </span>
        )




        return (
            <Card title={title}>
                <Table
                    bordered
                    onRow={this.onRow}
                    rowKey='_id'
                    rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE}}/>

           
            <Modal
            title='添加角色'
            visible={isShow===1}
            onOk={this.addRole}
            onCancel={()=>{
                this.setState({
                    isShow:0
                })
            }}
            >
                <Addform
                setForm={(form)=>{this.form=form}}
                />


            </Modal>

             </Card>
        )



    }


}