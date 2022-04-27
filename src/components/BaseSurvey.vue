<template>
  <div>
    <el-divider content-position="left">全部共建基地</el-divider>
    <el-table :data="baseData" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column prop="bid" label="编号" align="center" width="80"> </el-table-column>
      <el-table-column prop="bname" label="共建基地" align="center"> </el-table-column>
      <el-table-column prop="borganization" label="所属组织" align="center"> </el-table-column>
      <el-table-column prop="hours" label="总志愿时数" align="center" width="100"> </el-table-column>
      <el-table-column prop="total" label="活动次数" align="center" width="100"> </el-table-column>
      <el-table-column prop="num" label="活动人次" align="center" width="100"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      baseData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      this.$api
        .getBaseList({})
        .then(res => {
          this.baseData = res.data.data
        })
        .then(() => {
          this.loading = false
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
