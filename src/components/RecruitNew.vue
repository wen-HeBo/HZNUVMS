<template>
  <div class="r">
    <el-form ref="form" :model="recruitForm" label-width="80px" style="padding-right:20px" size="large">
      <el-form-item label="招募校区">
        <el-checkbox-group v-model="recruitForm.campus" style="float:left">
          <el-checkbox-button label="仓前校区" name="campus1" checked></el-checkbox-button>
          <el-checkbox-button label="下沙校区" name="campus2"></el-checkbox-button>
          <el-checkbox-button label="玉皇山校区" name="campus3"></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="活动名称">
        <el-input v-model="recruitForm.name" placeholder="组织名称+活动名称"></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-input v-model="recruitForm.time" placeholder="请输入活动时间"></el-input>
      </el-form-item>

      <el-form-item label="活动地点">
        <el-input v-model="recruitForm.address" placeholder="请输入活动地点"></el-input>
      </el-form-item>

      <el-form-item label="需求人数">
        <el-input v-model="recruitForm.num" style="width:20%;float:left" placeholder="请输入需求人数"></el-input>
      </el-form-item>

      <el-form-item label="活动详情">
        <el-input type="textarea" v-model="recruitForm.main" :autosize="{ minRows: 10 }" placeholder="请输入活动详情（至少50字）"></el-input>
      </el-form-item>

      <el-form-item label="表单收集">
        <el-checkbox-group v-model="recruitForm.auth" style="float:left">
          <el-checkbox border label="身份证" name="auth1"></el-checkbox>
          <el-checkbox border label="外语水平" name="auth2"></el-checkbox>
          <el-checkbox border label="服装尺码" name="auth3"></el-checkbox>
          <el-checkbox border label="志愿服务经历" name="auth4"></el-checkbox>
          <el-checkbox border label="岗位调剂" name="auth5"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="报名进度">
        <el-checkbox-group v-model="recruitForm.showNum" style="float:left">
          <el-checkbox-button label="向志愿者实时显示报名人数" name="showNum" checked></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="表单收集">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="float:left">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="recruitForm.college" @change="handleCheckedCitiesChange" style="float:left">
          <el-checkbox v-for="college in colleges" :label="college" :key="college" style="float:left">{{ college }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="联系人">
        <el-input v-model="recruitForm.phone" placeholder="请输入活动报名联系人及联系方式"></el-input>
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
      checkAll: false,
      colleges: [
        '经济与管理学院',
        '沈钧儒法学院',
        '公共管理学院',
        '教育学院体育与健康学院',
        '人文学院',
        '外国语学院',
        '理学院',
        '材料与化学化工学院',
        '生命与环境科学学院',
        '信息科学与工程学院',
        '医学部',
        '阿里巴巴商学院',
        '音乐学院',
        '美术学院',
        '文化创意学院',
        '哈尔科夫学院',
        '经亨颐教师教育学院',
        '国际教育学院'
      ],
      isIndeterminate: true,
      recruitForm: {
        campus: [],
        name: '',
        time: '',
        address: '',
        num: '',
        main: '',
        auth: [],
        showNum: [],
        college: [],
        phone: ''
      }
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.recruitForm.college = val ? this.colleges : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.colleges.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.colleges.length
    },
    onSubmit() {}
  }
}
</script>
<style scoped></style>
