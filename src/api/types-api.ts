export type AssetsType = {
    id: string,
    rank: number,
    symbol: string,
    name: string,
    supply: number,
    maxSupply: number,
    marketCapUsd: number,
    volumeUsd24Hr: number,
    priceUsd: number,
    changePercent24Hr: number,
    vwap24Hr: number
}

export type AssetsHistoryType = {
    priceUsd: number,
    time: Date
}

export type MarketsType = {
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

export type AssetsMarket = {
    exchangeId: string,
    baseId: string,
    quoteId: string,
    baseSymbol: string,
    quoteSymbol: string,
    volumeUsd24Hr: number,
    priceUsd: number,
    volumePercent: number
}

export type ResponseType = {
    data: Array<AssetsMarket & AssetsType & AssetsHistoryType & MarketsType> & AssetsType,
    timestamp: Date
}
