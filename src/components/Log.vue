<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登陆日志" name="first">登陆日志</el-tab-pane>
      <el-tab-pane label="单条志愿时数删除日志" name="second">单条志愿时数删除日志</el-tab-pane>
      <el-tab-pane label="志愿时数表删除日志" name="third">志愿时数表删除日志</el-tab-pane>
      <el-tab-pane label="志愿者信息导出日志" name="fourth">志愿者信息导出日志</el-tab-pane>
      <el-tab-pane label="Tomcat异常日志" name="fifth">Tomcat异常日志</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped></style>
