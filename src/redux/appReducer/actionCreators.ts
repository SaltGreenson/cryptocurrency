import {RootState, ThunkAction} from "../redux-store";
import {actionsApp, AppActionsType} from "./actions";
import {Dispatch} from "react";
import {setAssets} from "../assetsReducer/actionCreators";
import {initializeProfile} from "../profileReducer/actionCreators";

export function setAppCurrentPage (currentPage: number)
    : ThunkAction<void, RootState, unknown, AppActionsType> {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(actionsApp.setCurrentPage(currentPage));
    };
}
export function setAssetsLastRank ()
    : ThunkAction<void, RootState, unknown, AppActionsType> {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(actionsApp.setLastRank(2295));
    };
}

export function setAssetsOffsets(offset: number)
    : ThunkAction<void, RootState, unknown, AppActionsType> {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(actionsApp.setOffset(offset));
    };
}

export function setAssetsLimit(limit: number)
    : ThunkAction<void, RootState, unknown, AppActionsType> {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(actionsApp.setLimit(limit));
    };
}

export function initializeApp(offset: number, limit: number)
    : ThunkAction<Promise<void>, RootState, unknown, AppActionsType> {
    return async (dispatch) => {
        dispatch(actionsApp.setFetching(true));

        await dispatch(setAssets(offset, limit));
        await dispatch(setAssetsLastRank());
        await dispatch(initializeProfile());

        dispatch(actionsApp.isInitialized(true));
        dispatch(actionsApp.setFetching(false));
    };
}
