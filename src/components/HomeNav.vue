<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item-group>
              <router-link :to="{ path: '/home/studentInfo' }">
                <el-menu-item index="1-1"> 学生信息 </el-menu-item>
              </router-link>
              <router-link :to="{ path: '/home/insertStudentInfo' }">
                <el-menu-item index="1-2">添加学生</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>课程管理</span>
            </template>
            <el-menu-item-group>
              <router-link :to="{ path: '/home/courseInfo' }">
                <el-menu-item index="2-1"> 课程信息 </el-menu-item>
              </router-link>
              <router-link :to="{ path: '/home/insertCourseInfo' }">
                <el-menu-item index="2-2">添加课程</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>成绩管理</span>
            </template>
            <el-menu-item-group>
              <router-link :to="{ path: '/home/grade' }">
                <el-menu-item index="3-1"> 课程成绩 </el-menu-item>
              </router-link>
              <router-link :to="{ path: '/home/insertGrade' }">
                <el-menu-item index="3-2">添加成绩</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <router-link :to="{ path: '/home/chart' }">
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">图形报表</span>
            </el-menu-item>
          </router-link>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item-group>
              <!-- <router-link :to="{ path: '/home/studentInfo' }">
                <el-menu-item index="5-1"> 个人信息 </el-menu-item>
              </router-link> -->
              <el-menu-item index="5-2" @click="exit">退出登录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomeNav",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    exit() {
      if (confirm("是否确认退出登录，返回系统登录界面？")) {
        localStorage.setItem("name", "");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
</style>
