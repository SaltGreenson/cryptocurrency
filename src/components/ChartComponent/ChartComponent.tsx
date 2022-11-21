import React, {useEffect} from 'react';
import Chart from 'chart.js/auto';
import {LinearScale, LineController, LineElement, PointElement, Title,} from 'chart.js';
import classes from './ChartComponent.module.css';
import {AssetsHistoryType} from '../../api/types-api';

export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}).format(date);

interface PropsTypes {
    assetHistory: Array<AssetsHistoryType>,
    id: string,
    borderColor?: '#4fc180' | string,
    borderWidth?: 1 | number
    isDisplayX: boolean,
    isDisplayY: boolean
}

const ChartComponent: React.FC<PropsTypes> = ({
  assetHistory,
  id,
  borderWidth,
  isDisplayX,
  isDisplayY,
  borderColor = '#4fc180',
}) => {
  useEffect(() => {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

    const chartExist = Chart.getChart(id);

    if (chartExist !== undefined) {
      chartExist.destroy();
    }

    new Chart(id, {
      type: 'line',
      data: {
        labels: assetHistory.map((a) => formatDate(a.time)),
        datasets: [
          {
            label: 'Price',
            data: assetHistory.map((a) => a.priceUsd),
            borderColor,
            borderWidth,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: isDisplayX,
            grid: {
              display: false,
            },
          },
          y: {
            display: isDisplayY,
            grid: {
              display: true,
            },
          },
        },
        elements: {
          point: {
            radius: 1,
            pointStyle: 'line',
            rotation: 100,
            hitRadius: 4,
            borderWidth: 0,
            hoverRadius: 10,
            hoverBorderWidth: 5,
          },
          line: {
            tension: 0,
            borderWidth: 2,
            borderColor: '#4fc180',
            borderDashOffset: 0,
          },
        },
      },
    });
  }, []);

  return (
    <div className={classes.chartWrap}>
      <canvas id={id} />
    </div>
  );
};

export default ChartComponent;
