//1 npm init
//2 npm install --save-dev webpack webpack-cli
//卸载 npm uninstall xxx

//路径问题
const path = require("path")

//  导入提取样式的webpack插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

//该插件会负责自动导入js css文件
const HtmlWebpackPlugin = require("html-webpack-plugin")

//导入清除插件
const { CLeanWebpackPlugin, CleanWebpackPlugin} = require('clean-webpack-plugin')

//mincss  因为webpack5已经不支持extract-text-webpack-plugin   所以替换成mincss
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 

//webpack的配置
module.exports = {
    //开发服务器 可以不打包刷新
    devServer:{
        port:8000 //默认端口是8080
    },

    //入口文件
    entry:"./src/index.js",

    //输出配置
    output:{
        path:path.resolve("dist"),
        filename:"minzz.js"
    },
    devtool:"source-map", //自动生成源代码文件，找到存在错误的地方 不用安装插件(找报错源代码的)

    module:{
        rules:[
            //处理css文件
            {
                test: /\.css$/, // 匹配.css结尾的文件
                // use: [          // 匹配到css文件后使用的加载器来处理文件
                //     'style-loader', // 把css文件注入到style标签里面
                //     'css-loader',   // 把@import或者url()引入文件的方式替换成 node中import/require
                // ]  //直接在style上面显示  不提取
                // use: ExtractTextPlugin.extract({	// 提取css
                //     fallback: "style-loader",
                //     use: ["css-loader"]
                // })  //用extract-text-webpack-plugin   但是webpack已经不支持了
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //mincss提取
            },

            // 处理less文件类型
            {
                test: /\.less$/, // 匹配.less结尾的文件
                // use: [          // 匹配到less文件后使用的加载器来处理文件
                //     'style-loader',
                //     'css-loader',
                //     'less-loader'   // 编辑less文件
                // ]  //直接在style上面显示  不提取
                // use: ExtractTextPlugin.extract({	// 提取css
                //     fallback: "style-loader",
                //     use: ["css-loader", "less-loader"]
                // }) //用extract-text-webpack-plugin   但是webpack5已经不支持了 
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //mincss提取
            },

            //处理图片文件
            {
                test:/\.(png|svg|jpg|gif)$/,	
                use: [
                    {
                        loader: "file-loader",              // 处理图片文件返回链接
                        options: {
                            publicPath: "./images/",        //  引入图片时会在路径前面加上该选项
                            outputPath: "images"            // 输出到dist下的images目录
                        }
                    } 
                ]
            },
        ]
    },
    plugins:[
        // new ExtractTextPlugin('style/style.css'), // 提取到dist的style文件夹中

        new MiniCssExtractPlugin({
            filename: 'style/style.css'
        }), //mincss提取

        //清除插件
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template:"public/index.html" //自动导入插件  指定html文件
        })
    ]

}
// 打包 npm run start