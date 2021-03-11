<template>
    <!-- $event是模板事件对象 -->
  <div class="cell-wrap" @click="$emit('click', $event)">
      <div class="cell">
          <span>{{label}}</span>
          <!-- 如果type等于password,显示星号 -->
          <i>{{type === "password" ? "******" : text}}</i>
          <span class="iconfont icon-jiantou"></span>
      </div>
  </div>
</template>

<script>
export default {
    //传入文字 
    props:["label","text","type"]
}
</script>

<style scoped lang="less">
.cell-wrap{
    padding-left: 20px;
    .cell{
        display: flex;
        justify-content: space-between; //左右对齐
        align-items: center; //居中对齐
        padding-right: 10px;
        height: (50 / 360 * 100vw) * 1;
        border-bottom: 1px #eee solid;
        i{
            display: block;
            flex: 1; //把剩余的位置给他
            text-align: right; //右边开始排
            padding: 0 10px;
            font-size: 14px;
            color: #999;
        }
    }
}

</style>