<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图形报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex">
      <div ref="chart1" style="margin:10px;width: 60%; height: 520px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      title: "图形报表",
      tableData: [],
      classrooms: [],
      courses: [],
      a: [],
      series: [],
    };
  },
  methods: {
    // 获取各科各班平均分
    async getEchartData1() {
      await this.$axios({
        url: "http://127.0.0.1:5000/home/chart",
        method: "get",
      }).then((response) => {
        this.tableData = response.data;
        if (this.tableData) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.classrooms.push(this.tableData[i].class);
          }
          for (let j = 0; j < this.tableData.length; j++) {
            this.courses.push(this.tableData[j].cname);
          }

          // 转化成数组形式
          this.classrooms = Array.from(new Set(this.classrooms));
          this.courses = Array.from(new Set(this.courses));

          // 换算出各科各班平均分
          for (let i = 0; i < this.courses.length; i++) {
            let kc = this.courses[i];
            let a1 = {};
            for (let j = 0; j < this.tableData.length; j++) {
              if (kc === this.tableData[j].cname) {
                this.$set(
                  a1,
                  this.tableData[j].class,
                  this.tableData[j].avgGrade
                );
              }
            }
            this.a.push(a1);
          }
          // 转化成echarts所需要的series
          for (let i = 0; i < this.a.length; i++) {
            //   for(let j=0;j<=i;j++){
            let series1 = {};
            this.$set(series1, "name", this.courses[i]);
            this.$set(series1, "type", "line");
            this.$set(series1, "data", Object.values(this.a[i]));
            this.series.push(series1);
          }
        }
      });
      const myChart = this.$echarts.init(this.$refs.chart1);
      const option = {
        title: {
          text: "各班各科平均分",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.courses,
          top: "10%",
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "3%",
          top: "25%",
          containLabel: true,
        },
        xAxis: {
          name:"班级",
          type: "category",
          boundaryGap: false,
          data: this.classrooms,
        },
        yAxis: {
          name:"平均分",
          type: "value",
          min: 65,
          max: 90,
          interval: 5,
        },
        series: this.series,
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.getEchartData1();
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 10px;
}
.charts {
  width: 100%;
}
</style>
