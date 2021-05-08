<template>
  <div>
    <el-divider content-position="left">修改密码</el-divider>
    <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
      <el-form-item prop="pass" class="ppK">
        <el-input type="password" v-model="pwdForm.pass" autocomplete="off" style="width:40%;float:left"><template slot="prepend">&emsp;密码&emsp;</template></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="ppK">
        <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off" style="width:40%;float:left"><template slot="prepend">确认密码</template></el-input>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" @click="submitForm('pwdForm')">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.checkPass !== '') {
          this.$refs.pwdForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
.el-form-item__content {
  margin: 0px;
}
</style>
