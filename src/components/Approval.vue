<template>
  <div>
    <el-divider content-position="left">活动详情</el-divider>
    <el-table :show-header="false" :data="activityData" style="width: 100%;" stripe border>
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info"></el-table-column>
    </el-table>
    <div style="height: 20px"></div>
    <el-form>
      <el-row style="margin-bottom:22px" class="ppk">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">审批意见</div>
        <el-input type="textarea" v-model="approvalInfo" :autosize="{ minRows: 5 }" placeholder="请输入审批意见"> </el-input>
      </el-row>
      <el-form-item size="large">
        <el-button type="success">审批通过</el-button>
        <el-button type="danger">审批不通过</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      approvalInfo: '',
      activityData: [
        {
          name: '活动编号',
          info: ''
        },
        {
          name: '志愿汇ID/共建基地编号',
          info: ''
        },
        {
          name: '活动名称',
          info: ''
        },
        {
          name: '组织方',
          info: ''
        },
        {
          name: '活动开始日期',
          info: ''
        },
        {
          name: '活动结束日期',
          info: ''
        },
        {
          name: '提交信息',
          info: ''
        },
        {
          name: '活动详情',
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
.pre {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  white-space: nowrap;
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  text-align: center;
}
</style>
