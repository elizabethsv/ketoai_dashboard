import {CHANGE_ROUTE} from './consts'

export const changeRoutes = (payload)=>{
    return { type:CHANGE_ROUTE, payload }
}