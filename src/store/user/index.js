import {reqGetVerifyCode,reqRegisterUser,reqLoginUser,reqLoginUserInfo, reqLogoutUser} from '@/api'
const actions = {
    // 获取验证码
    getCode(context,value){
        return reqGetVerifyCode(value).then((response) => {
            context.commit('GETCODE',response.data)
            return 'ok'
        },(error) => {
            return Promise.reject(new Error('faile'))
        })
    },
    // 用户注册
    registerUsers(context,value){
        reqRegisterUser(value).then(() => {
            return 'ok'
        },(error) => {
            return Promise.reject(new Error('faile'))
        })
    },

    // 用户登入
    loginUsers(context,value){
        return reqLoginUser(value).then((response) => {
            context.commit('LOGINUSERS',response.data.token)
            localStorage.setItem('TOKEN',response.data.token)
            return 'ok'
        },(error) => {
            return Promise.reject(error)
        })
    },

    // 获取用户信息
    getLoginUserInfo(context){
        return reqLoginUserInfo().then((response) => {
            context.commit('GETLOGINUSERINFO',response.data)
            return 'ok'
        },(error) => {
            console.warn(error)
            return Promise.reject(error)
        })
    },

    logoutUser(context){
        return reqLogoutUser().then(() => {
            context.commit('LOGOUTUSER')
            localStorage.removeItem('TOKEN')
            return 'ok'
        },(error) => {
            return Promise.reject(error)
        })
    }
}
const mutations = {
    GETCODE(state,value){
        state.verifyCode = value
    },
    LOGINUSERS(state,value){
        state.token = value
    },
    GETLOGINUSERINFO(state,value){
        state.userInfo = value
    },
    LOGOUTUSER(state){
        state.token = ''
        state.userInfo = {}
    }
}
const state = {
    verifyCode: '',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const getters = {}

const userOptions = {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}

export default userOptions