<template>
  <div>
    <el-divider content-position="left">志愿时数管理</el-divider>
    <el-row style="margin-bottom: 10px;text-align: left;">
      <el-input v-model="vname" placeholder="请输入姓名" style="width:30%;">
        <template slot="prepend">&emsp;姓名&emsp;</template>
      </el-input>
      <el-input v-model="aname" placeholder="请输入活动名称" style="width:30%;">
        <template slot="prepend">活动名称</template>
      </el-input>
      <el-button type="primary" @click="btn">查询</el-button>
    </el-row>
    <br />
    <el-table :data="hoursData" border style="width: 100%" v-if="flag" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column prop="vhours" label="志愿时数" width="100" align="center">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.vhours" class="ppK"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="vname" label="姓名" width="100" align="center"> </el-table-column>
      <el-table-column prop="college" label="学院班级" align="center"> </el-table-column>
      <el-table-column prop="vstudentid" label="学号" align="center"> </el-table-column>
      <el-table-column prop="aid" label="活动号" width="80" align="center"> </el-table-column>
      <el-table-column prop="aname" label="活动名称" align="center"> </el-table-column>
      <el-table-column label="查看详情" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="btnHandler1(scope.row)">修改</el-button>
          <el-popconfirm :title="'确定删除 ' + scope.row.vname + ' 志愿时数吗？'" @confirm="btnHandler2(scope.row)" style="margin-left: 10px">
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      flag: false,
      aname: '',
      vname: '',
      hoursData: []
    }
  },
  methods: {
    btn() {
      if (this.aname === '' && this.vname === '') {
        this.$message.error('至少输入一项查询的关键字')
      } else {
        this.loading = true
        this.flag = true
        this.$api
          .getHours({
            vname: this.vname,
            aname: this.aname
          })
          .then(res => {
            this.hoursData = res.data.data
          })
          .then(() => {
            this.loading = false
          })
      }
    },
    btnHandler1(row) {
      this.$api
        .updateVolunteerHours({
          aid: row.aid,
          vstudentid: row.vstudentid,
          vhours: row.vhours
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
    },
    btnHandler2(row) {
      this.$api
        .deleteHours({
          aid: row.aid,
          vstudentid: row.vstudentid
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
          this.btn()
        })
    }
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
</style>
