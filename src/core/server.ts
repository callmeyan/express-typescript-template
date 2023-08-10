import { InitServerOption } from "./types";
// import { createServer as createServerOrigin } from "http";
import express = require("express");

export function createServer(options: Partial<InitServerOption>, callback?: () => void) {
    // 创建express服务器
    const app = express();
    // 将请求体转换为JSON格式
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // 监听端口
    app.listen(options.port, callback);
    app.get('/ping', (_req, res) => {
        res.appendHeader('app-ping', 'pong')
        res.send('pong')
    })
    return app;
}

