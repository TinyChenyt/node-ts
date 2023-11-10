// readonly 只读
class ModuleConfig {
    constructor() {

    }

    /** 数据库配置 */
    readonly db = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'node-ts',
        port: 3306,
        maxLimit: 10,
    }

    /** 接口 */
    readonly apiPrefix = ''
}

/** 项目配置 */
const config = new ModuleConfig();
export default config;