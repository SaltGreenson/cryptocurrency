import React from 'react'
import {useSelector} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader";
import {getIsFetching} from "../../selectors/app-selectors";
import {Assets} from "./Assets/Assets";

const MainPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching? <Preloader/>: <Assets/>}

    </>
}

export default MainPage