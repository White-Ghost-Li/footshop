<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(score,index) in scoreArr" :key="index" :class="score"></span>
  </div>
</template>

<script>
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
    export default {
      props:{
        score:Number,
        size:Number
      },
      computed:{
        scoreArr(){

          const {score}=this;
          let scs=[];
          const scoreInteger=Math.floor(score);
          for(let i= 0;i<scoreInteger;i++){
            scs.push(CLS_ON)
          }
          if(score*10-scoreInteger*10>=5){
            scs.push(CLS_HALF)
          }
          while(scs.length<5){
            scs.push(CLS_OFF)
          }
          return scs;
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .star
    /*float left*/
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('./image/star48_on')      /*./image/star48_on*/
        &.half
          bg-image('./image/star48_half')      /*./image/star48_half*/
        &.off
          bg-image('./image/star48_off')      /*./image/star48_off*/
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./image/star36_on')      /*./image/star36_on*/
        &.half
          bg-image('./image/star36_half')   /*./image/star36_falf*/
        &.off
          bg-image('./image/star36_off')    /*./image/star36_off*/
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size  10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./image/star24_on')     /*./image/star24_on*/
        &.half
          bg-image('./image/star24_half')     /*./image/star24_falf*/
        &.off
          bg-image('./image/star24_off')      /*./image/star24_off*/
</style>
