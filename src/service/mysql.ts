import { createPool } from 'mysql'
import { DB_CONFIG } from '../../config';

export const pool = createPool({
    ...DB_CONFIG,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 查询对象数组
export async function selectArray<T>(sql: string, params: any = null) {
    // 执行查询sql并返回查询结果
    return await executeSQL<T[]>(sql, params);
    // return new Promise<T[]>((resolve, reject) => {
    //     pool.getConnection((err, connection) => {
    //         if (err) {
    //             reject(err)
    //             return;
    //         }
    //         connection.query("").
    //         connection.query(sql, params, (e, rows) => {
    //             connection.release();
    //             if (e) {
    //                 reject(e)
    //                 return;
    //             }
    //             resolve(rows);
    //         })
    //     })
    // });
}
// 查询单个对象
export async function selectOne<T>(sql: string, params: any = null) {
    // 执行查询sql并返回查询结果
    const arr = await selectArray<T>(sql, params);
    if (arr.length != 1) throw new Error("查询结果数量不等于1");
    return arr[0];
}
// 统计数据
export async function queryCount(sql: string, params: any = null) {
    const obj = await selectOne<{ [key: string]: number }>(sql, params);
    const keys = Object.keys(obj);
    return obj[keys[0]];
}
// 根据表名和条件判断数据是否存在
export async function isExistByTable(tableName: string, condition: any = {}) {
    let sql = `select count(*) as count from ${tableName} where 1=1`;
    const params = [];
    for (let key in condition) {
        sql += ` and ${key}=?`;
        params.push(condition[key]);
    }
    const count = await queryCount(sql, params);
    return count > 0;
}
export async function isExist(sql: string, params: any) {
    const count = await queryCount(sql, params);
    return count > 0;
}
// 查询多条数据

function executeSQL<T>(sql: string, params: any) {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, params, (err, ret) => {
            if (err) {
                reject(err)
            } else {
                resolve(ret)
            }
        })
    })
}

export async function execute(sql: string, params: any = null) {
    const ret = await executeSQL<{ affectedRows: number }>(sql, params)
    return ret.affectedRows
}
export async function insertAndGetInsertId(tableName: string, data: any = null) {
    const ret = await executeSQL<{ insertId: number }>(`insert into \`${tableName}\` set ?`, data)
    return ret.insertId
}
export default {
    selectArray,
    executeSQL,
    execute,
    insertAndGetInsertId,
    isExist,
    isExistByTable,
    pool
}