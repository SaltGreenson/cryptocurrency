import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://api.coincap.io/v2/'
})