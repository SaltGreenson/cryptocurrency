import {RootState, ThunkAction} from "../redux-store";
import {actions, ActionsTypes} from "./actions";
import {Dispatch} from "react";
import {actionsApp, AppActionsType} from "../appReducer/actions";
import {ResponseType} from "../../api/types-api";
import {marketsApi} from "../../api/markets-api";

export function collectMarkets()
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes | AppActionsType>) => {
        dispatch(actionsApp.setFetching(true));
        const response: ResponseType = await marketsApi.markets();

        if (response) {
            dispatch(actions.setMarkets(response));
            dispatch(actionsApp.setFetching(false));
        }
    };
}