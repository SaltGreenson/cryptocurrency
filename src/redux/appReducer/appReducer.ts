import {AppActionsTypes} from "./actionsTypes";
import {AppActionsType} from "./actions";

const initialState = {
    initialized: false,
    isFetching: false,
    offset: 0,
    limit: 50,
    lastRank: 0,
    currentPage: 1,
};

export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case AppActionsTypes.SET_ASSETS_OFFSET:
        case AppActionsTypes.SET_ASSETS_LIMIT:
        case AppActionsTypes.SET_FETCHING:
        case AppActionsTypes.SET_ASSETS_LAST_RANK:
        case AppActionsTypes.SET_APP_CURRENT_PAGE:
        case AppActionsTypes.INITIALIZED_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
    }

    return state;
};