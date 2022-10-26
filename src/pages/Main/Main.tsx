import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getLastRank, getLimit } from '../../selectors/app-selectors';
import { Assets } from '../../components/Assets/Assets';
import classes from './Main.module.css';
import Card from '../../components/Card/Card';
import { getIsFetchingAssetsPage, getTop3Assets } from '../../selectors/assets-selectors';
import Paginator from '../../components/Paginator/Paginator';
import { setAppCurrentPage } from '../../redux/app-reducer';
import { setAssets } from '../../redux/assets-reducer';
import LittlePreloader from '../../components/common/LittlePreloader/LittlePreloader';
import {useThunkDispatch} from "../../components/utils/helpers/hooks";

const MainPage: React.FC = (props) => {
  const top3Assets = useSelector(getTop3Assets);
  const lastRank = useSelector(getLastRank);
  const limit = useSelector(getLimit);
  const currentPage = useSelector(getCurrentPage);
  const isFetching = useSelector(getIsFetchingAssetsPage);

  const dispatch = useDispatch();

  const onPageChanged = (page: number) => {
    // @ts-ignore
      dispatch(setAppCurrentPage(page));
    // @ts-ignore
      dispatch(setAssets((page) * limit - limit, limit));
  };

  return (
    <>
      {isFetching ? <LittlePreloader /> : (
        <div className={classes.heading}>
          {top3Assets.data.map((coin) => <Card key={coin.id} coinData={coin.data} coinHistory={coin.history} />)}
        </div>
      )}
      <Paginator
        totalItemsCount={lastRank}
        currentPage={currentPage}
        pageSize={limit}
        onPageChanged={onPageChanged}
      />
      <Assets />
      <Paginator
        totalItemsCount={lastRank}
        currentPage={currentPage}
        pageSize={limit}
        onPageChanged={onPageChanged}
      />
    </>
  );
};

export default MainPage;
