<template>
  <div>
    <el-row style="margin-bottom: 22px;text-align: left;">
      <el-input v-model="keyword" placeholder="关键字" style="width:30%;">
        <template slot="prepend">请输入关键字</template>
      </el-input>
      <el-radio v-model="radio" label="1" style="margin-left: 10px">按学号查询</el-radio>
      <el-radio v-model="radio" label="2">按姓名查询</el-radio>
      <el-radio v-model="radio" label="3">按学院查询</el-radio>
      <el-radio v-model="radio" label="4">按活动查询</el-radio>
      <el-button type="primary" :plain="true" @click="exportExcel" :disabled="$store.state.power[4]">导出志愿时数（Excel）</el-button>
    </el-row>
    <div class="block">
      <el-table :data="search().slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%" class="table">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="vname" label="姓名" align="center" width="80"> </el-table-column>
        <el-table-column prop="college" label="学院班级" align="center"> </el-table-column>
        <el-table-column prop="vstudentid" label="学号" align="center" width="150"> </el-table-column>
        <el-table-column prop="vhours" label="志愿时数" align="center" width="100"> </el-table-column>
        <el-table-column prop="aid" label="活动号" align="center" width="100"> </el-table-column>
        <el-table-column prop="aname" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="vtime" label="活动日期" align="center" width="100"> </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      radio: '1',
      hoursData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    appendZero(obj) {
      if (obj < 10) return '0' + '' + obj
      else return obj
    },
    // 导出表格所用
    exportExcel() {
      // 设置当前日期
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let name = year + '-' + this.appendZero(month) + '-' + this.appendZero(day)
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = this.$XLSX.utils.table_to_book(document.querySelector('.table'))
      /* get binary string as output */
      var wbout = this.$XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        this.$FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name + '-志愿时数表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    indexMethod(index) {
      return index + 1
    },
    search() {
      if (this.radio === '1') return this.hoursData.filter(item => item.vstudentid.includes(this.keyword))
      if (this.radio === '2') return this.hoursData.filter(item => item.vname.includes(this.keyword))
      if (this.radio === '3') return this.hoursData.filter(item => item.college.includes(this.keyword))
      if (this.radio === '4') return this.hoursData.filter(item => item.aname.includes(this.keyword))
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
      this.$api
        .getVolunteerHoursList({
          pageNum: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.hoursData = res.data.list
          this.total = res.data.total
        })
    }
  },
  created() {
    this.loadData()
  }
}
</script>
<style scoped></style>
