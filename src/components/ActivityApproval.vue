<template>
  <div>
    <el-divider content-position="left">活动审批</el-divider>
    <el-table :data="activityData" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column prop="aid" label="活动号" align="center" width="80"> </el-table-column>
      <el-table-column prop="aname" label="活动名称" align="center"> </el-table-column>
      <el-table-column prop="astarttime" label="开始时间" align="center" width="110"> </el-table-column>
      <el-table-column prop="aendtime" label="结束时间" align="center" width="110"> </el-table-column>
      <el-table-column prop="aorganizer" label="组织名称" align="center"> </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="btnHandler(scope.row)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Approval from './Approval.vue'
export default {
  data() {
    return {
      loading: false,
      activityData: []
    }
  },
  computed: {
    flag() {
      return this.$store.state.updateActivityFlag3
    }
  },
  methods: {
    btnHandler(row) {
      let newTab = {
        title: row.aname,
        name: 'aa' + row.aid,
        content: Approval
      }
      this.$store.commit('addTab', newTab)
    },
    loadData() {
      this.loading = true
      this.$api
        .getActivityApproval({})
        .then(res => {
          this.activityData = res.data.data
        })
        .then(() => {
          this.loading = false
          if (this.flag) {
            this.$store.commit('updateActivityApproval', false)
          }
        })
    }
  },
  watch: {
    flag(newValue) {
      if (newValue) {
        this.loadData()
      }
    }
  },
  created() {
    this.loadData()
  },
  components: {
    Approval
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
