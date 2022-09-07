<template>
  <div id="login">
    <div>
      <h1>学生成绩后台管理系统</h1>
      <form>
        <label>账号:<el-input placeholder="请输入账号" clearable v-model="userInfo.name"></el-input></label>     
        <br/>
        <label>密码:<el-input placeholder="请输入密码" show-password v-model="userInfo.password"></el-input></label>     
        <br/>
        <input class="btn" type="button" value="提交" @click="submitInfo"/>
        <input class="btn" type="button" value="重置" @click="clearInfo"/>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      title: "登录页面",
      userInfo:{
        name:"",
        password:""
      }
    };
  },
  methods:{

    // 提交登录信息，验证
    submitInfo(){
      this.$axios({
        url:"http://127.0.0.1:5000/login",
        method:'get',
        params:this.userInfo
      }).then( response => {
        if(response.data === "登录成功！"){
          alert(response.data)
          localStorage.setItem("name",this.userInfo.name)
          this.$router.push("/home")
        }else{
          alert(response.data)
        }
      })
    },
    // 清空登录表单填写信息
    clearInfo(){
      this.userInfo = {}
    },


  }
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: lightgray;
}
#login > div {
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-65%);
  width:440px;
  height:280px;
  padding-top:20px;
  text-align:center;
  background-color: lightblue;
  border-radius: 5px;

}
#login > div form {
  margin-top:30px;
}
#login > div form label {
  font-size:18px;
}
.el-input {
  margin:10px;
  width:220px;
  
}
/deep/ .el-input__inner {
  height: 36px !important;
}
#login > div form .btn {
  margin:20px;
  width:56px;
  height:30px;
  border:none;
  border-radius:5px;
}
</style>
