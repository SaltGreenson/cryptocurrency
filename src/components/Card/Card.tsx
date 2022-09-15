import React, {useEffect, useState} from "react";
import {AssetsHistoryType, AssetsType} from "../../api/types-api";
import classes from './Card.module.css'
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import LittlePreloader from "../common/LittlePreloader/LittlePreloader";
import ChartComponent from "../ChartComponent/ChartComponent";
import {useDispatch, useSelector} from "react-redux";
import {getAssetsHistory, getIsFetchingCard} from "../../selectors/assets-selectors";
import {getIsFetching} from "../../selectors/app-selectors";
import {AssetsTop3Type, setAssetsByID, setAssetsHistoryById, setAssetsTop3} from "../../redux/assets-reducer";
import {IntervalEnum} from "../../api/assets-api";
import {useNavigate} from "react-router-dom";

const Card: React.FC<{ coinData: AssetsType, coinHistory: Array<AssetsHistoryType>}> = React.memo (({coinData, coinHistory}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onClick = (id: string) => {
        dispatch(setAssetsByID(id))
        navigate(`/:id=${id}`)
    }

    return <div className={classes.container}>
        <div className={classes.cardWrap}>
            <div className={classes.titleWrap}>
                <span className={classes.symbol} onClick={() => onClick(coinData.id)}>{coinData.symbol}</span>
                <span className={classes.rank}>RANK #{coinData.rank}</span>
            </div>
            <div className={classes.flexWrap}>
                <div className={classes.flexWrap}>
                    <p className={classes.internalTitle}>PRICE:</p>
                    <span className={classes.price}>{formatPrice(coinData.priceUsd)}</span>
                </div>
                <div className={classes.flexWrap}>
                    <p className={classes.internalTitle}>24h%:</p>
                    <span className={classes.changePercent}>{formatPercents(coinData.changePercent24Hr)}%</span>
                </div>
            </div>
            <div className={classes.chartWrap}>
                <ChartComponent key={coinData.id} assetHistory={coinHistory} id={coinData.id} isDisplayX={false} isDisplayY={false}/>
            </div>
        </div>
    </div>
})


export default Card