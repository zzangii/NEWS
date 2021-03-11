<template>
  <div class="container">
      <!-- 文章大数据 -->
      <div class="article" v-if="datail.type ===1">
          <div class="header">
              <div class="header-left">
                  <i class="iconfont icon-jiantou-copy-copy" @click="$router.back()"></i>
                  <!-- <span class="iconfont icon-new"></span> -->
              </div>
              <span class="focus" v-if="!datail.has_follow" @click="handleFollow">关注</span>
              <span class="focus focus_active" v-else @click="handleOut">已关注</span>

          </div>

          <h3>{{datail.title}}</h3>
            <!-- vue渲染第二层对象的值时要加v-if -->
          <p class="post-info">{{datail.user.nickname}}  2021-3-1</p>
        
          <div class="post-data" v-html="datail.content"></div>  
      </div>

      <!-- 视频详情的内容 -->
        <div class="video-wrap" v-if="datail.type === 2">
            <video class="video"
            controls
            poster=""
             src="https://video.pearvideo.com/mp4/adshort/20210307/cont-1722486-15624807_adpkg-ad_hd.mp4"></video>
        
            <!-- 作者和关注 -->
            <div class="video-info">
                <div class="video_data">
                <img :src="$axios.defaults.baseURL + datail.user.head_img" alt="">
                <span>{{datail.user.nickname}}</span>
                </div>

                <span class="focus" v-if="!datail.has_follow" @click="handleFollow">关注</span>
                <span class="focus focus_active" v-else @click="handleOut">已关注</span>

            </div>
        </div>
        
        <!-- 按钮列表 -->
      <div class="post-btus">
            <span @click="handleLike" :class="{like_active: datail.has_like }" >
              <i class="iconfont icon-zan"></i>
              {{like}}
            </span>
            <span>
                <i class="iconfont icon-weixin"></i>
                微信
            </span>
      </div>

      <!-- 页脚 -->
      <PostFooter :post="datail" @handleStar="handleStar"/>
  </div>
</template>

<script>
//导入页脚的组件
import PostFooter from "@/components/PostFooter"
export default {
    data() {
        return {
            //文章的详情
            datail:{
                //user是data里面的第二层  直接是请求不到的
                user:{}, 
            },
            like:99,

        }
    },
    components:{
        PostFooter
    },
    methods:{
        //关注事件
        handleFollow(){
            //通过ID关注用户
            this.$axios({
                url:"/user_follows/" + this.datail.user.id,
                //添加头信息
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                }
            }).then( res => {
                // console.log(res.data);
                const {message} = res.data
                if(message === "关注成功"){
                    this.datail.has_follow = true
                    this.$toast.success(message)
                }
            })
            

        },

        //取消关注
        handleOut(){
            this.$axios({
                url:"/user_unfollow/" + this.datail.user.id,
                //添加头信息
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                }
            }).then( res => {
                const {message} = res.data
                if(message === "取消关注成功"){
                    this.datail.has_follow = false
                    this.$toast.success(message)
                }
                
            })
        },
        //点赞
        handleLike(){
            this.$axios({
                url:"/post_like/" + this.datail.user.id,
                //添加头信息
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                }
            }).then( res => {
                const {message} = res.data 
                // console.log(res.data);
                if(message === "点赞成功"){
                    this.datail.has_like = true
                    this.$toast.success(message)
                    this.like++
                } 
                if(message === "取消成功"){
                    this.datail.has_like = false
                    this.$toast.success(message)
                    this.like--
                }
                
            })
        },
        //点赞
        handleStar(){
            this.$axios({
                url:"/post_star/" + this.datail.user.id,
                //添加头信息
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                }
            }).then( res => {
               const {message} = res.data 
               if(message === "收藏成功"){
                    this.datail.has_star = true
                    this.$toast.success(message)
               }
               if(message === "取消成功"){
                    this.datail.has_star = false
                    this.$toast.success(message)
               }
                
            })
        },
        
    },
    mounted(){
        //请求文章详情
        const {id} = this.$route.params
        // console.log(this.$route.params);
        const token = localStorage.getItem("token")

        const config = {
            url:"/post/"+ id,
        }

        //有token就追加token 因为无tokne也可以浏览
        if(token){
            config.headers = {
                Authorization:token
            }
        }

        this.$axios(config).then( res => {
            // console.log(res);
            const {data} = res.data
            this.datail = data 
        })
    }
}
</script>

<style lang="less" scoped>
.container{ 
    //因为服务器请求来的数据会覆盖下面的评论
    padding-bottom:(100 / 360 *100vw)*1 ;
}
.article{
    padding:15px 10px;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:15px ;
        i{
            font-size: 18px;
        }
        .focus{
            display: block;
            background-color: #FD0000;
            padding: 3px 15px;
            border-radius:50px;
            color: #fff;
            font-size: 12px;
            margin-right: 10px;
        }
        .focus_active{
            border: 1px #ccc solid;
            color: #333;
            background: none;

        }
        
    }
    h3{
        margin-bottom:5px;
    }
    .post-info{
        font-size: 12px;
        color: #666;
        margin-bottom:20px;
    }
    .post-data{
        font-size: 15px;
        line-height: 1.6;
        margin-bottom:10px;
        
        //因为请求过来的数据图片过大  
        //img是服务器返回的标签 不属于当前的组件 不受scoped影响
        /deep/ img{
            max-width: 100%;

        }

    }
}
.post-btus{
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
        font-size: 12px;
        border: 1px #666 solid;
        padding: 4px 10px;
        border-radius:50px;
    }
    span:last-child{
        i{
            color: #00CA00;
        }
    }
    .like_active{
        border: 1px red solid;
    }

    
}
.video{
    width: 100%;
}
.video-info{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .video_data{
            display: flex;
            font-size: 14px;
            color: #999;
        }
        img{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
        }
}

//关注按钮样式
.focus{
    display: block;
    background-color: #FD0000;
    padding: 3px 15px;
    border-radius:50px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
    border: 1px #ccc solid;

}
.focus_active{
    border: 1px #ccc solid;
    color: #333;
    background: none;

}

</style>