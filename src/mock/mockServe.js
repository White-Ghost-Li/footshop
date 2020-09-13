/**
 * 使用mockjs 提供mock数据接口，（拦截ajax请求）
 */
import Mock from 'mockjs'
import data from './data.json'

//返回goods接口
Mock.mock('/goods',{code:0,data:data.goods})
//返回ratings接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//返回info接口
// Mock.mock('/info',{code:0,data:data.info})

//不需要向外界暴露任何数据，是需要保存能执行即可
