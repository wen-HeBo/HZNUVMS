<template>
  <div>
    <el-divider content-position="left">新建活动</el-divider>
    <el-form ref="multipleTable" :model="activityForm" status-icon label-width="80px" style="padding-right:20px" size="large" :rules="rules">
      <el-form-item class="ppK" prop="aname">
        <el-input v-model="activityForm.aname" placeholder="请输入活动名称" clearable>
          <template slot="prepend">活动名称</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="aorganizer">
        <el-input v-model="activityForm.aorganizer" placeholder="请输入组织名称" clearable>
          <template slot="prepend">组织名称</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="acode">
        <el-input v-model="activityForm.acode" placeholder="请输入志愿汇ID/共建基地编号(非必填项)" clearable>
          <template slot="prepend">编&nbsp;&nbsp;&nbsp;&nbsp;号</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="aaddress">
        <el-input v-model="activityForm.aaddress" placeholder="请输入活动地点" clearable>
          <template slot="prepend">活动地点</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="astarttime">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">开始日期</div>
        <el-date-picker type="date" placeholder="选择日期" v-model="activityForm.astarttime" style="width: 20%;float: left;" clearable> </el-date-picker>
      </el-form-item>

      <el-form-item class="ppK" prop="aendtime">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">结束日期</div>
        <el-date-picker type="date" placeholder="选择日期" v-model="activityForm.aendtime" style="width: 20%;float: left;" clearable> </el-date-picker>
      </el-form-item>

      <el-form-item class="ppK1" prop="ainfo">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">活动详情</div>
        <quill-editor ref="text" v-model="activityForm.ainfo" class="myQuillEditor" :options="editorOption" @change="changeQuillEditor" @blur="changeQuillEditor" />
      </el-form-item>

      <el-form-item size="large" class="ppK">
        <el-button type="primary" @click="onSubmit('multipleTable')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
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
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('活动地点不能为空'))
      } else {
        callback()
      }
    }
    return {
      activityForm: {
        aname: '',
        aorganizer: '',
        acode: '',
        aaddress: '',
        astarttime: '',
        aendtime: '',
        ainfo: ''
      },
      editorOption: {
        modules: {
          toolbar: [[{ size: ['small', false, 'large', 'huge'] }], [{ color: [] }, { font: [] }], ['bold', 'italic', 'underline', 'strike', { align: [] }], [{ header: 1 }, { header: 2 }], [{ list: 'ordered' }, { list: 'bullet' }], [{ indent: '-1' }, { indent: '+1' }], [{ direction: 'rtl' }]]
        },
        placeholder: ''
      },
      rules: {
        aname: [{ validator: checkName, trigger: 'blur' }],
        aorganizer: [{ validator: checkOrganizer, trigger: 'blur' }],
        aaddress: [{ validator: checkAddress, trigger: 'blur' }],
        astarttime: [{ required: true, message: '请选择开始日期', trigger: 'blur' }],
        aendtime: [{ required: true, message: '请选择结束日期', trigger: 'blur' }],
        ainfo: [{ required: true, message: '活动详情不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    changeQuillEditor() {
      if (this.activityForm.ainfo.trim() === '') {
        this.$refs.multipleTable.validateField('ainfo')
      } else {
        this.$refs.multipleTable.clearValidate() // clearValidate()取消验证方法
      }
    },
    async clearAll() {
      await this.$refs.multipleTable.resetFields()
      await this.$refs.multipleTable.clearValidate()
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .addActivity({
              aname: this.activityForm.aname,
              aorganizer: this.activityForm.aorganizer,
              acode: this.activityForm.acode,
              aplace: this.activityForm.aaddress,
              astarttime: this.activityForm.astarttime,
              aendtime: this.activityForm.aendtime,
              ainfo: this.activityForm.ainfo,
              astatus: 0
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 1000,
                  type: 'success'
                })
                this.clearAll()
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
    }
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
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
