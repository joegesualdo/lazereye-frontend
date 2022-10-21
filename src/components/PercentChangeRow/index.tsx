import React from 'react'
import { css, cx } from '@emotion/css'

interface PercentChangeRowProps {
  change: number
  text: string
  screenWidth: number
}

const PercentChangeRow: React.FC<PercentChangeRowProps> = ({
  change,
  text,
  screenWidth,
}: PercentChangeRowProps) => {
  const getFontSize = (width: number): number => {
    if (width <= 500) {
      return 10
    } else if (width > 500 && width <= 600) {
      return 13
    } else if (width > 600 && width <= 900) {
      return 13
    } else if (width > 900 && width <= 1307) {
      return 13
    } else if (width > 1307 && width <= 1562) {
      return 13
    } else if (width > 1562 && width <= 1700) {
      return 13
    } else if (width > 1700) {
      return 13
    } else {
      // shouldn't reach
      return 13
    }
  }
  const fontSize = getFontSize(screenWidth)
  return (
    <div
      className={css({
        marginTop: 7,
        display: 'flex',
        alignItems: 'end',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#2C2D30',
          color: '#14F195',
          borderRadius: 50,
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 12,
          paddingRight: 12,
        })}
      >
        <span className={css({ paddingRight: 5 })}>
          <div className={css({ width: fontSize - 2, marginTop: -4 })}>
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.13583 2.77175L1.148 9.75959L0 8.6116L6.98703 1.62376H0.828928V0H9.75959V8.93066H8.13583V2.77175Z"
                fill="#14F195"
              />
            </svg>
          </div>
        </span>
        <span
          className={css({
            fontSize: fontSize,
            fontWeight: 500,
            fontFamily: 'poppins',
          })}
        >
          {change}%
        </span>
      </div>
      <div
        className={css({
          color: '#BDC4DC',
          fontSize: fontSize,
          fontWeight: 100,
          fontFamily: 'poppins',
          paddingLeft: 5,
        })}
      >
        {text}
      </div>
    </div>
  )
}

export default PercentChangeRow
