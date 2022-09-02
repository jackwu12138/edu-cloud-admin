import request from '@/utils/request'


/**
 * '新增文章类型数据
 */
export function createArticleTypeList(data) {
  return request({
    url: '/course/article-type/create',
    method: 'post',
    data: data,
  })
}

/**
 * '删除文章类型数据
 */
export function deleteArticleTypeList(id) {
  return request({
    url: '/course/article-type/delete',
    method: 'delete',
    params: {id},
  })
}

/**
 * '修改文章类型数据
 */
export function updateArticleTypeList(data) {
  return request({
    url: '/course/article-type/update',
    method: 'put',
    data: data,
  })
}


/**
 * '获取文章类型数据
 */
export function getArticleTypeList() {
  return request({
    url: '/course/article-type/get-list',
    method: 'get',
  })
}

/**
 * '获取文章类型精简列表
 */
export function getArticleTypeSampleList() {
  return request({
    url: '/course/article-type/get-simple-list',
    method: 'get',
  })
}


