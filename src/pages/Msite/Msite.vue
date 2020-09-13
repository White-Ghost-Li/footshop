<template>
  <div class="msite">
    <!--首页-->
    <HeaderTop :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id ? '/userInfo' : '/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userInfo._id">登陆/注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-tuanduicankaoxian-3"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <div class="msite_content_wrapper">
      <nav class="msite_nav">
        <div class="swiper-container" dir="rtl" v-if="foodTypes.length"> 
          <div class="swiper-wrapper">			  
            <div class="swiper-slide" v-for="(foodTypes,index) in foodTypesArr" :key="index" >
              <a href="javascript:" class="link_to_food" v-for="(foodType,index) in foodTypes" :key="index">
                <div class="food_container">
                  <!-- <img :src="base_image_url+foodType.image_url" /> -->
									<img src="./image/star.png" />
                </div>
                <span>{{foodType.title}}</span>
              </a>
            </div>
          </div>
           <!-- 如果需要分页器-->
		  <div class="swiper-pagination"></div>
        </div>
		<div class="swiper-slide" v-else>
           <img src="./image/msite_back.svg" alt="back"/>
        </div>
      </nav>
      <!--首页附近商家-->

      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-liebiaodaohang_zongyi"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
          <SwiperList/>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'

  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import SwiperList from '../../components/ShopList/ShopList.vue'

  export default {
    mounted() {
      this.$store.dispatch('getFoodTypes');
      this.$store.dispatch('getShops');
	  this.$store.dispatch('getAddress');
    },
    computed: {
      ...mapState(['address','userInfo','foodTypes','shops']),
      
      //根据foodTypes生成一个二维数组
     foodTypesArr () {
       const {foodTypes}=this
       //准备一个二维数组
       const arr = [];
       //=准备一个小数组，最大长度为8
       let minarr = [];
       //遍历foodTypes
       foodTypes.forEach(f => {
         //如果小数组已经满了，则创建一个新的
         if(minarr.length===8){
           minarr = []
         }
         //如果小数组为空，则将小数组保存到arr中
         if(minarr.length===0){
           arr.push(minarr)
         }
         //将当前foodTypes分类保存到小数组中
         minarr.push(f)
       })
       return arr
     }
    },

    watch:{
      foodTypes(value){//foodTypes数组有数据了，在异步数据更新界面之前执行
        //界面更新就立即创建swiper对象
        this.$nextTick(()=>{//一旦完成界面更新，立即调用（词条语句要写在数据更新之后）
          //创建一个swiper实例对象，来实现轮播
          // new Swiper('.swiper_container',{
          //   loop:true,  //可以循环轮播
          //   //如果需要分页器
          //   pagination:{
          //     el:'.swiper-pagination'
          //   }
          // })
		  
		  new Swiper('.swiper-container',{
		    loop: true,  //可以循环轮播
		    autoplay:{delay:1000},
		    //如果需要分页器
		    pagination:{
		      el:'.swiper-pagination',
		      clickable :true
		    }
		  });
		  
        })
 
      }
    },

    components: {
        HeaderTop,
        SwiperList
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .msite
    width 100%
    .header_search
      position absolute
      left 15px
      width 10%
      height 50%
      top 50%
      transform translateY(-50%)
      .icon-sousuo
        font-size 30px
        color #fff
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
    .msite_content_wrapper
      position: absolute;
      top: 34px;
      bottom: 46px;
      width: 100%;
      .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 45px
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display: flex;
              justify-content: center;
              align-items: flex-start;
              flex-wrap: wrap;
              .link_to_food
                width: 25%;
                .food_container
                  display: block;
                  width: 100%;
                  text-align: center;
                  padding-bottom: 10px;
                  font-size: 0;
                  img
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                span
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 13px;
                  color: #666;
          .swiper-pagination
            >span.swiper-pagination-bullet-active
              background: #02a774;
    .msite_shop_list
      top-border-1px(#e4e4e4)
      /*margin-top 10px*/
      background #fff
      &:before
        height 0px
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
