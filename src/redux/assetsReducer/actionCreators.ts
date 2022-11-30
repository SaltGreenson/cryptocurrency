import {RootState, ThunkAction} from "../redux-store";
import {actions, ActionsTypes} from "./actions";
import {Dispatch} from "react";
import {actionsApp, AppActionsType} from "../appReducer/actions";
import {AssetsType, ResponseType} from "../../api/types-api";
import {assetsApi, IntervalEnum} from "../../api/assets-api";
import {AssetsTop3Type} from "./assetsReducer";
import axios from "axios";
import {keys} from "../../keys";

export function setAssets(offset: number, limit: number)
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes | AppActionsType>) => {
        const response: ResponseType = await assetsApi.assets(offset, limit);
        const t = await axios.get(`${keys.tRPC_CLIENT_URL}/assets?offset=0&limit=1`);
        console.log(t)
        dispatch(actions.setAssets(response));
    };
}

export function setAssetsTop3()
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes | AppActionsType>) => {
        try {
            dispatch(actions.setIsFetchingAssetPage(true));
            const response: ResponseType = await assetsApi.assets(0, 50);
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

            dispatch(actions.setAssetsTop3(obj));
            dispatch(actions.setIsFetchingAssetPage(false));
        } catch (err) {
            console.log(err);
        }
    };
}

export function setAssetByID(id: string)
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes | AppActionsType>) => {
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
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes | AppActionsType>) => {
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
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes | AppActionsType>) => {
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
