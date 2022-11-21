import {RootState, ThunkAction} from "../redux-store";
import {actions, ActionsTypes} from "./actions";
import {Dispatch} from "react";
import {keys} from "../../keys";
import {AssetsType, ResponseType} from "../../api/types-api";
import {assetsApi} from "../../api/assets-api";
import {CoinInPortfolioType, ProfileType} from "./profileReducer";

export function initializeProfile(): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
            || {
                portfolio: [],
                balanceUsd: 0,
                initialBalance: 0,
                residualBalance: 0,
            };

        try {
            if (profile.portfolio.length) {
                profile.balanceUsd = 0;

                for (let i = 0; i < profile.portfolio.length; i += 1) {
                    const response: ResponseType = await assetsApi.assetsById(profile.portfolio[i].coin.id);
                    profile.balanceUsd += +(response.data.priceUsd * profile.portfolio[i].quantity);
                    profile.portfolio[i].coin = response.data;
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            localStorage.setItem(keys.localStorageName, JSON.stringify(profile));
            dispatch(actions.setProfile(profile));
            dispatch(actions.initializedSuccess());
        }
    };
}

export function addCoinToPortfolio(coin: AssetsType, quantity: number)
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
            || {
                portfolio: [],
                balanceUsd: 0,
                initialBalance: 0,
                residualBalance: 0,
            };

        const totalBalance = +(coin.priceUsd * +quantity);
        const idx: number = profile.portfolio.findIndex((po) => po.coin.id === coin.id);
        const changeable: CoinInPortfolioType = profile.portfolio[idx];

        if (idx !== -1) {
            changeable.quantity = +changeable.quantity + quantity;
        } else {
            profile.portfolio.push({coin, quantity});
        }

        profile.balanceUsd += totalBalance;
        profile.initialBalance += totalBalance;

        dispatch(actions.setProfile(profile));
        localStorage.setItem(keys.localStorageName, JSON.stringify(profile));
    };
}

export function removeCoinFromPortfolio(coin: AssetsType, quantity: number)
    : ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
            || {
                portfolio: [],
                balanceUsd: 0,
                initialBalance: 0,
                residualBalance: 0,
            };

        const idx: number = profile.portfolio.findIndex((po) => po.coin.id === coin.id);
        const changeableCoin: CoinInPortfolioType = profile.portfolio[idx];

        let finalBalance;

        if (changeableCoin.quantity > quantity) {
            finalBalance = +(changeableCoin.coin.priceUsd * quantity);
            changeableCoin.quantity -= quantity;
        } else {
            finalBalance = +(changeableCoin.coin.priceUsd * changeableCoin.quantity);
            profile.portfolio = profile.portfolio.filter((c) => c.coin.id !== coin.id);
        }

        if (profile.balanceUsd >= profile.initialBalance) {
            profile.residualBalance = Math.abs(profile.initialBalance - finalBalance);
        } else {
            profile.residualBalance -= Math.abs(profile.balanceUsd - profile.initialBalance);
        }

        profile.balanceUsd -= finalBalance;
        profile.initialBalance = profile.balanceUsd;

        dispatch(actions.setProfile(profile));
        localStorage.setItem(keys.localStorageName, JSON.stringify(profile));
    };
}

export function withdraw(amount: number)
    : ThunkAction<void, RootState, unknown, ActionsTypes> {
    return (dispatch: Dispatch<ActionsTypes>) => {
        // !!! THIS IS FUNCTION JUST A STUB
        if (amount <= 0) {
            return;
        }

        const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string);

        const balance: number = profile.residualBalance - amount;

        if (balance >= 0) {
            profile.residualBalance = balance;
            dispatch(actions.setProfile(profile));
            localStorage.setItem(keys.localStorageName, JSON.stringify(profile));
        }
    };
}

