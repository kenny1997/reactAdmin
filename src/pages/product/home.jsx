import React,{Component} from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
}from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts,reqSearchProducts,reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

//shangpin路由
const Option=Select.Option
export default class ProductHome extends Component {
    state={
        total:0,//商品的总数量
        products:[],
        loading:false,
        searchName:'',//搜索的关键字
        searchType:'productName'
    
    }
    getProducts=async(pageNum)=>{
        this.pageNum=pageNum
        this.setState({
            loading:true
        })
        const {searchName,searchType}=this.state
        //console.log(pageNum,PAGE_SIZE,searchName,searchType)
        let result
        if(searchName){
            result=await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }else{
            result=await reqProducts(pageNum,PAGE_SIZE)

        }
  
        
        this.setState({
            loading:false
        })
        //console.log(result.data.data)
        if(result.data.status===0){
            const {total,list}=result.data.data
            //console.log(total,list)
            this.setState({
                total,
                products:list
            })
        }
    }

    initColumns=()=>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
           
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=>'$'+price
              
            },
            {   width:100,
                title: '状态',
                //dataIndex: 'status',
                render:(product)=>{
                    const {status,_id}=product
                    const newStatus=status===1?2:1
                    return(
                  <span>
                      <Button
                      onClick={()=>this.updateStatus(_id,newStatus)} 
                      type='primary'>{status===1?'下架':"上架"}</Button>
                      <span>{status===1?'在售':"已下架"}</span>
                  </span>)
                }
              },
              { width:100,
                title: '操作',
                
                render:(product)=>{
                    return(
                  <span>
                      <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                      <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                  </span>)
                }
              },
          ];
          
    }
    updateStatus=async(productId,status)=>{
        const result=await reqUpdateStatus(productId,status)
        //console.log(result.data)
        if(result.data.status===0){
            message.success('更新成功')
            this.getProducts(this.pageNum)
        }
    }

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getProducts(1)
    }
      
    render() {
        const {products,total,loading,searchType,searchName}=this.state
     
        

        const title=(
                <span>
                    <Select  value={searchType} onChange=
                    {value=>this.setState({searchType:value})}
                    
                    >
                        <Option value='productName'>按名称搜索</Option>
                        <Option value='productDesc'>按描述搜索</Option>

                    </Select>
                <Input placeholder='关键字' 
                value={searchName}
                onChange=
                    {event=>this.setState({searchName:event.target.value})}
                style={{width:150,margin:'0 15px'}}/>
                <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>

                </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>this.props.history.push('product/addupdate')}>
                <Icon type='plus' />
                添加商品
            </Button>
        )
        return (
           
            <Card title={title} extra={extra}>
                <Table dataSource={products} 
                rowKey='_id'
                bordered
                columns={this.columns}
                loading={loading}
                pagination={{
                    onChange:(pageNum)=>(this.getProducts(pageNum)),
                    total,defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
                />;


            </Card>
        )



    }


}