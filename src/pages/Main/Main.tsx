import React from 'react'
import {useSelector} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader";
import {getIsFetching} from "../../selectors/app-selectors";
import {MainBody} from "./MainBody/MainBody";

const MainPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching? <Preloader/>: <MainBody/>}

    </>
}

export default MainPage