<template>
  <div class="w">
      <!-- 关闭链接 -->
      <div class="close">
        <span class="iconfont icon-guanbi"></span>
      </div>

      <!-- logo -->
      <div class="logo">
        <span class="iconfont icon-new"> </span>
        <h3>账号登录</h3>
      </div>

      <!-- 用户输入 -->
      <div>
        <!-- 调用输入框组件 -->
        <!-- :rule写一个规则  第一位是1 然后后面是0-9  一共4-10为  加起来最多11位-->
        <AuthInput 
        placeholder="手机号码"
        :value = "form.username"
        @input="handleUsername"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
        ></AuthInput>
      </div>
      <div>
        <!-- 调用输入框组件密码 -->
        <!-- :rule=" /^(?=.*[a-z])(?=.*\d)[^]{8,16}$/" -->
        <AuthInput 
        placeholder="密码"
        type="password"
        v-model= "form.password"
        :rule="/^1[0-9]{2,10}$/"
        err_message="密码格式不正确"
        ></AuthInput>
      </div>
      <!-- router-link 相当与a标签 -->
      <p class="tip">
        没有账号？ <router-link to="/regiser" >去注册</router-link>
      </p>

      <!-- 登陆按钮 -->
      <!-- <button @click="handleSubmit">登陆</button> -->
      <div class="login"><AuthButton
      text="同意协议并登陆"
      @click= "handleSubmit"
      ></AuthButton></div>
      <span class="xieyi">已阅读<i>“用户协议”</i>和<i>“隐私政策”</i></span>
     
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
//导入请求库
// import axios from "axios";  把axios挂载到根实例 每次调用就可以通过$axios

// 导入输入框组件
import AuthInput from "@/components/Authlnput"
import AuthButton from "@/components/AuthButton"





export default {
  data() {
    return {
      //判断是否有tolen
      istoken:localStorage.getItem("token") ? true : false,
      form:{
        username:"",
        password:"",

      }
    }
  },
  // 导入的组件要注册  经过vue插件可以大写
  components:{
    AuthInput,
    AuthButton
  },
  methods:{

    //每次输入传递一个值进来 @input监听方法
    handleUsername(value){
      this.form.username = value
    },

    //表单提交
    handleSubmit(){
      //判断是否为空
      if(this.form.username == ''){
          return this.$toast.fail('请输入账号')
      }else if(this.form.password == ''){
          return this.$toast.fail('请输入密码')
      }
      // console.log(this.form);
      this.$axios({
        url:"/login",
        method:"POST",
        data:this.form
      }).then( res => {
        const {message,data} = res.data;  //意思就是从res.data里面把message拿出来
        if(message === "登录成功"){
        //把token和id保存到本地  
        //保存到本地的方法localStorage.setItem("xxx",要保存的信息)
        localStorage.setItem("token",data.token)
        localStorage.setItem("user_id",data.user.id)

        this.$router.push("/") //跳转到下一页(首页)
        location.reload(); //跳转后刷新页面
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
//lang声明可以写less 
.w{
  padding: 20px;
  } 
.close{
    span{
      font-size: (27 / 360 * 100vw)*1;
    }
  }
.logo{
    display: flex;
    align-items: center;
    // justify-content: center; //设置居中
    padding: (80 / 360 * 100vw)*1 0;
    span{
      display: block; //变为块元素
      font-size: (30 / 360 * 100vw)*1;
      color: #D51C04;
    }
    h3{
      padding-left:10px;
      letter-spacing: 2px;

    }
  }
  .tip{
    text-align: right;
    margin-bottom: 20px;
    a{
      color: #0078CA;
    }
  }
.xieyi{
  display: flex;
  justify-content: center;
  padding-top: 10px;
  color: #ccc;
  font-size: 13px;
  i{
    color: #999;
  }
}
</style>