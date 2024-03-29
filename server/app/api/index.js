
const Router = require('koa-router')
const router = new Router();
const config = require('../../config')
const newsListData = require('../../public/mokedata');
// 新闻列表
router.get('/api/newsList', async (ctx, next) => {
    const { page, pageSize } = ctx.request.query
    let index1 = (page * 1 - 1) * pageSize;
    let index2 = pageSize * 1
    const arr = newsListData.slice(index1, index2);


    let res = {
        code: 200,
        data: {
            list: arr,
            current: page * 1,
            total: newsListData.length,
            pageSize: pageSize * 1
        }

    }

    ctx.response.body = res
    next()
})
// 新闻动态
router.get('/api/newsTrends', async (ctx, next) => {

    const arr = newsListData.slice(0, 4)

    let res = {
        code: 200,
        data: arr

    }

    ctx.response.body = res
    next()
})
// 新闻详情
router.get('/api/newsDetail/:id', async (ctx, next) => {
    const { id } = ctx.params;
    let item = newsListData.filter(i => {
        return i.id == id;
    })[0]
    item.createTime = '2023-04-25 11:36';
    item.source = '人民日报'
    let res = {
        code: 200,
        data: item
    }

    ctx.response.body = res
    next()
})
module.exports = router