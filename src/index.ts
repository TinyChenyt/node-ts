import koa from 'koa';
import koaBody from 'koa-body';
// import config from './modules/Config';
import router from './routes/mian';
// import tok
// import utils from './utils';
import "./routes/tags"


const app = new koa();

// 使用中间件处理 post 传参 和上传图片
app.use(koaBody({
    multipart: true,
    formidable: {
        //   maxFileSize: config.uploadImgSize
    }
}));

// 先统一设置请求配置 => 跨域，请求头信息...
app.use(async (ctx, next) => {
    /** 请求路径 */
    // const path = ctx.request.path;

    console.log("--------------------------");
    console.count("request count");

    const { origin, referer } = ctx.headers;

    // const domain = utils.getDomain(referer || "");
    // console.log("referer domain >>", domain);
    // 如果是 允许访问的域名源 ，则给它设置跨域访问和正常的请求头配置
    // if (domain && config.origins.includes(domain)) {
        ctx.set({
            // "Access-Control-Allow-Origin": domain,
            "Access-Control-Allow-Origin": "*", // 开启跨域，一般用于调试环境，正式环境设置指定 ip 或者指定域名
            // "Content-Type": "application/json",
            // "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            // "X-Powered-By": "3.2.1",
            // "Content-Security-Policy": `script-src "self"` // 只允许页面`script`引入自身域名的地址
        });
    // }

    // 如果前端设置了 XHR.setRequestHeader("Content-Type", "application/json")
    // ctx.set 就必须携带 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization" 
    // 如果前端设置了 XHR.setRequestHeader("Authorization", "xxxx") 那对应的字段就是 Authorization
    // 并且这里要转换一下状态码
    // console.log(ctx.request.method);
    if (ctx.request.method === "OPTIONS") {
        ctx.response.status = 200;
    }

    // const hasPath = router.stack.some(item => item.path == path);
    // // 判断是否 404
    // if (path != "/" && !hasPath) {
    //     return ctx.body = "<h1 style="text-align: center; line-height: 40px; font-size: 24px; color: tomato">404：访问的页面（路径）不存在</h1>";
    // }

    try {
        console.log("成功");
        
        await next();
    } catch (err: any) {
        console.log("Error: " + err);
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        }
    }
});

app.use(router.routes())
app.on("error", (err, ctx) => {
    console.log(`\x1B[91m server error !!!!!!!!!!!!! \x1B[0m`, err, ctx);
})

app.listen(3000, () => {
    // for (let i = 0; i < 100; i++) {
    //     console.log(`\x1B[${i}m 颜色 \x1B[0m`, i);
    // }
    console.log("服务器启动完成:");
})