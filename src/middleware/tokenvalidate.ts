const middleJwt = require('../modules/JWT');
const middleHttpCode = require('../modules/HttpCode');

module.exports = function() {
    return async (ctx: any, next: any) => {
        console.log(ctx.req.url,"路径");
        
        if(ctx.req.url !== '/user/login') {
            const token = ctx.cookies.get('token');
            if(token) {
                const status = middleJwt.verifyToken(token);
                if(status === middleHttpCode.RequestError.request_error_forbidden) {
                    ctx.body = {
                        code: middleHttpCode.RequestError.request_error_forbidden,
                        msg: middleHttpCode.RequestError.request_error_forbidden_msg
                    }
                } else {
                    await next();
                }
            } else {
                ctx.body = {
                    code: middleHttpCode.RequestError.request_error_unauthorized,
                    msg: middleHttpCode.RequestError.request_error_unauthorized_msg
                }
            }
        } else {
            await next();
        }
    }
}