// 当前这个模块：api进行统一管理
import requests from './request'
import mockRequests from './mockRequest'
// 获取三级联动数据
export const reqCategoryList = () => {
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}
// 获取banner轮播图数据
export const reqBannerList = () => {
    return mockRequests({url:'/banner',method:'get'})
}
// 获取floor组件数据
export const reqFloorList = () => {
    return mockRequests({url:'/floor',method:'get'})
}

// 获取search组件的数据
export const reqSearchInfo = (params={}) => {
    return requests({url:'/list',method:'post',data:params})
}

// /api/item/{ skuId }获取detail商品详情数据
export const reqDetailInfo = (skuId) => {
    return requests({url:`/item/${skuId}`,method:'get'})
}

// /api/cart/addToCart/{ skuId }/{ skuNum }
// 添加购物车/改变购物车产品的数量
export const reqaddorupdatesku = ({skuId,skuNum}) => {
    return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}

// 获取购物车的数据/api/cart/cartList
export const reqShopCartList = () => {
    return requests({url:'/cart/cartList',method:'get'})
}

// /api/cart/deleteCart/{skuId} 删除购物车的商品
export const reqDeleteShopCart = (skuId) => {
    return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

// /api/cart/checkCart/{skuID}/{isChecked} 修改购物车产品的勾选状态
export const reqChangeChecked = ({skuID,isChecked}) => {
    return requests({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
}

// /api/user/passport/sendCode/{phone}
// 获取注册验证码
export const reqGetVerifyCode = (phone) => {
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}

// /api/user/passport/register 参数{phone,password,code}
// 注册用户
export const reqRegisterUser = (data) => {
    return requests({url:'/user/passport/register',method:'post',data})
}

// /api/user/passport/login 参数：phone password
// 用户登入
export const reqLoginUser = (data) => {
    return requests({url:'/user/passport/login',data,method:'post'})
}

// /api/user/passport/auth/getUserInfo 获取用户信息
export const reqLoginUserInfo = () => {
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}

// /api/user/passport/logout 用户退出登入
export const reqLogoutUser = () => {
    return requests({url:'/user/passport/logout',method:'get'})
}

// /api/user/userAddress/auth/findUserAddressList 获取用户地址信息
export const reqGetUserAddressList = () => {
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}

// /api/order/auth/trade 获取订单交易信息
export const reqGetTradeInfo = () => {
    return requests({url:'/order/auth/trade',method:'get'})
}

// /api/order/auth/submitOrder?tradeNo={tradeNo} 提交订单
export const reqSumbitTrade = ({tradeNo,data}) => {
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
}

// /api/payment/weixin/createNative/{orderId} 获取订单的支付信息
export const reqPayTradeInfo = (orderId) => {
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

// /api/payment/weixin/queryPayStatus/{orderId} 获取订单的支付状态
export const reqPayStatus = (orderId) => {
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

// /api/order/auth/{page}/{limit} 获取订单列表
export const reqMyOrderList = (page,limit) => {
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}