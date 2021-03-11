<template>
<!-- 输入框组件 -->
<!-- @input="handleInput"  @input是input的一个监听  监听的是input.value里面的值变化 -->
  <!-- :class 可以通过数组方式判断＋添加 判断方法下面写有 -->
  <!-- :class 值如果是对象的话 key是class的名称 是true就加上 -->
  <input class="input"
  :class="{
    successzz: statuszz === 'successzz',
    errorzz: statuszz === 'errorzz'
  }"
  :placeholder=placeholder
  :value= "value"
  @input="handleInput" 
  @change="handleChange"
  /> 
  <!-- @change  鼠标失去焦点触发-->
</template>

<script>
export default {
  data() {
    return {
      statuszz:""
    }
  },
  props:[
    "placeholder",//提示信息
    "value", //接收过来的数值  但是好像可以不写(不能写 不然两个组件使用会出现数据传来传去)
    "rule",  //转递过来的一个正则表达式(规则)
    "err_message", //接收过来
    "name"
    
    
  ],
  
  methods:{
    // 每次输入框输入值时候会触发的
    // 实现思路  先通过@input="handleInput"  @input监听变化 然后触发handleInput这个方法
    // 然后这个方法把数据发给@input(不能修改) 然后实现双向数据相通 
    handleInput(event){
      // console.log(event.target.value);
      this.$emit('input', event.target.value);
      // console.log(event);
      //触发父组件的input事件 返回输入框的值 rule
      const {value} = event.target; //该方法会把event.target.value 这个值拿到 上面这样写方便复习
      if(this.rule){  //判断有没有这个规则  如果没有就不执行
      if(this.rule.test(value)){
          this.statuszz = "successzz"
      }else{
        this.statuszz = "errorzz"
      }
      }
    },
    handleChange(){
      if(this.err_message && this.statuszz == "errorzz"){
        // alert(this.err_message);
        this.$toast.fail(this.err_message)
      }
    }
  }

}
</script>
<style scoped lang="less"> //scopen 当前组件使用 作用域  不用受其他样式重名影响

.input{
    width: 100%;
    height: (40 / 360 * 100vw)*1;
    padding: 20px 0;
    box-sizing: border-box; //规定两个并排的带边框的框没有空隙
    background: #fff;
    border: none;
    caret-color: red;
    border-bottom:1px #666 solid;
    outline: none; //去除输入框的边框
}
.successzz{
  border-bottom:#007ACC 1px solid;
}
.errorzz{
  border-bottom: red 1px solid;
}

</style>