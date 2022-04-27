import axios from 'axios'
import { Loading } from 'element-ui'

// let baseUrl = 'http://localhost:8082/api' // 根据业务需求更改
let baseUrl = 'http://localhost:8088'

let loading // 定义loading变量

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // showFullScreenLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    /* 请求状态码 和 自定义状态码 是两个东西
    http请求状态码 1xx 2xx 3xx 4xx 5xx
    1xx 表示正在请求
    2xx 表示成功
    3xx 表示重定向
    4xx 表示客户端错误 404 not found 表示页面丢失
    5xx 表示服务器错误
    自定义是后端自己写得错误码
       http请求返回数据格式：
       {
         data:{
           code:1001,
           msg:密码长度必须是6-16个字符,
           ...
          },
          status:500,
          msg:错误信息
        }
    */
    // tryHideFullScreenLoading()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  get(url, params) {
    return axios({
      method: 'get',
      url: baseUrl + url,
      params: params || {},
      timeout: 60000
    })
  },
  post(url, options) {
    return axios({
      method: 'post',
      url: baseUrl + url,
      data: options || {},
      timeout: 60000,
      headers: {
        'content-type': 'application/json;charset=utf-8'
      }
    })
  },
  uploadFileRequest(url, options) {
    return axios({
      method: 'post',
      url: baseUrl + url,
      data: options || {},
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

function startLoading() {
  // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  // 使用Element loading-close 方法
  loading.close()
}
/*
  那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
  声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
  调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
*/
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
