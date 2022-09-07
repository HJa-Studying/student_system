<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <label>学号:<input type="text" placeholder="请输入学号" v-model="keyWord1"/></label>
      <label>姓名:<input type="text" placeholder="请输入姓名" v-model="keyWord2"/></label>
    </div>
    <el-table :data="studentData" :height="height">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学号">
              <span>{{ scope.row.Sno }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ scope.row.Sname }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ scope.row.Ssex }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ scope.row.Sage }}</span>
            </el-form-item>
            <el-form-item label="班级">
              <span>{{ scope.row.Sclass }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ scope.row.Stelephone }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ scope.row.Sremarks }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="学号" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.Sno }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.Sname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.Ssex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.Sage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.Sclass }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <el-dialog
      title="编辑学生信息"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="学籍编号" prop="Sno">
          <el-input v-model="ruleForm.Sno" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="Sname">
          <el-input v-model="ruleForm.Sname"></el-input>
        </el-form-item>
        <el-form-item label="学生性别" prop="Ssex">
          <el-radio-group v-model="ruleForm.Ssex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学生年龄" prop="Sage">
          <el-input v-model.number="ruleForm.Sage"></el-input>
        </el-form-item>
        <el-form-item label="学生班级" prop="Sclass">
          <el-input v-model="ruleForm.Sclass"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="Stelephone">
          <el-input v-model="ruleForm.Stelephone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Sremarks">
          <el-input type="textarea" v-model="ruleForm.Sremarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="updateEdit(ruleForm)">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentInfo",
  data() {
    return {
      title: "学生信息表",
      keyWord1:"",
      keyWord2:"",
      tableData: [],
      height: document.documentElement.clientHeight - 120,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      ruleForm: {},
      rules: {
        Sno: [{ required: true, message: "请填写所添加学生的学籍编号" }],
        Sname: [{ required: true, message: "请填写学生姓名" }],
        Ssex: [{ required: true, message: "请选择学生性别" }],
        Sage: [{ required: true, message: "请填写学生年龄" }],
        Sclass: [{ required: true, message: "请填写学生班级" }],
      },
    };
  },
  computed:{
            studentData(){
               return this.tableData.filter((p)=>{
                    return p.Sno.indexOf(this.keyWord1) !== -1 && p.Sname.indexOf(this.keyWord2) !== -1 
                })
            }
        },
  methods: {
    // 获取学生信息表
    getStudentTable() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/student",
        method: "get",
      }).then((response) => {
        this.tableData = response.data;
      });
    },
    //删除学生信息
    deleteStudentInfo(sno) {
      this.$axios({
        url: "http://127.0.0.1:5000/home/student/delete",
        method: "get",
        params: { sno: sno },
      }).then((response) => {
        this.getStudentTable();
      });
    },
    // 编辑功能
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(row));
    },
    // 保存编辑按钮
    updateEdit(params) {
      this.$axios({
        url: "http://127.0.0.1:5000/home/student/update",
        method: "get",
        params: params,
      }).then((response) => {
        if (response.data === "保存成功") {
          alert(response.data);
          this.dialogFormVisible = false;
          this.getStudentTable();
        } else {
          alert("error!!!");
        }
      });
    },
    // 取消编辑按钮
    cancelEdit() {
      if (confirm("是否确认取消所编辑的内容！")) {
        this.dialogFormVisible = false;
      }
    },
    // 删除功能
    handleDelete(index, row) {
      if (confirm("是否确认删除？")) {
        this.deleteStudentInfo(row.Sno);
      }
    },
  },

  mounted() {
    this.getStudentTable();
  },
};
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding:10px 5px;
  font-size:14px;
  text-align: right;
}
.search label {
  margin-right:30px;
}
.search input {
  margin-left:10px;
  width:160px;
  outline: none;
}
.el-breadcrumb {
  padding-bottom: 10px;
}
.el-table {
  width: 100%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 70px;
  margin-bottom: 0;
  min-width: 40%;
  max-width: 84%;
}
/deep/ .el-table .el-table__cell {
  padding: 8px 0;
}
/deep/ .el-dialog {
  margin-top: 10px !important;
}
/deep/.el-dialog__body {
  padding: 10px 20px !important;
  font-size: 12px !important;
}
/deep/.el-dialog__footer {
  padding: 0px 20px 10px !important;
}
</style>
