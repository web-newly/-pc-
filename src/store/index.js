import Vue from 'vue'
import Vuex from 'vuex'
import homeOptions from '@/store/home'
import searchOptions from '@/store/search'
import detailOptions from '@/store/detail'
import shopCartOptions from '@/store/shopCart'
import userOptions from '@/store/user'
import tradeOptions from '@/store/trade'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        homeOptions,
        searchOptions,
        detailOptions,
        shopCartOptions,
        userOptions,
        tradeOptions
    }
})