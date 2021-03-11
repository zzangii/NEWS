<template>
  <div class="button" @click="handleClick">{{text}}</div>
</template>

<script>
export default {
    props:["text"],
    methods:{
        handleClick(event){
            this.$emit("click", event);
        }
    }
}
</script>

<style scoped lang="less">
.button{
    widows: 100%;
    height: (48 / 360 *100vw)*1;
    display: flex;
    justify-content: center; /* 主轴 对齐*/
    align-items: center; /*居中对齐弹性盒的各项 */
    background: red;
    color:rgb(250, 239, 239);
    border-radius: 50px;  /*边角变圆 */
    font-size: 18px;
}
</style>