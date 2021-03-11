<template>
   <div>
        <textarea rows="3"  ref="textarea" v-show="isFocus"></textarea>
        <button @click="handle">按钮</button>
   </div>
</template>

<script>
export default {
    data() {
        return {
            isFocus:false
        }
    },
     methods: {
       handle(){
         this.isFocus =true
       }
    }
}
</script>

<style lang="less" scoped>

</style>