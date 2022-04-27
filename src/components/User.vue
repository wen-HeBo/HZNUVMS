<template>
  <div>
    <el-divider content-position="left">{{ label }}</el-divider>
    <el-form ref="multipleTable" :model="userForm" status-icon label-width="80px" style="padding-right:20px" size="large" :rules="rules">
      <el-form-item class="ppK" prop="id">
        <el-input v-model="userForm.id" style="width:40%;float:left" :disabled="btn2" placeholder="请输入id（学号）" autocomplete="off" clearable>
          <template slot="prepend">&ensp;id&ensp;</template>
        </el-input>
      </el-form-item>
      <el-form-item class="ppK" prop="pass" v-if="btn1">
        <el-input type="password" v-model="userForm.pass" style="width:40%;float:left" placeholder="请输入密码" autocomplete="new-password" clearable>
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>
      <el-form-item class="ppK" prop="checkPass" v-if="btn1">
        <el-input type="password" v-model="userForm.checkPass" style="width:40%;float:left" placeholder="请再次输入密码" autocomplete="new-password" clearable>
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="name">
        <el-input v-model="userForm.name" style="width:40%;float:left" placeholder="请输入姓名">
          <template slot="prepend">姓名</template>
        </el-input>
      </el-form-item>

      <el-form-item class="ppK" prop="organization">
        <el-input v-model="userForm.organization" style="width:60%;float:left" placeholder="请输入组织">
          <template slot="prepend">组织</template>
        </el-input>
      </el-form-item>

      <el-form-item prop="powerLength">
        <div class="pre" style="float: left;postion:relative;left:-80px;">权限</div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="float:left; postion:relative;left:-70px;">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="userForm.jurisdiction" @change="handleCheckedChange" style="float:left">
          <el-checkbox-button v-for="item in jurisdictions" :label="item.key" :key="item.key" style="float:left">{{ item.name }}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="btnHandler1('multipleTable')" v-if="btn1">添加</el-button>
        <el-button type="primary" @click="btnHandler2('multipleTable')" v-if="btn2">修改</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="removeTab">
      <span>用户不存在</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="removeTab">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('id 不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度必须是6-16个字符'))
      } else {
        if (this.userForm.checkPass !== '') {
          this.$refs.multipleTable.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
    var checkOrganization = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('组织不能为空'))
      } else {
        callback()
      }
    }
    var checkPower = (rule, value, callback) => {
      if (this.userForm.jurisdiction.length === 0) {
        return callback(new Error('至少选择一项'))
      } else {
        callback()
      }
    }
    return {
      checkAll: false,
      isIndeterminate: true,
      label: '新增用户',
      dialogVisible: false,
      btn1: true,
      btn2: false,
      jurisdictions: [
        { key: '1', name: '招募管理' },
        { key: '2', name: '活动管理' },
        { key: '3', name: '活动高级管理' },
        { key: '4', name: '志愿时数查询' },
        { key: '5', name: '志愿时数管理' },
        { key: '6', name: '志愿者信用名单管理' },
        { key: '7', name: '志愿者反馈管理' },
        { key: '8', name: '系统管理' }
      ],
      power: '',
      userForm: {
        id: '',
        pass: '',
        checkPass: '',
        name: '',
        organization: '',
        jurisdiction: []
      },
      rules: {
        id: [{ validator: checkId, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        name: [{ validator: checkName, trigger: 'blur' }],
        organization: [{ validator: checkOrganization, trigger: 'blur' }],
        powerLength: [{ validator: checkPower, trigger: 'change' }]
      }
    }
  },
  computed: {
    flag() {
      return this.$store.state.deleteUserFlag
    }
  },
  methods: {
    btnHandler1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.power = ''
          this.power = this.userForm.jurisdiction.join('')
          this.$api
            .addUser({
              astudentid: this.userForm.id,
              apassword: this.userForm.pass,
              aname: this.userForm.name,
              aorganization: this.userForm.organization,
              apower: this.power
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 1000,
                  type: 'success'
                })
                this.$refs.multipleTable.resetFields()
                this.userForm.jurisdiction = []
                this.$store.commit('updateUser', true)
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 2000,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              if (err.response && err.response.data && err.response.data.code === 1224) {
                this.$message({
                  showClose: true,
                  message: err.response.data.msg,
                  duration: 2000,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            showClose: true,
            message: '请完善信息！',
            duration: 1000,
            type: 'warning'
          })
          return false
        }
      })
    },
    btnHandler2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.power = ''
          this.power = this.userForm.jurisdiction.join('')
          this.$api
            .updateUser({
              astudentid: this.userForm.id,
              aname: this.userForm.name,
              aorganization: this.userForm.organization,
              apower: this.power
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  duration: 1000,
                  type: 'success'
                })
                this.getUser()
                this.$store.commit('updateUser', true)
              }
            })
        }
      })
    },
    handleCheckAllChange(val) {
      this.userForm.jurisdiction = val ? this.jurisdictions : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.jurisdictions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.jurisdictions.length
    },
    getUser() {
      this.$api
        .getUserById({
          astudentid: this.$parent.name.split(' ')[0]
        })
        .then(res => {
          if (res.data.code === 0) {
            this.userForm.id = res.data.data.astudentid
            this.userForm.name = res.data.data.aname
            this.userForm.organization = res.data.data.aorganization
            this.power = res.data.data.apower
          } else if (res.data.code === 1224) {
            this.$store.commit('goToTabs', this.$parent.name)
            this.dialogVisible = true
          }
          this.userForm.jurisdiction = []
        })
        .then(() => {
          for (let char of this.power) {
            this.userForm.jurisdiction.push(char)
          }
        })
        .then(() => {
          if (this.flag) {
            this.$store.commit('deleteUser', false)
          }
        })
    },
    removeTab() {
      this.dialogVisible = false
      this.$store.commit('removeTabs', this.$parent.name)
    }
  },
  watch: {
    flag(newValue) {
      if (newValue) {
        this.getUser()
      }
    }
  },
  created() {
    if (this.$parent.label !== '新增用户') {
      this.btn1 = false
      this.btn2 = true
      this.label = this.$parent.label
      this.getUser()
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
