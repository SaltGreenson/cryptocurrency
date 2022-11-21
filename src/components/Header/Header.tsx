import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { ProfileType } from '../../redux/profileReducer/profileReducer';
import MenuBurger, { ElementMenuBurgerType } from '../common/MenuBurger/MenuBurger';
import { formatNumbersToPrettyStyle } from '../utils/helpers/helpers';

type PropsTypes = {
    profile: ProfileType
}

export const calculatePercents = ({ initialBalance, balanceUsd }: any) => {
  const p = 100 - +initialBalance / +balanceUsd * 100;

  return p || 0;
};

const Header: React.FC<PropsTypes> = ({ profile }) => {
  const burgerElements: Array<ElementMenuBurgerType> = [
    {
      elementTitle: 'Cryptocurrency',
      elementLink: '/coins/:page=1',
    },
    {
      elementTitle: 'Portfolio',
      elementLink: '/profile',
    },
    {
      elementTitle: 'Withdraw',
      elementLink: '/withdraw',
    },
  ];

  useEffect(() => {
    setPercents(calculatePercents(profile));
  }, [profile]);

  const [percents, setPercents] = useState<number>(calculatePercents(profile));

  return (
    <div className={classes.container}>

      <div className={classes.titleWrap}>
        <h1>
          <Link className={classes.title} to="/coins/:page=1" data-cy="headerLogo">
            CØOINCAP
          </Link>
        </h1>
      </div>

      <div className={classes.burgerWrap}>
        <MenuBurger elements={burgerElements}>
          <div className={classes.balanceWrap}>

            <p className={classes.balanceText}>Balance:</p>

            <div className={percents === 0
              ? classes.neutralPercentsWrap

              : percents > 0
                ? classes.increasedPercentsWrap
                : classes.reducedPercentsWrap}
            >
              <p className={percents === 0
                ? classes.neutralPercents

                : percents > 0
                  ? classes.increasedPercents
                  : classes.reducedPercents}
              >
                {formatNumbersToPrettyStyle(+percents)}
                %
              </p>
            </div>

          </div>
        </MenuBurger>
      </div>
    </div>
  );
};

export default Header;
