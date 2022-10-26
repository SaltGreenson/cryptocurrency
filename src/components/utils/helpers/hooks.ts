import { useDispatch } from 'react-redux';
import store from '../../../redux/redux-store';

export type AppDispatchType = typeof store.dispatch
export const useThunkDispatch = () => useDispatch<AppDispatchType>();
