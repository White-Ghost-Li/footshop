<template>
  <div class="order">
    <HeaderTop title="订单列表"/>
    <div class="order_no_login" v-if="!userInfo._id">
      <!-- <img src="/static/js/order.ico"/> -->
	  <img src="./image/ear.jpg"/>
      <h3>登录后查看外卖订单</h3>
      <button @click="goProfile">立即登陆</button>
    </div>
	<div v-else-if="userInfo.order">
		<li v-for="(item,index) in userInfo.order" key="index">			
		</li>
	</div>
	<div v-else class="order_no_login">
		<img src="./image/ear.jpg"/>
		<button @click="goMsite">添加订单</button>
	</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
	computed:{
		...mapState(['userInfo'])
	},
	methods:{
		goProfile(){
			
		},
		goMsite(){
			
		}
	},
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .order
    width 100%
    .order_no_login
      padding-top  140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
</style>
