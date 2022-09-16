import { reqCategoryList,reqBannerList,reqFloorList } from "@/api";
const actions = {
    getCategoryList(context){
        reqCategoryList().then((response) => {
            context.commit('GETCATEGORYLIST',response.data)
        },(error) => {
            console.warn(error)
        })
    },
    getBannerList(context){
        reqBannerList().then((response) => {
            context.commit('GETBANNERLIST',response.data)
        },(error) => {
            console.warn(error)
        })
    },
    getFloorList(context){
        reqFloorList().then((response) => {
            context.commit('GETFLOORLIST',response.data)
        },(error) => {
            console.warn(error)
        })
    }
}
const mutations ={
    GETCATEGORYLIST(state,value){
        state.CategoryList = value
    },
    GETBANNERLIST(state,value){
        state.BannerList = value
    },
    GETFLOORLIST(state,value){
        state.FloorList = value
    }
}
const state = {
    CategoryList:[],
    BannerList:[],
    FloorList:[]
}

const homeOptions = {
    namespaced:true,
    actions,
    mutations,
    state
}
export default homeOptions