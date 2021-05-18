<template>
  <div>
    <el-row style="margin-bottom: 22px;text-align: left;">
      <el-input v-model="keyword" placeholder="关键字" style="width:30%;">
        <template slot="prepend">请输入关键字</template>
      </el-input>
      <el-radio v-model="radio" label="1" style="margin-left: 10px">按学号查询</el-radio>
      <el-radio v-model="radio" label="2">按姓名查询</el-radio>
      <el-radio v-model="radio" label="3">按学院查询</el-radio>
      <el-radio v-model="radio" label="4">按活动查询</el-radio>
      <el-button type="primary" :plain="true">导出志愿时数（Excel）</el-button>
    </el-row>
    <div class="block">
      <el-table :data="search().slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="v_name" label="姓名" align="center" width="80"> </el-table-column>
        <el-table-column prop="college" label="学院班级" align="center"> </el-table-column>
        <el-table-column prop="num" label="学号" align="center" width="150"> </el-table-column>
        <el-table-column prop="hours" label="志愿时数" align="center" width="100"> </el-table-column>
        <el-table-column prop="a_id" label="活动号" align="center" width="100"> </el-table-column>
        <el-table-column prop="a_name" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="a_time" label="活动日期" align="center" width="100"> </el-table-column>
      </el-table>
      <br />
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pageSize" layout="prev, pager, next, jumper, total, sizes" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      radio: '1',
      hoursData: [
        {
          v_name: 'ppKritt',
          college: '信息科学与工程学院',
          num: '2018212212289',
          hours: '9.5',
          a_id: '10009',
          a_name: '【全天】西溪医院志愿服务活动',
          a_time: '2021.06.05'
        },
        {
          v_name: 'ppKritt',
          college: '信息科学与工程学院',
          num: '2018212212289',
          hours: '9.5',
          a_id: '10009',
          a_name: '【全天】西溪医院志愿服务活动',
          a_time: '2021.06.05'
        },
        {
          v_name: 'ppKritt',
          college: '信息科学与工程学院',
          num: '2018212212289',
          hours: '9.5',
          a_id: '10009',
          a_name: '【全天】西溪医院志愿服务活动',
          a_time: '2021.06.05'
        },
        {
          v_name: 'ppKritt',
          college: '信息科学与工程学院',
          num: '2018212212289',
          hours: '9.5',
          a_id: '10009',
          a_name: '【全天】西溪医院志愿服务活动',
          a_time: '2021.06.05'
        },
        {
          v_name: 'ppKritt',
          college: '信息科学与工程学院',
          num: '2018212212289',
          hours: '9.5',
          a_id: '10009',
          a_name: '【全天】西溪医院志愿服务活动',
          a_time: '2021.06.05'
        }
      ],
      total: 5126,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    search() {
      if (this.radio === '1') return this.hoursData.filter(item => item.num.includes(this.keyword))
      if (this.radio === '2') return this.hoursData.filter(item => item.v_name.includes(this.keyword))
      if (this.radio === '3') return this.hoursData.filter(item => item.college.includes(this.keyword))
      if (this.radio === '4') return this.hoursData.filter(item => item.a_name.includes(this.keyword))
    },
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped></style>
