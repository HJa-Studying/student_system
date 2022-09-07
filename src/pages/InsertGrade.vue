<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
    <el-form-item label="课程号 ----- 课程名" prop="courseNo">
      <el-select v-model="ruleForm.courseNo" filterable placeholder="请选择">
        <el-option
          v-for="course of courseData"
          :key="course.Cno"
          :label="course.Cno +' ----- '+ course.Cname"
          :value="course.Cno"
        >
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="学号 ----- 姓名" prop="studentNo">
      <el-select v-model="ruleForm.studentNo" filterable placeholder="请选择">
        <el-option
          v-for="student of studentData"
          :key="student.Sno"
          :label="student.Sno +' ----- '+ student.Sname"
          :value="student.Sno"
        >
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="成绩" prop="grade">
        <el-input v-model.number="ruleForm.grade"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="gradeRemarks">
        <el-input type="textarea" v-model="ruleForm.gradeRemarks"></el-input>
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
  name: "InsertGrade",
  data() {
    return {
      title: "添加成绩",
      value:"",
      courseData: [], 
      studentData: [],
      ruleForm: {
        courseNo: "",
        studentNo: "",
        grade: "",
        gradeRemarks: "",
      },
      rules: {
        courseNo: [{ required: true, message: "请选择课程号-----课程名" }],
        studentNo: [{ required: true, message: "请选择学号-----姓名" }],
        grade: [{ required: true, message: "请填写成绩" }]
      },
    };
  },
  methods: {
    // 获取课程
    getCourseTable() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/course",
        method: "get",
      }).then((response) => {
        this.courseData = response.data;
      });
    },
    // 获取学生
    getStudentTable() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/student",
        method: "get",
      }).then((response) => {
        this.studentData = response.data;
      });
    },
    //添加课程成绩
    insertGrade() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/grade/insert",
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
          this.insertGrade();
        }
      });
    },
    // 重置清空表单信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.getCourseTable();
    this.getStudentTable();
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 10px;
}
.el-select,.el-input {
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
