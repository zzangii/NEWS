<template>
  <div class="footer-wrap">
      <!-- 普通列表 -->
    <div class="footer" v-show="!isFocus">
        <input type="text" placeholder="写跟帖" @focus="handleFocus">
        <span class="comment" @click="$router.push(`/comment/${post.id}`)">
            <em>{{post.comment_length}}</em>
            <i class="iconfont icon-pinglun"></i>
        </span>
        <i class="iconfont icon-shoucang" 
        :class="{ star_active: post.has_star }"
        @click="$emit('handleStar')"></i>
        <i class="iconfont icon-fenxiang"></i>
    </div>
    <!-- 输入框评论页脚 显示隐藏必须要用v-show  -->
    <div class="footer-comment" v-show="isFocus">
        <textarea 
        v-model="value" rows="3" 
        @blur="hadnleBlur" ref="textarea" 
        v-show="isFocus" :placeholder="placeholder"
        ></textarea>
        <span @click="handleSubmit">发送</span>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //输入框是否获得焦点
            isFocus:false,
            //评论的内容
            value:"",
            //输入框提示文字
            placeholder:"写跟帖"
        }
    },
    // 接受文章的详情
    // replyComment 要回复的评论
    props: ["post","replyComment"],

    //replyComment监听改变  触发isFocus  输入框弹起
    watch:{
        replyComment(){
            // console.log(123);
            
            if(this.replyComment){
                this.isFocus = true
                //评论有值的时候才显示
                this.placeholder ="@" + this.replyComment.user.nickname;
            }
        }
    },

    methods:{
        //handleFocus 获得焦点时触发
        handleFocus(){
            this.isFocus = true
            // setTimeout(function(){
            // console.log(1123);
            // this.isFocus = false
            // console.log(isFocus);
            
            // },1000);
            // console.log(this.isFocus);

            // console.log(this.$refs.textarea); 

            //给评论输入框加上输入焦点
            // console.log(this.$refs.textarea.autofocus());   autofocus是txt里面的一个值 输入为f 离开为true
            
        },
        //输入框失去焦点时触发
        hadnleBlur(){
            if(!this.value){
                this.isFocus = false
                //如果有@的人  又不想@了  然后清空一下父组件的值
                if(this.replyComment){
                    this.$emit('handleReply', null); 
                    //重新赋初始值
                    this.placeholder = "写跟帖"
                }
            }
            
        },
        //发布评论
        handleSubmit(){
            // console.log(this.value);
            if(!this.value){
                return
            }
            //评论的参数
            const data = {
                content:this.value
            } 
            //如果有回复的评论,加上parent_id
            if(this.replyComment){
                data.parent_id = this.replyComment.id
            }

            this.$axios({
                url:"/post_comment/" + this.post.id,
                method:"POST",
                //添加头信息
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                },
                data
            }).then( res => {
                // console.log(res.data);
                const {message} = res.data
                if(message === "评论发布成功"){
                    //触发父组件方法更新评论的列表
                    this.$toast.success(message)
                    //传一个值过来 因为发布成功也会触发评论事件
                    this.$emit('getComments',this.post.id,"huifu");
                    this.ifFocus = false;
                    this.value = ""

                    //滚动到底部
                    window.scrollTo(0,0)
                }
            })
        }
    }

}
</script>

<style lang="less" scoped>
    .footer-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%; //固定到最低下面
        border-top: 1px #eee solid;
        background: #fff;
    .footer{
        
        height:  (60 /360 *100vw)*1;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        justify-content: space-between;
        input{
            widows: 40%;
            height: (36 /360 *100vw )*1;
            background: #eee;
            border: none;
            font-size: 12px;
            padding: 0 15px;
            border-radius: 50px;
        }
        .comment{
            display: block;
            position: relative;
            
            em{
                position: absolute;
                display: block;
                background:red;
                border-radius:50px ;
                color: #fff;
                padding: 0 5px;
                font-size: 10px;
                height: 14px;
                line-height: 14px;
                left: 0;
                top: -5px;
            }
        }
        .iconfont{
            font-size: 19px;
        }
    }
    .footer-comment{
        padding: 10px ;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        textarea{
            width: (260 / 360 *100vw)*1;
            background: #eee;
            padding: 10px;
            box-sizing: border-box;
            border: none; 
            border-radius: 8px;
            resize: none; //去除txt输入框的小点
        }
        span{
            font-size: 12px;
            background: red;
            width: (60 / 360 * 100vw) *1;
            height: (26 / 360 * 100vw) *1;
            line-height: (26 / 360 * 100vw) *1;
            color: #fff;
            text-align: center;
            border-radius: 50px;
        }
         
    }
}
.star_active{
    color:red;
}

</style>