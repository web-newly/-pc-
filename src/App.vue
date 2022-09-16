<template>
  <div id="app">
    <Header></Header>
    <keep-alive :include="['Home']">
      <router-view></router-view>
    </keep-alive>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components:{Header,Footer},
  mounted(){
    this.getCategoryList()
  },
  methods:{
    ...mapActions("homeOptions", ["getCategoryList"]),
  }
}
</script>

<style>

</style>
