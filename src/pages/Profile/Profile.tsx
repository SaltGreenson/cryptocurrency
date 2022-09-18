import React, {useEffect} from "react";
import classes from './Profile.module.css'
import {initializeProfile, ProfileType} from "../../redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getInitializedProfile, getProfile} from "../../selectors/profile-selectors";
import Preloader from "../../components/common/Preloader/Preloader";
import PopUpCoinDescription from "../../components/PopUpCoinDescription/PopUpCoinDescription";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {formatPercents, formatPrice} from "../../components/CoinElement/CoinElement";

type PropsTypes = {}

const Profile: React.FC = ({}) => {

    const isInitialized = useSelector(getInitializedProfile)
    const profile = useSelector(getProfile)
    const dispatch = useDispatch()

    useEffect(() => {

        if (!isInitialized) {
            dispatch(initializeProfile())
        }

    }, [isInitialized])

    if (!isInitialized) {
        return <Preloader/>
    }

    return <div className={classes.container}>

        <div className={classes.balanceWrap}>
            <p className={classes.balanceText}>
                Balance:
            </p>
            <span className={classes.balance}>
                    {profile.balanceUsd > 0 ?
                        formatPrice(profile.balanceUsd) :
                        formatPrice(profile.initialBalance)}</span>
        </div>

        {!profile.portfolio.length ?
            <div className={classes.titleWrap}>
                <h1>Your portfolio is empty</h1>
                <h2><Link to='/coins/:page=1'>ADD CRYPTOCURRENCY</Link></h2>
            </div> :
            profile.portfolio.map(coin => <div key={coin.coin.id} className={classes.wrapDescription}>

                    <div  className={classes.descriptionWrap}>
                        <PopUpCoinDescription coin={coin.coin}
                                              setIsPopUpActive={() => {
                                              }}
                                              isAlreadyExistCoin={true}
                                              needRedirect={true}
                        />
                    </div>

                </div>
            )
        }
    </div>
}

export default Profile