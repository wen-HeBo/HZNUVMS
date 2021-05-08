<template>
  <div>
    <el-divider content-position="left">全部共建基地</el-divider>
    <el-table :data="baseData" border style="width: 100%">
      <el-table-column prop="id" label="编号" align="center" width="80"> </el-table-column>
      <el-table-column prop="name" label="共建基地" align="center"> </el-table-column>
      <el-table-column prop="organization" label="所属组织" align="center"> </el-table-column>
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
      baseData: [{ id: '10009', name: '杭州市仁爱家园西溪工疗站', organization: '浙江工业大学青年志愿者协会药学分会', hours: '1828.5', total: '13', num: '270' }]
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
