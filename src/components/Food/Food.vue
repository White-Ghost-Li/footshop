<template>
  <transition name="move">
    <div class="food" v-show="isShow">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" />
          <div class="back" @click="goBack">
            <i class="iconfont icon-fanhui" style="color: #fff"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <CartControl :food="food" @addCart="addCart"/>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @select="select" @toggleContent="toggleContent"/>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" class="avatar" :src="rating.avatar"/>
                </div>
                <div class="time">{{rating.rateTime | data-format}}</div>
                <p class="text">
                  <span :class="rating.rateType===0 ? 'icon-thumb-up1':'icon-thumb-down1' "></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import CartControl from '../CartControl/CartControl.vue'
  import split from '../split/split.vue'
  import RatingSelect from '../RatingSelect/RatingSelect.vue'

  const ROAST = 1
  const RECOMMEND = 0
  const ALL = 2

  export default {
    props:{
      food: Object
    },
    data(){
      return{
        isShow: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          recommend: '推荐',
          roast: '吐槽'
        }
      }
    },
    methods:{
      toggleShow(){
        this.isShow = true;
        this.selectType = this.selectType;
        this.onlyContent = this.onlyContent;
        this.$nextTick(() => {
          if(!this.BScroll){
            this.BScroll = new BScroll('.food',{
              click: true
            })
          }else{
            this.BScroll.refresh();
          }
        })
      },
      goBack(){
        this.isShow = false;
      },
      addFirst(){
        if(!this.food.count||this.food.count===0){
          this.$store.dispatch('updateFoodCount',{food: this.food,isAdd: true});
          this.$emit('addCart',event.target)
        }
      },
      addCart(el){
        this.$emit('addCart',el)
      },
      select(el){
        console.log(el);
        this.selectType = el;
        this.$nextTick(() => {
          this.BScroll.refresh();
        })
      },
      toggleContent(el){
        this.onlyContent = el;
        this.$nextTick(() => {
          this.BScroll.refresh();
        })
      },
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType === ALL){
          return true;
        }else{
          return type === this.selectType;
        }
      }
    },
    components:{
      CartControl,
      split,
      RatingSelect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .food
    position: fixed
    z-index: 40
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background: #fff
    transform: translate3d(0,0,0)
    &.move-enter-active,&.move-leave-active
      transition: transform .7s
    &.move-enter,&.move-leave-to
      transform: translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 5px
        .icon-fanhui
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count,.rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration:line-through
          font-size: 10px
          color: rgb(147,153,159)
      .cartControl-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        border-radius: 12px
        font-size: 10px
        color: rgb(255,255,255)
        background: rgb(0,160,220)
        &.fade-enter-active,&.fade-leave-active
          transition: all .5s
          opacity: 1
        &.fade-enter,&.fade-leave-to
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77,85,93)
    .rating
      padding-top: 18px
      .title
        line-height:14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7,17,27)
      .rating-wrapper
        padding: 0 18px
        ul
          padding: 0
          list-style-type: none
          .rating-item
            position: relative
            padding: 16px 0
            bottom-border-1px(rgba(7,17,27,0.1))
            .user
              position: absolute
              right: 0
              top: 16px
              line-height: 12px
              font-size: 0
              .name
                display: inline-block
                margin-right: 6px
                vertical-align: top
                font-size: 10px
                color: rgb(147,153,159)
              .avatar
                border-radius: 50%
            .time
              margin-bottom: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(7,17,27)
            .text
              line-height: 16px
              font-size: 12px
              color: rgb(7,17,27)
              .icon-thumb-up1,.icon-thumb-down1
                margin-right: 4px
                line-height: 16px
                font-size:12px
              .icon-thumb-up1
                color: rgb(0,160,220)
              .icon-thumb-down1
                color: rgb(147,153,159)
          .no-rating
            padding: 16px 0
            font-size: 12px
            color: rgb(147,153,159)
</style>
