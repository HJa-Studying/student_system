<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <label>课程号:<input type="text" placeholder="请输入课程号" v-model="keyWord1"/></label>
      <label>课程名:<input type="text" placeholder="请输入课程名" v-model="keyWord2"/></label>
    </div>
    <el-table :data="courseData" :height="height">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="课程号">
              <span>{{ scope.row.Cno }}</span>
            </el-form-item>
            <el-form-item label="课程名">
              <span>{{ scope.row.Cname }}</span>
            </el-form-item>
            <el-form-item label="学分">
              <span>{{ scope.row.Sredit }}</span>
            </el-form-item>
            <el-form-item label="授课老师">
              <span>{{ scope.row.Cteacher }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ scope.row.Cremarks }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="课程号" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.Cno }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名" width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.Cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学分" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.Credit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授课老师" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.Cteacher }}</span>
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
      title="编辑课程信息"
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
        <el-form-item label="课程号" prop="Cno">
          <el-input v-model="ruleForm.Cno" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="课程名" prop="Cname">
          <el-input v-model="ruleForm.Cname"></el-input>
        </el-form-item>
        <el-form-item label="学分" prop="Credit">
          <el-input v-model.number="ruleForm.Credit"></el-input>
        </el-form-item>
        <el-form-item label="授课老师" prop="Cteacher">
          <el-input v-model="ruleForm.Cteacher"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Cremarks">
          <el-input type="textarea" v-model="ruleForm.Cremarks"></el-input>
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
  name: "CourseInfo",
  data() {
    return {
      title: "课程信息表",
      keyWord1:"",
      keyWord2:"",
      tableData: [],
      height: document.documentElement.clientHeight - 120,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      ruleForm: {},
      rules: {
        Cno: [{ required: true, message: "请填写课程号" }],
        Cname: [{ required: true, message: "请填写课程名" }],
        Credit: [{ required: true, message: "请填写课程学分" }],
        Cteacher: [{ required: true, message: "请填写授课老师" }]
      },
    };
  },
  computed:{
            courseData(){
               return this.tableData.filter((p)=>{
                    return p.Cno.indexOf(this.keyWord1) !== -1 && p.Cname.indexOf(this.keyWord2) !== -1 
                })
            }
        },
  methods: {
    // 获取课程信息表
    getCourseTable() {
      this.$axios({
        url: "http://127.0.0.1:5000/home/course",
        method: "get",
      }).then((response) => {
        this.tableData = response.data;
      });
    },
    //删除课程信息
    deleteCourseInfo(cno) {
      this.$axios({
        url: "http://127.0.0.1:5000/home/course/delete",
        method: "get",
        params: { cno: cno },
      }).then((response) => {
        this.getCourseTable();
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
        url: "http://127.0.0.1:5000/home/course/update",
        method: "get",
        params: params,
      }).then((response) => {
        if (response.data === "保存成功") {
          alert(response.data);
          this.dialogFormVisible = false;
          this.getCourseTable();
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
        this.deleteCourseInfo(row.Cno);
      }
    },
  },

  mounted() {
    this.getCourseTable();
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
