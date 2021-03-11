<template>
<div>
        <!-- 自己调用自己 -->
          <comment v-if="data.parent" :data="data.parent"
          @handleReply= "handleReply"
          ></comment>
         <!-- 评论楼层 -->
          <div class="comment-floor">
              <div class="floor-header">
                  <span>{{data.user.nickname}}</span>
                  <i>2小时前</i>
                  <em @click="handleReply">回复</em>
              </div>
              <div class="comment-content">
              {{data.content}}
              </div>
          </div>
          
          
</div>
</template>

<script>
export default {
    //组件的名字，单纯的针对当前组件命名 当前组件可以通过该名字自己调用自己 
    name:"comment",
    props:["data"],

    mounted() {
        // console.log(123);
    },
    methods:{
        handleReply(){
            // console.log(this.data);
            this.$emit('handleReply', this.data);
        }
    }

}
</script>

<style scoped lang="less">
.comment-floor{
        padding: 10px;
        border: 1px #eee solid;
        .floor-header{
            font-size: 14px;
            i{
                font-size: 12px;
                color: #999;
            }
            em{
                float: right;
                color: #999;
            }
        }
    }

</style>