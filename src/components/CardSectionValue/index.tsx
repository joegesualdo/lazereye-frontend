import React from 'react'
import { css, cx } from '@emotion/css'
import CardSection from '../CardSection'

interface CardSectionValueProps {
  value: string
  postfix: string
  prefix: string
  renderPrefix: () => React.ReactNode
  screenWidth: number
}

const CardSectionValue: React.FC<CardSectionValueProps> = ({
  value,
  postfix,
  prefix,
  renderPrefix,
  screenWidth,
}: CardSectionValueProps) => {
  const getFontSize = (width: number): number => {
    if (width <= 500) {
      return 25
    } else if (width > 500 && width <= 600) {
      return 35
    } else if (width > 600 && width <= 900) {
      return 40
    } else if (width > 900 && width <= 1307) {
      return 30
    } else if (width > 1307 && width <= 1562) {
      return 30
    } else if (width > 1562 && width <= 1700) {
      return 35
    } else if (width > 1700) {
      return 40
    } else {
      // shouldn't reach
      return 30
    }
  }
  const fontSize = getFontSize(screenWidth)
  return (
    <div
      style={{
        marginTop: 0,
        height: fontSize + 10,
        width: '100%',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: fontSize,
        //fontFamily: "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
        // fontFamily: "'Inter var', sans-serif",
        fontFamily: 'poppins, sans-serif',
      }}
    >
      <span
        className={css({
          paddingRight: 5,
          fontSize: fontSize - 10,
          verticalAlign: 'text-top',
        })}
      >
        {renderPrefix()}
      </span>
      {value}
      <span className={css({ paddingLeft: 10, fontSize: fontSize - 5 })}>
        {postfix}
      </span>
    </div>
  )
}
const defaultProps = {
  renderPrefix: () => {},
}
CardSectionValue.defaultProps = defaultProps

export default CardSectionValue
