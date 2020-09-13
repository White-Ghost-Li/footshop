/**
 * ajax请求函数模块
 * 返回值：promise对象（异步返回的数据是：response.data）
 */
  import axios from 'axios';
	import qs from 'qs';
export default function ajax (url,data={},type){
  return new Promise(function(resolve,reject){
    //执行异步Ajax请求
    let promise
    if(type==='get'){
      //准备URL query参数数据
      let dataStr=''  //数据拼接字符串
      Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+'&'
      })
      if(dataStr!==''){
        dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'))
        url=url+'?'+dataStr
      }
      //发送get请求
      promise=axios.get(url)
    }else {
      //发送post请求
      promise=axios.post(url,qs.stringify(data,{indices:false}));
    }
    promise.then(function(response){
      //成功了调用resolve（）
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
