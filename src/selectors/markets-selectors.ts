import {AppStateType} from "../redux/redux-store"

export const getMarkets = (state: AppStateType) => state.markets.markets.data
