<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="isUserInfo">
            <span>请</span>
            <router-link to="/Login">登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <span>{{userInfo.name}}</span>
            <a class="register" href="#" @click="logout">退出登入</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/Center">我的订单</router-link>
          <router-link to="/ShopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/Home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="jumpSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      keyword:''
    }
  },
  mounted(){
    this.$bus.$on('clearKeywordValue',() => {
      this.keyword = ''
    })
  },
  computed:{
    ...mapState('userOptions',['userInfo']),
    isUserInfo(){
      return Object.keys(this.userInfo || {}).length === 0
    }
  },
  methods:{
    jumpSearch(){
      // 路由组件传递query，params参数（字符串写法）
      // this.$router.push("/Search/"+this.keyWord+'?k='+this.keyWord.toUpperCase())

      // 路由组件传递query，params参数（模板字符串写法）
      // this.$router.push(`/Search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`)

      // 路由组件传递query，params参数（对象写法）
      /* 用对象写法传递params参数要配和name配置项才可以传递 path项不行 */
      let location = {
        name:'search',
        params:{
          // 使用undefined解决params参数传递空字符串所发生的路径错误
          keyword:this.keyword || undefined//如果传递空串路由跳转时地址会出错
        }
      }
      let isQueryEmpty = (Object.keys(this.$route.query).length === 0)
      if(!isQueryEmpty){
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    logout(){
      this.$store.dispatch('userOptions/logoutUser').then(() => {
        this.$router.push('/Home')
      },(error) => {
        console.warn(error)
      })
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>