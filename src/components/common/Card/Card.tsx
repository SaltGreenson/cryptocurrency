import React from "react";
import {AssetsType} from "../../../api/types-api";
import classes from './Card.module.css'
import {formatPercents, formatPrice} from "../../../pages/Main/Assets/CoinElement/CoinElement";

const Card: React.FC<{ coin: AssetsType }> = ({coin}) => {


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
                    <span className={classes.price}>{formatPercents(coin.changePercent24Hr)}%</span>
                </div>
            </div>
        </div>
    </div>
}


export default Card