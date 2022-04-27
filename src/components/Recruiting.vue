<template>
  <div>
    <el-divider content-position="left">进行中的招募</el-divider>
    <template>
      <el-table :data="recruitData" border style="width: 100%"  v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="rid" label="id" align="center" v-if="false"> </el-table-column>
        <el-table-column prop="rname" label="活动名称" align="center" width="350"> </el-table-column>
        <el-table-column prop="rdate" label="活动时间" align="center"> </el-table-column>
        <el-table-column prop="total" label="已报人数" width="100%" align="center"> </el-table-column>
        <el-table-column label="查看详情" width="120%" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import Recruitment from '@/components/Recruitment'
export default {
  data() {
    return {
      loading: false,
      recruitData: []
    }
  },
  computed: {
    flag1() {
      return this.$store.state.updateRecruitFlag1
    },
    flag2() {
      return this.$store.state.deleteRecruitFlag1
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    btnHandler(row) {
      let newTab = {
        title: row.rname,
        name: 'r' + row.rid,
        content: Recruitment
      }
      this.$store.commit('addTab', newTab)
    },
    loadData() {
      this.loading = true
      this.$api
        .getRecruiting()
        .then(res => {
          this.loading = false
          this.recruitData = res.data
        })
        .then(() => {
          if (this.flag1) {
            this.$store.commit('updateRecruiting', false)
          }
          if (this.flag2) {
            this.$store.commit('deleteRecruiting', false)
          }
        })
        .catch(err => {
          console.error(err)
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
.el-table {
  text-align: center;
}
</style>
