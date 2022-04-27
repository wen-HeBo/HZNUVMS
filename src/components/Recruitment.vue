<template>
  <div class="recruit">
    <el-divider content-position="left">招募详情</el-divider>
    <el-table :show-header="false" :data="recruitData" style="width: 100%;" stripe border v-loading="loading1" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info" :show-overflow-tooltip="false" width="auto">
        <template slot-scope="scope">
          <span v-html="scope.row.info"></span>
        </template>
      </el-table-column>
    </el-table>
    <br /><br />
    <el-divider content-position="left" v-if="!$store.state.power[1]">招募操作</el-divider>
    <el-row style="text-align: left;margin-left: 30px" v-if="!$store.state.power[1]">
      <el-button type="success" @click="stopRecruit" :plain="true">{{ isStopTitle }}</el-button>
      <el-button type="primary" @click="updateRecruit">修改招募信息</el-button>
      <el-popconfirm :title="'确定删除 ' + recruitData[1].info + ' 招募吗？'" @confirm="deleteRecruit()" style="margin-left: 10px">
        <el-button type="danger" slot="reference">删除本活动招募</el-button>
      </el-popconfirm>
      <el-button style="margin-left: 10px" @click="exportExcel">导出报名信息（Excel）</el-button>
      <el-button type="warning">通过小程序发送录取结果通知</el-button>
    </el-row>
    <br  v-if="!$store.state.power[1]"/><br v-if="!$store.state.power[1]" />
    <el-divider content-position="left">报名信息</el-divider>
    <div>
      <el-table :data="recruitNum" border style="width: fit-content" v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" width="100%" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="date" label="时间选项" align="center" width="200%" v-if="timeFlag"> </el-table-column>
        <el-table-column prop="place" label="地点选项" align="center" width="200%" v-if="placeFlag"> </el-table-column>
        <el-table-column prop="num" label="报名人数" width="200%" align="center"> </el-table-column>
      </el-table>
      <br />
    </div>
    <el-table :data="peopleData" border style="width: 100%" class="table" v-loading="loading3" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column type="index" label="序号" width="100%" :index="indexMethod" align="center"> </el-table-column>
      <el-table-column prop="vstudentid" label="Id" width="200%" align="center" v-if="false"> </el-table-column>
      <el-table-column prop="vphone" label="联系方式" width="200%" align="center" v-if="false"> </el-table-column>
      <el-table-column prop="time" label="报名时间" width="200%" align="center" v-if="false"> </el-table-column>
      <el-table-column prop="vname" label="姓名" width="200%" align="center"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="100%" align="center"> </el-table-column>
      <el-table-column prop="college" label="学院班级" align="center"> </el-table-column>
      <el-table-column prop="rdateselect" label="时间选项" align="center" v-if="timeFlag"> </el-table-column>
      <el-table-column prop="rplaceselect" label="地点选项" align="center" v-if="placeFlag"> </el-table-column>
      <el-table-column label="查看详情" width="120%" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="btnHandler(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="personData[0].info + '的报名信息'" :visible.sync="dialogTableVisible" width="40%" class="ppK">
      <div style="text-align: center;font-size: 15px;margin-bottom: 10px">基本信息</div>
      <el-table :data="personData.filter(v => v.info != '')" :show-header="false" style="width: 100%;" stripe border v-loading="loading4" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column width="150" prop="name"></el-table-column>
        <el-table-column prop="info"></el-table-column>
      </el-table>
      <br />
      <div style="text-align: center;font-size: 15px;margin-bottom: 10px">历史志愿活动</div>
      <el-table :data="historyData" style="width: 100%;" stripe border v-loading="loading4" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column prop="aname" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="vtime" label="活动日期" width="150" align="center"></el-table-column>
        <el-table-column prop="vhours" label="志愿时数" width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import RecruitNew from './RecruitNew.vue'
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      timeFlag: false,
      placeFlag: false,
      isStopTitle: '',
      rid: '',
      isStop: 0,
      campus: ['仓前校区 ', '下沙校区 ', '玉皇山校区 '],
      auth: ['未设置表单收集', '身份证 ', '外语水平 ', '服装尺码 ', '志愿服务经历 ', '岗位调剂 '],
      colleges: [
        '未设置定向招募学院',
        '经济与管理学院 ',
        '沈钧儒法学院 ',
        '公共管理学院 ',
        '教育学院 ',
        '体育与健康学院 ',
        '人文学院 ',
        '外国语学院 ',
        '理学院 ',
        '材料与化学化工学院 ',
        '生命与环境科学学院 ',
        '信息科学与工程学院 ',
        '医学部 ',
        '阿里巴巴商学院 ',
        '音乐学院 ',
        '美术学院 ',
        '文化创意学院 ',
        '哈尔科夫学院 ',
        '经亨颐教师教育学院 ',
        '国际教育学院 '
      ],
      recruitData: [
        {
          name: '招募校区',
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
          name: '活动地点',
          info: ''
        },
        {
          name: '活动时间',
          info: ''
        },
        {
          name: '需求人数',
          info: ''
        },
        {
          name: '活动详情',
          info: ''
        },
        {
          name: '表单收集',
          info: ''
        },
        {
          name: '报名进度',
          info: ''
        },
        {
          name: '时间选项',
          info: ''
        },
        {
          name: '地点选项',
          info: ''
        },
        {
          name: '定向招募',
          info: ''
        },
        {
          name: '联系方式',
          info: ''
        }
      ],
      recruitNum: [],
      peopleData: [],
      personData: [
        {
          name: '姓名',
          info: ''
        },
        {
          name: '性别',
          info: ''
        },
        {
          name: '学院班级',
          info: ''
        },
        {
          name: '学号',
          info: ''
        },
        {
          name: '联系方式',
          info: ''
        },
        {
          name: '时间选项',
          info: ''
        },
        {
          name: '地点选项',
          info: ''
        },
        {
          name: '报名时间',
          info: ''
        }
      ],
      dialogTableVisible: false,
      historyData: []
    }
  },
  computed: {
    flag() {
      return this.$store.state.updateRecruitFlag
    }
  },
  methods: {
    // 导出表格所用
    exportExcel() {
      let data = []
      if (this.timeFlag === true && this.placeFlag === true) {
        data = [
          ['序号', '姓名', '学号', '性别', '学院班级', '联系电话', '时间选项', '地点选项', '报名时间', '备注'] // 导出表头
        ] // 表格表头
        this.peopleData.forEach((item, index) => {
          let rowData = []
          // 导出内容的字段
          rowData = [index + 1, item.vname, item.vstudentid, item.sex, item.college, item.vphone, item.rdateselect, item.rplaceselect, item.time]
          data.push(rowData)
        })
      } else if (this.timeFlag === true && this.placeFlag === false) {
        data = [
          ['序号', '姓名', '学号', '性别', '学院班级', '联系电话', '时间选项', '报名时间', '备注'] // 导出表头
        ] // 表格表头
        this.peopleData.forEach((item, index) => {
          let rowData = []
          // 导出内容的字段
          rowData = [index + 1, item.vname, item.vstudentid, item.sex, item.college, item.vphone, item.rdateselect, item.time]
          data.push(rowData)
        })
      } else if (this.timeFlag === false && this.placeFlag === true) {
        data = [
          ['序号', '姓名', '学号', '性别', '学院班级', '联系电话', '地点选项', '报名时间', '备注'] // 导出表头
        ] // 表格表头
        this.peopleData.forEach((item, index) => {
          let rowData = []
          // 导出内容的字段
          rowData = [index + 1, item.vname, item.vstudentid, item.sex, item.college, item.vphone, item.rplaceselect, item.time]
          data.push(rowData)
        })
      } else {
        data = [
          ['序号', '姓名', '学号', '性别', '学院班级', '联系电话', '报名时间', '备注'] // 导出表头
        ] // 表格表头
        this.peopleData.forEach((item, index) => {
          let rowData = []
          // 导出内容的字段
          rowData = [index + 1, item.vname, item.vstudentid, item.sex, item.college, item.vphone, item.time]
          data.push(rowData)
        })
      }

      let worksheet = this.$XLSX.utils.aoa_to_sheet(data) // 数据转换成工作表格式
      for (let [key, value] of Object.entries(worksheet)) {
        if (key.startsWith('!')) continue
        // value是一个单元格对象（Cell Objects）,s表格为样式对象（Style Objects）
        value.s = {
          alignment: { vertical: 'center', horizontal: 'center' },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      }

      let workbook = this.$XLSX.utils.book_new()
      this.$XLSX.utils.book_append_sheet(workbook, worksheet, this.recruitData[1].info + '报名信息')
      // 如果要样式，需要用xlsx-style的write方法
      let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }
      let wbout = this.$XLSX.write(workbook, wopts)
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
        return buf
      }
      // 导出表格
      this.$FileSaver.saveAs(new Blob([s2ab(wbout)], { type: '' }), this.recruitData[1].info + `报名信息.xlsx`)
    },
    indexMethod(index) {
      return index + 1
    },
    btnHandler(row) {
      this.loading4 = true
      this.personData[0].info = row.vname
      this.personData[1].info = row.sex
      this.personData[2].info = row.college
      this.personData[3].info = row.vstudentid
      this.personData[4].info = row.vphone
      if (this.timeFlag) {
        this.personData[5].info = row.rdateselect
      }
      if (this.placeFlag) {
        this.personData[6].info = row.rplaceselect
      }
      this.personData[7].info = row.time
      this.$api
        .getVolunteerHours({
          vstudentid: row.vstudentid
        })
        .then(res => {
          this.historyData = res.data.data
        })
        .then(() => {
          this.loading4 = false
          this.dialogTableVisible = true
        })
    },
    stopRecruit() {
      this.$api
        .changeRecruitStatus({
          rid: this.rid,
          riscomplete: this.isStop
        })
        .then(() => {
          this.$message({
            message: this.$parent.label + this.isStopTitle,
            type: 'success'
          })
          this.$store.commit('updateRecruiting', true)
          this.$store.commit('updateRecruited', true)
          this.loadData()
        })
    },
    updateRecruit() {
      let newTab = {
        title: '修改 ' + this.recruitData[1].info,
        name: 'update_r ' + this.rid,
        content: RecruitNew
      }
      this.$store.commit('addTab', newTab)
    },
    deleteRecruit() {
      this.$api
        .deleteRecruit({
          rid: this.rid
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
          this.$store.commit('deleteRecruiting', true)
          this.$store.commit('deleteRecruited', true)
          this.$store.commit('deleteRecruit', true)
          this.$store.commit('removeTabs', this.$parent.name)
        })
    },
    loadData() {
      this.loading1 = true
      this.loading2 = true
      this.loading3 = true
      this.$api
        .getRecruitById({
          rid: this.rid
        })
        .then(res => {
          this.recruitData[0].info = ''
          for (let char of res.data.data.rcampus) {
            this.recruitData[0].info += this.campus[parseInt(char) - 1]
          }
          this.recruitData[1].info = res.data.data.rname
          this.recruitData[2].info = res.data.data.rorganizer
          this.recruitData[3].info = res.data.data.rplace
          this.recruitData[4].info = res.data.data.rdate
          this.recruitData[5].info = res.data.data.rpeoplenumber
          this.recruitData[6].info = res.data.data.rinfo

          this.recruitData[7].info = ''
          for (let char of res.data.data.rinfocollect) {
            this.recruitData[7].info += this.auth[parseInt(char)]
          }

          if (res.data.data.risshownumber === 0) {
            this.recruitData[8].info = '不向志愿者显示实时报名进度'
          } else {
            this.recruitData[8].info = '向志愿者显示实时报名进度'
          }

          this.recruitData[9].info = res.data.data.rdateselect
          this.recruitData[10].info = res.data.data.rplaceselect

          this.recruitData[11].info = ''
          for (let char of res.data.data.rcollege) {
            this.recruitData[11].info += this.colleges[parseInt(char)]
          }

          this.recruitData[12].info = res.data.data.rleader
          this.isStopTitle = res.data.data.riscomplete === 0 ? '停止招募' : '开始招募'
          this.isStop = res.data.data.riscomplete === 0 ? 1 : 0

          if (res.data.data.rplaceselect !== '') {
            this.placeFlag = true
          }
          if (res.data.data.rdateselect !== '') {
            this.timeFlag = true
          }
        })
        .then(() => {
          this.loading1 = false
          if (this.flag) {
            this.$store.commit('updateRecruit', false)
          }
        })
        .catch(err => {
          console.error(err)
        })
      this.$api
        .getRecruitNum({
          rid: this.rid
        })
        .then(res => {
          this.loading2 = false
          this.recruitNum = res.data.data
        })
      this.$api
        .getRecruitVolunteer({
          rid: this.rid
        })
        .then(res => {
          this.loading3 = false
          this.peopleData = res.data.data
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
    this.rid = this.$parent.name.slice(1)
    this.loadData()
  },
  components: {
    RecruitNew
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
.recruit {
  padding: 0 30px;
}
</style>
