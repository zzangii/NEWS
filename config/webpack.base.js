const path = require("path");

//  导入提取样式的webpack插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 该插件自动在html文件引入打包文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 导入清除插件
const {CleanWebpackPlugin}= require('clean-webpack-plugin');

//mincss  因为webpack5已经不支持extract-text-webpack-plugin   所以替换成mincss
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 

//引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//导入copy(静态文件自动打包到dist)
const CopyPlugin = require("copy-webpack-plugin")

// webpack的配置
module.exports = {

    //单个入口文件
    // entry:"./src/index.js",
    //多个入口文件
    entry:{
        main:"./src/main.js",
    },

    // 优化打包,提取出公共模块
    optimization:{
        splitChunks:{
            chunks:'all' //提取全部文件的公共模块
        }
    },

    //模块优化 
    resolve:{
        //提供别名,方便查找模块的路径
        alias:{
            '@':path.resolve(__dirname,"../src") //path.resolve是反回绝对路径的意思
        },
        //可以忽略扩展名
        extensions:[".js",".json",".vue"] //不用配置也可以 只是防止出现问题
    },

    // 输出配置
    output: {
        // path.resolve根据当前的目录返回绝对路径
        path: path.resolve(__dirname, "../dist"), // 返回上一级去找到dist
        // filename:"minzz.js" 单个入口文件
        filename:"js/[name].js"  //多个入口文件 [name]不可改 自动生成对应的文件名
        // js/存放到js文件夹(自动生成js文件夹)
    },

     // 模块加载配置
    module: {
        rules: [
            //处理css文件
            {
                test: /\.css$/i, // 匹配.css结尾的文件
                // use: [          // 匹配到css文件后使用的加载器来处理文件
                //     'style-loader', // 把css文件注入到style标签里面
                //     'css-loader',   // 把@import或者url()引入文件的方式替换成 node中import/require
                // ]  //直接在style上面显示  不提取
                // use: ExtractTextPlugin.extract({	// 提取css
                //     fallback: "style-loader",
                //     use: ["css-loader"]
                // }) //用extract-text-webpack-plugin   但是webpack5已经不支持了 
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //mincss提取
            },
            // 处理less文件类型
            {
                test: /\.less$/, // 匹配.less结尾的文件
                // use: [          // 匹配到less文件后使用的加载器来处理文件
                //     'style-loader',
                //     'css-loader',
                //     'less-loader'   // 编辑less文件
                // ] //直接在style上面显示  不提取
                // use: ExtractTextPlugin.extract({	// 提取css
                //     fallback: "style-loader",
                //     use: ["css-loader", "less-loader"]
                // }) //用extract-text-webpack-plugin   但是webpack5已经不支持了 
                use:[MiniCssExtractPlugin.loader, 'css-loader','less-loader'] //mincss提取
            },

            //处理图片文件
            {
                test:/\.(png|svg|jpg|gif)$/,	
                use: [
                    {
                        loader: "file-loader",        // 处理图片文件返回链接
                        options: {
                            publicPath: "./images/",        //  引入图片时会在路径前面加上该选项
                            outputPath: "images" ,           // 输出到dist下的images目录
                            esModule: false //处理引入图片资源404显示 [object%20Module] 404 (Not Found)
                            //(原因)在url-loader内部封装了file-loader ，而file-loader在新版本中esModule属性默认为true 即默认使用ES模块语法导致了造成了引用图片文件的方式和以前的版本不一样了。所以需要关闭ES模块语法。
                        }
                    } 
                ]
            },
            //匹配vue的单文件组件
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
        ]
    },

    plugins: [
        // new ExtractTextPlugin('style/style.css'), // extract-text-webpack-plugin提取到dist的style文件夹中(不支持)

        new MiniCssExtractPlugin({
            filename: 'style/style.css'
        }), //mincss提取

        new CleanWebpackPlugin(), // 调用清除打包目录插件                  

        new HtmlWebpackPlugin({
            template: "public/index.html"	// template指定默认html模板
        }),

        //vue加载器插件
        new VueLoaderPlugin(),

       //静态文件导入到dist
       new CopyPlugin(

            { patterns: [
                { from: "static", to: "static" },
            ] } // 需要拷贝的目录或者路径通配符

        ),

    ]

}