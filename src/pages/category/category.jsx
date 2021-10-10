import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'
import LinkButton from '../../components/link-button';
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api';
import Addform from './AddFrom';
import ChangeForm from './ChangeForm'
import {
  ArrowRightOutlined
} from '@ant-design/icons'


//首页路由
export default class Category extends Component {
  state = {
    categorys: [],//一级分类列表
    subCategorys: [],//二级分类列表
    loading: false,
    parentId: '0',//当前显示的一级列表
    parentName: '',//当前显示的父节点的名称
    showStatus: 0  //1显示添加2显示更新

  }

  getCategorys = async () => {
    this.setState({ loading: true })

    const { parentId } = this.state;
    const result = await reqCategorys(parentId);//获取第一或第二级分类列表
    this.setState({ loading: false })
    //console.log(result.status)
    //console.log(result.data.data)
    if (result.status === 200) {//成功
      const categorys = result.data.data;
      if (parentId === '0') {//说明是父节点
        this.setState({
          categorys
        })
      } else {//否则是子节点
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取列表失败')
    }
  }
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
      //修改父id的值
    }, () => {
      //获取二级分类列表
      this.getCategorys()
    }
      //setState以后不能立即更新state

    )
  }
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }
  addCategory = () => {
    this.form.validateFields().then(async (values) => {
      this.setState({
        showStatus: 0
      })
      //收集数据 提交请求
      const { parentId } = this.form.getFieldsValue()
      const categoryName = this.form.getFieldValue('categoryName')
      //console.log(categoryName,parentId)
      this.form.resetFields()
      const result = await reqAddCategory(categoryName, parentId)
      //console.log(result)
      if (result.data.status === 0) {
        //成功
        if (parentId === this.state.parentId) {//添加的就是当前的分类
          this.getCategorys();
        } else if (parentId === '0') {
          this.getCategorys('0')
        }
      }//if if (result.data.status === 0)
      }//async后面
      )//then方法

}//整体大括号

changeCategory = () => {
  //先关闭
  //再发请求更新
  //再重新显示

  this.form.validateFields().then(async (values) => {
    this.setState({
      showStatus: 0
    })

    const categoryId = this.category._id;
    //console.log(this.category)
    const categoryName = values.categoryName
    //console.log(this.val)
    //this.val 就是输入框的修改的名字
    this.form.resetFields()
    const result = await reqUpdateCategory({ categoryId, categoryName })
    //console.log(result.data.status)
    if (result.data.status === 0) {
      this.getCategorys();
    }
  }
  ).catch(errorinfo => {
    console.log(errorinfo)
  }

  )

}

showAdd = () => {
  this.setState({
    showStatus: 1
  })
}
showChange = (category) => {
  //console.log(category)
  this.category = category

  this.setState({
    showStatus: 2
  })
}
handleCancel = () => {
  this.form.resetFields()
  this.setState({
    showStatus: 0
  })
};

/*
初始化Table所有列的数组
*/
initColumns = () => {
  this.columns = [
    {
      title: '分类的名称',
      dataIndex: 'name', // 显示数据对应的属性名
    },
    {
      title: '操作',
      width: 300,
      render: (category) => ( // 返回需要显示的界面标签
        <span>
          <LinkButton onClick={() => this.showChange(category)}>修改</LinkButton>
          {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看</LinkButton> : null}


        </span>
      )
    }
  ]
}
//为第一次render准备数据
componentWillMount() {

  this.initColumns();
}
//执行异步任务，发异步ajax请求
componentDidMount() {
  this.getCategorys();

}

render() {

  const category = this.category || "";
  const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state;
  const title = parentId === '0' ? '一级分类列表' : (
    <span>
      <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
      <ArrowRightOutlined style={{ marginRight: 5 }} />
      <span>{parentName}</span>
    </span>
  )
  //card的右侧
  const extra = (
    <Button type='primary' onClick={this.showAdd}>
      <Icon type='plus'>
      </Icon>
      添加
    </Button>
  )



  return (



    <Card title={title} extra={extra} >
      <Table
        dataSource={parentId === '0' ? categorys : subCategorys}//通过父id判断显示一级还是二级
        bordered
        loading={loading}
        rowKey='_id'
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        columns={this.columns} />
      <Modal title="添加分类" visible={showStatus === 1}
        onOk={this.addCategory}
        onCancel={this.handleCancel}

      >

        <Addform categorys={categorys}
          parentId={parentId}
          setForm={(form) => { this.form = form }}
        />
      </Modal>
      <Modal title="修改分类" visible={showStatus === 2} onOk={this.changeCategory}
        onCancel={this.handleCancel}>
        <ChangeForm categoryName={category.name}
          setForm={(form) => { this.form = form }}
        />
      </Modal>
    </Card>
  )



}


}