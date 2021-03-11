<template>
   <div>
       <!-- 失活的组件将会被缓存  keep-alive  动态组件  include设置缓存页面通过name来定义名字-->
        <keep-alive include="index,search">
        <router-view></router-view>
        </keep-alive>
        
       
   </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<style >
/* 全局公共样式 */
/* 导入阿里图标 */
@import url(//at.alicdn.com/t/font_2388481_ijaw07530wq.css);

/* 导入vant-ui */
@import url("../node_modules/vant/lib/index");

/* 公共样式 */
* {
    margin: 0;
    padding: 0;
}
a{
    color: inherit;  /* 继承 */
    /* text-decoration: none; */
}
a:hover{
    text-decoration: none;
}
ul,li,ol{
    list-style: none;
}
i,em{
    font-style: normal;
}
</style>