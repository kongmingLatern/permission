import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，例如添加token
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    console.log('Request is sent.');
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log('Response received.');
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http;
