import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockSever'
import 'swiper/css/swiper.css'
import Pagination from '@/components/Pagination'
import * as API from '@/api'
import {MessageBox} from 'element-ui'
import vueLazyLoad from 'vue-lazyload'
import loadimage from '@/assets/atm.gif'
// 引入插件vee-validate
import '@/plugins/validate'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.prototype.$api = API
Vue.use(vueLazyLoad,{
  loading: loadimage
})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
