
const requireDerictory = require('require-directory');

const Router = require('koa-router');


class InitManage {

    static init(app) {
        InitManage.app = app;
        InitManage.routesLoad();
        app.use((ctx, next) => {
            ctx.set('Access-Control-Allow-Origin', '*'); // 允许所有域名跨域
            next()
        });
        console.log('start success!hello,lanck.')
    }
    static routesLoad() {
        const DirectoryPath = `${process.cwd()}/app/api`;

        requireDerictory(module, DirectoryPath, {
            visit: function (obj) {
                if (obj instanceof Router) {
                    InitManage.app.use(obj.routes())
                }
            }
        })

    }
}


module.exports = InitManage;