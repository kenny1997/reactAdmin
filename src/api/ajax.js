
import axios from "axios";
import { message } from "antd";
//返回值是promise  data type 给默认参数
//请求异常
export default function ajax(url,data={},type='GET') {
    return new Promise((resolve,reject)=>{
        let promise
        if(type==='GET') {
            promise= axios.get(url,{
                params: data
            })
        } else{
            promise= axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response)
        }).catch(error=>{
            message.error(error.message)
        })

    })
    
    


}