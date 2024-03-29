
// 获取新闻动态
function getNewsNode() {
    return netWork.axios.get('api/newsTrends').then((result) => {
        return Promise.resolve(result.data)
    }).catch((err) => {
        return Promise.reject(err)
    });
}

// 获取新闻列表
function getNewsList(params) {
    return netWork.axios.get('api/newsList', { params }).then((result) => {
        return Promise.resolve(result)
    }).catch((err) => {
        return Promise.reject(err)
    });
}
// 获取新闻详情
function getNewsDetail(id) {
    return netWork.axios.get('api/newsDetail/' + id).then((result) => {
        return Promise.resolve(result.data)
    }).catch((err) => {
        return Promise.reject(err)
    });
}