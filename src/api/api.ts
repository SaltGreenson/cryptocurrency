import axios from 'axios'
import {keys} from "../keys";

export const instance = axios.create({
    baseURL: 'https://api.coincap.io/v2/',
    // withCredentials: true,
    // headers: {
    //     'Accept-Encoding': 'deflate',
    //     'Authorization': `Bearer ${keys.API}`
    // }
})