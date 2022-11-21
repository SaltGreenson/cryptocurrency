import {AssetsHistoryType, AssetsMarket, AssetsType,} from '../../api/types-api';
import {AssetsActionTypes} from "./actionsTypes";
import {ActionsTypes} from './actions';


export type AssetsTop3Type = {
    data: [{
        id: string,
        history: Array<AssetsHistoryType>,
        data: AssetsType
    }]
}

export type GenericStateType<T> = {
    data: T,
    timestamp: Date
}

const initialState = {
    assets: {
        data: [] as Array<AssetsType>,
        timestamp: null as Date | null,
    },
    assetsById: {
        data: {} as AssetsType,
        timestamp: null as Date | null,
    },
    assetsHistoryById: {
        data: [] as Array<AssetsHistoryType>,
        timestamp: null as Date | null,
    },
    assetsMarketsById: {
        data: [] as Array<AssetsMarket>,
        timestamp: null as Date | null,
    },
    assetsTop3: {} as AssetsTop3Type,
    isFetchingAssetPage: false,
};



export type InitialStateType = typeof initialState

export const assetsReducer = (state = initialState, action: ActionsTypes)
    : InitialStateType => {
    switch (action.type) {
        case AssetsActionTypes.SET_ASSETS:
        case AssetsActionTypes.SET_ASSETS_BY_ID:
        case AssetsActionTypes.SET_ASSETS_HISTORY_BY_ID:
        case AssetsActionTypes.SET_ASSETS_MARKETS_BY_ID:
        case AssetsActionTypes.SET_ASSETS_TOP_3:
        case AssetsActionTypes.SET_IS_FETCHING_CARD: {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
    return state;
};

