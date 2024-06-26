const netWork = window.netWork || (window.netWork = {});
netWork.axios = netWork.axios || axios.create({
    baseURL: 'http://localhost:3000/',
    // 其他配置...
});

// 添加请求拦截器
netWork.axios.interceptors.request.use(config => {
    return config;
}, error => {
    console.error(err)
    return Promise.reject(error);
});

// 添加响应拦截器
netWork.axios.interceptors.response.use(response => {
    const { data } = response
    return data
}, error => {
    console.error(err)
    return Promise.reject(error);
});
