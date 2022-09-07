<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加课程</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="课程号" prop="courseNo">
        <el-input v-model="ruleForm.courseNo"></el-input>
      </el-form-item>
      <el-form-item label="课程名" prop="courseName">
        <el-input v-model="ruleForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="学分" prop="courseRedit">
        <el-input v-model.number="ruleForm.courseRedit"></el-input>
      </el-form-item>
      <el-form-item label="授课老师" prop="courseTeacher">
        <el-input v-model="ruleForm.courseTeacher"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="courseRemarks">
        <el-input type="textarea" v-model="ruleForm.courseRemarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "InsertCourseInfo",
  data() {
    return {
      title: "添加课程",
      ruleForm: {
        courseNo: "",
        courseName: "",
        courseRedit: "",
        courseTeacher: "",
        courseRemarks: "",
      },
      rules: {
        courseNo: [{ required: true, message: "请填写课程号" }],
        courseName: [{ required: true, message: "请填写课程名" }],
        courseRedit: [{ required: true, message: "请填写课程学分" }],
        courseTeacher: [{ required: true, message: "请填写授课老师" }]
      },
    };
  },
  methods: {
    //添加学生信息
    insertCourseInfo() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/course/insert",
        method: "get",
        params: this.ruleForm,
      }).then((response) => {
          alert(response.data);
      });
    },
    //提交表单信息
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.insertCourseInfo();
        }
      });
    },
    // 重置清空表单信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 10px;
}
.el-input {
  width: 40%;
}
/deep/ .el-textarea__inner {
  width: 40%;
  line-height: 3;
}
.el-form-item {
  margin: 18px 0 !important;
}
</style>
