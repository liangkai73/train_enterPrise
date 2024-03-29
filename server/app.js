const KOA = require('koa');
// const parser = require('koa-bodyparser');
const InitManage = require('./core/init')
const { koaBody } = require('koa-body');
const path = require('path')


const app = new KOA();

InitManage.init(app);

app.listen(3000)