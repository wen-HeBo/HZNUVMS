<template>
  <div>
    <el-divider content-position="left">志愿活动时数总览</el-divider>
    <div class="block">
      <el-table :data="hoursData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column prop="v_id" label="活动编号" align="center" width="100"> </el-table-column>
        <el-table-column prop="v_name" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="date" label="活动日期" align="center" width="140"> </el-table-column>
        <el-table-column prop="num" label="活动人数" align="center" width="100"> </el-table-column>
        <el-table-column prop="hours" label="总志愿时数" align="center" width="100"> </el-table-column>
        <el-table-column label="查看详情" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler1(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="'“' + v_name + '”活动志愿时数详情'" :visible.sync="dialogTableVisible" width="50%" class="ppK">
      <el-table :data="a_hoursData" style="width: 100%;" stripe border>
        <el-table-column type="index" label="序号" width="50" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="class" label="学院班级" align="center"></el-table-column>
        <el-table-column prop="stuid" label="学号" width="150" align="center"></el-table-column>
        <el-table-column prop="hours" label="志愿时数" width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      v_name: '',
      hoursData: [{}, {}],
      a_hoursData: [{}, {}],
      total: 5126,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    btnHandler1(row) {
      this.dialogTableVisible = true
      this.v_name = row.v_name
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
