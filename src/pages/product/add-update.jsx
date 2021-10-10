import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  //Upload,
  Cascader,
  Button,
  message
} from 'antd'
import LinkButton from '../../components/link-button'
import { LeftOutlined } from '@ant-design/icons';
import PicturesWall from './picture';
import { reqCategorys,reqAddUpdateProduct } from '../../api';

//shangpin路由

const { Item } = Form
const { TextArea } = Input
export default class ProductAddUpdate extends Component {

  state = {
    options: []

  }
  constructor(props){
    super(props)
    this.pw=React.createRef()
  }
  initOptions = async (categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    const {isUpdate,product}=this
    const {pCategoryId}=product
    //c,categoryId}
    if(isUpdate&&pCategoryId!=='0'){
      //获取二级列表
      const subCategorys=await this.getCategorys(pCategoryId)
      const childOptions=subCategorys.map(c=>({
       value:c._id,
       label:c.name,
       isLeaf:true

      }))
      //关联到option一级
      const targetOption=options.find(option=>option.value===pCategoryId)
      targetOption.children=childOptions
    }
    //console.log(options)
    this.setState({
      options
    })
  }
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0]
    // 显示loading
    targetOption.loading = true
    //根据选中分类来获取二级列表
    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false
    //console.log(targetOption.value)
    //console.log(subCategorys)
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      targetOption.children = childOptions

    } else {
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options]


    })

  }



  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    //console.log(result)
    if (result.data.status === 0) {
      const categorys = result.data.data
      if (parentId === '0') {
        this.initOptions(categorys)

      } else {
        return categorys
      }
    }

  }
  formRef = React.createRef();
  submit =() => {
    //表单验证
    this.formRef.current.validateFields().then(async(values )=> {
      console.log(values)
      const imgs=this.pw.current.getImgs()
      const{name,desc,price,categoryIds}=values
      let pCategoryId,categoryId
      if(categoryIds.length===1){
        pCategoryId='0'
        categoryId=categoryIds[0]
      }else{
        pCategoryId=categoryIds[0]
        categoryId=categoryIds[1]
      }
      const product={name,desc,price,imgs,pCategoryId,categoryId}
      if(this.isUpdate){
        product._id=this.product._id
      }
      const result =await reqAddUpdateProduct(product)
      if(result.data.status===0){
        message.success('更新或者添加成功')
        this.props.history.goBack()
      }else{
        message.error('shibaile')
      }


    }).catch(errorInfo => {
      alert(errorInfo)
    }


    )

  }
  onChange = (value) => {
    //console.log(value);
  }
  componentDidMount() {
    this.getCategorys('0')
  }
  componentWillMount(){
    const product=this.props.location.state
    this.isUpdate=!!product
    this.product=product||{}
  }

  render() {
    const {isUpdate,product}=this
    const {pCategoryId,categoryId,imgs}=product
    const categoryIds=[]
    if(isUpdate){
      if(pCategoryId==='0'){
      categoryIds.push(categoryId)
    }else{
      categoryIds.push(pCategoryId)
      categoryIds.push(categoryId)
    
    }
    }
    //用来接收级联分类
    const fromItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    const title = (
      <span>
        <LinkButton onClick={()=>this.props.history.goBack()}>
          <LeftOutlined></LeftOutlined>
        </LinkButton>
        <span>{isUpdate?'修改商品':'添加商品'}</span>
      </span>
    )
    return (


      <Card title={title} style={{ fontSize: 20 }}>
        <Form {...fromItemLayout} ref={this.formRef}>
          <Item label="商品名称"
            name='name'
            initialValue={product.name}
            rules={[{ required: true, message: '必须输入' }]}
          >
            <Input placeholder='商品名称'></Input>

          </Item>
          <Item label="商品描述"
          initialValue={product.desc}
            name='desc'
            rules={[{ required: true, message: '必须输入' }]}>
            <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
          </Item>
          <Item label="商品价格"
            name='price'
            initialValue={product.price}
            rules={[{ required: true, message: '必须输入' },

            ({ getFieldValue }) => ({
              validator(_, value) {

                if (value * 1 <= 0) {
                  return Promise.reject(new Error('必须正整数'));
                }
                return Promise.resolve();
              }
            }),
            ]}

          >
            <Input type='number' placeholder='商品价格' addonAfter='元'></Input>

          </Item>
          <Item label="商品分类"
           initialValue={categoryIds}
           rules={[{ required: true, message: '必须输入' }]}
           name='categoryIds'
          >
            <Cascader
             
              loadData={this.loadData}
              changeOnSelect
              options={this.state.options}
              onChange={this.onChange}
              placeholder="Please select"
            />

          </Item>
          <Item label="商品图片">
            <div>商品图片</div>

          </Item>
          <Item label="商品详情">
            <PicturesWall ref={this.pw} imgs={imgs}/>
          </Item>
          <Item >
            <Button type='primary' onClick={this.submit}>提交</Button>

          </Item>
        </Form>
      </Card>
    )



  }


}