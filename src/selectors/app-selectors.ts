import { AppStateType } from '../redux/redux-store';

export const getInitialized = (state: AppStateType): boolean => state.app?.initialized || false;
export const getIsFetching = (state: AppStateType): boolean => state.app?.isFetching || false;
export const getLastRank = (state: AppStateType): number => state.app?.lastRank || 1;
export const getOffset = (state: AppStateType): number => state.app?.offset || 0;
export const getLimit = (state: AppStateType): number => state.app?.limit || 50;
export const getCurrentPage = (state: AppStateType): number => state.app?.currentPage || 1;
