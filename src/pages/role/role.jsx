import React,{Component} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
}from 'antd'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api'
import memoryUtils from "../../utils/memoryUtils"
import Addform from './addForm'
import UpdateForm from './updateForm'
import { PAGE_SIZE } from '../../utils/constants'
import { formateDate } from '../../utils/dataUtils'
//role路由
export default class Role extends Component {
    state={
        roles:[],
        role:{},
        isShow:0
    }
    constructor(props){
        super(props)

    this.auth = React.createRef()}
    initColumn=()=>{
        this.columns=[
            {
                title:'角色列表',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render: (auth_time) => formateDate(auth_time)
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
    addRole=()=>{
        this.form.validateFields().then(async(values)=>{
        const roleName=this.form.getFieldValue("roleName")
        const result=await reqAddRole(roleName)
        
        console.log(result.data)
        if(result.data.status===0){
            message.success(`添加角色${roleName}成功`)
            this.getRoles()
            
        }else{
            message.error('添加失败')
        }
        this.setState({
            isShow:0
        })
    })
    }
    updateRole=async()=>{
        this.setState({
            isShow:0
        })
        //id  menus time name
        const role=this.state.role
        const menus=this.auth.current.getMenus()
        role.menus=menus
        role.auth_time=formateDate(Date.now())
        role.auth_name=memoryUtils.user.username
        console.log(memoryUtils.user)
        const result=await reqUpdateRole(role)
        if(result.data.status===0){
            message.success('更新成功')
        }else{
            message.error('更新失败')
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
                <Button type='primary' disabled={!role._id} onClick={()=>this.setState({
                    isShow:2
                })  } >设置角色权限</Button>
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
                this.form.resetFields()
            }}
            >
                <Addform
                setForm={(form)=>{this.form=form}}
                />


            </Modal>
            <Modal
            title='修改角色权限'
            visible={isShow===2}
            onOk={this.updateRole}
            onCancel={()=>{
                this.setState({
                    isShow:0
                })
            }}
            >
                <UpdateForm
                role={role}
                ref={this.auth}
                />


            </Modal>

             </Card>
        )



    }


}