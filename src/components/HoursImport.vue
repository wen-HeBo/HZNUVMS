<template>
  <div>
    <el-divider content-position="left">志愿时数导入</el-divider>
    <el-row style="margin-bottom: 22px;text-align: left;">
      <el-input v-model="keyword" placeholder="请输入活动号" style="width:30%;">
        <template slot="prepend">活动号</template>
      </el-input>
      <el-button type="primary" @click="btnUp">开启上传通道</el-button>
    </el-row>

    <el-upload style="float:left;" drag class="upload-demo" :limit="1" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
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
      keyword: '',
      fileList: []
    }
  },
  methods: {
    btnUp() {
      this.flag = false
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
