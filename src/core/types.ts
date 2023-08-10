import { Response,Request } from 'express'
export type InitServerOption = {
    port: number;
    host: string;
    https: boolean;
}
export type HttpMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | string;
export type RouteHandleFunctionParam = {
    path: string;
    param: Record<string, string>;
    method: HttpMethod;
    headers: Record<string, string>;
    res: Response<any, Record<string, any>>
    req: Request
}
export type RouteHandleFunction = (params: RouteHandleFunctionParam) => void;