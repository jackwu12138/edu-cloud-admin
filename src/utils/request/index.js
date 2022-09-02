import axios from "axios";
import qs from "qs";
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
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default service;
