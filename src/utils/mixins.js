import api from '@/api'

export default {
  created () {
    this.$api = api
  }
}

// **** 尝试用 Vue.prototype ****
