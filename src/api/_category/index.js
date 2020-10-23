import axios from '@/utils/axios_http-config'

const category = () => axios.get('/category').then(res => [null, res]).catch(err => [err])

export default {
  category
}
