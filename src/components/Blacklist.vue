<template>
  <div>
    <el-divider content-position="left">黑名单</el-divider>
    <div class="block">
      <el-table :data="blackList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="v_name" label="姓名" align="center" width="100"> </el-table-column>
        <el-table-column prop="college" label="学院班级" align="center"> </el-table-column>
        <el-table-column prop="num" label="学号" align="center"> </el-table-column>
        <el-table-column prop="credit" label="信用积分" align="center" width="100"> </el-table-column>
        <el-table-column label="查看详情" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler1(scope.row)">变动详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="v_name + '的信用积分变动详情'" :visible.sync="dialogTableVisible" width="50%" class="ppK">
      <div style="text-align: center;font-size: 15px;margin-bottom: 10px">违规详情</div>
      <el-table :data="historyData" style="width: 100%;" stripe border>
        <el-table-column prop="credit" label="信用积分" align="center" width="80"></el-table-column>
        <el-table-column prop="date" label="时间" align="center" width="100"></el-table-column>
        <el-table-column prop="info" label="详情" align="center"></el-table-column>
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
      blackList: [{}, {}],
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
