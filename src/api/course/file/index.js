import request from '@/utils/request'


/**
 * 上传文件
 */
export function uploadFile(file) {
  let data = new FormData()
  data.append('file', file)

  return request({
    url: '/file/upload',
    method: 'post',
    data,
  })
}
