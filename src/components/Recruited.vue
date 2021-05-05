<template>
  <div>
    <el-divider content-position="left">已完成的招募</el-divider>
    <div class="block">
      <el-table :data="recruitData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="50%"> </el-table-column>
        <el-table-column prop="name" label="活动名称" align="center"> </el-table-column>
        <el-table-column prop="time" label="活动时间" align="center"> </el-table-column>
        <el-table-column label="操作" width="300%" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="btnHandler1(scope.row)">查看详情</el-button>
            <el-button type="primary" size="mini" @click="btnHandler2(scope.row)">结果通知</el-button>
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
      recruitData: [
        {
          name: '【全天】西溪医院志愿服务活动',
          time: '2021年05月03日（周一）——2021年05月06日（周四）',
          num: '56'
        },
        {
          name: '信息分会树兰医院志愿者活动',
          time: '2021年5月3日下午13:30-17:00（周一） ；2021年5月6日下午13:30-17:00（周四）',
          num: '25'
        },
        {
          name: '信息分会垃圾分类志愿者活动',
          time: '2021年5月1日（周六） 晚上18：00-20：00 2021年5月2日（周日） 晚上18：00-20：00',
          num: '22'
        },
        {
          name: '清禾公益志愿服务',
          time: '5.3-5.9',
          num: '3'
        },
        {
          name: '管理分会DO都城志愿活动',
          time: '2021.05.04',
          num: '6'
        },
        {
          name: '生工分会交通文明礼让志愿者活动',
          time: '2021年5月1,2日上午9:00-10:00',
          num: '21'
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
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
        title: row.name,
        name: row.name,
        content: Recruitment
      }
      this.$store.commit('addTab', newTab)
    },
    btnHandler2(row) {
      console.log(row.name)
    }
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
