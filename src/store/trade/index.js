import {reqGetTradeInfo,reqGetUserAddressList} from '@/api'
const actions = {
    // 获取用户地址信息
    getUserAddressList(context){
        reqGetUserAddressList().then((response) => {
            context.commit('GETUSERADDRESSLIST',response.data)
        },(error) => {
            console.warn(error)
        })
    },
    // 获取用户订单信息
    getTradeInfo(context){
        reqGetTradeInfo().then((response) => {
            context.commit('GETTRADEINFO',response.data)
        },(error) => {  
            console.warn(error)
        })
    }
}
const mutations = {
    GETTRADEINFO(state,value){
        state.tradeInfo = value
    },
    GETUSERADDRESSLIST(state,value){
        state.userAddressList = value
    }
}
const state = {
    tradeInfo:{},
    userAddressList:[]
}
const getters = {}

const tradeOptions = {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}

export default tradeOptions