import { RouteHandleFunction } from "../core/types";
import { savePvOrUv } from "../service/report-service";




export const reportToServer: RouteHandleFunction = ({
    param,res
})=>{
    savePvOrUv(param).then(()=>{
        res.send('got and saved!')
    }).catch((e)=>{
        console.log(e)
        res.send('got but not saved!')
    });
}