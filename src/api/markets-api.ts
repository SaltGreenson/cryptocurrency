import {instance} from "./api"
import {ResponseDataType} from "./types-api";

export const marketsApi = {
    async markets() {
        return await instance.get<ResponseDataType, any>('markets')
    }
}