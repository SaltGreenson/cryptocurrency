import React from "react";
import {AssetsHistoryType, AssetsType} from "../../api/types-api";
import classes from './Card.module.css'
import ChartComponent from "../ChartComponent/ChartComponent";
import {useDispatch} from "react-redux";
import {setAssetByID} from "../../redux/assets-reducer";
import {useNavigate} from "react-router-dom";
import {formatNumbersToPrettyStyle, formatNumberToPrice} from "../utils/helpers/helpers";

const Card: React.FC<{ coinData: AssetsType, coinHistory: Array<AssetsHistoryType>}> = React.memo (({coinData, coinHistory}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onClick = (id: string) => {
        dispatch(setAssetByID(id))
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
                    <span className={classes.price}>{formatNumberToPrice(coinData.priceUsd)}</span>
                </div>
                <div className={classes.flexWrap}>
                    <p className={classes.internalTitle}>24h%:</p>
                    <span className={classes.changePercent}>{formatNumbersToPrettyStyle(coinData.changePercent24Hr)}%</span>
                </div>
            </div>
            <div className={classes.chartWrap}>
                <ChartComponent key={coinData.id} assetHistory={coinHistory} id={coinData.id} isDisplayX={false} isDisplayY={false}/>
            </div>
        </div>
    </div>
})


export default Card