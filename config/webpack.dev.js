//引入webpack.base文件  需要用到一个合并的包webpack-merge
const base = require("./webpack.base");
const {merge} = require("webpack-merge");  //报错加上{}

// merge可以接收多个参数　把参数对象合并　后面的对象会覆盖前面的
module.exports = merge(base,{
    mode:"development", //声明当前是开发模式

    //开发服务器 可以不打包刷新
    devServer:{
        port:8001, //默认端口是8080;
        stats:'errors-only' //打包时只显示报错 可加可不加 完成版没有加
    },

    devtool:"source-map", //自动生成源代码文件，找到存在错误的地方 不用安装插件(找报错源代码的)
})