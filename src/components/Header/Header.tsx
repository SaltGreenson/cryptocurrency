import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import classes from './Header.module.css'
import {useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {ProfileType} from "../../redux/profile-reducer";
import classNames from "classnames";
import MenuBurger, {ElementMenuBurgerType} from "../common/MenuBurger/MenuBurger";
import {formatNumbersToPrettyStyle, formatNumberToPrice} from "../utils/helpers/helpers";

type PropsTypes = {
    profile: ProfileType
}


export const calculatePercents = ({initialBalance, balanceUsd}:any) => {
    const p = 100 - +initialBalance / +balanceUsd * 100

    return !!p ? p : 0
}

const Header: React.FC<PropsTypes> = ({profile}) => {

    const burgerElements: Array<ElementMenuBurgerType> = [
        {
            elementTitle: 'Cryptocurrency',
            elementLink: '/coins/:page=1'
        },
        {
            elementTitle: 'Portfolio',
            elementLink: '/profile'
        },
        {
            elementTitle: 'Withdraw',
            elementLink: '/withdraw'
        }
    ]

    useEffect(() => {
        setPercents(calculatePercents(profile))
    }, [profile])

    const [percents, setPercents] = useState<number>(calculatePercents(profile))

    return <div className={classes.container}>

        <div className={classes.titleWrap}>
            <Link className={classes.title} to="/coins/:page=1">CØOINCAP</Link>
        </div>

        <div className={classes.burgerWrap}>
            <MenuBurger elements={burgerElements}>
                <div className={classes.balanceWrap}>

                    <p className={classes.balanceText}>Balance:</p>

                    <div className={percents === 0 ?
                        classes.neutralPercentsWrap :

                        percents > 0 ?
                            classes.increasedPercentsWrap :
                            classes.reducedPercentsWrap}>
                        <p className={percents === 0 ?
                            classes.neutralPercents :

                            percents > 0 ?
                                classes.increasedPercents :
                                classes.reducedPercents}>{formatNumbersToPrettyStyle(+percents)}%</p>
                    </div>

                </div>
            </MenuBurger>
        </div>
    </div>
}

export default Header