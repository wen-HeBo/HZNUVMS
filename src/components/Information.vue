<template>
  <div style="text-align: left;">
    <el-divider content-position="left">个人信息</el-divider>
    <p>&emsp;id：{{ id }}</p>
    <p>姓名：{{ name }}</p>
    <p>组织：{{ organization }}</p>
    <p>
      权限：<el-tag v-for="item in jurisdiction" :key="item" effect="plain" style="margin-right: 5px">
        {{ item }}
      </el-tag>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '10009',
      name: 'ppKritt',
      organization: '浙江工业大学青年志愿者协会药学分会',
      jurisdiction: ['招募管理', '活动管理', '活动高级管理', '志愿时数查询', '志愿时数管理', '志愿者信用名单管理', '志愿者反馈管理', '系统管理']
    }
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
p{
  padding-left: 15px;
}
</style>
