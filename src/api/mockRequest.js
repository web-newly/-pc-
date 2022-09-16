// 对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"
// 1:利用axios对象的方法create，去创建一个axios案例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置基础路径，发请求的时候，路径当中会出现api
    baseURL:"/mock",
    timeout:3000
});
// 请求拦截器：在发送请求时之前，请求拦截器可以检测到，可以在请求发送出去之前处理一些逻辑
requests.interceptors.request.use((config) => {
    nprogress.start();
    // config：配置对象，对象里面有一个属性很重要，header请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((response) => {
    nprogress.done()
    return response.data
},(error) => {
    return Promise.reject(new Error('faile'))
})

export default requests