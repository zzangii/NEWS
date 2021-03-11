<template>
  <div>
      <!-- 搜索头部 -->
      <div class="header">
          <!-- logo -->
          <span class="iconfont icon-new logo"></span>
          <!-- 搜索 -->
          <router-link to="/search">
          <div class="header-search">
              <span class="iconfont icon-sousuo"></span>
              <i>搜索新闻</i>
          </div>
          </router-link>
          <!-- 个人 -->
          <router-link to="/personal">
          <i class="iconfont icon-wode personl"></i>
          </router-link>
      </div>

        <!-- 导航栏 -->
        <van-tabs v-model="active" sticky>
            <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
                <!-- 下拉刷新 -->
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
                <!-- 文章列表信息 -->
                <!-- v-model 列表是否在加载 -->
                <!-- finished 是否加载完毕 -->
                <!-- load 到底触发的事件 -->
                <!-- immediate-check 禁止list立即触发onload -->
                <van-list
                v-model="item.loading"
                :finished="item.finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
                >
                    <PostCard
                     v-for="(item,index) in item.posts" :key="index" :post="item" />
                </van-list>
                </van-pull-refresh>
                <!-- 加载中 -->
                <van-loading size="24px" vertical
                v-if="item.posts.length === 0 && !item.finished" style="margin-top:20px "
                >加载中...</van-loading>
            </van-tab>
        </van-tabs>
        <!-- tabbar栏 -->
        <van-tabbar route>
            <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/video" icon="play-circle-o">视频</van-tabbar-item>
            <van-tabbar-item replace to="/notice" icon="chat-o">消息</van-tabbar-item>
            <van-tabbar-item replace to="/personal" icon="contact" v-show="istoken">我的</van-tabbar-item>
            <van-tabbar-item replace to="/login" icon="contact" v-show="!istoken">未登录</van-tabbar-item>
        </van-tabbar>  
  </div>
</template>

<script>
//导入组件  文章列表
import PostCard from "@/components/PostCard"
export default {
    name :"index",//动态组件配置  缓存页面
    data() {
        return {
            //判断是否有tolen
            istoken:localStorage.getItem("token") ? true : false,
            //下拉刷新
            isLoading: false,
            // 当前默认栏目
            //判断是否有token登陆 有则1 无则0
            active:localStorage.getItem("token") ? 1 :0, 
            //栏目的列表
            categories:[],
            //栏目id
            cid:8,

            //posts默认的头条文章列表  已经绑定到栏目里面了
            // posts:[],
            // //是否在加载
            // loading: false,
            // //是否有更多的数据
            // finished: false,


            //分页的数量 只用于第一次加载
            pageIndex:1,

            //每页多少条数据
            pageSize:5,
        }
    },
    components:{
        PostCard,
    },

    methods:{
        // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        onLoad(){
            setTimeout( () =>{

                // console.log("没有了");
                //请求文章列表
                this.$axios({
                    url:`/post?category=${this.cid}
                    &pageIndex=${this.categories[this.active].pageIndex}
                    &pageSize=${this.pageSize}`
                }).then( res => {
                    // console.log(res.data);
                    const {data} = res.data;
                    
                    //到最后一页就不加载了
                    if(data.length <this.pageSize){
                         this.categories[this.active].finished = true;
                    }

                    //数组合并 不会产生上一页不见
                    this.categories[this.active].posts = [
                    ...this.categories[this.active].posts,
                    ...data]
                    // console.log(this.categories[this.active].pageIndex);
                    this.categories[this.active].pageIndex++;//请求成功后页数加1
                    
                    //告诉onload事件这次的数据加载已经完毕，下次可以继续触发onload
                    this.categories[this.active].loading = false; 
                })
               
               
            },1000)
            
        }
    },

    watch:{
        active(){
            this.cid = this.categories[this.active].id;
            this.onLoad();
            // console.log(this.cid);
        }

    },

    mounted(){
        
        //因为需要判断是否有token 有的话要显示关注列表  然后要是没有token的话
        //拦截器会直接拦截转到登陆页 所以要先判断一下是否有token
        //实现思路:定义一个方法 判断是否有token 有的话给他加上头信息传过去 
        const config = {
            url:"/category",
        }
        if(localStorage.getItem("token")){
            config.headers = {
                Authorization: localStorage.getItem("token")
            }
            // //有token到第二个栏目  
            // this.active = 1  不能在这写  因为上面监听不到
        }
        //请求栏目的数据
        this.$axios(config).then( res => {
            // console.log(res);
            const {data} = res.data

            //循环给栏目中每一项都添加四个独立的属性
            const newData = []
            data.forEach(v => {
                v.posts = [];
                v.loading = false;
                v.finished = false;
                v.pageIndex = 1;
                newData.push(v);
            })
            this.categories = newData
            // console.log(this.categories);
            //请求文章列表
            this.$axios({
                url:`/post?category=${this.cid}&pageIndex=1&pageSize=${this.pageSize}`
            }).then( res => {
                // console.log(res.data);
                const {data} = res.data;
                //默认赋值给头条的列表
                this.categories[this.active].posts = data
                // console.log(this.categories);

                this.categories[this.active].pageIndex++;//请求成功后页数加1
            })
        });

        
    }

}
</script>

<style lang="less" scoped>

.header{
    display: flex;
    justify-content: space-between;
    height: (50 /360 * 100vw) *1;
    background-color: #FD0000;
    align-items: center;
    padding: 0 10px;
    .logo{
        padding: 0;
        color: #F2F2F2;
    }
    .header-search{
        display: flex;
        align-items: center;
        color: #F2F2F2;
        padding: 5px (60 /360 * 100vw)*1px;
        background: rgba(255, 255, 255, 0.5);//半透明
        // background-color: #F87878;
        border-radius:50px;
        span{
            padding: 0;
        }

    }
    .personl{
        color: #F2F2F2;
        font-size: 25px;
    }
}

/deep/ .van-tabs__nav{
    padding: 0 0 15px 0;
    background-color: #DDDDDD;
}
/deep/ .van-tabs__line{
    background-color: #333333;
}
/deep/ .van-tabs__wrap{
    height: 35px;
}

//把视频的导航栏
/deep/ .van-sticky{
    display: none;
}
</style>