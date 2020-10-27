import axios from '@/utils/axios_http-config'

/**
 * @example
 * localhost:3000/post?pageIndex=1&pageSize=2&category=8
 * @param {Object} params
 * @param {number} [params.category] 当前列表的类别
 * @param {number} [params.pageIndex] 当前页的索引
 * @param {number} [params.pageSize] 每页显示的条目
 * @returns {Promise<Response>}
 */
const getNewsArticle = (params = null) => axios.get('/post', { params }).then(res => [null, res]).catch(err => [err])

const getArticleDetialById = id => axios.get(`/post/${id}`).then(res => [null, res]).catch(err => [err])

const likeArticle = id => axios.get(`/post_like/${id}`).then(res => [null, res]).catch(err => [err])

const starArticle = id => axios.get(`/post_star/${id}`).then(res => [null, res]).catch(err => [err])

const getComments = id => axios.get(`/post_comment/${id}`).then(res => [null, res]).catch(err => [err])

/**
 * 发布评论
 * @param {number} id 文章id
 * @param {Object} data 发布评论的参数
 * @param {string} data.content 评论内容
 * @param {number} [data.parent_id=null] 回复 id
 * @returns {Promise<Response>}
 */
const postComment = (id, data) => axios.post(`/post_comment/${id}`, data).then(res => [null, res]).catch(err => [err])

export default {
  getNewsArticle,
  getArticleDetialById,
  likeArticle,
  starArticle,
  getComments,
  postComment
}
