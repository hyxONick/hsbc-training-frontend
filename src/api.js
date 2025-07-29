import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.66.104:3000/api',
});

// 添加请求拦截器自动加 token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // 🔐 加上这一行
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;