<template>
  <div>
      <HeaderNormal title="我的关注"></HeaderNormal>

      <!-- 关注用户的列表  :key是为给for每一个循环的元素打上一个标识 方便页面刷新 -->
      <div class="follow-item" v-for="(itme,index) in list" :key="index">
          <img :src="$axios.defaults.baseURL + itme.head_img" alt="">

          <div class="item-center">
              <p>{{itme.nickname}}</p>
              <span>2021-3-6</span>
          </div>

          <span class="cancel" @click="handelCancel(index)">取消关注</span>
      </div>
      
      
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";

export default {
    data() {
        return {
            //关注列表
            list:[]
        }
    },
    // 导入的组件要注册  经过vue插件可以大写
    components: {
        HeaderNormal,
    },
    mounted(){
        //请求用户关注的列表数据
        this.$axios({
            url:"/user_follows",

            //添加头信息 把token传给服务器
            headers:{   //此方法只用用本套接口
                Authorization: localStorage.getItem("token")
            },
        }).then( res => {
            // console.log(res.data);
            const {data} = res.data
            //赋值
            this.list = data
        })
    },
    methods:{
        handelCancel(index){
            //请求用户关注的列表数据
            // console.log(index);
            // 问题 如果不取出id  好像只能取消一次 
            const id = this.list[index].id
        this.$axios({
            url:"/user_unfollow/" + id,
            //添加头信息 把token传给服务器
            headers:{   //此方法只用用本套接口
                Authorization: localStorage.getItem("token")
            },
        }).then( res => {
            // console.log(res);
            const {message} = res.data
            if(message === "取消关注成功"){
                //从列表删除splice=删除
                this.list.splice(index,1),
                //提示
                this.$toast.success(message)
            }
        })

        }
    }
}
</script>

<style lang="less" scoped>
.follow-item{
    display: flex;
    padding: 15px 20px;
    justify-content: space-between; //左右居中
    align-items: center;
    border-bottom: 1px #E0E0E0 solid;
    img{
        display: block;
        width: (50 / 360 * 100vw)*1;
        height: (50 / 360 * 100vw)*1;
        border-radius: 50%; //变圆
    }
    .item-center{
        flex: 1;
        padding-left: 10px;
        span{
            font-size: 13px;
            color: #B3B3B3;
        }
    }
    .cancel{
        display: block;
        background-color: #E0E0E0;
        padding: 5px 10px; //因为大小不好给 可以这样给
        font-size: 12px;
        border-radius: 50px; //变圆
    }
}

</style>