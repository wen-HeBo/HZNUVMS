<template>
  <div>
    <el-divider content-position="left">新建共建基地</el-divider>
    <el-form ref="form" :model="baseForm" label-width="80px" style="padding-right:20px" size="large">
      <el-row style="margin-bottom:22px">
        <el-input v-model="baseForm.name" placeholder="请输入基地名称">
          <template slot="prepend">基地名称</template>
        </el-input>
      </el-row>

      <el-row class="ppk" style="margin-bottom:22px">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">所属组织</div>
        <el-select v-model="baseForm.organization" placeholder="请选择所属组织" style="float: left">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-row>

      <el-row class="ppk" style="margin-bottom: 64px">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">活动详情</div>
        <quill-editor ref="text" v-model="baseForm.content" class="myQuillEditor" :options="editorOption" style="height: 350px;" />
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      baseForm: {
        name: '',
        organization: '',
        content: ''
      },
      editorOption: {
        modules: {
          toolbar: [[{ size: ['small', false, 'large', 'huge'] }], [{ color: [] }, { font: [] }], ['bold', 'italic', 'underline', 'strike', { align: [] }], [{ header: 1 }, { header: 2 }], [{ list: 'ordered' }, { list: 'bullet' }], [{ indent: '-1' }, { indent: '+1' }], [{ direction: 'rtl' }]]
        },
        placeholder: ''
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onSubmit() {
      console.log(this.baseForm.content)
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
