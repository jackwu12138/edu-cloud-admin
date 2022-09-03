import axios from "axios";
import qs from "qs";
import {Message, Notification} from 'element-ui'
// create an axios instance
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_API_PREFIX,
  // request timeout
  timeout: 30000,
});

// 默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// ==================== 请求拦截器 ==================== //

service.interceptors.request.use(
  (config) => {
    // 解决参数问题
    if (config.params) {
      config.url = config.url + '?' + qs.stringify(config.params, {indices: false})
      config.params = {}
    }

    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error).then(() => {});
  },
);

// ==================== 响应拦截器 ==================== //

service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || "00000";
    // 信息
    const msg = res.data.msg || '未知错误, 请联系管理员!'
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    // 系统异常
    if (code === 'B0001') {
      Message({
        message: msg,
        type: 'error',
      })
      return Promise.reject(new Error(msg))
    }
    // 兜底的异常处理
    if (code !== '00000') {
      Notification.error(msg)
      return Promise.reject('error')
    }
    // 没有异常的情况
    return res.data;
  },
  (error) => {
    console.log('err' + error)
    let {message} = error;
    if (message === "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
);
export default service;
