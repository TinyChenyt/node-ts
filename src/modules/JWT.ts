const jwt = require("jsonwebtoken");
const { secretKey } = require("./salt")
const HttpCode = require("../utils/HttpCode")

class Jwt {
    static gencreateToken(payload: any) {
        const token = jwt.sign(payload,secretKey, {
            expiresIn: 60 * 60 * 24 * 7
        })
        return token;
    }

    static verifyToken(token: any) {
        try {
            let tokenInfo = jwt.verify(token,secretKey,{algorithms: ["HS256"]})
            return HttpCode.Success.success_ok;
        } catch(e) {
            return HttpCode.RequestError.request_error_forbidden;
        }
    }
}

module.exports = Jwt;