/**
 * 多个getter计算属性函数的对象
 */
export default {
  //计算购物车中食物的数量
  totalCount(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
  },
  //计算购物车中食物总价
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)
  },
  //计算评价列表中满意的人数
  positiveSize(state){
    return state.ratings.reduce((preTotal,rating)=>preTotal+(rating.rateType===0?1:0),0)
  }

}
