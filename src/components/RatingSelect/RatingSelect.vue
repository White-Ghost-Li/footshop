<template>
    <div class="ratingSelect">
      <div class="rating-type">
        <span class="block recommend" :class="{active:selectType===2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span class="block recommend" :class="{active:selectType===0}" @click="select(0)">{{desc.recommend}}<span class="count">{{recommend.length}}</span></span>
        <span class="block roast" :class="{active:selectType===1}" @click="select(1)">{{desc.roast}}<span class="count">{{roast.length}}</span></span>
      </div>
      <div class="switch" :class="{on:onlyContent}" @click="toggleContent">
        <span class="iconfont icon-xuan"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ROAST = 1
  const RECOMMEND = 0
  const ALL = 2
  export default {
    props:{
      ratings: {
        type: Array,
        default: function(){
          return [];
        }
      },
      selectType: Number,
      onlyContent: Boolean,
      desc:{
        type: Object,
        default: function(){
          return {
            all: '全部',
            recommend: '满意',
            roast: '不满意'
          };
        }
      }
    },
    computed:{
      recommend: function(){
        return this.ratings.filter((rating) => {
          return rating.rateType === RECOMMEND
        })
      },
      roast() {
        return this.ratings.filter((rating) => {
          return rating.rateType === ROAST
        })
      }
    },
    methods:{
      select(type){
//        this.selectType = type
        this.$emit('select',type)
      },
      toggleContent(){
//        this.onlyContent = !this.onlyContent
        this.$emit('toggleContent',!this.onlyContent)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .ratingSelect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      bottom-border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77,85,93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.recommend
          background: rgba(0,160,220,.2)
          &.active
            background: rgb(0,160,220)
        &.roast
          background: rgba(77,85,93,.2)
          &.active
            background: rgb(77,85,93)
    .switch
      padding: 12px 18px
      line-height: 24px
      bottom-border-1px(rgba(7,17,27,0.1))
      color: rgb(147,153,159)
      font-size: 0
      &.on
        .icon-xuan
          color: #00c850
      .icon-xuan
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
