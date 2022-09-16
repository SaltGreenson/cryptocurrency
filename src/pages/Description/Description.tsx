import React, {useEffect, useState} from "react";
import {AssetsType} from "../../api/types-api";
import {useDispatch, useSelector} from "react-redux";
import {Params, useParams} from "react-router-dom";
import {getValueFromParams} from "../../components/Assets/Assets";
import {setAssetByID, setAssetsHistoryById} from "../../redux/assets-reducer";
import {getAsset, getAssetsHistory, getIsFetchingAssetsPage} from "../../selectors/assets-selectors";
import Preloader from "../../components/common/Preloader/Preloader";
import {IntervalEnum} from "../../api/assets-api";
import classes from './Discription.module.css'
import ChartComponent from "../../components/ChartComponent/ChartComponent";
import {formatPercents, formatPrice} from "../../components/CoinElement/CoinElement";
import classNames from "classnames";

const Description: React.FC = (props) => {

    const dispatch = useDispatch()
    const params: Readonly<Params<string>> = useParams()
    const isFetching = useSelector(getIsFetchingAssetsPage)
    const asset: AssetsType = useSelector(getAsset)
    const assetHistory = useSelector(getAssetsHistory)

    const id: string = getValueFromParams(params.id as string)
    const [idFromParams, setIdFromParams] = useState<string>(id ? id : 'bitcoin')

    useEffect(() => {
        dispatch(setAssetByID(idFromParams))
        dispatch(setAssetsHistoryById(idFromParams, IntervalEnum.m5))
    }, [isFetching])

    if (isFetching) {
        return <Preloader/>
    }

    return <div className={classes.container}>
        <div className={classes.heading}>
            <div className={classes.titleWrap}>
                <div className={classes.rankWrap}>
                    <p className={classes.rank}>RANK #{asset.rank}</p>
                </div>
                <p className={classes.name}>{asset.name}</p>
                <span className={classes.symbolWrap}>
                <p className={classes.symbol}>{asset.symbol}</p>
            </span>
            </div>

            <div className={classes.priceDescriptionWrap}>
                <div className={classes.priceDescriptionWrap}>
                    <p className={classes.priceDescription}>
                        {asset.name} Price
                        <span className={classes.symbolDescription}>({asset.symbol})</span>
                    </p>
                </div>
                <div className={classes.titlePriceWrap}>
                    <p className={classes.price}>{formatPrice(+asset.priceUsd, 2)}</p>
                    <div className={classes.flexCenter}>
                        <div className={classes.percentsPer24hWrap}>
                            <p className={classes.percentsPer24hWrap}>{formatPercents(+asset.changePercent24Hr)}%</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={classes.chartWrap}>
                <ChartComponent assetHistory={assetHistory} id={id} isDisplayX={false} isDisplayY={false}/>
            </div>
        </div>

        <div className={classes.descriptionContainer}>
            <div className={classes.descriptionWrap}>
                <div className={classes.descriptionElement}>
                    <div className={classes.descriptionTitleWrap}>
                        Market Cap
                    </div>
                    <p className={classes.descriptionPrice}>{formatPrice(+asset.marketCapUsd)}</p>
                </div>
            </div>

            <div className={classes.descriptionWrap}>
                <div className={classes.descriptionElement}>
                    <div className={classes.descriptionTitleWrap}>
                        Volume <span className={classes.symbolWrap}>24h</span>
                    </div>
                    <p className={classes.descriptionPrice}>{formatPrice(+asset.volumeUsd24Hr)}</p>
                </div>
            </div>

            <div className={classes.descriptionWrap}>
                <div className={classes.descriptionElement}>
                    <div className={classes.descriptionTitleWrap}>
                        Circulating Supply
                    </div>
                    <p className={classes.descriptionPrice}>{formatPercents(+asset.supply)} {asset.symbol}</p>
                </div>
            </div>
        </div>

    </div>
}

export default Description