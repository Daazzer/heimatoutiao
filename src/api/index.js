import axios from '@/utils/http-config'

class Api {
  constructor() {
    this.loginUrl = '/login'
  }

  login (data) {
    return axios.post(this.loginUrl, data).then(res => [null, res]).catch(err => [err])
  }
}

export default new Api()
