<template>
  <div id="app1">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
		created() {
			//在页面加载时读取sessionStorage里的状态信息
			if(sessionStorage.getItem('store')){
				this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(sessionStorage.getItem('store'))));
			}
			 //在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener('beforeunload',()=>{
				sessionStorage.setItem('store',JSON.stringify(this.$store.state));
			})
		},
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app1
    width 100%
    height 100%
    background #f5f5f5
</style>
