import {MarketsType} from '../../api/types-api';
import {MarketsActionTypes} from "./actionsTypes";
import {ActionsTypes} from './actions';


const initialState = {
    markets: {
        data: [] as Array<MarketsType>,
        timestamp: null as Date | null,
    },
};


export type InitialStateType = typeof initialState

export const marketsReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case MarketsActionTypes.SET_MARKETS: {
            return {
                ...state,
                ...actions.payload,
            };
        }
    }
    return state;
};