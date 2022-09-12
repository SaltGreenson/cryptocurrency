import {instance} from "./api"
import {ResponseType} from "./types-api";

export const marketsApi = {
    async markets() {
        return await instance.get<ResponseType>('markets').then(res => res.data)
    }
}