import { AppStateType } from '../redux/redux-store';
import { MarketsType } from '../api/types-api';

export default (state: AppStateType)
    : Array<MarketsType> => state.markets.markets.data;
