import {GenericStateType} from "../assetsReducer/assetsReducer";
import {MarketsType} from "../../api/types-api";
import {MarketsActionTypes} from "./actionsTypes";


export const actions = {
    setMarkets: (markets: GenericStateType<Array<MarketsType>>) => ({
        type: MarketsActionTypes.SET_MARKETS,
        payload: {markets},
    } as const),
};

interface SetMarketsActionType {
    type: MarketsActionTypes.SET_MARKETS,
    payload: {markets: GenericStateType<Array<MarketsType>>}
}

export type ActionsTypes = SetMarketsActionType