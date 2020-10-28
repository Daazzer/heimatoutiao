import axios from '@/utils/axios_http-config'

const getCategory = () => axios.get('/category').then(res => [null, res]).catch(err => [err])

/**
 * 添加栏目
 * @param {Object} data POST 请求体
 * @param {string} data.name 栏目名字
 * @param {number} [data.is_top=0] 栏目名字
 * @returns {Promise<Response>}
 */
const addCategory = data => axios.post('/category', data).then(res => [null, res]).catch(err => [err])

export default {
  getCategory,
  addCategory
}
