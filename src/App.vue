<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('dataInfo')) {
      this.$store.commit('inist', JSON.parse(sessionStorage.getItem('dataInfo')))
      // this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow-y: hidden;
  padding-right: 0 !important;
}
.el-dialog {
  text-align: left;
}
.el-dialog__wrapper.ppK .el-dialog__body {
  height: 58vh;
  overflow-y: auto;
}
/* .el-table .cell {
  white-space: pre;
} */
span.el-pagination__jump {
  /* 分页的共几条 */
  margin: 0 18px;
}
.ppk .el-textarea__inner {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.ppk .el-checkbox-button:first-child .el-checkbox-button__inner {
  border-radius: 0;
}
.ppk .el-input__inner {
  border-radius: 0 4px 4px 0;
}
.el-form-item.ppK.el-form-item--feedback .el-form-item__content {
  margin: 0px !important;
}
.el-form-item.ppK.el-form-item--large .el-form-item__content {
  margin: 0px !important;
}
.ppK.el-input.el-input--mini input.el-input__inner {
  text-align: center;
}
.el-form-item.ppK1.el-form-item--large .el-form-item__content {
  margin: 0px !important;
}
.ppK1 .el-form-item__content {
  line-height: normal;
}
.ppK1 .ql-editor {
  height: 325px;
}
</style>
