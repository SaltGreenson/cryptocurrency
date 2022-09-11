import {instance} from "./api"

export type MarketCryptoType = {
    exchangeId: string,
    rank: number,
    baseSymbol: string,
    baseId: string,
    quoteSymbol: string,
    quoteId: string,
    priceQuote: number,
    priceUsd: number,
    volumeUsd24Hr: number,
    percentExchangeVolume: number,
    tradesCount24Hr: number,
    updated: string
}

export type CryptoResponseDataType = {
    data: Array<MarketCryptoType>
    timestamp: string
}

export const mainApi = {
    async market() {
        return await instance.get<CryptoResponseDataType, any>('markets')
    }
}