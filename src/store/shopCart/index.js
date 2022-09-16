import { reqShopCartList, reqaddorupdatesku, reqDeleteShopCart, reqChangeChecked } from "@/api"
const actions = {
    getShopCartList(context) {
        reqShopCartList().then((response) => {
            context.commit('GETSHOPCARTLIST', response.data)
        }, (error) => {
            console.warn(error)
        })
    },
    updateShopCartNum(context, value) {
        return reqaddorupdatesku(value).then((response) => {
            return 'ok'
        }, (error) => {
            return Promise.reject(new Error('file'))
        })
    },
    deleteShopCartInfo(context, value) {
        return reqDeleteShopCart(value).then(() => {
            return 'ok'
        }, (error) => {
            return Promise.reject(new Error('file'))
        })
    },
    deleteCheckedShopCart(context){
        let shopCartList = context.getters.shopCart
        let promiseAll = []
        for(let index in shopCartList){
            if(shopCartList[index].isChecked == 1){
                let promise = context.dispatch('deleteShopCartInfo',shopCartList[index].skuId)
                promiseAll.push(promise)
            }
        }
        return Promise.all(promiseAll)
    },
    changeShopCartChecked(context, value) {
        return reqChangeChecked(value).then(() => {
            return 'ok'
        }, (error) => {
            return Promise.reject(new Error('file'))
        })
    },
    changeAllShopCartChecked(context, value) {
        // 获取到购物车列表数据
        let shopCartList = context.getters.shopCart
        let isChecked = value?'1':'0'
        let promiseAll = []
        // console.log(shopCartList)
        for(let index in shopCartList){
            if(shopCartList[index].isChecked != isChecked){
                let promise = context.dispatch('changeShopCartChecked',{skuID:shopCartList[index].skuId,isChecked})
                promiseAll.push(promise)
            }
        }
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETSHOPCARTLIST(state, value) {
        state.ShopCartList = value
    }
}
const state = {
    ShopCartList: []
}
const getters = {
    shopCart(state) {
        let rao = 0,
            arr = [];
        for (let index in state.ShopCartList) {
            for (let i in state.ShopCartList[index].cartInfoList) {
                arr[rao++] = state.ShopCartList[index].cartInfoList[i];
            }
        }
        return arr;
    },
}

const shopCartOptions = {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}

export default shopCartOptions