<template>
  <div>
    <el-divider content-position="left"> 志愿者信用积分管理</el-divider>
    <el-row style="margin-bottom: 22px;text-align: left;">
      <el-input v-model="keyword" placeholder="请输入关键字" style="width:40%;">
        <template slot="prepend">关键字</template>
      </el-input>
      <el-radio v-model="radio" label="1" style="margin-left: 10px">按学号查询</el-radio>
      <el-radio v-model="radio" label="2">按姓名查询</el-radio>
      <el-radio v-model="radio" label="3">按学院查询</el-radio>
    </el-row>
    <div class="block">
      <el-table :data="search().slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="v_name" label="姓名" align="center" width="100"> </el-table-column>
        <el-table-column prop="college" label="学院班级" align="center"> </el-table-column>
        <el-table-column prop="num" label="学号" align="center"> </el-table-column>
        <el-table-column prop="credit" label="信用积分" align="center" width="100"> </el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler1(scope.row)">变动详情</el-button>
            <el-button type="success" size="mini" @click="btnHandler2(scope.row)">修改信用积分</el-button>
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

    <el-dialog title="修改信用积分" :visible.sync="dialogFormVisible" width="35%" class="ppK">
      <el-form :model="form">
        <el-input v-model="form.credit" style="width:40%;">
          <template slot="prepend">信用积分</template>
        </el-input>
        <el-form-item label="变动详情">
          <el-input type="textarea" :rows="3" v-model="form.info"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      radio: '1',
      v_name: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      historyData: [],
      creditData: [{ v_name: 'pp', college: '', num: '', credit: '' }],
      form: { credit: '', info: '' },
      total: 5126,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    search() {
      if (this.radio === '1') return this.creditData.filter(item => item.num.includes(this.keyword))
      if (this.radio === '2') return this.creditData.filter(item => item.v_name.includes(this.keyword))
      if (this.radio === '3') return this.creditData.filter(item => item.college.includes(this.keyword))
    },
    btnHandler1(row) {
      this.dialogTableVisible = true
      this.v_name = row.v_name
    },
    btnHandler2(row) {
      this.dialogFormVisible = true
      console.log(row)
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
