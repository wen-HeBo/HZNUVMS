<template>
  <div>
    <el-divider content-position="left">{{ label }}</el-divider>
    <el-form ref="form" :model="userForm" label-width="80px" style="padding-right:20px" size="large">
      <el-row style="margin-bottom:22px">
        <el-input v-model="userForm.name" placeholder="请输入姓名">
          <template slot="prepend">姓名</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="userForm.organization" placeholder="请输入组织">
          <template slot="prepend">组织</template>
        </el-input>
      </el-row>

      <el-form-item>
        <div class="pre" style="float: left;postion:relative;left:-80px;">权限</div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="float:left; postion:relative;left:-70px;">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="userForm.jurisdiction" @change="handleCheckedChange" style="float:left">
          <el-checkbox-button v-for="jurisdiction in jurisdictions" :label="jurisdiction" :key="jurisdiction" style="float:left">{{ jurisdiction }}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="btnHandler1" v-if="btn1">添加</el-button>
        <el-button type="primary" @click="btnHandler2" v-if="btn2">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      label: '新增用户',
      btn1: true,
      btn2: false,
      jurisdictions: ['招募管理', '活动管理', '活动高级管理', '志愿时数查询', '志愿时数管理', '志愿者信用名单管理', '志愿者反馈管理', '系统管理'],
      userForm: {
        name: '',
        organization: '',
        jurisdiction: []
      }
    }
  },
  methods: {
    btnHandler1() {},
    btnHandler2() {},
    handleCheckAllChange(val) {
      this.userForm.jurisdiction = val ? this.jurisdictions : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.jurisdictions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.jurisdictions.length
    }
  },
  created() {
    if (this.$parent.label !== '新增用户') {
      this.btn1 = false
      this.btn2 = true
      this.label = this.$parent.label
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
