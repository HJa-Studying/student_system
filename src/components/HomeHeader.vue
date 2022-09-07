<template>
  <div id="homeHeader">
    {{title}}
    登录者信息：{{userName}}
  </div>
</template>

<script>
export default {
    name:'HomeHeader',
    data() {
        return {
            title:'学生成绩管理系统',
        }
    },
    computed:{
      userName(){
        return localStorage.getItem("name")
      }
    }

}
</script>

<style>

</style>