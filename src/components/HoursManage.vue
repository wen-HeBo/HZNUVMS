<template>
  <div>
    <el-divider content-position="left">志愿时数管理</el-divider>
    <el-row style="margin-bottom: 10px;text-align: left;">
      <el-input v-model="v_name" placeholder="请输入姓名" style="width:30%;">
        <template slot="prepend">&emsp;姓名&emsp;</template>
      </el-input>
      <el-input v-model="a_name" placeholder="请输入活动名称" style="width:30%;">
        <template slot="prepend">活动名称</template>
      </el-input>
      <el-button type="primary" @click="btn">查询</el-button>
    </el-row>
    <br />
    <el-table :data="hoursData" border style="width: 100%" v-if="flag">
      <el-table-column prop="hours" label="志愿时数" width="100" align="center">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.hours" class="ppK"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" align="center"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="80" align="center"> </el-table-column>
      <el-table-column prop="class" label="学院班级" align="center"> </el-table-column>
      <el-table-column prop="num" label="学号" align="center"> </el-table-column>
      <el-table-column prop="a_name" label="活动名称" align="center"> </el-table-column>
      <el-table-column label="查看详情" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="btnHandler1(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="btnHandler2(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      a_name: '',
      v_name: '',
      hoursData: [{ hours: '4.5', name: 'pp' }]
    }
  },
  methods: {
    btn() {
      this.flag = true
    },
    btnHandler1(row) {
      console.log(row)
    },
    btnHandler2(row) {
      console.log(row)
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
