import React from 'react'
import {useSelector} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader";
import {getIsFetching} from "../../selectors/app-selectors";
import {Assets} from "./Assets/Assets";
import classes from './Main.module.css'
import Card from "../../components/Card/Card";

const MainPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {/*<div className={classes.heading}>*/}
        {/*    {top3Assets.map(coin => <Card key={coin.id} coin={coin}/>)}*/}
        {/*</div>*/}
        {isFetching? <Preloader/>: <Assets/>}

    </>
}

export default MainPage