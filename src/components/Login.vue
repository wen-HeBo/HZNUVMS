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
        alert('请登录！')
      } else {
        // alert('登录成功！')
        // 假设这个 tokenStr 是登录成功后服务器返回的 token 身份令牌
        const tokenStr = 'sdnhjahfcusjvhbueaakdjxikwihefnciwnakdnkfaqiq'
        window.sessionStorage.setItem('token', tokenStr)
        this.$router.push('/home')
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
