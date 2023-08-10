import { Application, Request, Response } from "express";
import { RouteHandleFunction, RouteHandleFunctionParam } from "../core/types";
import { home } from "./home";

//
function createRoute(handler: RouteHandleFunction) {
    return (req: Request, res: Response<any, Record<string, any>>) => {
        handler({
            path: req.path,
            param: req.params,
            method:req.method,
            headers: {},
            res,
            req
        })
    }
}

// 初始化路由
export function initRoutes(app: Application) {
    app.get('/home', createRoute(home))
}