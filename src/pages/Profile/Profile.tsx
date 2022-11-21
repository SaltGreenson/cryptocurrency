import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import classes from "./Profile.module.css";
import { initializeProfile } from "../../redux/profileReducer/actionCreators";
import {
  getInitializedProfile,
  getProfile,
} from "../../selectors/profile-selectors";
import Preloader from "../../components/common/Preloader/Preloader";
import { calculatePercents } from "../../components/Header/Header";
import percentsClasses from "../../components/Header/Header.module.css";
import ContainerPopUpCoinDescription from "../../components/PopUpCoinDescription/ContainerPopUpCoinDescription";
import {
  formatNumbersToPrettyStyle,
  formatNumberToPrice,
} from "../../components/utils/helpers/helpers";
import { useActions } from "../../components/utils/helpers/hooks";

type PropsTypes = {};

const Profile: React.FC<PropsTypes> = ({}) => {
  const isInitialized = useSelector(getInitializedProfile);
  const profile = useSelector(getProfile);
  const { initializeProfile } = useActions();

  useEffect(() => {
    setPercents(calculatePercents(profile));
  }, [profile]);

  const [percents, setPercents] = useState<number>(calculatePercents(profile));

  useEffect(() => {
    if (!isInitialized) {
      initializeProfile();
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.balanceWrap}>
        <p className={classes.balanceText}>Balance:</p>
        <span className={classes.balance}>
          {formatNumberToPrice(profile.residualBalance, 14)}
        </span>
      </div>

      {profile.portfolio.length ? (
        <div className={classes.cryptoBalanceWrap}>
          <p className={classes.cryptoBalanceText}>Cryptocurrencies:</p>
          <span className={classes.cryptoBalance}>
            {formatNumberToPrice(profile.balanceUsd, 15)}
          </span>

          <div
            className={classNames(
              percents === 0
                ? percentsClasses.neutralPercentsWrap
                : percents > 0
                ? percentsClasses.increasedPercentsWrap
                : percentsClasses.reducedPercentsWrap,
              classes.percents
            )}
          >
            <p
              className={
                percents === 0
                  ? percentsClasses.neutralPercents
                  : percents > 0
                  ? percentsClasses.increasedPercents
                  : percentsClasses.reducedPercents
              }
            >
              {formatNumbersToPrettyStyle(+percents)}%
            </p>
          </div>
        </div>
      ) : null}
      {!profile.portfolio.length ? (
        <div className={classes.titleWrap}>
          <h1>Your portfolio is empty</h1>
          <h2>
            <Link to="/coins/:page=1">ADD CRYPTOCURRENCY</Link>
          </h2>
        </div>
      ) : (
        profile.portfolio.map((coin) => (
          <div key={coin.coin.id} className={classes.wrapDescription}>
            <div className={classes.descriptionWrap}>
              <ContainerPopUpCoinDescription
                coin={coin.coin}
                setIsPopUpActive={() => {}}
                isAlreadyExistCoin
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
