import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('heimatoutiao_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

/* const interceptors = axios.interceptors.response.use(response => {
  console.log(response)
  return response
}, error => {
  return Promise.reject(error)
}) */

export default axios
