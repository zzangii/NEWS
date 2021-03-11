<template>
  <div class="big">
      <div class="header">
          消息
      </div>
      <!-- Tab -->
      <div class="datalist" @click="handle">
          <div>
            <i class="iconfont icon-pinglun1"></i>
            <span>评论</span>
          </div>
          <div>
            <i class="iconfont icon-dianzan"></i>
            <span>点赞</span>
          </div>
          <div>
            <i class="iconfont icon-fensi"></i>
            <span>粉丝</span>
          </div>
          <div>
            <i class="iconfont icon-xiaozhushouhdpi"> </i>
            <span>助手</span>
          </div>
      </div>
      <!-- 信息框 -->
      <div class="profile" @click="handle">
            <img src="../../static/defazz1.jpg" alt="">
            <div class="profile-center">
                <div class="name">
                    火星人
                </div>
                <div class="time">
                    吃饭了吗
                </div>
            </div>
            <span>2天前</span>
      </div>
      <div class="profile" @click="handle">
            <img src="../../static/defazz1.jpg" alt="">
            <div class="profile-center">
                <div class="name">
                    火星人2号
                </div>
                <div class="time">
                    吃饭了吗
                </div>
            </div>
            <span>3天前</span>
      </div>

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
export default {
    data() {
        return {
            //判断是否有tolen
            istoken:localStorage.getItem("token") ? true : false,
        }
    },
    methods:{
        handle(){
            // this.$toast.fail('失败文案');
            this.$toast.loading({
                message: '该功能正在开发中....',
                forbidClick: true,
                // loadingType: 'spinner',
            });
        }

    },

}
</script>

<style lang="less" scoped>
.big{
    // padding: 10px 20px;
    .header{
        text-align: center;
        border-bottom: 1px #eee solid;
        padding: 10px;
        font-weight: 900;
    }
    .datalist{
        padding: 20px 0;
        display: flex;
        justify-content: space-around;
        border-bottom: 5px #eee solid;
        div{
            text-align: center;
        }
        span{
            font-size: 12px;
        }
        i{
            text-align: center;
            display: block;
            padding: 10px;
            font-size: 20px;
            
        }
        .icon-pinglun1{
            background-color: #41D8AB;
            border-radius:50px;
            color: #fff;
        }
        .icon-dianzan{
            background-color: #FB5466;
            border-radius:50px;
            color: #fff;
        }
        .icon-fensi{
            background-color: #FDA203;
            border-radius:50px;
            color: #fff;
        }
        .icon-xiaozhushouhdpi{
            background-color: #FC5531;
            border-radius:50px;
            color: #fff;
        }
    }
}

//聊天框
.profile{
        display: flex;
        padding: 20px 10px;
        justify-content: space-between; //左右两边贴边对齐
        align-items: center; //居中
        border-bottom: 1px #eee solid;

        img{
            width: (35 / 360 * 100vw)*1;
            height: (35 / 360 * 100vw)*1;
            border-radius: 50%; //变圆
        }

        .profile-center{
            flex:1;  // 分给第一个全部(等于第一个对边)
            padding: 0 10px;
        }

        .name{
            font-size: 15px;
            font-weight: 600;
        }

        .time{
            color:#666;
            font-size: 12px;
        }
        span{
            font-size: 12px;
            color: #666;
        }
    }
</style>