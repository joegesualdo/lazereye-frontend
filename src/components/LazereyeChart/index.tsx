import React from 'react'
import { useRef, useEffect, useState } from 'react'

import { css, cx } from '@emotion/css'
import { Chart, Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const options = {
  maintainAspectRatio: false,
  // How to hide points on chart
  elements: { point: { radius: 0, hitRadius: 0, hoverRadius: 0 } },
  // elements: { point: { style: 'line' }, pointStyle: 'line' },
  // Turn off animation, set to 0
  animation: {
    duration: 0,
  },
  pointStyle: function (context) {
    let index = context.dataIndex
    return 'line'
  },
  pointRadius: function (context) {
    let index = context.dataIndex
    return 0
  },
  scales: {
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
  plugins: {
    // Hide tooltip when leave area
    // afterEvent: (chart: any, evt: any, opts: any) => {
    //   console.log(evt.event)
    //   const { left, right, bottom, top } = chart.chartArea
    //   const e = evt.event
    //   const status = e.x >= left && e.x <= right && e.y <= bottom && e.y >= top
    //   if (status !== chart.options.plugins.tooltip.enabled) {
    //     chart.options.plugins.tooltip.enabled = status
    //     chart.update()
    //   }
    // },
    // Makes it so tooltip shows up only on x axis when hovering anywhere on the chart
    tooltip: {
      mode: 'index',
      intersect: false,
    },
    hover: { mode: null },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

interface LazereyeChartProps {
  data: [{ x: number; y: number }]
}
const LazereyeChart: React.FC<LazereyeChart> = ({
  data,
}: LazereyeChartProps) => {
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    console.log('chart updated!!')
    console.log(data.length)
    console.log('data length: ' + data.length)
    const chart = chartRef.current
    setChartData({
      labels: [],
      datasets: [
        {
          // data: data.map(() => faker.datatype.number({ min: 0, max: 19000 })),
          data: [],
          borderColor: '#14F195',
          borderWidth: 1,
          lineTension: 0.3,
          fill: {
            target: 'origin',
            above: gradient,
            below: 'rgb(0, 0, 255)', // And blue below the origin
          },
          // ...
        },
      ],
    })

    if (!chart) {
      return
    }
    var ctx = chart.ctx

    var gradient = ctx.createLinearGradient(0, 0, 0, 300)
    //red
    //gradient.addColorStop(0, 'rgba(255, 45, 85, 1)')
    //green
    gradient.addColorStop(0, 'rgba(20, 241, 149, 1)')
    gradient.addColorStop(1, 'rgba(53, 54, 58,0)')
    if (data.length > 0) {
      setChartData({
        labels: data.map((d) => String(d.x)),
        datasets: [
          {
            // data: data.map(() => faker.datatype.number({ min: 0, max: 19000 })),
            data: data.map((d) => d.y),
            borderColor: '#14F195',
            borderWidth: 1,
            lineTension: 0.3,
            fill: {
              target: 'origin',
              above: gradient,
              below: 'rgb(0, 0, 255)', // And blue below the origin
            },
            // ...
          },
        ],
      })
    }
  }, [data])
  return chartData ? (
    <Line
      height="100% !important"
      width="auto !important"
      ref={chartRef}
      options={options}
      data={chartData}
    />
  ) : null
}
export default LazereyeChart
