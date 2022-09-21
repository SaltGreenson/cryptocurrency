import {AppStateType} from "../redux/redux-store"
import {MarketsType} from "../api/types-api";

export const getMarkets = (state: AppStateType): Array<MarketsType> => state.markets.markets.data
