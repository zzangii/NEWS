<template>
  <div>
    <HeaderNormal title="我的跟帖"></HeaderNormal>
    <div class="comment-item" v-for="(item,index) in list" :key="index">
        <div class="time">2021-2-25 10:10</div>

        <!-- 当前的评论回复的评论 -->
        <div class="parent" v-if="item.parent">
            <div class="parent-title">回复: {{item.parent.user.nickname}}</div>
            <div class="parent-content">{{item.parent.content}}</div>
        </div>

        <!-- 个人评论的内容 -->
        <div class="content">{{item.content}}</div>

        <router-link to="#" class="article-link">
            <p>原文:{{item.post.title}}</p>
            <span class="iconfont icon-jiantou"></span>
        </router-link>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";

export default {
    data() {
        return {
            list:[]
        }
    },
  // 导入的组件要注册  经过vue插件可以大写
  components: {
    HeaderNormal,
  },
  mounted(){
      //请求评论列表
      this.$axios({
        url:"/user_comments",
        //添加头信息 把token传给服务器
        headers:{   //此方法只用用本套接口
            Authorization: localStorage.getItem("token")
        },        
      }).then( res =>　{
        //   console.log(res);
        const {data} = res.data
        this.list = data
      })
  }
};
</script>
<style lang="less" scoped>
.comment-item{
    padding:15px;
    border-bottom: 1px #ccc solid;
    .time{
        font-size: 12px;
        color: #999;
        padding-bottom: 10px;
    }
    .parent{
        padding: 10px 0;
        background-color: #eee;
        .parent-title{
            font-size: 12px;
            color: #999;
            padding-bottom: 8px;
        }
        .parent-content{
            color: #999;
        }
        
    }
    .content{
        padding: 10px 0;
    }
    .article-link{
        display: flex;
        color: #999;
        font-size: 12px;
        p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //超出部分设置为...
        }
        span{
            align-items: center;
            font-size: 12px;
        }
    }
}
</style>