import { RouteHandleFunction } from "../core/types";

export const home: RouteHandleFunction = ({ res }) => {
    res.send('home')
}