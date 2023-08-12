import { Application, Request, Response } from "express";
import { RouteHandleFunction, RouteHandleFunctionParam } from "../core/types";
import { home } from "./home";
import { reportEvent } from "../service/report-service";

//
function createRoute(handler: RouteHandleFunction) {
    return (req: Request, res: Response<any, Record<string, any>>) => {
        console.log('params', req.params, req.query, req.body)
        handler({
            path: req.path,
            param: req.params,
            query: req.params,
            body: req.params,
            method: req.method,
            headers: {},
            res,
            req
        })
    }
}

// 初始化路由
export function initRoutes(app: Application) {
    app.get('/home', createRoute(home))
    app.all('/api/report', createRoute(reportEvent))
}