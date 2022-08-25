import request from '@/utils/request'


/**
 * '获取文章类型数据
 */
export function getArticleTypeList() {
  return request({
    url: '/course/article-type/get-list',
    method: 'get',
  })
}
