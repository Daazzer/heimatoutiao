import axios from '@/utils/axios_http-config'

const fileUpload = file => axios.post('/upload/', file).then(res => [null, res]).catch(err => [err])

export default {
  fileUpload
}
