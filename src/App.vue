<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
.el-table .cell {
  white-space: pre;
}
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
</style>
