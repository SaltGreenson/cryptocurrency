import React from "react"
import classes from './CoinDescription.module.css'
import {AssetsType} from "../../api/types-api";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import classNames from "classnames";
import {InputNumber} from "../common/FormsControls/FormsControls";

type PropsTypes = {
    coin: AssetsType
}

const CoinDescription: React.FC<PropsTypes> = ({coin}) => {

    return <div className={classes.container}>
        <div className={classes.cardWrap}>
            <div className={classes.titleWrap}>
                <span className={classes.symbol}>{coin.symbol}</span>
                <span className={classes.rank}>RANK #{coin.rank}</span>
                <span className={classes.price}>{formatPrice(coin.priceUsd)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classes.internalTitle}>24h%:</p>
                <span className={classes.supply}>{formatPercents(coin.changePercent24Hr)}%</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Circulating Supply:</p>
                <span className={classes.supply}>{formatPrice(coin.supply, 0)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Market cap:</p>
                <span className={classes.supply}>{formatPrice(coin.marketCapUsd, 0)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Volume(24h):</p>
                <span className={classes.supply}>{formatPrice(coin.volumeUsd24Hr, 0)}</span>
            </div>
            <InputNumber/>
        </div>
    </div>
}

export default CoinDescription