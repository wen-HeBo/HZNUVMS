<template>
  <div>
    <el-divider content-position="left">活动详情</el-divider>
    <el-row style="margin-bottom: 20px;float: right;" v-if="status === 1"><el-button type="primary" @click="btnHandler(0)" :disabled="$store.state.power[3]">暂停此共用基地活动</el-button></el-row>
    <el-row style="margin-bottom: 20px;float: right;" v-if="status === 0"><el-button type="primary" @click="btnHandler(1)" :disabled="$store.state.power[3]">开启此共用基地活动</el-button></el-row>
    <el-table :show-header="false" :data="baseData" style="width: 100%;" stripe border v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info">
        <template slot-scope="scope">
          <div v-html="scope.row.info"></div>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 20px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      bid: '',
      status: 1,
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
  },
  methods: {
    btnHandler(status) {
      this.$api
        .updateBase({
          bid: this.bid,
          bstatus: status
        })
        .then(() => {
          let text = ''
          if (status === 0) {
            text = '已停用'
          } else {
            text = '已启用'
          }
          this.$message({
            message: this.$parent.label + text,
            type: 'success'
          })
          this.$store.commit('updateBase', true)
          this.loadData()
        })
    },
    loadData() {
      this.loading = true
      this.$api
        .getBaseById({
          bid: this.bid
        })
        .then(res => {
          this.baseData[0].info = res.data.data.bid
          this.baseData[1].info = res.data.data.bname
          this.baseData[2].info = res.data.data.borganization
          this.baseData[3].info = res.data.data.status
          this.baseData[4].info = res.data.data.binfo
          this.status = res.data.data.bstatus
        })
        .then(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.bid = this.$parent.name.slice(1)
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
