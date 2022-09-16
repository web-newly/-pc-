<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="sku in shopCart" :key="sku.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="sku.isChecked"
              @change="changeChecked(sku.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl" />
            <div class="item-msg">{{ sku.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ sku.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum(-1, sku)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="sku.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum($event.target.value, sku)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeNum(1, sku)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ sku.skuPrice * sku.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShopCart(sku.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @click="changeALL"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#" @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalShopCartPrice.totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalShopCartPrice.total }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  computed: {
    ...mapState("shopCartOptions", ["ShopCartList"]),
    ...mapGetters('shopCartOptions',['shopCart']),
    totalShopCartPrice() {
      let total = 0;
      let totalNum = 0;
      for (let index in this.shopCart) {
        if (this.shopCart[index].isChecked == 1) {
          totalNum++;
          total += this.shopCart[index].skuPrice * this.shopCart[index].skuNum;
        }
      }
      return { total, totalNum };
    },
    isAllChecked() {
      return this.shopCart.length&&this.shopCart.every((item) => item.isChecked == 1);
    },
  },
  mounted() {
    this.getShopCartList();
  },
  methods: {
    ...mapActions("shopCartOptions", [
      "getShopCartList",
      "updateShopCartNum",
      "deleteShopCartInfo",
      "changeShopCartChecked",
      'changeAllShopCartChecked',
      'deleteCheckedShopCart',
    ]),
    ...mapActions('tradeOptions',['getTradeInfo']),
    // 改变商品的数量
    changeNum: throttle(function (skuNum, sku) {
      switch (skuNum) {
        case 1:
          break;
        case -1:
          if (sku.skuNum - 1 < 1) skuNum = 0;
          break;
        default:
          if (isNaN(skuNum * 1) || skuNum < 1) {
            skuNum = 0;
          } else {
            skuNum = parseInt(skuNum) - sku.skuNum;
          }
          break;
      }
      this.updateShopCartNum({ skuId: sku.skuId, skuNum }).then(
        () => {
          this.getShopCartList();
        },
        (error) => {
          console.warn(error);
        }
      );
    }, 1000),
    // 删除商品
    deleteShopCart(skuId) {
      this.deleteShopCartInfo(skuId).then(
        () => {
          this.getShopCartList();
        },
        (error) => {
          console.warn(error);
        }
      );
    },
    // 点击每个商品改变勾选状态
    changeChecked(skuId, event) {
      let isChecked = event.target.checked ? "1" : "0";
      this.changeShopCartChecked({ skuID: skuId, isChecked }).then(
        () => {
          this.getShopCartList();
        },
        (error) => {
          console.warn(error);
        }
      );
    },
    // 点击全选改变购物列表勾选状态
    changeALL(event) {
      let isChecked = event.target.checked
      this.changeAllShopCartChecked(isChecked).then(() => {
        this.getShopCartList()
      },(error) => {
        console.warn(error)
      })
    },
    // 删除以勾选的商品
    deleteChecked(event){
      event.preventDefault();
      this.deleteCheckedShopCart().then(() => {
        this.getShopCartList()
      },(error) => {
        console.warn(error)
      })
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>