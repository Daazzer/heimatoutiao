import axios from '@/utils/http-config'

class Api {
  constructor() {
    this.loginUrl = '/login'
  }

  async login(data) {
    const res = await axios.post(this.loginUrl, data)
    return res
  }
}

export default new Api()
