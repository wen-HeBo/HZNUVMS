<template>
  <div>
    <el-divider content-position="left">全部共建基地</el-divider>
    <el-table :data="baseData" border style="width: 100%">
      <el-table-column prop="id" label="编号" align="center" width="80"> </el-table-column>
      <el-table-column prop="name" label="共建基地" align="center"> </el-table-column>
      <el-table-column prop="organization" label="所属组织" align="center"> </el-table-column>
      <el-table-column prop="state" label="当前状态" align="center" width="150"> </el-table-column>
      <el-table-column label="查看详情" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="btnHandler(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Base from './Base.vue'
export default {
  data() {
    return {
      baseData: [{ id: '10009', name: '杭州市仁爱家园西溪工疗站', organization: '浙江工业大学青年志愿者协会药学分会', state: '启用中' }, {}, {}, {}, {}]
    }
  },
  methods: {
    btnHandler(row) {
      let newTab = {
        title: row.name,
        name: row.id + row.name,
        content: Base
      }
      this.$store.commit('addTab', newTab)
    }
  },
  components: {
    Base
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
