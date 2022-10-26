import { AppStateType } from '../redux/redux-store';
import { AssetsHistoryType, AssetsMarket, AssetsType } from '../api/types-api';
import { AssetsTop3Type } from '../redux/assets-reducer';

export const getAssets = (state: AppStateType)
// @ts-ignore
    :Array<AssetsType> => state.assets?.assets.data || [];

export const getAsset = (state: AppStateType)
// @ts-ignore
    : AssetsType => state.assets?.assetsById.data || {};

export const getAssetsHistory = (state: AppStateType)
    // @ts-ignore
    : Array<AssetsHistoryType> => state.assets?.assetsHistoryById.data || [];

export const getAssetsMarkets = (state: AppStateType)
    // @ts-ignore
    : Array<AssetsMarket> => state.assets?.assetsMarketsById.data || [];

export const getTop3Assets = (state: AppStateType)
    // @ts-ignore
    : AssetsTop3Type => state.assets?.assetsTop3 || {};

export const getIsFetchingAssetsPage = (state: AppStateType)
    // @ts-ignore
    : boolean => state.assets?.isFetchingAssetPage || false;
