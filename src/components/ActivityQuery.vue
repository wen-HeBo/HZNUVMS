<template>
  <div>
    <el-row style="margin-bottom: 22px;text-align: left;">
      <el-input v-model="keyword" placeholder="请输入关键字" style="width:40%;">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 150px;">
          <el-option label="全部活动" value="1"></el-option>
          <el-option label="审核中的活动" value="2"></el-option>
          <el-option label="未通过的活动" value="3"></el-option>
          <el-option label="进行中的活动" value="4"></el-option>
          <el-option label="已完成的活动" value="5"></el-option>
        </el-select>
      </el-input>
      <el-radio v-model="radio" label="1" style="margin-left: 10px">按名称查询</el-radio>
      <el-radio v-model="radio" label="2">按组织查询</el-radio>
    </el-row>

    <div class="block">
      <el-table :data="search().slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column prop="aid" label="活动号" align="center" width="80"> </el-table-column>
        <el-table-column prop="aname" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="astarttime" label="开始时间" align="center" width="110"> </el-table-column>
        <el-table-column prop="aendtime" label="结束时间" align="center" width="110"> </el-table-column>
        <el-table-column prop="status" label="活动状态" align="center" v-if="select === '1' || select === '5'" width="150"> </el-table-column>
        <el-table-column prop="aorganizer" label="组织名称" align="center"> </el-table-column>
        <el-table-column label="查看详情" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
import Activity from './Activity.vue'
export default {
  data() {
    return {
      loading: false,
      select: '1',
      keyword: '',
      radio: '1',
      activityData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  computed: {
    flag() {
      return this.$store.state.updateActivityFlag1
    }
  },
  methods: {
    search() {
      if (this.radio === '1') return this.activityData.filter(item => item.aname.includes(this.keyword))
      if (this.radio === '2') return this.activityData.filter(item => item.aorganization.includes(this.keyword))
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    },
    btnHandler(row) {
      let newTab = {
        title: row.aname,
        name: 'a' + row.aid,
        content: Activity
      }
      this.$store.commit('addTab', newTab)
    },
    loadData() {
      this.loading = true
      if (this.select === '1') {
        this.$api
          .getActivity({
            pageNum: this.currentPage,
            pageSize: this.pageSize
          })
          .then(res => {
            this.total = res.data.total
            this.activityData = res.data.list
            this.loading = false
          })
          .then(() => {
            if (this.flag) {
              this.$store.commit('updateActivityList', false)
            }
          })
      } else {
        this.$api
          .getActivityQuery({
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            select: this.select
          })
          .then(res => {
            this.total = res.data.total
            this.activityData = res.data.list
            this.loading = false
          })
          .then(() => {
            if (this.flag) {
              this.$store.commit('updateActivityList', false)
            }
          })
      }
    }
  },
  watch: {
    select() {
      this.loadData()
    },
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
    Activity
  }
}
</script>
<style scoped></style>
