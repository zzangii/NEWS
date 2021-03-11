//引入webpack.base文件  需要用到一个合并的包webpack-merge
const base = require("./webpack.base");
const {merge} = require("webpack-merge");  //报错加上{}

// merge可以接收多个参数　把参数对象合并　后面的对象会覆盖前面的
module.exports = merge(base,{
    mode:"production", //声明当前是生产模式

})
