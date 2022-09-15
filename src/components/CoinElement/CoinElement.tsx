import React, {useEffect, useState} from "react";
import {AssetsType} from "../../api/types-api";
import classes from './CoinElement.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAssetsByID} from "../../redux/assets-reducer";
import classNames from "classnames";

export const formatPrice = (value: number, fraction:number = 2) => {
    if (value < 0.1 && value > 0){
        fraction = 5
    }
    return new Intl.NumberFormat('USD', {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: fraction,
    }).format(+value)
}

export const formatPercents = (value: number) => {
    return new Intl.NumberFormat('USD', {
        maximumFractionDigits: 2,
        style: 'decimal'
    }).format(value)
}

type PropsTypes = {
    setPopUpActive: (coin: AssetsType) => void,
    coin: AssetsType,
    favourite: Array<AssetsType>,
    setFavourite: (coin: Array<AssetsType>) => void
}

export const CoinElement: React.FC<PropsTypes> = ({coin,
                                                      favourite,
                                                      setFavourite,
                                                      setPopUpActive}) => {

    const dispatch = useDispatch()
    const [currentFavouriteClass, setCurrentFavouriteClass] = useState<string>(classes.favourite)


    const onClick = (id: string) => {
        dispatch(setAssetsByID(id))
    }


    const addFavourite = (coin: AssetsType):boolean => {
        let was = false
        setPopUpActive(coin)

        // if (alreadyInFavourite(coin.id)){
        //     setFavourite(favourite.filter(j => j.id !== coin.id))
        //     was = true
        //     setCurrentFavouriteClass(classes.favourite)
        // } else {
        //     setFavourite([...favourite, coin])
        //     setCurrentFavouriteClass(classes.alreadyFavourite)
        // }
        return was
    }

    const alreadyInFavourite = (coinId: string) => {
        return favourite? favourite.some(f => f.id === coinId) : false
    }

    useEffect(() => {
        if (alreadyInFavourite(coin.id)){
            setCurrentFavouriteClass(classes.alreadyFavourite)
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('myCoins', JSON.stringify(favourite))
    }, [favourite])




    return <tr>
        <td>
            <p className={classes.number}>{coin.rank}</p>
            <span className={classes.hidden}>{coin.id}</span>
        </td>
        <td>
            <p className={currentFavouriteClass} onClick={() => addFavourite(coin)}>&#10017;</p>
        </td>
        <td>
            <div className={classes.titleWrap} onClick={(e) => {onClick(coin.id)}}>
                <Link to={`/:id=${coin.id}`} className={classes.title}>{coin.name}</Link>
                <Link to={`/:id=${coin.id}`} className={classes.symbol}>{coin.symbol}</Link>
            </div>
        </td>
        <td>
            <p className={classes.number}>{formatPrice(+coin.priceUsd)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatPercents(+coin.changePercent24Hr)}</p>
        </td>
        <td>
            <p className={classNames(classes.number, classes.marketCap)}>{formatPrice(+coin.marketCapUsd)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatPrice(+coin.volumeUsd24Hr)}</p>
        </td>
    </tr>
}