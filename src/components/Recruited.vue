<template>
  <div>
    <el-divider content-position="left">已完成的招募</el-divider>
    <div class="block">
      <el-table :data="recruitData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="rid" label="id" align="center" v-if="false"> </el-table-column>
        <el-table-column prop="rname" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="rdate" label="活动时间" align="center"> </el-table-column>
        <el-table-column label="操作" width="250%" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler1(scope.row)">查看详情</el-button>
            <el-button type="primary" size="mini" @click="btnHandler2(scope.row)" :disabled="$store.state.power[1]">结果通知</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
import Recruitment from '@/components/Recruitment'
export default {
  data() {
    return {
      loading: false,
      recruitData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  computed: {
    flag1() {
      return this.$store.state.updateRecruitFlag2
    },
    flag2() {
      return this.$store.state.deleteRecruitFlag2
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    },
    btnHandler1(row) {
      let newTab = {
        title: row.rname,
        name: 'r' + row.rid,
        content: Recruitment
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler2(row) {
      console.log(row.name)
    },
    loadData() {
      this.loading = true
      this.$api
        .getRecruited({
          pageSize: this.pageSize,
          pageNum: this.currentPage
        })
        .then(res => {
          this.loading = false
          this.total = res.data.total
          this.recruitData = res.data.list
        })
        .then(() => {
          if (this.flag1) {
            this.$store.commit('updateRecruited', false)
          }
          if (this.flag2) {
            this.$store.commit('deleteRecruited', false)
          }
        })
    }
  },
  watch: {
    flag1(newValue) {
      if (newValue) {
        this.loadData()
      }
    },
    flag2(newValue) {
      if (newValue) {
        this.loadData()
      }
    }
  },
  created() {
    this.loadData()
  },
  components: {
    Recruitment
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
