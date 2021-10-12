import React, {PureComponent } from "react";
import {
    Form,
    Tree,
    Input
} from 'antd'
import menuList from "../../config/menucConfig";


const Item = Form.Item;
export default class UpdateForm extends PureComponent {
    constructor(props){
    super(props)
    this.formRef = React.createRef()
    //this.props.setForm(this.formRef)
    const {menus}=this.props.role
    this.state={
        checkedKeys:menus,
        treeData:[]
    }
   }
   getMenus=()=>this.state.checkedKeys
   getTreeNodes=(menuList)=>{
    return menuList.reduce((arr,cur)=>{
        if(cur.children){
            arr.push({key:cur.key,title:cur.title,children:this.getTreeNodes(cur.children)})
        }else{
            arr.push({key:cur.key,title:cur.title})
        }

        return arr
    },[]
    )
}
onCheck=checkedKeys=>{
    this.setState({checkedKeys})
}
componentWillMount () {
    this.treeNodes = this.getTreeNodes(menuList)
    this.initData()
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
      
    })
    // this.state.checkedKeys = menus
  }


      
      
      
    initData=()=>{
        const treeData=[
            {
                title:'平台权限',
                key:'0-0',
                children:this.getTreeNodes(menuList)

        }
    ]
    this.setState({
        treeData
    })

    }
    
    render(){
        
        const {role} = this.props
        const {checkedKeys,treeData} = this.state
    
    const formItemLayout = {
        labelCol: { span: 4 },  // 左侧label的宽度
        wrapperCol: { span: 15 }, // 右侧包裹的宽度
      }
    
    return (
        <Form ref={this.formRef} >
            
            <Item 
            label='角色名称'
            name='roleName' {...formItemLayout}>
                <Input disabled  value={role.name}/>
            </Item>
            <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={treeData}
        >
          
        </Tree>
        </Form>
    )


}

}