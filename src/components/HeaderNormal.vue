<template>
  <div class="header">
      <!-- $router.back() 返回上一页 -->
      <span class="iconfont icon-jiantou-copy-copy" @click="$router.back()"></span>
      <h4>{{title}}</h4>
      <span class="iconfont icon-jiantou-copy-copy"></span>
  </div>
</template>

<script>
export default {
    props:["title"]
}
</script>
<style lang="less" scoped>
.header{
    height: (60 / 360 * 100vw)*1;
    display: flex;
    justify-content: space-between; //左右贴边 
    align-items: center; // 居中对齐
    span{
        display: block;
        padding: 0 20px;
    }
    span:last-child{
        opacity: 0; //选中最后一个span 然后透明度变为0 目的让他占到位置使中间位置居中
    }
}
</style>