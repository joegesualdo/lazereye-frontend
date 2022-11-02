import React from 'react'
import { useRef, useEffect, useState, useCallback } from 'react'

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

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

interface LazereyeChartProps {
  data: [{ x: number; y: number }]
  formatTitle: (title: string) => string
  formatBody: (body: string) => string
}
const LazereyeChart: React.FC<LazereyeChart> = ({
  data,
  formatTitle,
  formatBody,
}: LazereyeChartProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipData, setTooltipData] = useState(null)
  const [tooltipPos, setTooltipPos] = useState(null)

  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState(null)
  const customTooltip = useCallback((context) => {
    // const tooltipModel = context.tooltip

    console.log(context.tooltip.x)
    // if (context.tooltip.opacity == 0) {
    //   // hide tooltip visibilty
    //   setTooltipVisible(false)
    //   return
    // }

    const chart = chartRef.current
    const canvas = chart.canvas
    const canvasClientRect = canvas.getBoundingClientRect()
    //if (canvas) {
    // enable tooltip visibilty
    // setTooltipVisible(true)

    // set position of tooltip
    // const left = context.tooltip.x
    // const top = context.tooltip.y
    // context.tooltip.y = 0
    // context.tooltip.x = 0
    // tooltipModel.title = ['yo']

    // handle tooltip multiple rerender
    // if (tooltipPos?.top != top) {
    //   setTooltipPos({ top: 0, left: 0})
    //   setTooltipData(context.tooltip)
    // }
    // }
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip')

    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement('div')
      tooltipEl.id = 'chartjs-tooltip'
      tooltipEl.innerHTML = '<table></table>'
      document.body.appendChild(tooltipEl)
    }
    let toolTipBoundingRect = tooltipEl.getBoundingClientRect()

    // Hide if no tooltip
    const tooltipModel = context.tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0
      tooltipEl.style.backgroundColor = 'rgb(119, 126, 145, 1)'
      tooltipEl.style.padding = '2px'
      tooltipEl.style.borderRadius = '5px'
      tooltipEl.style.textAlign = 'center'
      return
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform')
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign)
    } else {
      tooltipEl.classList.add('no-transform')
    }

    function getBody(bodyItem) {
      return bodyItem.lines
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || []
      const bodyLines = tooltipModel.body.map(getBody)

      let innerHtml = '<thead>'

      titleLines.forEach(function (title, index) {
        console.log(title)
        const formattedTitle = formatTitle(title)
        innerHtml += `<tr><th class="${css({
          fontSize: 8,
          lineHeight: 1,
        })}">${formattedTitle}</th></tr>`
      })
      innerHtml += '</thead><tbody>'

      bodyLines.forEach(function (body, i) {
        const colors = tooltipModel.labelColors[i]
        const formattedBody = formatBody(body)
        const span = `<span class="${css({
          borderColor: colors.borderColor,
          borderWidth: 2,
          width: '100%',
          fontSize: 15,
          fontWeight: 800,
          lineHeight: 1,
        })}">${formattedBody}</span>`
        innerHtml += `<tr><td>${span}</td></tr>`
      })
      innerHtml += '</tbody>'

      let tableRoot = tooltipEl.querySelector('table')
      tableRoot.innerHTML = innerHtml
    }

    const position = context.chart.canvas.getBoundingClientRect()
    // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont)

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.left =
      position.left -
      toolTipBoundingRect.width / 2 +
      window.pageXOffset +
      tooltipModel.caretX +
      'px'
    // tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
    //tooltipEl.style.left = canvasPosition.left + 'px'
    //tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
    tooltipEl.style.top = canvasClientRect.top - 50 + 'px'
    // tooltipEl.style.font = bodyFont.string
    tooltipEl.style.padding =
      tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
    tooltipEl.style.pointerEvents = 'none'
  })
  const options = {
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
        enabled: false,
        external: customTooltip,
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

  useEffect(() => {
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
      plugins={[
        {
          afterDraw: (chart) => {
            // Add vertical line: https://stackoverflow.com/questions/72998998/how-to-make-vertical-line-when-hovering-cursor-chart-js
            if (chart.tooltip?._active?.length) {
              let x = chart.tooltip._active[0].element.x
              let yAxis = chart.scales.y
              let ctx = chart.ctx
              ctx.save()
              ctx.beginPath()
              ctx.setLineDash([5, 5])
              ctx.moveTo(x, yAxis.top)
              ctx.lineTo(x, yAxis.bottom)
              ctx.lineWidth = 1
              ctx.strokeStyle = 'rgb(171, 171, 172)'
              ctx.stroke()
              ctx.restore()
            }
          },
        },
      ]}
    />
  ) : null
}
LazereyeChart.defaultProps = {
  formatTitle: (title) => title,
  formatBody: (body) => body,
}
export default LazereyeChart
