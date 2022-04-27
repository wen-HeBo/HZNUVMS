<template>
  <div>
    <el-divider content-position="left">用户管理</el-divider>
    <el-row style="margin-bottom: 22px;float: left" v-if="!$store.state.power[0]"> <el-button type="primary" @click="btnHandler1()">新增用户</el-button></el-row>
    <el-table :data="userData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column prop="astudentid" label="id" align="center" width="150"> </el-table-column>
      <el-table-column prop="aname" label="姓名" align="center" width="80"> </el-table-column>
      <el-table-column prop="aorganization" label="组织" align="center" width="280"> </el-table-column>
      <el-table-column prop="jurisdictions" label="权限" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.jurisdiction" :key="item" effect="plain" style="margin-left: 5px">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center" v-if="!$store.state.power[0]">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="btnHandler2(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="btnHandler3(scope.row)">重置密码</el-button>
          <el-popconfirm :title="'确定删除 ' + scope.row.astudentid + ' 用户吗？'" @confirm="btnHandler4(scope.row)" style="margin-left:10px">
            <el-button type="primary" size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
  </div>
</template>
<script>
import User from './User.vue'
import Password from './Password.vue'
export default {
  data() {
    return {
      loading: false,
      power: [],
      userData: [],
      jurisdictions: ['招募管理', '活动管理', '活动高级管理', '志愿时数查询', '志愿时数管理', '志愿者信用名单管理', '志愿者反馈管理', '系统管理'],
      total: 5126,
      currentPage: 1,
      pageSize: 20
    }
  },
  computed: {
    flag() {
      return this.$store.state.updateUserFlag
    }
  },
  methods: {
    btnHandler1() {
      let newTab = {
        title: '新增用户',
        name: '新增用户',
        content: User
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler2(row) {
      let newTab = {
        title: '修改' + row.aname + '的用户信息',
        name: row.astudentid + ' ' + row.aname,
        content: User
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler3(row) {
      let newTab = {
        title: '重置密码',
        name: 'password' + row.astudentid,
        content: Password
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler4(row) {
      this.$api
        .deleteUser({
          astudentid: row.astudentid
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              duration: 1000,
              type: 'success'
            })
          }
        })
        .then(() => {
          this.$store.commit('deleteUser', true)
          this.loadData()
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    },
    loadData() {
      this.loading = true
      this.$api
        .getUser({
          pageSize: this.pageSize,
          pageNum: this.currentPage
        })
        .then(res => {
          this.total = res.data.total
          this.userData = res.data.list
        })
        .then(() => {
          this.$forceUpdate()
          this.userData.forEach((item, index) => {
            this.power = []
            for (let char of item.apower) {
              this.power.push(this.jurisdictions[parseInt(char)])
            }
            item.jurisdiction = this.power
          })
        })
        .then(() => {
          this.loading = false
          if (this.flag) {
            this.$store.commit('updateUser', false)
          }
        })
    }
  },
  components: {
    User,
    Password
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
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
