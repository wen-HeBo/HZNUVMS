<template>
  <div>
    <el-divider content-position="left">用户管理</el-divider>
    <el-row style="margin-bottom: 22px;float: left"> <el-button type="primary" @click="btnHandler1()">新增用户</el-button></el-row>
    <el-table :data="userData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
      <el-table-column prop="id" label="id" align="center" width="80"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="80"> </el-table-column>
      <el-table-column prop="organization" label="组织" align="center" width="280"> </el-table-column>
      <el-table-column prop="jurisdiction" label="权限" align="center">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tag" :key="item" effect="plain" style="margin-right: 5px">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="btnHandler2(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="btnHandler3(scope.row)">重置密码</el-button>
          <el-button type="primary" size="mini" @click="btnHandler4(scope.row)">删除</el-button>
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
      userData: [{ id: '10009', name: 'ppKritt', organization: '浙江工业大学青年志愿者协会药学分会', jurisdiction: ['招募管理', '活动管理', '活动高级管理', '志愿时数查询', '志愿时数管理', '志愿者信用名单管理', '志愿者反馈管理', '系统管理'] }, {}, {}, {}, {}],
      total: 5126,
      currentPage: 1,
      pageSize: 20
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
        title: '修改' + row.name + '的用户信息',
        name: row.id + row.name,
        content: User
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler3(row) {
      let newTab = {
        title: '重置密码',
        name: row.id + row.name,
        content: Password
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler4(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    }
  },
  components: {
    User,
    Password
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
