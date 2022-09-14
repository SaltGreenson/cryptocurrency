import React, {useEffect, useState} from "react";
import {AssetsHistoryType, AssetsType} from "../../api/types-api";
import classes from './Card.module.css'
import {formatPercents, formatPrice} from "../../pages/Main/Assets/CoinElement/CoinElement";
import LittlePreloader from "../common/LittlePreloader/LittlePreloader";
import ChartComponent from "../ChartComponent/ChartComponent";
import {useDispatch, useSelector} from "react-redux";
import {getAssetsHistory} from "../../selectors/assets-selectors";
import {getIsFetching} from "../../selectors/app-selectors";
import {setAssetsHistoryById} from "../../redux/assets-reducer";
import {IntervalEnum} from "../../api/assets-api";

const Card: React.FC<{ coin: AssetsType }> = ({coin}) => {

    const assetHistory = useSelector(getAssetsHistory)
    const dispatch = useDispatch()
    const isFetching = useSelector(getIsFetching)
    useEffect(() => {
            dispatch(setAssetsHistoryById(coin.id, IntervalEnum.m5))
    }, [])


    if (isFetching) {
        return <LittlePreloader/>
    }

    return <div className={classes.container}>
        <div className={classes.cardWrap}>
            <div className={classes.titleWrap}>
                <span className={classes.symbol}>{coin.symbol}</span>
                <span className={classes.rank}>RANK #{coin.rank}</span>
            </div>
            <div className={classes.flexWrap}>
                <div className={classes.flexWrap}>
                    <p className={classes.internalTitle}>PRICE:</p>
                    <span className={classes.price}>{formatPrice(coin.priceUsd)}</span>
                </div>
                <div className={classes.flexWrap}>
                    <p className={classes.internalTitle}>24h%:</p>
                    <span className={classes.changePercent}>{formatPercents(coin.changePercent24Hr)}%</span>
                </div>
            </div>
            <div className={classes.chartWrap}>
                <ChartComponent key={coin.id} assetHistory={assetHistory} id={coin.id} isDisplayX={false} isDisplayY={false}/>
            </div>
        </div>
    </div>
}


export default Card