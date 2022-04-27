<template>
  <div>
    <el-divider content-position="left">全部共建基地</el-divider>
    <el-table :data="baseData" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column prop="bid" label="编号" align="center" width="80"> </el-table-column>
      <el-table-column prop="bname" label="共建基地" align="center"> </el-table-column>
      <el-table-column prop="borganization" label="所属组织" align="center"> </el-table-column>
      <el-table-column prop="status" label="当前状态" align="center" width="150"> </el-table-column>
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
      loading: false,
      baseData: []
    }
  },
  computed: {
    flag() {
      return this.$store.state.updateBaseFlag
    }
  },
  methods: {
    btnHandler(row) {
      let newTab = {
        title: row.bname,
        name: 'b' + row.bid,
        content: Base
      }
      this.$store.commit('addTab', newTab)
    },
    loadData() {
      this.loading = true
      this.$api
        .getBaseAll({})
        .then(res => {
          this.baseData = res.data.data
        })
        .then(() => {
          this.loading = false
          if (this.flag) {
            this.$store.commit('updateBase', false)
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
