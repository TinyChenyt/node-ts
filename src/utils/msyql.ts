import * as mysql from 'mysql';
import config from '../modules/Config';

// mysql查询结果
interface MsqlResult {
    state: number;
    results: any;
    msg: string;
    error: mysql.MysqlError | null;
    fields: Array<mysql.FieldInfo> | null;
}

// 数据库连接池
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port
})

/**
 * 数据库操作
 */

export default function query(command: string, value?: Array<any>) {
    const result: MsqlResult = {
        state: 0,
        results: null,
        msg: "",
        error: null,
        fields: null
    }
    return new Promise<MsqlResult>((resolve, reject) => {
        pool.getConnection((error: any, connection) => {
            if(error) {
                result.error = error;
                result.msg = "数据库连接出错";
                resolve(result);
            } else {
                const callback: mysql.queryCallback = (error: any, result, fields) => {
                    connection.release();
                    if(error) {
                        result.error = error;
                        result.msg = "数据库操作出错";
                        resolve(result);
                    } else {
                        result.state = 1;
                        result.msg = "数据库操作成功"
                        result.results = result;
                        result.fields = fields;
                        resolve(result);
                    }
                }
                if(value) {
                    pool.query(command, value, callback);
                } else {
                    pool.query(command, callback);
                }
            }
        })
    })
}