import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'

import './mock/mockServe.js'
import loading from './common/image/loading.gif'
import './filters'
//注册全局组件标签
Vue.component(Button.name,Button);   //<mt-button>
Vue.use(VueLazyLoad,{
  loading
});

new Vue({
  el: '#app',
  //components: { App },
  //template: '<App/>'
  render: h => h(App),
  router,
  store
});
