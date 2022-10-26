import { Dispatch } from 'react';
import { GenericThunkType, InferActionsTypes } from './redux-store';
import { marketsApi } from '../api/markets-api';
import { MarketsType, ResponseType } from '../api/types-api';
import { actionsApp, ActionsAppTypes } from './app-reducer';
import { GenericStateType } from './assets-reducer';

const SET_MARKETS = 'SET_MARKETS';

const initialState = {
  markets: {
    data: [] as Array<MarketsType>,
    timestamp: null as Date | null,
  },
};

const actions = {
  setMarkets: (markets: GenericStateType<Array<MarketsType>>) => ({
    type: SET_MARKETS,
    payload: { markets },
  } as const),
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const marketsReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
  switch (actions.type) {
    case 'SET_MARKETS': {
      return {
        ...state,
        ...actions.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export const collectMarkets = (): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
  dispatch(actionsApp.setFetching(true));
  const response: ResponseType = await marketsApi.markets();

  if (response) {
    dispatch(actions.setMarkets(response));
    dispatch(actionsApp.setFetching(false));
  }
};

export default marketsReducer;
