import {AssetsType} from '../../api/types-api';
import {ProfileActionsTypes} from "./actionsTypes";
import {ActionsTypes} from './actions';

export type CoinInPortfolioType = {
    coin: AssetsType,
    quantity: number
}

export type ProfileType = {
    portfolio: Array<CoinInPortfolioType>,
    balanceUsd: number,
    initialBalance: number,
    residualBalance: number
}

const initialState = {
    profile: {
        portfolio: [],
        balanceUsd: 0,
        initialBalance: 0,
        residualBalance: 0,
    } as ProfileType,
    isInitializedProfile: false,
};


export type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsTypes)
    : InitialStateType => {
    switch (action.type) {
        case ProfileActionsTypes.SET_PROFILE:
        case ProfileActionsTypes.INITIALIZED_PROFILE_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
    }

    return state;
};

