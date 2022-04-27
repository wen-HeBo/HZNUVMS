<template>
  <div>
    <el-divider content-position="left">志愿活动时数总览</el-divider>
    <div class="block">
      <el-table :data="hoursData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%" v-loading="loading1" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column prop="aid" label="活动编号" align="center" width="100"> </el-table-column>
        <el-table-column prop="aname" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="atime" label="活动日期" align="center" width="140"> </el-table-column>
        <el-table-column prop="num" label="活动人数" align="center" width="100"> </el-table-column>
        <el-table-column prop="vhours" label="总志愿时数" align="center" width="100"> </el-table-column>
        <el-table-column label="查看详情" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler1(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="'“' + aname + '”活动志愿时数详情'" :visible.sync="dialogTableVisible" width="50%" class="ppK">
      <el-table :data="a_hoursData" style="width: 100%;" stripe border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" width="50" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="vname" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="college" label="学院班级" align="center"></el-table-column>
        <el-table-column prop="vstudentid" label="学号" width="150" align="center"></el-table-column>
        <el-table-column prop="vhours" label="志愿时数" width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      dialogTableVisible: false,
      aname: '',
      hoursData: [],
      a_hoursData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    btnHandler1(row) {
      this.loading2 = true
      this.dialogTableVisible = true
      this.$api
        .getHoursByActivity({
          aid: row.aid
        })
        .then(res => {
          this.a_hoursData = res.data.data
        })
        .then(() => {
          this.loading2 = false
        })
      this.aname = row.aname
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    },
    loadData() {
      this.loading1 = true
      this.$api
        .getHoursAll({
          pageNum: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.hoursData = res.data.list
          this.total = res.data.total
        })
        .then(() => {
          this.loading1 = false
        })
    }
  },
  created() {
    this.loadData()
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
