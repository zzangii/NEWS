<template>
  <div class="containt">
      <!-- 头部组件 -->
      <HeaderNormal title="精彩跟帖"/>

      <!-- 评论模块 -->
      <!-- list分页 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        >
      <div class="comment" v-for="(item,index) in comments" :key="index">
          <div class="comment-info">
              <!-- 左侧的用户信息 -->
              <div class="comment-user">
                  <img :src="$axios.defaults.baseURL + item.user.head_img" alt="">
                  <!-- 用户姓名 -->
                  <div class="user-info">
                      <p>{{item.user.nickname}}</p>
                      <span>2小时前</span>
                  </div>
              </div>

              <span class="user-hui" @click="handleReply(item)">回复</span>
          </div>

          <!-- 评论楼层 -->
          <CommentFloor v-if="item.parent"
           :data="item.parent" @handleReply="handleReply"
           />
        

          <div class="comment-content">
              {{item.content}}
          </div>
      </div>
    </van-list>
        <!-- 页脚组件 -->
        <!-- post文章的详情 -->
        <!-- replyComment要回复的评论 -->
        <!-- getComments发布评论成功后重新请求评论列表 -->
      <PostFooter :post="datail" :replyComment="replyComment"
       @getComments="getComments" @handleReply="handleReply"
       />
  </div>
</template>

<script>
import config from "./index"
export default config;

</script>

<style scoped lang="less">
@import url("./index.less");
</style>