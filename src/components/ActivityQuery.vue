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
      <el-table :data="search().slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column prop="id" label="活动号" align="center" width="80"> </el-table-column>
        <el-table-column prop="name" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center" width="110"> </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center" width="110"> </el-table-column>
        <el-table-column prop="state" label="活动状态" align="center" v-if="select === '1'" width="150"> </el-table-column>
        <el-table-column prop="organization" label="组织名称" align="center"> </el-table-column>
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
      select: '1',
      keyword: '',
      radio: '1',
      activityData: [
        {
          id: '10009',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '2021-05-04',
          endTime: '2021-05-04',
          state: '志愿时数表已提交',
          organization: '浙江工业大学青年志愿者协会药学分会'
        },
        {
          id: '2',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '',
          endTime: '',
          state: '志愿时数表已提交',
          organization: ''
        },
        {
          id: '3',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '',
          endTime: '',
          state: '志愿时数表已提交',
          organization: ''
        },
        {
          id: '4',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '',
          endTime: '',
          state: '志愿时数表已提交',
          organization: ''
        },
        {
          id: '5',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '',
          endTime: '',
          state: '志愿时数表已提交',
          organization: ''
        },
        {
          id: '6',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '',
          endTime: '',
          state: '志愿时数表已提交',
          organization: ''
        },
        {
          id: '7',
          name: '【全天】西溪医院志愿服务活动',
          startTime: '',
          endTime: '',
          state: '志愿时数表已提交',
          organization: ''
        }
      ],
      total: 5126,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    search() {
      if (this.radio === '1') return this.activityData.filter(item => item.name.includes(this.keyword))
      if (this.radio === '2') return this.activityData.filter(item => item.organization.includes(this.keyword))
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
        title: row.name,
        name: row.id + row.name,
        content: Activity
      }
      this.$store.commit('addTab', newTab)
    }
  },
  components: {
    Activity
  }
}
</script>
<style scoped></style>
