<template>
  <div>
    <el-divider content-position="left">修改密码</el-divider>
    <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
      <el-form-item prop="pass" class="ppK">
        <el-input type="password" v-model="pwdForm.pass" autocompleted="off" autocomplete="new-password" style="width:40%;float:left"><template slot="prepend">&emsp;密码&emsp;</template></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="ppK">
        <el-input type="password" v-model="pwdForm.checkPass" autocompleted="off" autocomplete="new-password" style="width:40%;float:left"><template slot="prepend">确认密码</template></el-input>
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
      astudentid: '',
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
          this.$api
            .updatePassword({
              astudentid: this.astudentid,
              apassword: this.pwdForm.pass
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 1000,
                  type: 'success'
                })
              }
              this.$refs.pwdForm.resetFields()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
    if (this.$parent.label === '重置密码') {
      this.astudentid = this.$parent.name.slice(8)
    } else if (this.$parent.label === '修改密码') {
      this.astudentid = this.$store.state.uid
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
