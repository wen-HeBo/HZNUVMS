<template>
  <div>
    <el-divider content-position="left">志愿时数导入</el-divider>
    <el-row style="margin-bottom: 22px;text-align: left;">
      <el-input v-model="aid" placeholder="请输入活动号" style="width:30%;">
        <template slot="prepend">活动号</template>
      </el-input>
      <el-button type="primary" @click="btnUp">开启上传通道</el-button>
      <el-tooltip placement="top">
        <div slot="content"><span style="color: red;">* </span>excel模版说明:志愿时数模板，用户必须按照这个模板进行填写</div>
        <el-tag style="font-size: 14px;height: 40px;line-height: 38px;">
          <i class="el-icon-download" />
          <el-link href="/static/templateFile.xlsx" style="color: #409EFF;" :underline="false" download="xxxx活动志愿时数表模板.xlsx">点击下载模版</el-link>
        </el-tag>
      </el-tooltip>
    </el-row>

    <el-upload style="float:left;" ref="upload" drag :limit="1" accept=".xlsx, .xls" action="http://localhost:8088/record-volunteerhours/import" :on-progress="handleProgress" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传xls/xlsx文件，且不超过500kb
        <br />
        <el-button style="margin-left: 10px;margin-top: 5px;" size="small" type="success" @click="submitUpload" :disabled="flag">上传</el-button>
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
      aid: '',
      fileList: [],
      options: {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }
    }
  },
  methods: {
    btnUp() {
      if (this.aid === '') {
        this.$message.error('请输入活动编号')
      } else {
        this.$api
          .getActivityById({
            aid: this.aid
          })
          .then(res => {
            if (res.data.data.astatus === 0) {
              this.$message({
                message: '该活动还在审核中',
                type: 'warning'
              })
            } else if (res.data.data.astatus === 1) {
              this.$message.error('该活动审核未通过')
            } else if (res.data.data.astatus === 5) {
              this.$message.error('该活动志愿时数表已提交')
            } else {
              this.$message({
                message: '上传通道开启',
                duration: 1000,
                type: 'success'
              })
              this.flag = false
            }
          })
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handleProgress(event, file, fileList) {
      this.$loading(this.options)
    },
    handleSuccess(res, file, fileList) {
      this.$loading(this.options).close()
      if (res.code === 0) {
        this.$message({
          showClose: true,
          message: res.data,
          duration: 1000,
          type: 'success'
        })
        this.$api.updateActivity({
          aid: this.aid
        })
        this.$refs.upload.clearFiles()
        this.aid = ''
        this.flag = true
      } else {
        this.$message.error('批量导入失败!')
      }
    },
    handlePreview(file) {
      console.log(file)
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
