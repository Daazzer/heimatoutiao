import axios from '@/utils/axios_http-config'

class Api {
  login (data) {
    return axios.post('/login', data).then(res => [null, res]).catch(err => [err])
  }

  getUser (id) {
    return axios.get(`/user/${id}`).then(res => [null, res]).catch(err => [err])
  }

  userUpdate (id, data) {
    return axios.post(`/user_update/${id}`, data).then(res => [null, res]).catch(err => [err])
  }

  fileUpload (file) {
    return axios.post('/upload/', file).then(res => [null, res]).catch(err => [err])
  }
}

export default new Api()
