<template>
  <div class="r">
    <el-form ref="form" :model="recruitForm" label-width="80px" style="padding-right:20px" size="large">
      <el-form-item label="招募校区">
        <el-checkbox-group v-model="recruitForm.campus" style="float:left">
          <el-checkbox-button label="仓前校区" name="campus"></el-checkbox-button>
          <el-checkbox-button label="下沙校区" name="campus"></el-checkbox-button>
          <el-checkbox-button label="玉皇山校区" name="campus"></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="活动名称">
        <el-input v-model="recruitForm.name" placeholder="组织名称+活动名称"></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-input v-model="recruitForm.time"></el-input>
      </el-form-item>

      <el-form-item label="活动地点">
        <el-input v-model="recruitForm.address"></el-input>
      </el-form-item>

      <el-form-item label="需求人数">
        <el-input v-model="recruitForm.num" style="width:20%;float:left"></el-input>
      </el-form-item>

      <el-form-item label="活动详情">
        <el-input type="textarea" v-model="recruitForm.main" :autosize="{ minRows: 10 }"></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">发布招募</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recruitForm: {
        campus: [],
        name: '',
        time: '',
        address: '',
        main: ''
      }
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
<style scoped></style>
