import {reqSearchInfo} from '@/api'
const actions = {
    getSearchInfo(context,value){
        reqSearchInfo(value).then((response) => {
            context.commit('GETSEARCHINFO',response.data)
        },(error) => {
            console.warn(error)
        })
    }
}
const mutations = {
    GETSEARCHINFO(state,value){
        state.SearchInfo = value
    }
}
const state = {
    SearchInfo:{}
}
const getters = {
    attrsList(state){
        return state.SearchInfo.attrsList || []
    },
    goodsList(state){
        return state.SearchInfo.goodsList || []
    },
    trademarkList(state){
        return state.SearchInfo.trademarkList || []
    }
}

const searchOptions = {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
export default searchOptions