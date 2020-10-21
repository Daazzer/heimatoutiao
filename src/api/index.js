import axios from '@/utils/axios_http-config'

class Api {
  login (data) {
    return axios.post('/login', data).then(res => [null, res]).catch(err => [err])
  }

  getUser (id) {
    return axios.get(`/user/${id}`).then(res => [null, res]).catch(err => [err])
  }
}

export default new Api()
