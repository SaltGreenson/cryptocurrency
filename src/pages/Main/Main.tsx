import React from 'react'
import {useSelector} from "react-redux";
import {getIsFetching} from "../../selectors/main-selectors";
import Preloader from "../../components/common/Preloader/Preloader";
import {AssetsType} from "../../api/types-api";

const MainPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching? <Preloader/>: null}
        <Main/>
    </>
}

const Main: React.FC = (props) => {
    // const assetsCrypto = useSelector()
    return <div>
        Main
    </div>
}

function CoinElement (props:React.PropsWithChildren<AssetsType>) {
    return <div>
        <p>{props.name}</p>
    </div>
}

export default MainPage