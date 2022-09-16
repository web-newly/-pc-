<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="changeShow">
        <h2 class="all">全部商品分类</h2>
        <transition>
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item bo"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index,$event)">
                  <a href="" :data-categoryname="c1.categoryName" :data-category1id='c1.categoryId'>{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a href="" :data-categoryname="c2.categoryName" :data-category2id='c2.categoryId'>{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a href="" :data-categoryname="c3.categoryName" :data-category3id='c3.categoryId'>{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import {isUndefined} from "@/tools"
import { mapState, mapActions } from "vuex";
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
      // 用于存储用户鼠标移入一级项的索引值
      currentIndex: -1,
      isShow:true
    };
  },
  computed: {
    ...mapState("homeOptions", { categoryList: "CategoryList" }),
  },
  mounted() {
    if(this.$route.name === 'search' || this.$route.name === 'detail'){
      this.isShow = false
    }
  },
  methods: {
    // 给事件函数加上节流
    changeIndex:throttle(function(index,event){
      // 阻止事件的冒泡,但mouseenter事件默认不会冒泡
      event.stopPropagation();
      this.currentIndex = index;
    },100),

    leaveIndex:throttle(function(){
      this.currentIndex = -1
      if(this.$route.name === 'search' || this.$route.name === 'detail'){
        this.isShow = false
      }
    },100),
    // 实现三级联动的路由跳转
    goSearch(event){
      // 取消事件的默认行为
      event.preventDefault();
      let node = event.target
      // 判断点击的元素是否为a元素
      if(node.dataset.categoryname){
        let location = {name:'search'}
        let query = {categoryName:node.dataset.categoryname}
        let {category1id,category2id,category3id} = node.dataset
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else{
          query.category3Id = category3id
        }
        location.query = query
        if(isUndefined(this.$route.params)){
          location.params =  this.$route.params
        }
        this.$router.push(location)
      }
    },

    changeShow(){
      if(this.$route.name === 'search' || this.$route.name === 'detail'){
        this.isShow = true
      }
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .v-enter-active{
      animation: wen 1s linear;
    }

    @keyframes wen{
      0%{
        height:0px;
      }
      50%{
        height: 300px;
      }
      100%{
        height:461px;
      }
    }
  }
}
</style>