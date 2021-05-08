<template>
  <div>
    <el-divider content-position="left">新建公告</el-divider>
    <el-form ref="form" :model="noticeForm" label-width="80px" style="padding-right:20px" size="large">
      <el-row style="margin-bottom:22px">
        <el-input v-model="noticeForm.title" placeholder="请输入标题">
          <template slot="prepend">公告标题</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px" class="ppk">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">公告内容</div>
        <el-input type="textarea" v-model="noticeForm.content" :autosize="{ minRows: 10 }" placeholder="请输入公告内容（至少50字）"> </el-input>
      </el-row>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">发布公告</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeForm: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    onSubmit() {}
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
