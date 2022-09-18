import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import classes from './Header.module.css'
import {useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import {ProfileType} from "../../redux/profile-reducer";

type PropsTypes = {
    profile: ProfileType
}

const Header: React.FC<PropsTypes> = ({profile}) => {

    const calculatePercents = () => {
        const p = 100 - +profile.initialBalance / +profile.balanceUsd * 100
        return p
    }

    useEffect(() => {
        setPercents(calculatePercents)
    }, [profile])

    const [percents, setPercents] = useState<number>(calculatePercents())

    return <div className={classes.container}>
        <div className={classes.titleWrap}>
            <Link className={classes.title} to="/coins/:page=1">CØOINCAP</Link>
        </div>
        {profile.balanceUsd > 0 ?
            <div className={classes.balanceWrap}>
                <p className={classes.balanceText}>Balance: <span className={classes.balance}>{formatPrice(profile.balanceUsd)}</span></p>
                <div className={percents > 0 ? classes.increasedPercentsWrap : classes.reducedPercentsWrap}>
                    <p className={percents > 0 ? classes.increasedPercents : classes.reducedPercents}>{formatPercents(+percents)}%</p>
                </div>
            </div> : null
        }

    </div>
}

export default Header