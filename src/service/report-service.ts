import { PvUvModel } from "../model/pv-uv";
import { isExist, insertAndGetInsertId } from './mysql'

const table = {
    pv_uv: 'pv_uv'
}
export async function reportEvent(data: Partial<PvUvModel>) {
    //pv:用户每次打开一个页面便记录1次PV，多次打开同一页面则浏览量累计。
    //uv:1天内同一访客的多次访问只记录为一个访客。通过IP和cookie是判断UV值的两种方式。
    const { type } = data;
    if (type == 'uv') {
        // 判断今日的数据是否已经存在
        const existsToday = await isExist('select count(*) _ from pv_uv where DATE(created_at) = CURDATE() and uuid=?', [data.uuid])
        if (existsToday) {
            return;
        }
    }
    await insertAndGetInsertId('pv_uv', data)
}