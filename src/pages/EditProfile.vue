<template>
    <div>
        <!-- 顶部 -->
        <HeaderNormal title="编辑资料"></HeaderNormal>

        <!-- 头像 -->
        <div class="head">
        <img :src="profile.head_img"/>
        
        <!-- 上传图片 -->
        <van-uploader :after-read="afterRead" class="uploader" />
        </div>


        <!-- 调用条形组件 -->
        <CellBar label="昵称" :text="profile.nickname" @click="show1 = !show1"></CellBar>
        <!-- 调用vant组件提示框 -->
        <van-dialog
        v-model="show1"
        title="编辑昵称"
        show-cancel-button
        @confirm="handlNickname"
        >
        <!-- value读取昵称 ref="nickname"-->
        <input type="text" ref="nickname" :placeholder="profile.nickname" class="datainput">
        </van-dialog>

        <CellBar label="密码" :text="profile.password" type="password" @click="show2 = !show2"/>
        <!-- 调用vant组件提示框 -->
        <van-dialog
        v-model="show2"
        title="编辑密码"
        show-cancel-button
        @confirm="handlPassword"
        >
        <!-- value读取密码 ref="password"-->
        <input type="text" ref="password" placeholder="修改密码" class="datainput">
        </van-dialog>

        <CellBar label="性别" :text="profile.gender === 1 ? '男' : '女'" @click="show3 = !show3"></CellBar>
        <!-- 调用vant组件提示框 -->
        <van-dialog
            v-model="show3"
            title="编辑密码"
            show-cancel-button
            @confirm="handlGender"
            >
                <van-radio-group v-model="genderCache">
                    <van-cell-group>
                        <van-cell title="男" clickable @click="ragenderCachedio = '1'">
                        <template #right-icon>
                            <van-radio name="1" />
                        </template>
                        </van-cell>
                        <van-cell title="女" clickable @click="genderCache = '0'">
                        <template #right-icon>
                            <van-radio name="0" />
                        </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
        </van-dialog>
    </div>
</template>

<script>
//导入组件
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";

export default {
    data() {
        return {
            //接受的用户信息
            profile:{},
            show1: false,//昵称
            show2: false,//密码
            show3: false,//性别
            //负责性别默认值
            genderCache: '0'
        }
    },
    // 导入的组件要注册  经过vue插件可以大写
    components: {
        HeaderNormal,
        CellBar
    },
    methods:{
        //请求编辑资料的接口  封装成函数
        //data要提交给接口的数据
        //callback 成功后调用(因为要刷新页面修改的才显示)
        editProfile(data,callback){
            //如果没有data就直接返回
            if(!data) return;
            this.$axios({
                //接口＋id (因为接口需要id)
                url:`/user_update/` + localStorage.getItem("user_id"), 
                method:'POST',
                //添加头信息 把token传给服务器  因为服务器需要验证
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                },
                //传数据到服务器
                data
            }).then( res => {
                // console.log(res);
                const {message} = res.data;
                if(message === "修改成功"){
                    //如果有callback才会执行(没有会报错)  也可以这样写callback && callback();
                     if(callback){
                         callback()
                     }
                    //success成功的弹窗提示
                    this.$toast.success(message)
                }
            })
            
        },

        //头像上传方法
        //选择完之后的回调函数 file返回选中的文件  
        afterRead(file) {
        //构造表单数据
        const formData = new FormData();

        //通过表单使用append方法追加数据 ("服务器接受的属性名",传过去的数据)
        formData.append("file",file.file);
        this.$axios({
            url:'/upload',//服务器api
            method:'POST',
            data:formData,   //传数据到服务器
            //添加头信息 把token传给服务器  因为服务器需要验证
            headers:{   //此方法只用用本套接口
                Authorization: localStorage.getItem("token")
            },
        }).then( res => {  //res 服务器返回的数据
            //解构服务器返回数据
            const {data} = res.data;
            //覆盖
            this.profile.head_img = this.$axios.defaults.baseURL + data.url; 
        
            //把头像上传到服务器 可以嵌套多个axios请求
            // this.$axios({
            //     //接口＋id (因为接口需要id)
            //     url:`/user_update/` + localStorage.getItem("user_id"), 
            //     method:'POST',
            //     //添加头信息 把token传给服务器  因为服务器需要验证
            //     headers:{   //此方法只用用本套接口
            //         Authorization: localStorage.getItem("token")
            //     },
            //     //传数据到服务器
            //     data:{
            //         //头像数据
            //         head_img: data.url
            //     }
            // }).then( res => {
            //     // console.log(res);
            //     const {message} = res.data;
            //     if(message === "修改成功"){
            //         //success成功的弹窗提示
            //         this.$toast.success(message)
            //     }
            // })
            //因为用了封装的函数  所以可以简化
            this.editProfile({head_img: data.url})
        })
        },

        //编辑昵称
        handlNickname(){
            // 拿到input输入框的值
            const value = this.$refs.nickname.value
            // console.log(this.$refs.nickname.value);
            
            // 提交到编辑资料的接口 简化
            //传入callback函数
            this.editProfile({nickname: value},()=>{
                // 修改成功后页面替换昵称
                this.profile.nickname = value;
            });


            // this.$axios({
            //     //接口＋id (因为接口需要id)
            //     url:`/user_update/` + localStorage.getItem("user_id"), 
            //     method:'POST',
            //     //添加头信息 把token传给服务器  因为服务器需要验证
            //     headers:{   //此方法只用用本套接口
            //         Authorization: localStorage.getItem("token")
            //     },
            //     //传数据到服务器
            //     data:{
            //         //昵称数据
            //         nickname: value
            //     }
            // }).then( res => {
            //     // console.log(res);
            //     const {message} = res.data;
            //     if(message === "修改成功"){
            //         //替换昵称
            //         this.profile.nickname = value;

            //         //success成功的弹窗提示
            //         this.$toast.success(message)
            //     }
            // })
        },

        //修改密码
        handlPassword(){
            // 拿到input输入框的值
            const value = this.$refs.password.value
            
            // 提交到编辑资料的接口 简化
            //传入callback函数
            this.editProfile({password: value},()=>{
                // 修改成功后页面替换密码
                this.profile.password = value; 
            });
            this.$refs.password.value = '' //修改完后清空value里面的值
        },

        //修改性别
        handlGender(){
            //把性别转换为数字
            const gender = +this.genderCache
            // console.log(this.genderCache);
            //编辑性别
            this.editProfile({gender:gender},()=>{
                // 修改成功后页面替换性别
                this.profile.gender = gender; 
            })
        }
    },
    //加载完毕触发
    mounted(){
        //请求个人中心数据
        this.$axios({
            url:"/user/" + localStorage.getItem("user_id"), // 获取保存到本地的参数
            //添加头信息
            headers:{   //此方法只用用本套接口
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            //将传过来的token保存起来调用
            const {data} = res.data;

            //修改性别用到  先把返回的性别取出来赋值给genderCache
            // console.log(String(data.gender));
            //性别需要转换为字符串 因为vant只接受字符全
            this.genderCache = String(data.gender);


            if(data){  //判断data是否有值
                //保存
                this.profile = data;
                //判断有没有头像  没有加上默认头像
                if(data.head_img){   //this.$axios.defaults.baseURL 读取axios的服务器路径
                    this.profile.head_img = this.$axios.defaults.baseURL + this.profile.head_img;
                }else{
                    this.profile.head_img = "../static/defazz1.jpg"
                }
            } 
        })
    }
};
</script>

<style lang="less" scoped>
.head{
    display: flex;
    justify-content: center; //左右居中
    align-items: center; //垂直居中
    padding: 20px 0;
    position: relative;
    .uploader{
        position: absolute;
        opacity: 0;
    }
    img {
        display: block;
        width: (100 / 360 * 100vw)*1;
        height: (100 / 360 * 100vw)*1;
        border-radius: 50%; //变圆
        }
}

//上传组件的样式  如果要修改第三方组件属性要加/deep/
/deep/ .van-uploader__upload{
    width: (100 / 360 * 100vw)*1;
    height: (100 / 360 * 100vw)*1;
    border-radius: 50%; //变圆

    
}
.datainput{
    width: 99%;
    line-height: inherit;
    border: 0;
    display: block;
    padding-left: 20px;
    padding-top:30px ;
}
</style>