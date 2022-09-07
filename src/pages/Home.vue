<template>
  <div id="home">
    <el-container id="container">
      <el-header>
        <!-- 引入首页头部组件 -->
        <HomeHeader />
      </el-header>
      <el-container>
        <el-aside>
          <HomeNav />
        </el-aside>
        <el-main>
          <keep-alive include="InsertStudentInfo">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import HomeNav from "@/components/HomeNav.vue";

export default {
  name: "Home",
  components: { HomeHeader, HomeNav },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  height: 40px !important;
  line-height: 40px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  width: 170px !important;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 10px !important;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

#home,
#container {
  height: inherit;
}
</style>
