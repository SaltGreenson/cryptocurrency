import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import classes from './Header.module.css'
import {useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import {ProfileType} from "../../redux/profile-reducer";
import classNames from "classnames";

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
        {profile.initialBalance > 0

            ?

            <div className={classes.balanceWrap}>

                <Link to='/profile' className={classes.balanceText}>
                    Balance:
                    <span className={classNames(classes.balance,

                        profile.balanceUsd > 0
                            ?
                            classes.dontShowBalance
                            : null

                    )}> {profile.balanceUsd > 0 ?
                        formatPrice(profile.balanceUsd) :
                        formatPrice(profile.initialBalance)}</span>
                </Link>

                {profile.balanceUsd > 0

                    ?

                    <div className={percents > 0 ? classes.increasedPercentsWrap : classes.reducedPercentsWrap}>
                        <Link to='/profile' className={percents > 0 ?
                            classes.increasedPercents :
                            classes.reducedPercents}>{formatPercents(+percents)}%</Link>
                    </div>

                    : null
                }

            </div>

            :

            <div className={classes.portfolioWrap}>
                <Link to='/profile'>
                    <p className={classes.portfolio}>Portfolio</p>
                </Link>
            </div>
        }

    </div>
}

export default Header