<template>
  <div class="r">
    <el-form ref="multipleTable" :model="recruitForm" status-icon label-width="80px" style="padding-right:20px" size="large" :rules="rules" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-form-item class="ppK" prop="campusLength">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">招募校区</div>
        <el-checkbox-group v-model="recruitForm.campus" style="float:left">
          <el-checkbox-button style="border-top-left-radius: 0;border-bottom-left-radius: 0;" label="1" name="campus1">仓前校区</el-checkbox-button>
          <el-checkbox-button label="2" name="campus2">下沙校区</el-checkbox-button>
          <el-checkbox-button label="3" name="campus3">玉皇山校区</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item class="ppK" prop="name">
        <el-input v-model="recruitForm.name" placeholder="请输入活动名称" clearable>
          <template slot="prepend">活动名称</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="organizer">
        <el-input v-model="recruitForm.organizer" placeholder="请输入组织名称" clearable>
          <template slot="prepend">组织名称</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="time">
        <el-input v-model="recruitForm.time" placeholder="请输入活动时间" clearable>
          <template slot="prepend">活动时间</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="place">
        <el-input v-model="recruitForm.place" placeholder="请输入活动地点" clearable>
          <template slot="prepend">活动地点</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="num">
        <el-input v-model="recruitForm.num" style="width:40%;float:left" placeholder="请输入需求人数" clearable>
          <template slot="prepend">需求人数</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="main">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">活动详情</div>
        <el-input type="textarea" v-model="recruitForm.main" :autosize="{ minRows: 10 }" placeholder="请输入活动详情（至少50字）" clearable> </el-input>
      </el-form-item>

      <el-row style="margin-bottom:22px">
        <div class="pre" style="float: left;margin-right: 25px;">表单收集</div>
        <el-checkbox-group v-model="recruitForm.auth" style="float:left">
          <el-checkbox border label="1" name="auth1">身份证</el-checkbox>
          <el-checkbox border label="2" name="auth2">外语水平</el-checkbox>
          <el-checkbox border label="3" name="auth3">服装尺码</el-checkbox>
          <el-checkbox border label="4" name="auth4">志愿服务经历</el-checkbox>
          <el-checkbox border label="5" name="auth5">岗位调剂</el-checkbox>
        </el-checkbox-group>
      </el-row>

      <el-row style="margin-bottom:22px">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">报名进度</div>
        <el-checkbox-group v-model="recruitForm.showNum" style="float:left">
          <el-checkbox-button label="1" name="showNum">向志愿者实时显示报名人数</el-checkbox-button>
        </el-checkbox-group>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.s_time" placeholder="请输入时间选项以空格结尾（非必填项，当且仅有一个时间选项时，可空白此选项）" clearable>
          <template slot="prepend">时间选项</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.s_place" placeholder="请输入地点选项以空格结尾（非必填项，当且仅有一个地点选项时，可空白此选项）" clearable>
          <template slot="prepend">地点选项</template>
        </el-input>
      </el-row>

      <el-form-item style="margin-left: 30px;">
        <div class="pre" style="float: left;postion:relative;left:-110px;">定向招募</div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="float:left; postion:relative;left:-97px;">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="recruitForm.college" @change="handleCheckedChange" style="float:left">
          <el-checkbox v-for="college in colleges" :label="college.key" :key="college.key" style="float:left">{{ college.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item class="ppK" prop="phone">
        <el-input v-model="recruitForm.phone" placeholder="请输入活动报名联系人及联系方式" clearable>
          <template slot="prepend">&nbsp;&nbsp;联系人&nbsp;</template>
        </el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit1('multipleTable')" v-if="btn1">发布招募</el-button>
        <el-button type="primary" @click="onSubmit2('multipleTable')" v-if="btn2">修改招募</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkCampus = (rule, value, callback) => {
      if (this.recruitForm.campus.length === 0) {
        return callback(new Error('至少选择一项'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('活动名称不能为空'))
      } else {
        callback()
      }
    }
    var checkOrganizer = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('组织名称不能为空'))
      } else {
        callback()
      }
    }
    var checkTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('活动时间不能为空'))
      } else {
        callback()
      }
    }
    var checkPlace = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('活动地点不能为空'))
      } else {
        callback()
      }
    }
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('招募人数不能为空'))
      } else {
        callback()
      }
    }
    var checkMain = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('活动详情不能为空'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系人不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      btn1: true,
      btn2: false,
      checkAll: false,
      rid: '',
      colleges: [
        { key: '1', name: '经济与管理学院' },
        { key: '2', name: '沈钧儒法学院' },
        { key: '3', name: '公共管理学院' },
        { key: '4', name: '教育学院' },
        { key: '5', name: '体育与健康学院' },
        { key: '6', name: '人文学院' },
        { key: '7', name: '外国语学院' },
        { key: '8', name: '理学院' },
        { key: '9', name: '材料与化学化工学院' },
        { key: '10', name: '生命与环境科学学院' },
        { key: '11', name: '信息科学与工程学院' },
        { key: '12', name: '医学部' },
        { key: '13', name: '阿里巴巴商学院' },
        { key: '14', name: '音乐学院' },
        { key: '15', name: '美术学院' },
        { key: '16', name: '文化创意学院' },
        { key: '17', name: '哈尔科夫学院' },
        { key: '18', name: '经亨颐教师教育学院' },
        { key: '19', name: '国际教育学院' }
      ],
      isIndeterminate: true,
      recruitForm: {
        campus: ['1'],
        name: '',
        organizer: '',
        time: '',
        place: '',
        num: '',
        main: '',
        auth: [],
        showNum: [],
        s_time: '',
        s_place: '',
        college: [],
        phone: ''
      },
      rules: {
        campusLength: [{ validator: checkCampus, trigger: 'change' }],
        name: [{ validator: checkName, trigger: 'blur' }],
        organizer: [{ validator: checkOrganizer, trigger: 'blur' }],
        time: [{ validator: checkTime, trigger: 'blur' }],
        place: [{ validator: checkPlace, trigger: 'blur' }],
        num: [{ validator: checkNum, trigger: 'blur' }],
        main: [{ validator: checkMain, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.recruitForm.college = val ? this.colleges : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.colleges.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.colleges.length
    },
    onSubmit1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .addRecruit({
              rcampus: this.recruitForm.campus.join(''),
              rname: this.recruitForm.name,
              rorganizer: this.recruitForm.organizer,
              rdate: this.recruitForm.time,
              rplace: this.recruitForm.place,
              rpeoplenumber: this.recruitForm.num,
              rinfo: this.preText(this.recruitForm.main),
              rinfocollect: this.recruitForm.auth.length === 0 ? '0' : this.recruitForm.auth.join(''),
              risshownumber: this.recruitForm.showNum.length,
              rdateselect: this.recruitForm.s_time,
              rplaceselect: this.recruitForm.s_place,
              rcollege: this.recruitForm.college.length === 0 ? '0' : this.recruitForm.college.join(),
              rleader: this.recruitForm.phone,
              riscomplete: 0,
              risstop: 0
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 1000,
                  type: 'success'
                })
                this.$refs.multipleTable.resetFields()
                this.recruitForm.campus = ['1']
                this.recruitForm.auth = []
                this.recruitForm.showNum = []
                this.recruitForm.college = []
                this.$store.commit('updateRecruiting', true)
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 2000,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              if (err.response && err.response.data && err.response.data.code === 1224) {
                this.$message({
                  showClose: true,
                  message: err.response.data.msg,
                  duration: 2000,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            showClose: true,
            message: '请完善信息！',
            duration: 1000,
            type: 'warning'
          })
          return false
        }
      })
    },
    onSubmit2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .updateRecruit({
              rid: this.rid,
              rcampus: this.recruitForm.campus.join(''),
              rname: this.recruitForm.name,
              rorganizer: this.recruitForm.organizer,
              rdate: this.recruitForm.time,
              rplace: this.recruitForm.place,
              rpeoplenumber: this.recruitForm.num,
              rinfo: this.preText(this.recruitForm.main),
              rinfocollect: this.recruitForm.auth.length === 0 ? '0' : this.recruitForm.auth.join(''),
              risshownumber: this.recruitForm.showNum.length,
              rdateselect: this.recruitForm.s_time,
              rplaceselect: this.recruitForm.s_place,
              rcollege: this.recruitForm.college.length === 0 ? '0' : this.recruitForm.college.join(),
              rleader: this.recruitForm.phone
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 1000,
                  type: 'success'
                })
                this.$store.commit('updateRecruiting', true)
                this.$store.commit('updateRecruited', true)
                this.$store.commit('updateRecruit', true)
                this.getRecruit()
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 2000,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              if (err.response && err.response.data && err.response.data.code === 1224) {
                this.$message({
                  showClose: true,
                  message: err.response.data.msg,
                  duration: 2000,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            showClose: true,
            message: '请完善信息！',
            duration: 1000,
            type: 'warning'
          })
          return false
        }
      })
      console.log(this.recruitForm)
    },
    preText(pretext) {
      return pretext
        .replace(/\r\n/g, '<br/>')
        .replace(/\n/g, '<br/>')
        .replace(/\s/g, '&nbsp;')
    },
    afterText(aftertext) {
      return aftertext.replace(/<br\/>/g, '\r\n').replace(/&nbsp;/g, ' ')
    },
    getRecruit() {
      this.loading = true
      this.recruitForm.campus = []
      this.recruitForm.auth = []
      this.recruitForm.college = []
      this.$api
        .getRecruitById({
          rid: this.rid
        })
        .then(res => {
          for (let char of res.data.data.rcampus) {
            this.recruitForm.campus.push(char)
          }
          this.recruitForm.name = res.data.data.rname
          this.recruitForm.organizer = res.data.data.rorganizer
          this.recruitForm.time = res.data.data.rdate
          this.recruitForm.place = res.data.data.rplace
          this.recruitForm.num = res.data.data.rpeoplenumber
          this.recruitForm.main = this.afterText(res.data.data.rinfo)
          if (res.data.data.rinfocollect !== '0') {
            for (let char of res.data.data.rinfocollect) {
              this.recruitForm.auth.push(char)
            }
          }
          this.recruitForm.showNum = res.data.data.risshownumber === 1 ? ['1'] : []
          this.recruitForm.s_time = res.data.data.rdateselect
          this.recruitForm.s_place = res.data.data.rplaceselect
          if (res.data.data.rcollege !== '0') {
            for (let char of res.data.data.rcollege) {
              this.recruitForm.college.push(char)
            }
          }
          this.recruitForm.phone = res.data.data.rleader
        })
        .then(() => {
          this.loading = false
        })
    }
  },
  created() {
    if (this.$parent.label !== '新建招募') {
      this.btn1 = false
      this.btn2 = true
      this.label = this.$parent.label
      this.rid = this.$parent.name.split(' ')[1]
      this.getRecruit()
    }
  }
}
</script>
<style scoped>
.pre {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  white-space: nowrap;
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  text-align: center;
}
</style>
