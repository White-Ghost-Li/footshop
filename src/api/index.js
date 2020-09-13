/**
 * 包含n个接口请求函数的模块
 */
import ajax from './ajax.js'
//const BASE_URL = 'http://localhost:4000';
const BASE_URL='/api';
//根据经纬度获取位置详情
// export const reqAddress=(geohash) => ajax('${BASE_URL}/position/${geohash}');
export const reqAddress=() => ajax(BASE_URL+'/position',{},'get');
//获取食品分类列表
export const reqFoodTypes=() => ajax(BASE_URL+'/index_category',{},'get');
//根据经纬度获取商铺列表
export const reqShops=(longitude,latitude) => ajax(BASE_URL+'/shops',{longitude,latitude},'get')
//根据经纬度和关键字搜索商铺列表
export const reqSearch=(geohash,keyword) => ajax(BASE_URL+'/search_shops',{geohash,keyword},'get')
//获取一次性验证码
export const reqCaptcha=() => ajax(BASE_URL+'/captcha',{},'get')
//用户名密码登陆
export const reqPwdLogin=({name,pwd,captcha}) => ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
//用户退出
//export const reqLogout=() => ajax(BASE_URL+'/logout','get');
//发送短信验证码
export const reqPhoneCode=(phone) => ajax(BASE_URL+'/sendcode',{phone},'get')
//手机号验证码登陆
export const reqPhoneLogin=(phone,code) => ajax(BASE_URL+'/login_sms',{phone,code},'post')



//根据会话获取用户信息
export const reqUserInfo=() => ajax(BASE_URL+'/userinfo')

//获取商信息
// export const reqInfo = (shopNow) =>ajax('/info',{shopNow})       //mock模拟数据不需要代理api
export const reqInfo = (shopNow) =>ajax(BASE_URL+'/info',{shopNow},'get')       

//获取商户评价信息
export const reqRatings  = () =>ajax('/ratings')//mock模拟数据不需要代理api
//获取商户商品信息
export const reqGoods = () =>ajax('/goods')     //mock模拟数据不需要代理api
