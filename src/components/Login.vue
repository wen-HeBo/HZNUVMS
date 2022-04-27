<template>
  <div>
    <div class="background">
      <el-col class="main" :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
        <img src="../assets/logo.jpg" class="logo" />
        <h3>杭州师范大学VMS系统</h3>
        <br />
        <el-form>
          <el-form-item size="large">
            <el-input type="text" placeholder="请输入用户名" v-model="uname"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-input type="password" placeholder="请输入密码" v-model="upwd"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uname: '',
      upwd: ''
    }
  },
  methods: {
    login() {
      if (this.uname.length <= 0 || this.upwd.length <= 0) {
        alert('用户名或密码不能为空')
      } else {
        this.$api
          .login({
            astudentid: this.uname,
            apassword: this.upwd
          })
          .then(res => {
            if (res.data.code === 0) {
              const tokenStr = res.headers['authorization']
              sessionStorage.setItem('dataInfo', JSON.stringify(res.data.data))
              window.sessionStorage.setItem('token', tokenStr)
              this.$router.push('/home')
              this.$store.commit('inist', res.data.data)
            } else {
              alert(res.data.msg)
              this.uname = ''
              this.upwd = ''
            }
            // console.log(res)
          })
          .catch(err => {
            if (err.response && err.response.data && err.response.data.code === 1224) {
              alert(err.response.data.msg)
              console.log(err.response)
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  background-position-x: 100%;
  background-position-y: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: 100%;
  background-image: url(../assets/index.jpg);
  background-origin: padding-box;
  background-clip: border-box;
}
.main {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 450px;
  width: 400px;
  margin-top: -225px;
  margin-left: -200px;
  padding: 10px 50px;
  text-align: center;
  background-color: white;
}
.logo {
  width: 120px;
  height: 120px;
}
.el-button {
  width: 100%;
}
</style>
