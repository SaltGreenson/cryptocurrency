import React from 'react'
import {useSelector} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader";
import {AssetsType} from "../../api/types-api";
import {getIsFetching} from "../../selectors/app-selectors";
import {getAssets} from "../../selectors/assets-selectors";

const MainPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching? <Preloader/>: <Main/>}

    </>
}

const Main: React.FC = (props) => {
    const assets = [...useSelector(getAssets)]
    return <div>
        {assets.map((coin) => <CoinElement key={coin.id} coin={coin}/>)}
    </div>
}

const CoinElement: React.FC<{coin: AssetsType}> = ({coin}) => {
    return <div>
        <p>{coin.name}</p>
    </div>
}

export default MainPage