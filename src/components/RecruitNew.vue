<template>
  <div class="r">
    <el-form ref="form" :model="recruitForm" label-width="80px" style="padding-right:20px" size="large">
      <el-row style="margin-bottom:22px" class="ppk">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">招募校区</div>
        <el-checkbox-group v-model="recruitForm.campus" style="float:left">
          <el-checkbox-button style="border-top-left-radius: 0;border-bottom-left-radius: 0;" label="仓前校区" name="campus1" checked></el-checkbox-button>
          <el-checkbox-button label="下沙校区" name="campus2"></el-checkbox-button>
          <el-checkbox-button label="玉皇山校区" name="campus3"></el-checkbox-button>
        </el-checkbox-group>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.name" placeholder="组织名称+活动名称">
          <template slot="prepend">活动名称</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.time" placeholder="请输入活动时间">
          <template slot="prepend">活动时间</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.address" placeholder="请输入活动地点">
          <template slot="prepend">活动地点</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.num" style="width:40%;float:left" placeholder="请输入需求人数">
          <template slot="prepend">需求人数</template>
        </el-input>
      </el-row>

      <el-row style="margin-bottom:22px" class="ppk">
        <div class="pre" style="text-align: left;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;">活动详情</div>
        <el-input type="textarea" v-model="recruitForm.main" :autosize="{ minRows: 10 }" placeholder="请输入活动详情（至少50字）"> </el-input>
      </el-row>

      <el-row style="margin-bottom:22px">
        <div class="pre" style="float: left;margin-right: 25px;">表单收集</div>
        <el-checkbox-group v-model="recruitForm.auth" style="float:left">
          <el-checkbox border label="身份证" name="auth1"></el-checkbox>
          <el-checkbox border label="外语水平" name="auth2"></el-checkbox>
          <el-checkbox border label="服装尺码" name="auth3"></el-checkbox>
          <el-checkbox border label="志愿服务经历" name="auth4"></el-checkbox>
          <el-checkbox border label="岗位调剂" name="auth5"></el-checkbox>
        </el-checkbox-group>
      </el-row>

      <el-row style="margin-bottom:22px">
        <div class="pre" style="float: left;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;">报名进度</div>
        <el-checkbox-group v-model="recruitForm.showNum" style="float:left">
          <el-checkbox-button label="向志愿者实时显示报名人数" name="showNum" checked></el-checkbox-button>
        </el-checkbox-group>
      </el-row>

      <el-form-item style="margin-left: 30px;">
        <div class="pre" style="float: left;postion:relative;left:-110px;">定向招募</div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="float:left; postion:relative;left:-97px;">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="recruitForm.college" @change="handleCheckedChange" style="float:left">
          <el-checkbox v-for="college in colleges" :label="college" :key="college" style="float:left">{{ college }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-row style="margin-bottom:22px">
        <el-input v-model="recruitForm.phone" placeholder="请输入活动报名联系人及联系方式">
          <template slot="prepend">&nbsp;&nbsp;联系人&nbsp;</template>
        </el-input>
      </el-row>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">发布招募</el-button>
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
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.colleges.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.colleges.length
    },
    onSubmit() {}
  }
}
</script>
<style scoped>
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
