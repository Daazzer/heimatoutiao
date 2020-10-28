import axios from 'axios'
import { Toast } from 'vant'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(localStorage.getItem('heimatoutiao_userInfo'))
  if (userInfo) {
    const token= userInfo.token
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const statusCode = response.data.statusCode
  if (statusCode === 401 || statusCode === 403) {
    Toast.fail(response.data.message + '，请登录')
    // 使用 push 会出错
    // router.push('/login')
    window.location.href = '#/login'
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default axios
