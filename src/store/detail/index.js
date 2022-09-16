import { reqDetailInfo ,reqaddorupdatesku} from "@/api"
import { uuId } from "@/tools/uuid"
const actions = {
    getDetailInfo(context,value){
        reqDetailInfo(value).then((response) => {
            context.commit('GETDETAILINFO',response.data)
        },(error) => {
            console.warn(error)
        })
    },
    addShopcarNum(context,value){
        return reqaddorupdatesku(value).then((response) => {
            return 'ok'
        },(error) => {
            return Promise.reject(new Error('file'))
        })
    }
}
const mutations = {
    GETDETAILINFO(state,value){
        state.DetailInfo = value
    }
}
const state = {
    DetailInfo: {},
    uuid_token:uuId()
}
const getters = {
    categoryView(state){
        return state.DetailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.DetailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.DetailInfo.spuSaleAttrList || []
    }
}

const detailOptions = {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}

export default detailOptions