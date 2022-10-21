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
  // Turn off animation, set to 0
  animation: {
    duration: 0,
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
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const labels = Array.from('x'.repeat(15))

interface LazereyeChartProps {}
const LazereyeChart: React.FC<LazereyeChart> = ({}: LazereyeChartProps) => {
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  useEffect(() => {
    const chart = chartRef.current

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
    setChartData({
      labels,
      datasets: [
        {
          data: labels.map(() => faker.datatype.number({ min: 0, max: 19000 })),
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
  }, [])
  return (
    <Line
      height="100% !important"
      width="auto !important"
      ref={chartRef}
      options={options}
      data={chartData}
    />
  )
}
export default LazereyeChart
