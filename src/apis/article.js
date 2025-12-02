import request from '@/utils/request'

// 文章相关的所有请求

// 获取所有频道
export function getChannelListAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

// 新增文章
export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

// 获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

// 删除功能
export function deleteArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })
}

// 根据id获取文章详情
export function getArticleDetailAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'GET'
  })
}

// 更新文章
export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}