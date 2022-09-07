<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加学生</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学籍编号" prop="studentNo">
        <el-input v-model="ruleForm.studentNo"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" prop="studentName">
        <el-input v-model="ruleForm.studentName"></el-input>
      </el-form-item>
      <el-form-item label="学生性别" prop="studentSex">
        <el-radio-group v-model="ruleForm.studentSex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学生年龄" prop="studentAge">
        <el-input v-model.number="ruleForm.studentAge"></el-input>
      </el-form-item>
      <el-form-item label="学生班级" prop="studentClass">
        <el-input v-model="ruleForm.studentClass"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="studentTel">
        <el-input v-model="ruleForm.studentTel"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="studentRemarks">
        <el-input type="textarea" v-model="ruleForm.studentRemarks"></el-input>
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
  name: "InsertStudentInfo",
  data() {
    return {
      title: "添加学生",
      ruleForm: {
        studentNo: "",
        studentName: "",
        studentSex: "",
        studentAge: "",
        studentClass: "",
        studentTel: "",
        studentRemarks: "",
      },
      rules: {
        studentNo: [
          { required: true, message: "请填写所添加学生的学籍编号" },
          //   { length:11 , message: "长度在 3 到 5 个字符" },
        ],
        studentName: [{ required: true, message: "请填写学生姓名" }],
        studentSex: [{ required: true, message: "请选择学生性别" }],
        studentAge: [{ required: true, message: "请填写学生年龄" }],
        studentClass: [{ required: true, message: "请填写学生班级" }],
        // studentTel: [
        //   { required: true, message: "请填写学生联系电话", trigger: "change" },
        // ],
        // studentRemarks: [
        //   { required: true, message: "请填写活动形式", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    //添加学生信息
    insertStudentInfo() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/student/insert",
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
          this.insertStudentInfo();
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
