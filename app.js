const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static')
const body = require('koa-better-body')


let server = new Koa();
server.listen(8000);

server.use(body({
    uploadDir:'./static/upload'
}))

server.use(async ctx=>{
    //文件和post数据
    console.log(ctx.request)
})

server.context.a = 12;

let router = new Router();

// router.get('/user', async ctx=>{

// });

server.use(router.routes());

let staticRouter = new Router();
staticRouter.all(/(\.jpg|\/.png|\.gif|\.jpeg)$/i, static('./static',{
    maxage:60*86400*100
}))
staticRouter.all(/(\.css)$/i, static('./static',{
    maxage:1*86400*100
}))
staticRouter.all(/(\.html|\/.htm|\.shtml)$/i, static('./static',{
    maxage:20*86400*100
}))
staticRouter.all('', static('./static',{
    maxage:30*86400*100
}))
// server.use(static('./static'),{
//     maxage:86400*1000, //缓存时间,一天*毫秒
//     index:'index.html' //默认文件
// });
server.use(staticRouter.routes())