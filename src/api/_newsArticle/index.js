import axios from '@/utils/axios_http-config'

/**
 * @example
 * localhost:3000/post?pageIndex=1&pageSize=2&category=8
 * @param {Object} [data]
 * @param {number} [data.pageIndex] 当前页的索引
 * @param {number} [data.pageSize] 每页显示的条目
 * @param {number} [data.category] 当前列表的类别
 * @returns {Promise<Response>}
 */
const post = (params = '') => axios.get('/post', { params }).then(res => [null, res]).catch(err => [err])

export default {
  post
}
