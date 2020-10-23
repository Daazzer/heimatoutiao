import axios from '@/utils/axios_http-config'

const login = data => axios.post('/login', data).then(res => [null, res]).catch(err => [err])

const register = data => axios.post('/register', data).then(res => [null, res]).catch(err => [err])

const getUser = id => axios.get(`/user/${id}`).then(res => [null, res]).catch(err => [err])

const userUpdate = (id, data) => axios.post(`/user_update/${id}`, data).then(res => [null, res]).catch(err => [err])

export default {
  login,
  register,
  getUser,
  userUpdate
}
