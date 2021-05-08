<template>
  <div>
    <el-divider content-position="left">活动详情</el-divider>
    <el-row style="margin-bottom: 20px;float: right;"><el-button type="primary">暂停此共用基地活动</el-button></el-row>
    <el-table :show-header="false" :data="baseData" style="width: 100%;" stripe border>
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info"></el-table-column>
    </el-table>
    <div style="height: 20px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseData: [
        {
          name: '共建基地编号',
          info: ''
        },
        {
          name: '基地名称',
          info: ''
        },
        {
          name: '基地所属组织',
          info: ''
        },
        {
          name: '基地状态',
          info: ''
        },
        {
          name: '基地活动详情',
          info: ''
        }
      ]
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
