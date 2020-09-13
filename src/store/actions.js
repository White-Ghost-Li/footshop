/**
 * 多个事件回调函数的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation_types.js'
import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqInfo,
  reqGoods,
  reqRatings,
  reqSearch
} from '../api'

export default {
  //异步获取地址
  async getAddress({commit,state}){
    const geohash=state.latitude+','+state.longitude;
    //发送异步ajax请求
    const result = await reqAddress(geohash);
    //提交一个mutation
    if(result.code===0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //异步获取食品分类
  async getFoodTypes({commit}){
    const result = await reqFoodTypes();
    if(result.code===0){
      const foodTypes = result.data;
      commit(RECEIVE_FOODTYPES,{foodTypes})
    }
  },
  //异步获取商家列表
  async getShops({commit,state}){
    //const {longitude,latitude} = state
    const latitude = state.latitude;
    const longitude = state.longitude;
    const result = await reqShops(longitude,latitude);
    if(result.code===0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo();
    if(result.code===0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  async logout({commit}){
    // const result = await reqLogout();
    // if(result.code===0) {
      commit(RESET_USER_INFO)
    // }
  },
  //异步获取商家信息
  async getInfo({commit},shopNow,callback){
    const result  = await reqInfo(shopNow);
    if(result.code===0){
      const info = result.data;
      commit(RECEIVE_INFO,{info});
      callback && callback()
    }
  },
  //异步获取商家评价信息
  async getRatings({commit},callback){
    const result  = await reqRatings();
    if(result.code===0){
      const ratings = result.data;
      commit(RECEIVE_RATINGS,{ratings});
      callback && callback()
    }
  },
  //异步获取商家商品信息
  async getGoods({commit},callback){
    const result  = await reqGoods();
    if(result.code===0){
      const goods = result.data;
      commit(RECEIVE_GOODS,{goods})
      callback && callback()
    }
  },
  //同步更新food中的count值
  updateFoodCount({commit},{food,isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT, {food})
    }else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  //同步清空购物车中数据
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  //异步获取搜索商家列表
  async getSearchShops({commit,state},keyword){

    const geohash = state.latitude+','+state.longitude;
    const result = await reqSearch(geohash,keyword);
    if(result.code===0){
      const searchShops = result.data;
	  commit(RECEIVE_SEARCH_SHOPS,{searchShops})
    }
  }
}
