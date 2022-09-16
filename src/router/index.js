import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import store from '@/store'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

Vue.use(VueRouter)
// 需要重写VueRouter.prototype对象身上的push/replace方法
// 先把VueRouter.prototype身上的push/replace方法进行保存
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写VueRouter.prototype身上的push方法
// 第一个形参：路由跳转的配置对象（query|params）
// 第二个参数：undefined|箭头函数（成功的回调）
// 第三个参数:undefined|箭头函数（失败的回调）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // originPush：利用call修改上下文，变为(路由组件.$router)这个对象
        originPush.call(this, location, resolve, reject)
    } else {
        // 如果没有传递成功或者失败的回调
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写VueRouter.prototype身上的replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
const router = new VueRouter({
    routes: [
        // 重定向，在项目跑起来的时候，访问/立马让其定向到home
        {
            path: '/',//路径*或者/表示项目地址
            /* 
            当打包构建应用时，JavaScript 包会变得非常大，
            影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
            */
            component: () => import('@/pages/Home'),
            meta: { isShow: true }
        },
        {
            path: '/Home',
            component: () => import('@/pages/Home'),
            meta: { isShow: true }
        },
        {
            path: '/Login',
            component: Login,
            meta: { isShow: false }
        },
        {
            path: '/Register',
            component: Register,
            meta: { isShow: false }
        },
        {
            name: 'search',
            // 在params参数占位符后加上?,表示params参数可传可不传
            path: '/Search/:keyword?',
            component: Search,
            meta: { isShow: true },
            // 路由组件可以传递props属性
            // props的对象写法，传递对象的属性
            // props:{a:'rao'}

            // props的Boolean写法，给props属性传递params参数
            // props:true

            // props的函数写法，给props属性传递params，query参数
            props: (route) => {
                return {
                    keyword: route.params.keyword,
                }
            }
        },
        {
            name: 'detail',
            path: '/Detail/:skuId',
            component: Detail,
            meta: { isShow: true }
        },
        {
            name: 'addCartSuccess',
            path: '/AddCartSuccess',
            component: AddCartSuccess,
            meta: { isShow: true }
        },
        {
            name: 'shopCart',
            path: '/ShopCart',
            component: ShopCart
        },
        {
            name: 'trade',
            path: '/Trade',
            component: Trade,
            beforeEnter(to, from, next) {
                if (from.path.indexOf('/ShopCart') !== -1) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/Pay',
            component: Pay,
            beforeEnter(to, from, next) {
                if (from.path.indexOf('/Trade') !== -1) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/PaySuccess',
            component: PaySuccess
        },
        {
            path: '/Center',
            component: Center,
            children: [
                {
                    path: 'MyOrder',
                    component: MyOrder
                },
                {
                    path: 'GroupOrder',
                    component: GroupOrder
                },
                {
                    path: '/Center',
                    redirect: '/Center/MyOrder'//重定向
                }
            ]
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    let token = store.state.userOptions.token;
    let isUserInfo = Object.keys(store.state.userOptions.userInfo || {}).length === 0
    if (token) {
        // 用户登入了
        if (to.path === '/Login' || to.path === '/Register') {
            if (isUserInfo) {
                next()
            } else {
                next('/Home')
            }
        } else {
            if (isUserInfo) {
                store.dispatch('userOptions/getLoginUserInfo').then(() => {
                    next()
                }, () => {
                    store.dispatch('userOptions/logoutUser').then(() => {
                        next('/Login')
                    }, (error) => {
                        console.warn(error)
                        next('/Home')
                    })
                })
            } else {
                next()
            }
        }
    } else {
        // 用户没有登入
        /* 
        点击购物车的结算按钮->交易页面【没有登录:去不了】
        未登录不能调到支付页面
        未登录不能调到支付成功页面
        未登录不能去个人中心【都不知道你是谁：展示谁的个人中心啊】
        */
        if (to.path.indexOf('/Trade') !== -1 || to.path.indexOf('/Pay') !== -1 || to.path.indexOf('/Center') !== -1) {
            next(`/Login?redirect=${to.path}`);
        } else {
            next();
        }

    }
})
export default router