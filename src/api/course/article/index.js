import request from '@/utils/request'


/**
 * 新增文章数据
 */
export function createArticle(data) {
  return request({
    url: '/course/article/delete',
    method: 'post',
    data,
  })
}

/**
 * 删除文章数据
 */
export function deleteArticle(id) {
  return request({
    url: '/course/article/delete',
    method: 'delete',
    params: {id},
  })
}

/**
 * 修改文章数据
 */
export function updateArticle(data) {
  return request({
    url: '/course/article/update',
    method: 'put',
    data,
  })
}

/**
 * 获取文章数据
 */
export function getArticleList() {
  return request({
    url: '/course/article/list',
    method: 'get',
  })
}

/**
 * 获取文章详细内容
 */
export function getArticleInfo(id) {
  return request({
    url: `/course/article/info/${id}`,
    method: 'get',
  })
}


