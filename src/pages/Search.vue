<template>
  <div class="container">
      <div class="header">
          <span class="iconfont icon-jiantou-copy-copy" @click="$router.back()"></span>
          <div class="input-wrap">
              <span class="iconfont icon-sousuo"></span>
              <input type="text" v-model="keyword" placeholder="搜索关键字">
          </div>
          
          <span class="search-btn" @click="handleSearch">搜索</span>
      </div>

      <div class="list">
          <!-- 调用首页用过的文章模块的组件 -->
          <PostCard 
          v-for="(item, index) in list"
          :key="index"
          :post="item"/>
      </div>
  </div>
</template>

<script>

// 文章列表模块的组件
import PostCard from "@/components/PostCard";

export default {
    name :"search",//动态组件配置  缓存页面
    data(){
        return {
            // 搜索的关键字
            keyword: "",
            // 文章的列表
            list: []
        }
    },

    components: {
        PostCard
    },

    methods: {
        // 处理搜索
        handleSearch(){
            this.$axios({
                url: `/post_search?keyword=${this.keyword}`
            }).then(res => {
               const {data} = res.data;

               // 赋值给list
               this.list = data;
            })
        }
    },
    //组件内的路由守卫,判断如果是首页进入搜索页的,清空页面的缓存数据
    //to 去那里
    //from 从哪里来
    //next 函数 必须要调用  可以接受url的路径、函数 也可以不传参数
    beforeRouteEnter (to, from, next) {
      // console.log(456);
      //如果from.path等于/ 就是从首页进来的  \转意
      if(from.path === "\/"){
        //不能直接用this  要通过vm调用 vm等于this
        next( vm =>{
          vm.keyword = "";
          vm.list = []
        
        })

      }else{
        next();
      }
      // console.log(from);
    },

}
</script>

<style scoped lang="less">
    .header{
        height: (60 / 360 * 100vw)*1;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .input-wrap{
            position: relative;
            flex:1;
            margin: 0 10px;
            
            .icon-sousuo{
                position: absolute;
                left:10px;
                top:(12 / 360 * 100vw)*1;
            }

            input{
                width: 100%;
                display: block;
                height: (40 / 360 * 100vw)*1;
                background: #fff;
                border: 1px #eee solid;
                border-radius: 50px;
                padding:0 15px 0 30px;
                font-size:12px;
                box-sizing: border-box;
            }
        }

        .search-btn{
            font-size:14px;
        }
    }
</style>