import request from '@/utils/request'

// 文章相关的所有请求

// 获取所有频道
export function getChannelListAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}