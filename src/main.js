//导入vue插件
import Vue from "vue";

//路由:1导入vue路由构造函数
import VueRouter from "vue-router"

//导入vant-ui 组件
import Vant from "vant"
import { Toast } from "vant"  //导入给拦截器(js文件内部)使用方法  不用注册  注册是给组件用的


//导入 axios
import axios from "axios";


//导入src下的
//个人中心页
import App from "./App.vue"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Personal from "@/pages/Personal"
import EditProfile from "@/pages/EditProfile"
import UserFollow from "@/pages/UserFollow"
import UserComment from "@/pages/UserComment"
import Test from "@/pages/test"

//首页
import Index from "@/pages/Index"
import PostDetail from "@/pages/PostDetail"
//搜索
import Search from "@/pages/Search"

//视频分页
import Video from "@/pages/Video"

//消息通知
import Notice from "@/pages/Notice"


//拆分的评论  拆分的文件要带后缀.vue
import Comment from "@/pages/comment/Index.vue"





//路由 在.vue文件中要使用router-link或者router-view需要注册下插件
Vue.use(VueRouter); //vue 路由
Vue.use(Vant);  //注册vant-ul

//把axios挂载到原型
Vue.prototype.$axios = axios;  //prototype方法可以通过$xxx 来调用xxx

//设置axios基准路径 每次请求都会加上改路径 
axios.defaults.baseURL = "http://127.0.0.1:3000"

//路由:2创建路由配置
const routes = [
    //测试
    {path:"/test",component:Test},

    // 个人中心页
    {path:"/login",component:Login},
    {path:"/regiser",component:Register},
    {path:"/personal",component:Personal},
    {path:"/edit_profile",component:EditProfile},
    {path:"/user_follow",component:UserFollow},
    {path:"/user_comment",component:UserComment},

    //动态路由配置
    {path:"/post_detail/:id",component:PostDetail},

    //首页
    {path:"/",component:Index},
    {path:"/search",component:Search},

    //视频分页
    {path:"/video",component:Video},

    //消息通知
    {path:"/notice",component:Notice},

    


    //拆分的评论  带id是要传ID过来
    {path:"/comment/:id",component:Comment},


]

//路由:3创建对象
const router = new VueRouter({
    routes
});

//路由守卫
//to要跳转之后的页面,要去哪
//from跳转之前的页面,来自那里的
//next 必须要调用的next(),括号里面写跳转的页面 空则不跳转,还可以重定向,next("/login")
 router.beforeEach((to,from,next) => {
    //是否有token
    const hasToken = localStorage.getItem("token");
    
    //判断是否需要登录权限的页面 to.path(获取当前页面路径)
    if(to.path === "/personal" || to.path === "/edit_profile"){
        if(hasToken){  //判断是否有token
            next();  //正常跳转
        }else{
            next("/login")  //没有token直接跳转登陆页
        }
    }else{
        next();  // 不需要登陆权限  所有人都可以浏览 
    }
 })


// axios 的统一拦截器,每次请求都会触发
//固定写法
axios.interceptors.response.use( res => {
    // console.log(res);
    const {message,statusCode} = res.data;
    if(statusCode === 401){
        Toast.fail(message) //调用vant请提示  只弹窗不影响其他的
    }

    //token过期了,或者token无效,一般原因可能是token被清空修改了 密码修改了
    if(message === "用户信息验证失败"){
        //跳转到登陆页
        router.push("/login")  //因为路由创建对象在前面  直接调用
    }
    return res;  //必须返回  不然拦截后其他找不到
})


new Vue({
    el:"#app",
    //路由:4挂载到根实例
    router,

    //指定一个组件渲染 这个组件成为最底层的组件
    render(createElement){
        // render函数使用是固定写法 
        return createElement(App);
    }
})