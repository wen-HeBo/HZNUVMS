import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import api from './utils/api'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.prototype.$XLSX = XLSX
Vue.prototype.$FileSaver = FileSaver
Vue.prototype.$message = ElementUI.Message

router.beforeEach((to, from, next) => {
  // 直接调用表示放行
  // next()

  // to.path 表示下一刻要访问的地址
  // from.path 表示我们上一刻访问的地址
  if (to.path === '/login') {
    window.sessionStorage.clear()
    return next()
  }
  // 如果用户访问的不是 登陆页面 则尝试从 sessionStorage 中获取 token 令牌字符串
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果没有 token 令牌则强制用户跳转到登陆页面
  if (!tokenStr) return next('/login')
  // 如果有令牌，则直接放行
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
