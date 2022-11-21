import { AppStateType } from '../redux/redux-store';
import { AssetsHistoryType, AssetsMarket, AssetsType } from '../api/types-api';
import { AssetsTop3Type } from '../redux/assetsReducer/assetsReducer';

export const getAssets = (state: AppStateType)
    :Array<AssetsType> => state.assets?.assets.data || [];

export const getAsset = (state: AppStateType)
    : AssetsType => state.assets?.assetsById.data || {};

export const getAssetsHistory = (state: AppStateType)
    : Array<AssetsHistoryType> => state.assets?.assetsHistoryById.data || [];

export const getAssetsMarkets = (state: AppStateType)
    : Array<AssetsMarket> => state.assets?.assetsMarketsById.data || [];

export const getTop3Assets = (state: AppStateType)
    : AssetsTop3Type => state.assets?.assetsTop3 || {};

export const getIsFetchingAssetsPage = (state: AppStateType)
    : boolean => state.assets?.isFetchingAssetPage || false;
