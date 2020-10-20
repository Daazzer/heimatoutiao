import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('heimatoutiao_token')
  if (token) {
    return config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default axios
