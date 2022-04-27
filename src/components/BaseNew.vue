<template>
  <div>
    <el-divider content-position="left">新建共建基地</el-divider>
    <el-form ref="multipleTable" :model="baseForm" status-icon label-width="80px" style="padding-right:20px" size="large" :rules="rules">
      <el-form-item class="ppK" prop="bname">
        <el-input v-model="baseForm.bname" placeholder="请输入基地名称">
          <template slot="prepend">基地名称</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="borganization">
        <el-input v-model="baseForm.borganization" placeholder="请输入所属组织">
          <template slot="prepend">所属组织</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK1" prop="binfo">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">基地详情</div>
        <quill-editor ref="text" v-model="baseForm.binfo" class="myQuillEditor" :options="editorOption" @change="changeQuillEditor" @blur="changeQuillEditor" />
      </el-form-item>
      <el-form-item size="large">
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
        return callback(new Error('基地名称不能为空'))
      } else {
        callback()
      }
    }
    var checkOrganization = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('所属组织名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      baseForm: {
        bname: '',
        borganization: '',
        binfo: ''
      },
      editorOption: {
        modules: {
          toolbar: [[{ size: ['small', false, 'large', 'huge'] }], [{ color: [] }, { font: [] }], ['bold', 'italic', 'underline', 'strike', { align: [] }], [{ header: 1 }, { header: 2 }], [{ list: 'ordered' }, { list: 'bullet' }], [{ indent: '-1' }, { indent: '+1' }], [{ direction: 'rtl' }]]
        },
        placeholder: ''
      },
      rules: {
        bname: [{ validator: checkName, trigger: 'blur' }],
        borganization: [{ validator: checkOrganization, trigger: 'blur' }],
        binfo: [{ required: true, message: '基地详情不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    changeQuillEditor() {
      if (this.baseForm.binfo.trim() === '') {
        this.$refs.multipleTable.validateField('binfo')
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
            .addBase({
              bname: this.baseForm.bname,
              borganization: this.baseForm.borganization,
              binfo: this.baseForm.binfo,
              bstatus: 1
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
