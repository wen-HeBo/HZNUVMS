<template>
  <div>
    <el-divider content-position="left">活动详情</el-divider>
    <el-table :show-header="false" :data="activityData" style="width: 100%;" stripe border v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info">
        <template slot-scope="scope">
          <div v-html="scope.row.info"></div>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 20px"></div>
    <el-form>
      <el-row style="margin-bottom:22px" class="ppk">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">审批意见</div>
        <el-input type="textarea" v-model="approvalInfo" :autosize="{ minRows: 5 }" placeholder="请输入审批意见"> </el-input>
      </el-row>
      <el-form-item size="large">
        <el-button type="success" @click="btnHandler(2)">审批通过</el-button>
        <el-button type="danger" @click="btnHandler(1)">审批不通过</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      aid: '',
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
          name: '活动详情',
          info: ''
        }
      ]
    }
  },
  methods: {
    btnHandler(status) {
      this.$api
        .approvalActivity({
          aid: this.aid,
          status: status,
          approval: this.approvalInfo
        })
        .then(() => {
          this.$message({
            message: '审核成功',
            type: 'success'
          })
          this.$store.commit('updateActivity', true)
          this.$store.commit('updateActivityList', true)
          this.$store.commit('updateActivityApproval', true)
        })
        .then(() => {
          this.$store.commit('removeTabs', this.$parent.name)
        })
    },
    loadData() {
      this.loading = true
      this.$api
        .getActivityById({
          aid: this.aid
        })
        .then(res => {
          this.activityData[0].info = res.data.data.aid
          if (res.data.acode !== null) {
            this.activityData[1].info = res.data.data.acode
          }
          this.activityData[2].info = res.data.data.aname
          this.activityData[3].info = res.data.data.aorganizer
          this.activityData[4].info = res.data.data.astarttime
          this.activityData[5].info = res.data.data.aendtime
          this.activityData[6].info = res.data.data.ainfo
        })
        .then(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.aid = this.$parent.name.slice(2)
    this.loadData()
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
