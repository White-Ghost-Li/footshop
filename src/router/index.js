/*
* 路由器对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
//一级路由加载（全部加载）
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
//一级路由组件懒加载（当使用的时候在加载）
//const Msite = () => import('../pages/Msite/Msite.vue')
//const Order = () => import('../pages/Order/Order.vue')
//const Profile = () => import('../pages/Profile/Profile.vue')
//const Search = () => import('../pages/Search/Search.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
//const Login = () => import('../pages/Login/Login.vue')
//const Shop = () => import('../pages/Shop/Shop.vue')

//二级路由加载
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
//const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
//const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings.vue')
//const ShopInfo = () => import('../pages/Shop/ShopInfo/ShopInfo.vue')

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  //所有路由
  routes: [
    {
      path: '/msite',
      name:'Msite',
      component: Msite,
      meta:{		//配置元数据确定是否显示footer
        showFooter:true
      }
    },
    {
      path: '/order',
      name:'order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/shop',
      component: Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    },


    {
      path:'/',
      redirect:'/msite'
    }
  ]
})
