import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const token = window.localStorage.getItem('token')

if (token) {
  axios.defaults.headers.Authorization = token
}

export default axios
