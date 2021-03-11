<template>
<div>
    <div class="profile" @click="handleEdit">
            <img :src="profile.head_img" alt="">
            <div class="profile-center">
                <div class="name">
                    <span class="iconfont icon-xingbie1 nan" v-show="profile.gender === 1"></span>
                    <span class="iconfont icon-xingbienv nv" v-show="profile.gender === 0"></span>
                    {{profile.nickname}}
                </div>
                <div class="time">
                    2019-9-24
                </div>
            </div>
            <span class="iconfont icon-jiantou"></span>
    </div>
    <!-- 调用条形组件 -->
    <router-link to="/user_follow">
    <CellBar label="我的关注" text="关注的用户"></CellBar>
    </router-link>
    <router-link to="/user_comment">
    <CellBar label="我的跟帖" text="跟帖/回复"></CellBar>
    </router-link>
    <CellBar label="我的收藏" text="文章/视频"></CellBar>
    <CellBar label="退出" @click="handleLogout"></CellBar>

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
//导入条形组件
import CellBar from "@/components/CellBar"


export default {
    data() {
        return {
            //判断是否有tolen
            istoken:localStorage.getItem("token") ? true : false,
            //个人信息
            test: 0,
            profile:{}
        }
    },

    // 导入的组件要注册  经过vue插件可以大写
    components:{
    CellBar,
    },

    //方法
    methods:{
        //退出登陆
        handleLogout(){
            //清楚本地的token和id
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");

            //replace和push    replace是替换可以直接返回首页  push是下一页
            this.$router.replace("/login") //跳转到首页
        },

        //修改资料
        handleEdit(){
            this.$router.push("/edit_profile")
        }
    },

    //加载完毕触发
    mounted(){
        //请求个人中心数据
        this.$axios({
            url:"/user/" + localStorage.getItem("user_id"), // 获取保存到本地的参数
            //添加头信息 把token传给服务器
            headers:{   //此方法只用用本套接口
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            // console.log(res);
            //将传过来的token保存起来调用
            const {data} = res.data;
            if(data){  //判断data是否有值
                //保存
                this.profile = data;

                //判断有没有头像  没有加上默认头像
                if(data.head_img){   //this.$axios.defaults.baseURL 读取axios的服务器路径
                    this.profile.head_img = this.$axios.defaults.baseURL + this.profile.head_img;
                }else{
                    this.profile.head_img = "../static/defazz1.jpg"
                }
            } 
        });
       
    }
}
</script>
<style lang="less" scoped>
    .profile{
        display: flex;
        padding: 20px 10px;
        justify-content: space-between; //左右两边贴边对齐
        align-items: center; //居中
        border-bottom: 5px #eee solid;

        img{
            width: (70 / 360 * 100vw)*1;
            height: (70 / 360 * 100vw)*1;
            border-radius: 50%; //变圆
        }

        .profile-center{
            flex:1;  // 分给第一个全部(等于第一个对边)
            padding: 0 10px;
        }

        .name{
            .nan{
                color:#75b9eb;
            }
            .nv{
                color: #FFA6CE;
            }
        }

        .time{
            color:#666;
            font-size: 14px;
            margin-top: 5px;
        }
    }
</style>