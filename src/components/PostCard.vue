<template>
<div>
    <!-- 单张图片的布局(小于三张也可以) -->
    <div class="card" v-if="post.cover.length > 0 && post.cover.length < 3 && post.type === 1 ">
        <div class="card-left ">
            <div class="post-title">
            <router-link :to="`/post_detail/${post.id}`">
                {{post.title}}
            </router-link>
            </div>
            <p class="post-info">
                <span>{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>
        
        <div class="card-img ">
            <router-link :to="`/post_detail/${post.id}`">
                <img :src="post.cover[0].url" alt="">
            </router-link>
        </div>
    </div>
    <!-- 多张或三张以上图片的布局 -->
    <div class="img-cart" v-if="post.cover.length >= 3 && post.type === 1 ">
        <div class="post-title">
            <router-link :to="`/post_detail/${post.id}`">
            {{post.title}}
            </router-link>
        </div>
        <div class="img-list">
            <router-link :to="`/post_detail/${post.id}`">
            <img v-for="(item,index) in post.cover" 
            :key="index"
            :src="item.url" alt=""
            v-if="index < 3"
            >
            </router-link>
        </div>
        <p class="post-info">
            <span>{{post.user.nickname}}</span>
            <span>{{post.comment_length}}跟帖</span>
        </p>
    </div>

    <!-- 视频的布局 -->
    <div class="video-cart" v-if="post.type === 2">
        <div class="post-title">
            <router-link :to="`/post_detail/${post.id}`">
            {{post.title}}
            </router-link>
        </div>
        <router-link :to="`/post_detail/${post.id}`">
        <div class="video">
            <img :src="post.cover[0].url" alt="">
            <span class="video-layer">
                <i class="iconfont icon-shipin1"></i>
            </span>
        </div>
        </router-link>
        <p class="post-info">
            <span>{{post.user.nickname}}</span>
            <span>{{post.comment_length}}跟帖</span>
        </p>
    </div>
    

</div>
</template>

<script>
export default {
    //传文章列表过来
    props:['post']

}
</script>

<style lang="less" scoped>
//单个图片的样式
.card{
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom:1px #ccc solid ;
    .card-left{
        flex: 1;
        //设置标题和回帖上面对齐 flex-direction: column设置y轴对齐方式
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: (75 / 360 * 100vw)*1;
        .post-title{
            font-size: 14px;
            margin-bottom: 5px;
            line-height: 1.5;
            //文字超出两行变成省略号
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .post-info{
            font-size: 12px;
            color: #999;
        }
    }
    .card-img{
        img{
            display: block;
            width: (121 / 360 * 100vw)*1;
            height: (75 / 360 * 100vw)*1;
            object-fit: cover;  //只截取图片中间 使图片不变性
        }
    }
}
//多个图片
.img-cart{
    padding: 20px 10px;
    border-bottom:1px #ccc solid ;
    .post-title{
        font-size: 14px;
        margin-bottom: 5px;
        line-height: 1.5;
        //文字超出两行变成省略号
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        }
    .img-list{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        img{
            // display: block;
            padding-left:1% ;
            width: 32%;
            height: (75 / 360 * 100vw)*1;
            object-fit: cover;  //只截取图片中间 使图片不变性
        }
    }
    .post-info{
        font-size: 12px;
        color: #999;
    }
}
//视频
.video-cart{
    padding: 20px 10px;
    border-bottom:1px #ccc solid ;
    .post-title{
        font-size: 14px;
        margin-bottom: 5px;
        line-height: 1.5;
        //文字超出两行变成省略号
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        }
    .video{
        position: relative;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            display: block;
            width: 100%;
            height: (170 / 360 *100vw)*1;
        }
        .video-layer{
            position: absolute;
            // background: rgba(0, 0, 0, 0.5);
            // width: (46 /360 *100vw)*1;
            // height:(46 /360 *100vw)*1;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                color: #999;
                font-size: (46 /360 *100vw)*1px;
            }
        }
    }
    .post-info{
        font-size: 12px;
        color: #999;
    }
}
</style>