<template>
  <div>
    <el-divider content-position="left">活动详情</el-divider>
    <el-steps :active="steps[state].states" finish-status="success" :process-status="steps[state].status" simple style="margin: 20px 0;">
      <el-step :title="steps[state].title1"></el-step>
      <el-step :title="steps[state].title2"></el-step>
      <el-step :title="steps[state].title3"></el-step>
    </el-steps>
    <div style="float: right;margin-bottom: 10px;">
      <el-button size="medium" round @click="approvalVisible = true" :disabled="state !== 0 ? false : true"><i class="el-icon-info el-icon--left">审批信息</i></el-button>
      <el-button size="medium" round @click="btnHandler" :disabled="state === 5 ? false : true"><i class="el-icon-s-order el-icon--left">志愿时数表</i></el-button>
    </div>

    <el-table :show-header="false" :data="activityData" style="width: 100%;" stripe border v-loading="loading1" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info">
        <template slot-scope="scope">
          <div v-html="scope.row.info"></div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="审批信息" :visible.sync="approvalVisible" width="30%">
      <span style="white-space: pre;">{{ approvalInfo }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approvalVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="志愿时数表" :visible.sync="hoursVisible" width="50%" class="ppK">
      <el-table :data="hoursData" style="width: 100%;" stripe border v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" width="50" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="vname" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="college" label="学院班级" align="center"></el-table-column>
        <el-table-column prop="vstudentid" label="学号" width="150" align="center"></el-table-column>
        <el-table-column prop="vhours" label="志愿时数" width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      aid: '',
      steps: [
        {
          states: 0,
          status: 'finish',
          title1: '审核中',
          title2: '活动未开始',
          title3: '志愿时数表待提交'
        },
        {
          states: 0,
          status: 'error',
          title1: '审核未通过',
          title2: '活动未开始',
          title3: '志愿时数表待提交'
        },
        {
          states: 0,
          status: 'success',
          title1: '审核通过',
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
      state: 0,
      btnChangeEnable: 'false',
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
          name: '活动详情',
          info: ''
        }
      ],
      approvalVisible: false,
      approvalInfo: '',
      hoursVisible: false,
      hoursData: []
    }
  },
  computed: {
    flag() {
      return this.$store.state.updateActivityFlag2
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    btnHandler() {
      this.loading2 = true
      this.hoursVisible = true
      this.$api
        .getHoursByActivity({
          aid: this.aid
        })
        .then(res => {
          this.hoursData = res.data.data
        })
        .then(() => {
          this.loading2 = false
        })
    },
    loadData() {
      this.loading1 = true
      this.$api
        .getActivityById({
          aid: this.aid
        })
        .then(res => {
          this.activityData[0].info = res.data.data.aid
          if (res.data.acode !== null) {
            this.activityData[1].info = res.data.data.acode
          }
          this.activityData[2].info = res.data.data.aname
          this.activityData[3].info = res.data.data.aorganizer
          this.activityData[4].info = res.data.data.astarttime
          this.activityData[5].info = res.data.data.aendtime
          this.activityData[6].info = res.data.data.ainfo
          this.state = res.data.data.astatus
          this.approvalInfo = res.data.data.approval
        })
        .then(() => {
          this.loading1 = false
          if (this.flag) {
            this.$store.commit('updateActivity', false)
          }
        })
    }
  },
  watch: {
    flag(newValue) {
      if (newValue) {
        this.loadData()
      }
    }
  },
  created() {
    this.aid = this.$parent.name.slice(1)
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
