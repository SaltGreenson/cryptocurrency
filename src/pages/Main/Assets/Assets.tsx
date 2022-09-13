import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAssets} from "../../../selectors/assets-selectors";
import {CoinElement} from "./CoinElement/CoinElement";
import classes from './Assets.module.css'
import Paginator from "../../../components/Paginator/Paginator";
import {getCurrentPage, getIsFetching, getLastRank, getLimit} from "../../../selectors/app-selectors";
import {setAssets} from "../../../redux/assets-reducer";
import {Params, useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {setAppCurrentPage} from "../../../redux/app-reducer";

export const getValueFromParams = (params: string) => {
    return params.split('=')[1]
}

export const Assets: React.FC = (props) => {

    const assets = useSelector(getAssets)
    const lastRank = useSelector(getLastRank)
    const limit = useSelector(getLimit)
    const currentPage = useSelector(getCurrentPage)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params: Readonly<Params<string>> = useParams()
    const page:number = +getValueFromParams(params.page as string)

    useEffect(() => {
        if (page && page === +page) {
            if (page !== currentPage) {
                dispatch(setAppCurrentPage(page))
                dispatch(setAssets(page * limit - limit, limit))
            }
        }
    }, [page])


    const onPageChanged = (page: number) => {
        navigate(`/coins/:page=${page}`)
        dispatch(setAppCurrentPage(page))
        dispatch(setAssets((page) * limit - limit, limit))
    }


    return <div className={classes.container}>
        <Paginator totalItemsCount={lastRank} currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged}/>
        <div className={classes.wrap}>
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
                <tbody>
                {assets.map((coin) => <CoinElement key={coin.id} coin={coin}/>)}
                </tbody>
            </table>
        </div>
        <Paginator totalItemsCount={lastRank} currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged}/>

    </div>
}