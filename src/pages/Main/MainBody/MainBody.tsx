import React from "react";
import {useSelector} from "react-redux";
import {getAssets} from "../../../selectors/assets-selectors";
import {CoinElement} from "./CoinElement/CoinElement";
import classes from './MainBody.module.css'

export const MainBody: React.FC = (props) => {
    const assets = [...useSelector(getAssets)]
    let count = 1
    return <div className={classes.wrap}>
        <table>
            <thead className={classes.theadStyle}>
            <tr className={classes.headerTable}>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h%</th>
                <th>Market cap</th>
                <th>Volume(24h)</th>
            </tr>
            </thead>
            {assets.map((coin) => <CoinElement key={coin.id} coin={coin} count={count++}/>)}
        </table>
    </div>
}