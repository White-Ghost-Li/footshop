<template>
    <div>
      <div class="goods">
        <div class="menu-wrapper">
          <ul ref="menusUI">
            <li class="menu-item" v-for="(good,index) in goods" :key="index"
                :class="{current:index===currentIndex}" @click="clickMenuItem(index)">
              <span class="text bottom-border-1px">
                <img :src="good.icon" class="icon" v-if="good.icon"/>
                {{good.name}}
              </span>
            </li>
          </ul>
        </div>

        <div class="foods-wrapper">
          <ul ref="foodsUI">
            <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
              <h1 class="title">{{good.name}}</h1>
              <ul>
                <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                    :key="index" @click="showFood(food)">
                  <div class="icon">
                    <img :src="food.icon" width="57" height="57"/>
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <CartControl :food="food" @addCart="addCart"></CartControl>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <ShopCart ref="shopCart"/>
      </div>
      <Food :food="food" ref="food" @addCart="addCart"/>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import Food from '../../../components/Food/Food.vue'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    data(){
      return{
        scrollY: 0,
        menuScrollY:0,
        menuTops:[],
        tops: [],
        food: {}
      }
    },
    mounted(){
      this.$store.dispatch("getGoods",() => {
      //数据更新 之后执行
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
        this._initMenuTops()
      })
    })

    },

    computed:{
      ...mapState(['goods']),
        //计算得到当前分类的下标
      currentIndex(){
        //得到条件数据
        const {scrollY,tops} = this
        //根据条件计算产生一个结果
        let index = tops.findIndex((top,index) => {
          return scrollY >= top && scrollY < tops[index+1];
        })
        if(index > 7){
          index =8
          this.menuScrollY = this.menuTops[index - 7]
          this.menuScroll.scrollTo(0,-this.menuScrollY,300)
        }
        if(index===0){
          this.menuScroll.scrollTo(0,0,300)
        }
        return index;
      }

    },
    components:{
      CartControl,
      Food,
      ShopCart
    },
    methods:{
      _initScroll(){
        //列表显示之后创建
        this.menuScroll =new BScroll('.menu-wrapper',{
          click:true
        });
        this.foodsScroll=new BScroll('.foods-wrapper',{
          probeType:2,   //2:因为惯性不会触发  3：因为惯性会触发
          click:true
        });
        //给右侧列表添加scroll监听
        this.foodsScroll.on('scroll',({x, y}) =>{
          this.scrollY = Math.abs(y)
        });
        //给右侧列添加scrollEnd监听（滚动结束）
        this.foodsScroll.on('scrollEnd',({x , y}) =>{
          this.scrollY = Math.abs(y)
        })
      },
      _initTops(){
        //初始化tops
        const tops = []
        let top = 0
        tops.push(top)
        //收集
        const lis=this.$refs.foodsUI.getElementsByClassName("food-list-hook");
        //伪数组转为真数组
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        //更新数据
        this.tops = tops
      },
      _initMenuTops(){
        let tops=[]
        let top=0
        tops.push(top)
        const lis = this.$refs.menusUI.getElementsByClassName('menu-item');
        Array.prototype.slice.call(lis).forEach(li =>{
          top += li.clientHeight
          tops.push(top)
        })
        this.menuTops = tops
      },
      clickMenuItem(index){
        //获取左侧分类目标位置的scrollY
        const scrollY = this.tops[index]
        //立即更新scrollY（让点击的分类成为当前项）
        this.scrollY = scrollY
        //平滑滚动右侧列表
        this.foodsScroll.scrollTo(0,-scrollY,300)
      },
      showFood(food){
        this.food = food
        this.$refs.food.toggleShow()
      },
      addCart(el){
        this.$nextTick(() => {
          this.$refs.shopCart.jump(el)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixins.styl';
  .goods
    display: flex;
    position: absolute;
    top: 205px;
    bottom: 46px;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .menu-wrapper
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current
          position: relative;
          z-index: 1;
          margin-top: -1px;
          background: #fff;
          color: $green;
          font-weight: 700;
          .text
            border-none();
        .icon
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        .text
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          bottom-border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
    .foods-wrapper
      flex: 1;
      .title
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      .food-item
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        &:last-child
          border-none();
          margin-bottom: 0;
        .icon
          flex: 0 0 57px;
          margin-right: 10px;
        .content
          flex: 1;
          .name
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          .desc, .extra
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          .desc
            line-height: 12px;
            margin-bottom: 8px;
          .extra
            .count
              margin-right: 12px;
          .price
            font-weight: 700;
            line-height: 24px;
            .now
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            .old
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
          .cartcontrol-wrapper
            position: absolute;
            right: 0;
            bottom: 4px;
</style>
