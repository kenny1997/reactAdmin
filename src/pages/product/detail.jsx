import React,{Component} from 'react'
import {Card,List} from 'antd'
import { LeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
//shangpin路由
import { reqCategory } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';

const Item =List.Item
export default class ProductDetail extends Component {
    state={
        cName1:'',
        cName2:''
    }
   async componentDidMount(){
       
        const {pCategoryId,categoryId}=this.props.location.state.product
        //console.log(pCategoryId,categoryId)
        if(pCategoryId==='0'){
           const result=await reqCategory(categoryId)
           //console.log(result.name)
            const cName1=result.data.data.name
            this.setState({
                cName1
            })
        }else{
            /* const result1=await reqCategory(pCategoryId)
            const result2=await reqCategory(categoryId)
            const cName1=result1.data.data.name
            const cName2=result2.data.data.name */
            //console.log(result1.data.data.name)
            const results=await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            const cName1=results[0].data.data.name
            const cName2=results[1].data.data.name
            this.setState({
                cName1,
                cName2
            })
        }
    }
    render() {
        const {cName1,cName2}=this.state
        const {name,desc,price,detail,imgs}=this.props.location.state.product
        const title=(
            <span>
                <LinkButton>
                <LeftOutlined 
                onClick={()=>this.props.history.goBack()}
                style={{color:'green',marginRight:15}}/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
                return (

            <Card title={title} className='productDetail'>
                <List>
                    <Item className='item'>
                        <span className='left'>商品名称</span>
                        <span >{name}</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品描述</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品价格</span>
                        <span>{price}</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>所属分类</span>
                        <span>{cName1}{cName2?'-->'+cName2:''}</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品图片</span>
                        <span>
                            {
                                imgs.map(img=><img 
                                    key={img}
                                    className='productImg' 
                                    src={BASE_IMG_URL+img}
                                    alt='img' />)
                            }
                     

                        </span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品详情</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>

                </List>

            </Card>
        )



    }


}