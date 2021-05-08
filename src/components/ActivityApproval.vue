<template>
  <div>
    <el-divider content-position="left">活动审批</el-divider>
    <el-table :data="activityData" border style="width: 100%">
      <el-table-column prop="id" label="活动号" align="center" width="80"> </el-table-column>
      <el-table-column prop="name" label="活动名称" align="center"> </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" width="110"> </el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center" width="110"> </el-table-column>
      <el-table-column prop="organization" label="组织名称" align="center"> </el-table-column>
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
      activityData: [{ id: '10009', name: '【全天】西溪医院志愿服务活动', startTime: '2021-05-04', endTime: '2021-05-04', organization: '浙江工业大学青年志愿者协会药学分会' }, {}, {}, {}, {}]
    }
  },
  methods: {
    btnHandler(row) {
      let newTab = {
        title: row.name,
        name: row.id + row.name,
        content: Approval
      }
      this.$store.commit('addTab', newTab)
    }
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
