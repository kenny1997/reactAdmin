import React, { Component } from 'react'
import {
    Card,
    Table,
    Modal,
    Button,
    message
} from 'antd'
import { reqAddUpdateUser, reqDeleteUser, reqUsers } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Addform from './addForm'
import { formateDate } from '../../utils/dataUtils'
import LinkButton from '../../components/link-button'
//user路由
export default class User extends Component {
    state = {
        isShow: 0,
        users: [],

        roles: []

    }
    getUsers = async () => {
        const result = await reqUsers()
        console.log(result.data.data)
        if (result.data.status === 0) {
            const {users,roles} = result.data.data
            this.initRoleNames(roles)
            this.setState({
                users,
                roles
            })

        }
    }
    initColumn = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email',

            },
            {
                title: '电话',
                dataIndex: 'phone',

            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                        </span>)
                }
            }

        ]
    }
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        this.roleNames = roleNames
    }
    showAdd = () => {
        this.user = null//清楚前面的user
        this.setState({
            isShow: 1
        })
    }
    showUpdate = (user) => {
        this.user = user
        this.setState({
            isShow: 1
        })
    }
    deleteUser = (user) => {
        Modal.confirm({
            title: `删除${user.username}吗`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.data.status === 0) {
                    message.success('删除成功')
                    this.getUsers()
                }
            }
        })
    }
    addUpdateUser = async () => {
        this.setState({
            isShow: 0
        })
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        if (this.user) {
            user._id = this.user._id
        }
        const result = await reqAddUpdateUser(user)
        if(result.data.status===0){
            message.success(`${this.user?'修改':'添加'}成功`)
            this.getUsers()
        }
    }

    componentWillMount() {
        this.initColumn()
    }
    componentDidMount() {
        this.getUsers()
    }
    render() {
        const { users, isShow, roles } = this.state
        const user = this.user || {}

        const title = (
            <span>
                <Button type='primary' onClick={this.showAdd}>创建用户</Button>&nbsp;&nbsp;

            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered               
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE }} />
                <Modal
                    title={user._id ? '修改用户' : '创建用户'}
                    visible={isShow === 1}
                    onOk={this.addUpdateUser}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({
                            isShow: 0
                        })

                    }}
                >
                    <Addform
                        setForm={(form) => { this.form = form }}
                        roles={roles}
                        user={user}
                    />
                </Modal>
            </Card>
        )
    }
}