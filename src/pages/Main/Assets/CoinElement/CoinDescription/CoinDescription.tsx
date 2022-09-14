import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getIsFetching} from "../../../../../selectors/app-selectors";
import Preloader from "../../../../../components/common/Preloader/Preloader";
import {getAsset, getAssetsHistory} from "../../../../../selectors/assets-selectors";
import Chart from 'chart.js/auto';
import classes from './CoinDescription.module.css'
import {LinearScale, LineController, LineElement, PointElement, Title} from 'chart.js'
import {Params, useParams} from "react-router-dom";
import {getValueFromParams} from "../../Assets";
import {setAssetsByID, setAssetsHistoryById} from "../../../../../redux/assets-reducer";
import {IntervalEnum} from "../../../../../api/assets-api";

const CoinDescription: React.FC = (props) => {


    const isFetching = useSelector(getIsFetching)
    const asset = useSelector(getAsset)
    const params: Readonly<Params<string>> = useParams()
    const id:string = getValueFromParams(params.id as string)
    const dispatch = useDispatch()
    const assetHistory = useSelector(getAssetsHistory)

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date)
    }

    useEffect(() => {

        if (asset.id !== id) {
            dispatch(setAssetsByID(id))
            dispatch(setAssetsHistoryById(id, IntervalEnum.m5))
        }

    }, [id])

    useEffect(() => {
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

        const chartExist = Chart.getChart('chart')

        if (chartExist !== undefined) {
            chartExist.destroy()
        }

        new Chart('chart', {
            type: "line",
            data: {
                labels: assetHistory.map(a => formatDate(a.time)),
                datasets: [
                    {
                        label: "Price",
                        data: assetHistory.map(a => a.priceUsd),
                        borderColor: 'white',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            display: true
                        },
                    }
                },
                elements: {

                    point: {
                        radius: 1,
                        pointStyle: 'line',
                        rotation: 100,
                        hitRadius: 4,
                        borderWidth: 0,
                        hoverRadius: 10,
                        hoverBorderWidth: 5
                    },
                    line: {
                        tension: 0,
                        borderWidth: 2,
                        borderColor: '#4fc180',
                        borderDashOffset: 0
                    }
                }
            }
        })
    })


    if (isFetching) {
        return <Preloader/>
    }


    return <div>
        {asset.name}
        <div className={classes.chartContainer}>
            <canvas id='chart'></canvas>
        </div>
    </div>
}

export default CoinDescription