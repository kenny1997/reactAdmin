//包含所有请求函数的模块
import ajax from "./ajax"
import jsonp from "jsonp"
import { message } from "antd"


const BASE=''
export const reqLogin = (username,password)=>ajax(BASE+'/login',{username,password},'POST')
export const reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')

//获取分类列表
export const reqCategorys=(parentId)=>ajax('http://localhost:3000/manage/category/list',{parentId})
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')
// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')
//获取一个分类
export const reqCategory=categoryId=>ajax(BASE+'/manage/category/info',{categoryId})

//获取分页列表
export const reqProducts=(pageNum,pageSize)=>ajax(BASE + '/manage/product/list',{pageNum,pageSize})
export const reqUpdateStatus=(productId,status)=>ajax(BASE+'manage/product/updateStatus',{productId,status},'POST')
export const reqDeleteImg=(name)=>ajax('/manage/img/delete',{name},'POST')
//获取角色列表
export const reqRoles=()=>ajax('/manage/role/list')
//添加角色
export const reqAddRole=(roleName)=>ajax('/manage/role/add',{roleName},"POST")
//更新角色权限
export const reqUpdateRole=(_id,menus,auth_time,auth_name)=>ajax('/manage/role/update',{_id,menus,auth_time,auth_name},'POST')

//搜索商品分页列表
export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=>ajax(BASE + '/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]:searchName
})
export const reqAddUpdateProduct=(product)=>ajax('/manage/product/'+(product._id?'update':'add'),product,'POST')

//获取用户列表
export const reqUsers=()=>ajax('/manage/user/list')
//删除用户Us
export const reqDeleteUser=(userId)=>ajax('/manage/user/delete',{userId},'POST')

export const reqAddUpdateUser=(user)=>ajax('/manage/user/'+(user._id?'update':'add'),user,'POST')
//export const reqAUpdateProduct=(product)=>ajax('/manage/product/update',product,'POST')
//jsonp
export const reqWeather=(code)=>{
    return new Promise((resolve,reject)=>{
    const url=`https://restapi.amap.com/v3/weather/weatherInfo?key=6af3ceab43a4c6dab103993543491bdd&city=${code}`
    jsonp(url,{},(err,data)=>{
        console.log(err,data)
        if(!err&&(data.status==="1")){
            const {weather,city}=data.lives[0]
            resolve({weather,city})
        }else{
            message.error('获取天气信息失败')
        }

    })
    
    
    
    })
}
//reqWeather(110101);