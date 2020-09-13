<template>
    <div class="shop-info">
      <div class="info-content">
        <div class="section">
          <h1 class="title">{{info.name}}</h1>
          <div class="desc border-1px">
            <Star :size="36" :score="info.score"></Star>
            <span class="text">({{info.ratingCount}})</span>
            <span class="text">月售{{info.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{info.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{info.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{info.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <span class="iconfont icon-aixin" :class="{active:favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <section class="bulletin">
          <h3 class="title">公告与活动</h3>
          <div class="bulletin-wrapper">
            <p class="bulletin">{{info.bulletin}}</p>
          </div>
        </section>
        <split></split>
        <section class="section">
          <h3 class="section-title">活动与服务</h3>
          <div class="section-activity">
            <div class="activity-item" :class="supportClass[support.type]" v-for="(support,index) in info.supports" :key="index">
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </div>
          </div>
        </section>
        <split></split>
        <section class="section">
          <h3 class="section-title">商家实景</h3>
          <div class="pic-wrapper">
            <ul class="pic-list" ref="picsUI">
              <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
                <img :src="pic" width="120" height="90"/>
              </li>
            </ul>
          </div>
        </section>
        <split></split>
        <section class="section">
          <h3 class="section-title">商家信息</h3>
          <ul class="detail">
            <li>
              <span class="bold">品类</span>
              <span>{{info.category}}</span>
            </li>
            <li>
              <span class="bold">商家电话</span>
              <span>{{info.phone}}</span>
            </li>
            <li>
              <span class="bold">地址</span>
              <span>{{info.address}}</span>
            </li>
            <li>
              <span class="bold">营业时间</span>
              <span>{{info.workTime}}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import {saveToLocal,loadFromLocal} from '../../../common/js/saveUtil.js'
  import Star from '../../../components/Star/Star.vue'
  import split from '../../../components/split/split.vue'
  export default {
    data(){
      return{
        supportClass:['activity-green','activity-red','activity-orange'],
        favorite: false
      }
    },
    computed:{
      ...mapState(['info']),
      favoriteText(){
        return this.favorite ? '已收藏': '收藏';
      }
    },
    methods:{
      _initScroll(){
        this.listScroll = new BScroll('.shop-info',{click: true});
        //计算ul宽度，执行水平滑动
        const ul = this.$refs.picsUI
        const liWidth = 120
        const space = 6
        const count = this.info.pics.length
        ul.style.width = (liWidth+space)*count-space+'px'
        this.photoScroll = new BScroll('.pic-wrapper',{
          scrollX: true   //水平滑动
        })
        this.favorite = loadFromLocal(this.info.id,'favorite',false);
      },
      toggleFavorite(){
        this.favorite = !this.favorite;
        saveToLocal(this.info.id,'favorite',this.favorite);
      }
    },
    mounted(){
      if(!this.info.pics){
        return
      }
      this.$store.dispatch('getInfo',()=>{
        this.$nextTick(()=>{
          this._initScroll()
        })
      })
    },
    watch:{
      info(){
        this.$nextTick(()=>{
          this._initScroll()
        })
      }
    },
    components:{
      Star,
      split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixins.styl';
  .shop-info
    position: absolute;
    top: 205px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .section
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .desc
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .text
          display: inline-block
          margin-right: 12px
          line-height: 18px
          vertical-align: top
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            line-weight: 700
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
      .favorite
        position: absolute
        width: 50px
        right: 11px
        top: 18px
        text-align: center
        .icon-aixin
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
      .section-activity
        margin-top: 16px;
        .activity-item
          padding: 10px
          display: flex;
          font-size: 13px;
          align-items: center;
          bottom-border-1px(rgba(7,17,27,.1))
          &:last-child
            border-none()
          &.activity-green
            .content-tag
              background-color: rgb(112, 188, 70);
          &.activity-red
            .content-tag
              background-color: rgb(240, 115, 115);
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79);
          .content-tag
            display: inline-block;
            border-radius: 2px;
            width: 36px;
            height: 18px;
            margin-right: 10px;
            color: #fff;
            font-style: normal;
            position: relative;
            .mini-tag
              position: absolute;
              left: 0;
              top: 0;
              right: -100%;
              bottom: -100%;
              font-size: 24px;
              transform: scale(0.5);
              transform-origin: 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
      .pic-wrapper
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 16px;
        .pic-list
          font-size: 0;
          .pic-item
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child
              margin: 0;
      .detail
        margin-bottom: -16px;
        >li
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: -10px;
          padding: 16px 12px 16px 0;
          line-height: 16px;
          bottom-border-1px(#ddd);
          font-size: 13px;
          >.bold
            font-weight: 700;
            color: #333;
          &:last-child
            border-none();
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7,17,27)
        font-size: 14px
      .bulletin-wrapper
        padding: 0 12px 16px 12px
        .bulletin
          padding: 0
          line-height: 24px
          color: rgb(240,40,40)
          font-size: 12px
</style>
