import {AssetsHistoryType, AssetsMarket, AssetsType} from "../../api/types-api";
import {AssetsActionTypes} from "./actionsTypes";
import {AssetsTop3Type, GenericStateType} from "./assetsReducer";

export const actions = {
    setAssets: (assets: GenericStateType<Array<AssetsType>>) => ({
        type: AssetsActionTypes.SET_ASSETS,
        payload: {assets},
    } as const),
    setAssetsById: (assetsById: GenericStateType<AssetsType>) => ({
        type: AssetsActionTypes.SET_ASSETS_BY_ID,
        payload: {assetsById},
    } as const),
    setAssetsHistoryById: (assetsHistoryById: GenericStateType<Array<AssetsHistoryType>>) => ({
        type: AssetsActionTypes.SET_ASSETS_HISTORY_BY_ID,
        payload: {assetsHistoryById},
    } as const),
    setAssetsMarketsById: (assetsMarketsById: GenericStateType<Array<AssetsMarket>>) => ({
        type: AssetsActionTypes.SET_ASSETS_MARKETS_BY_ID,
        payload: {assetsMarketsById},
    } as const),
    setAssetsTop3: (assetsTop3: AssetsTop3Type) => ({
        type: AssetsActionTypes.SET_ASSETS_TOP_3,
        payload: {assetsTop3},
    } as const),
    setIsFetchingAssetPage: (isFetchingAssetPage: boolean) => ({
        type: AssetsActionTypes.SET_IS_FETCHING_CARD,
        payload: {isFetchingAssetPage},
    } as const),
};

interface SetAssetsActionType {
    type: AssetsActionTypes.SET_ASSETS,
    payload: {assets: GenericStateType<Array<AssetsType>>}
}

interface SetAssetsByIdActionType {
    type: AssetsActionTypes.SET_ASSETS_BY_ID,
    payload: {assetsById: GenericStateType<AssetsType>}
}

interface SetAssetsHistoryByIdActionType {
    type: AssetsActionTypes.SET_ASSETS_HISTORY_BY_ID,
    payload: {assetsHistoryById: GenericStateType<Array<AssetsHistoryType>>}
}

interface SetAssetsMarketsByIdActionType {
    type: AssetsActionTypes.SET_ASSETS_MARKETS_BY_ID,
    payload: {assetsMarketsById: GenericStateType<Array<AssetsMarket>>}
}

interface SetAssetsTop3ActionType {
    type: AssetsActionTypes.SET_ASSETS_TOP_3,
    payload: {assetsTop3: AssetsTop3Type}
}

interface SetIsFetchingAssetPageActionType {
    type: AssetsActionTypes.SET_IS_FETCHING_CARD,
    payload: {isFetchingAssetPage: boolean}
}

export type ActionsTypes = SetAssetsActionType |
    SetAssetsByIdActionType |
    SetAssetsHistoryByIdActionType |
    SetAssetsMarketsByIdActionType |
    SetAssetsTop3ActionType |
    SetIsFetchingAssetPageActionType