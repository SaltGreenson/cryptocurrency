import React from "react"
import {useSelector} from "react-redux";
import {getIsFetching} from "../../../../../selectors/app-selectors";
import Preloader from "../../../../../components/common/Preloader/Preloader";
import {getAsset} from "../../../../../selectors/assets-selectors";

const CoinDescription:React.FC = (props) => {

    const isFetching = useSelector(getIsFetching)
    const asset = useSelector(getAsset)
    if (isFetching) {
        return <Preloader/>
    }

    return <div>
        {asset.name}
    </div>
}

export default CoinDescription