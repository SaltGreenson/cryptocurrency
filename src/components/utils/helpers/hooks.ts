import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as ProfileACs from '../../../redux/profileReducer/actionCreators'
import * as AppACs from '../../../redux/appReducer/actionCreators'
import * as AssetsACs from '../../../redux/assetsReducer/actionCreators'
import * as MarketsACs from '../../../redux/marketsReducer/actionCreators'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators({
        ...AppACs,
        ...ProfileACs,
        ...AssetsACs,
        ...MarketsACs}, dispatch)
}
