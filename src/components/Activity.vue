<template>
  <div>
    <el-divider content-position="left">活动详情</el-divider>
    <el-steps :active="steps[state].states" finish-status="success" :process-status="steps[state].status" simple style="margin: 20px 0;">
      <el-step :title="steps[state].title1"></el-step>
      <el-step :title="steps[state].title2"></el-step>
      <el-step :title="steps[state].title3"></el-step>
    </el-steps>
    <div style="float: right;margin-bottom: 10px;">
      <el-button size="medium" round @click="approvalVisible = true"><i class="el-icon-info el-icon--left">审批信息</i></el-button>
      <el-button size="medium" round @click="hoursVisible = true"><i class="el-icon-s-order el-icon--left">志愿时数表</i></el-button>
    </div>

    <el-table :show-header="false" :data="activityData" style="width: 100%;" stripe border>
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info"></el-table-column>
    </el-table>

    <el-dialog title="审批信息" :visible.sync="approvalVisible" width="30%">
      <span style="white-space: pre;">{{ approvalInfo }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approvalVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="志愿时数表" :visible.sync="hoursVisible" width="50%" class="ppK">
      <el-table :data="hoursData" style="width: 100%;" stripe border>
        <el-table-column type="index" label="序号" width="50" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="class" label="学院班级" align="center"></el-table-column>
        <el-table-column prop="stuid" label="学号" width="150" align="center"></el-table-column>
        <el-table-column prop="hours" label="志愿时数" width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      steps: [
        {
          states: 0,
          status: 'error',
          title1: '审核未通过',
          title2: '活动未开始',
          title3: '志愿时数表待提交'
        },
        {
          states: 0,
          status: 'finish',
          title1: '审核中',
          title2: '活动未开始',
          title3: '志愿时数表待提交'
        },
        {
          states: 1,
          status: 'finish',
          title1: '审核通过',
          title2: '活动中',
          title3: '志愿时数表待提交'
        },
        {
          states: 2,
          status: 'finish',
          title1: '审核通过',
          title2: '活动结束',
          title3: '志愿时数表待提交'
        },
        {
          states: 4,
          status: 'finish',
          title1: '审核通过',
          title2: '活动结束',
          title3: '志愿时数表已提交'
        }
      ],
      state: 4,
      activityData: [
        {
          name: '活动编号',
          info: ''
        },
        {
          name: '志愿汇ID/共建基地编号',
          info: ''
        },
        {
          name: '活动名称',
          info: ''
        },
        {
          name: '组织方',
          info: ''
        },
        {
          name: '活动开始日期',
          info: ''
        },
        {
          name: '活动结束日期',
          info: ''
        },
        {
          name: '提交信息',
          info: ''
        },
        {
          name: '活动详情',
          info: ''
        }
      ],
      approvalVisible: false,
      approvalInfo: 'ssr\nssr',
      hoursVisible: false,
      hoursData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
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
