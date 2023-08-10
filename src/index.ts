import { createServer } from "./core/server";
import { initRoutes } from "./routes";
import { PORT } from './../config'

// 创建应用并初始化路由
initRoutes(createServer({
    port: PORT
}, () => console.log('server created')))