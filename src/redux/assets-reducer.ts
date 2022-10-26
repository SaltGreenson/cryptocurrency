import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {
  GenericThunkType, InferActionsTypes, RootState, ThunkAction,
} from './redux-store';
import {
  AssetsHistoryType, AssetsMarket, AssetsType, ResponseType,
} from '../api/types-api';
import { assetsApi, IntervalEnum } from '../api/assets-api';
import { actionsApp, ActionsAppTypes } from './app-reducer';

const SET_ASSETS = 'SET_ASSETS';
const SET_ASSETS_BY_ID = 'SET_ASSETS_BY_ID';
const SET_ASSETS_HISTORY_BY_ID = 'SET_ASSETS_HISTORY_BY_ID';
const SET_ASSETS_MARKETS_BY_ID = 'SET_ASSETS_MARKETS_BY_ID';
const SET_ASSETS_TOP_3 = 'SET_ASSETS_TOP_3';
const SET_IS_FETCHING_CARD = 'SET_IS_FETCHING_CARD';

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

export const actions = {
  setAssets: (assets: GenericStateType<Array<AssetsType>>) => ({
    type: SET_ASSETS,
    payload: { assets },
  } as const),
  setAssetsById: (assetsById: GenericStateType<AssetsType>) => ({
    type: SET_ASSETS_BY_ID,
    payload: { assetsById },
  } as const),
  setAssetsHistoryById: (assetsHistoryById: GenericStateType<Array<AssetsHistoryType>>) => ({
    type: SET_ASSETS_HISTORY_BY_ID,
    payload: { assetsHistoryById },
  } as const),
  setAssetsMarketsById: (assetsMarketsById: GenericStateType<Array<AssetsMarket>>) => ({
    type: SET_ASSETS_MARKETS_BY_ID,
    payload: { assetsMarketsById },
  } as const),
  setAssetsTop3Action: (assetsTop3: AssetsTop3Type) => ({
    type: SET_ASSETS_TOP_3,
    payload: { assetsTop3 },
  } as const),
  setIsFetchingAssetPage: (isFetchingAssetPage: boolean) => ({
    type: SET_IS_FETCHING_CARD,
    payload: { isFetchingAssetPage },
  } as const),
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const assetsReducer = (state = initialState, action: ActionsTypes)
    : InitialStateType => {
  switch (action.type) {
    case 'SET_ASSETS_BY_ID':
    case 'SET_ASSETS_HISTORY_BY_ID':
    case 'SET_ASSETS_MARKETS_BY_ID':
    case 'SET_ASSETS_TOP_3':
    case 'SET_IS_FETCHING_CARD':
    case 'SET_ASSETS': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export function setAssets(offset: number, limit: number)
    : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    const response: ResponseType = await assetsApi.assets(offset, limit);
    dispatch(actions.setAssets(response));
  };
}

export function setAssetsTop3()
    : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    try {
      dispatch(actions.setIsFetchingAssetPage(true));
      const response: ResponseType = await assetsApi.assets(0, 10);

      const assetsTop3 = response.data
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 3);

      const promise = assetsTop3.map((e: AssetsType) => (
        assetsApi.assetsHistoryById(e.id, IntervalEnum.m5)));
      const histories: Array<ResponseType> = await Promise.all([...promise]);

      let h = [...histories[0].data];

      const obj: AssetsTop3Type = {
        data: [{
          id: assetsTop3[0].id,
          history: h,
          data: assetsTop3[0],
        }],
      };

      for (let i = 1; i < histories.length; i += 1) {
        h = [...histories[i].data];

        obj.data.push({
          id: assetsTop3[i].id,
          history: h,
          data: assetsTop3[i],
        });
      }

      dispatch(actions.setAssetsTop3Action(obj));
      dispatch(actions.setIsFetchingAssetPage(false));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setAssetByID(id: string)
    : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    try {
      dispatch(actions.setIsFetchingAssetPage(true));
      const response: ResponseType = await assetsApi.assetsById(id);

      dispatch(actions.setAssetsById(response));
      dispatch(actions.setIsFetchingAssetPage(false));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setAssetsHistoryById(id: string, interval: IntervalEnum)
    : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    try {
      dispatch(actionsApp.setFetching(true));
      const response: ResponseType = await assetsApi.assetsHistoryById(id, interval);

      dispatch(actions.setAssetsHistoryById(response));
      dispatch(actionsApp.setFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setAssetsMarketsById(id: string, limit = 10)
    : ThunkAction<Promise<void>, RootState, unknown, AnyAction> {
  return async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    try {
      dispatch(actionsApp.setFetching(true));
      const response: ResponseType = await assetsApi.assetsMarketsById(id, limit);

      dispatch(actions.setAssetsMarketsById(response));
      dispatch(actionsApp.setFetching(false));
    } catch (err) {
      console.log(err);
    }
  };
}

export default assetsReducer;
