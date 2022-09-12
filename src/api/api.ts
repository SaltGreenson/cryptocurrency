import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://api.coincap.io/v2/'
})

export enum ResultCodesEnum {
    Success,
    Error,
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}