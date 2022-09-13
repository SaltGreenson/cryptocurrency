import {instance} from "./api"
import {ResponseType} from "./types-api";

export enum IntervalEnum {
    m1,
    m5,
    m15,
    m30,
    h1,
    h2,
    h6,
    h12,
    d1
}

export const assetsApi = {
    async assets(offset: number, limit: number) {
        return await instance.get<ResponseType>(`assets?offset=${offset}&limit=${limit}`).then(res => res.data)
    },
    async assetsById(id: string) {
        return await instance.get<ResponseType>(`assets/${id}`).then(res => res.data)
    },
    async assetsHistoryById(id: string, interval: IntervalEnum) {
        return await instance.get<ResponseType>(`assets/${id}/history?interval=${interval}`).then(res => res.data)
    },
    async assetsMarketsById(id:string, limit:number = 10) {
        return await instance.get<ResponseType>(`assets/${id}/markets?limit=${limit}`).then(res => res.data)
    }
}