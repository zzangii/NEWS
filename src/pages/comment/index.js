//导入组件
import HeaderNormal from "@/components/HeaderNormal"

//导入评论楼层
import CommentFloor from "@/components/CommentFloor"

//页脚发布评论的
import  PostFooter from "@/components/PostFooter"
export default {
    //注册
    components:{
        HeaderNormal,
        CommentFloor,
        PostFooter
    },

    data() {
        return {
            //评论的列表
            comments:[],
            //文章的详情
            datail:{},
            // isFocus = false
            //保存点击回复的评论
            replyComment:null,
            //分页的参数
            loading:false,
            finished:false,

            //当前的页数
            pageIndex:1,
            //加载多少条
            pageSize:10
            
        }
    },
    methods: {
        //发布评论
        getComments(id,huifu){
            //如果评论发布成功初始化一下评论列表
            if(huifu === "huifu"){
                this.pageIndex= 1,
                this.comments = []

            }
            //请求文章评论
            this.$axios({
                //加上页面  条数默认是10条
                url:`/post_comment/${id}?pageIndex=${this.pageIndex}`,
            }).then( res => {
                // console.log(res.data);
                const {data} =  res.data
                //覆盖评论的列表
                this.comments = [...this.comments,...data]
                //判断是否还有数据在加载
                this.loading = false
                if(data.length < this.pageSize){
                    this.finished = true
                    return
                }
                
                //页数加1
                this.pageIndex++;
            });
        },
        //点击回复按钮触发
        handleReply(item){
            //获取到当前要回复的用户
            // console.log('获取到了');
            // console.log(item.id);
            // console.log(item.user.id);
            this.replyComment = item


        },
        //评论加载更多
        onLoad(){
            setTimeout( () =>{
                console.log(123);
                //请求下一页数据
                const {id} = this.$route.params;
                this.getComments(id);
                // this.finished = false,

            },1000)

            
        }
    },
    mounted() {
        //请求文章评论
        const {id} = this.$route.params;
        //请求评论的列表
        this.getComments(id);

        //请求文章详情 页脚评论页脚用到
        const config ={
            url:"/post/" + id
        }
        if(localStorage.getItem("token")){
            config.headers = {
                headers:{   //此方法只用用本套接口
                    Authorization: localStorage.getItem("token")
                }
            }
        }
        this.$axios(config).then( res => {
            const {data} = res.data;
            this.datail =data
        })
    },
}