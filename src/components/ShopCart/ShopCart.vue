<template>
    <div>
      <div class="shopcart">
        <div class="content">
          <div class="content-left" @click="toggleShow">
            <div class="logo-wrapper">
              <div class="logo" :class="{highlight:totalCount}">
                <i class="iconfont icon-xingzhuanggongnengtubiao-9" :class="{highlight:totalCount}"></i>
              </div>
              <div class="num" v-if="totalCount">{{totalCount}}</div>
            </div>
            <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
            <div class="desc">另外配送费{{info.deliveryPrice}}元</div>
          </div>
          <div class="content-right">
            <div class="pay" :class="payClass">{{payText}}</div>
          </div>
        </div>
        <!-- 定义一个小球 -->
        <div class="ball-container">
          <transition v-for="(ball,index) in balls" :key="index" name="jump" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
        <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>

          <div class="list-content">
            <ul>
              <li class="food" v-for="(food,index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" @addCart="addCart"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
        </transition>
      </div>
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {MessageBox,Toast} from 'mint-ui'
  import BScroll from 'better-scroll'
  import {mapState,mapGetters} from 'vuex'
  import CartControl from '../CartControl/CartControl.vue'
    export default {
      data(){
        return{
//          定义小球
          balls: [
            {show: false},
            {show: false},
            {show: false},
            {show: false},
            {show: false}
          ],
          jumpBalls:[],
          isShow: false
        }
      },
      computed:{
        ...mapState(['cartFoods','info']),
        ...mapGetters(['totalCount','totalPrice']),
        payClass(){
          const {totalPrice} = this
          const {minPrice} = this.info
          return totalPrice >= minPrice ? 'enough' : 'not-enough'
        },
        payText(){
          const {totalPrice} = this
          const {minPrice} = this.info
          if(totalPrice===0){
            return `￥${minPrice}元起送`
          }else if(totalPrice < minPrice){
            return `还差￥${minPrice-totalPrice}元配送`
          }else{
              return '去结算'
          }
        },
        listShow(){
            //如果总数量为0，直接不显示
          if(this.totalCount===0){
            this.isShow = false
            return false
          }
          if(this.isShow){
            this.$nextTick(()=>{
              //实现BScroll的实例是一个单例
              if(!this.scroll){
                this.scroll = new BScroll('.list-content',{
                  click:true
                })
              }else{
                this.scroll.refresh()   //让滚动条刷新一下：重新统计内容的高度
              }
            })
          }
          return this.isShow
        }
      },
      methods:{
        jump(el){
          //取出小球show为false的小球
          for(let i=0;i<this.balls.length;i++){
            let ball = this.balls[i];
            if(!ball.show){
              ball.show = true
              ball.el = el
              this.jumpBalls.push(ball);
              return;
            }
          }
        },
        beforeEnter(el){
          let count = this.balls.length;
          while(count--){
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();//获取小球相对于视口的位移（小球高度）
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);//负数，应为是从左上角往下的方向
              el.style.display = '';  //清空display
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              //处理内层动画
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter(el,done){
          let rf = el.offsetHeight; //手动触发html重绘
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend',done);
          })
        },
        afterEnter(el){
          let ball = this.jumpBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        },
        addCart(el){
          this.$nextTick(() => {
            this.jump(el)
          })
        },
        toggleShow(){
          if(this.totalCount >0) {
            this.isShow = !this.isShow
          }
        },
        clearCart(){
          MessageBox.confirm('你确定要清空购物车吗？').then(
            action =>{
              this.$store.dispatch('clearCart')
              Toast({
                message: '购物车已清空',
                position: 'bottom',
                duration: 3000
              })
            },
            action =>{
              Toast('取消清空')
            }
          )
        }
      },
      components:{
        CartControl
      }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl';
  .shopcart
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left
        flex: 1;
        .logo-wrapper
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight
              background: $green;
            .icon-xingzhuanggongnengtubiao-9
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight
                color: #fff;
          .num
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #ffffff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        .price
          display: inline-block;
          vertical-align: top;
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          border-right: 1px solid rgba(255,255,255,.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px
          line-height: 24px
          font-size: 12px
      .content-right
        flex: 0 0 105px;
        width: 105px;
        .pay
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          &.not-enough
            background: #2b333b;
          &.enough
            background: #00b43c;
            color: #fff;
    .ball-container
      .ball
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $green;
          transition: all .4s linear;
    .shopcart-list
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translateY(-100%);   /* 向上移动整个高度的距离100%*/
      &.move-enter-active, &.move-leave-active
        transition: transform 0.3s;
      &.move-enter, &.move-leave-to
        transform: translateY(0);
      .list-header
        height: 40px
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        .empty
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
      .list-content
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          bottom-border-1px(rgba(7, 17, 27, 0.1));
          .name
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          .price
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          .cartcontrol-wrapper
            position: absolute;
            right: 0;
            bottom: 6px;
  .list-mask
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0;
      background: rgba(7, 17, 27, 0);
</style>
