<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in FloorList" :key="floor.id" :floorObj="floor"/>
    <Brand/>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from "@/pages/Home/Brand"
export default {
    name:'Home',
    components:{
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    computed:{
      ...mapState('homeOptions',['FloorList'])
    },
    mounted(){
      this.getFloorList()
    },
    methods:{
      ...mapActions('homeOptions',['getFloorList'])
    }
}
</script>

<style>

</style>