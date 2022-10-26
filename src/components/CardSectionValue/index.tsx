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
        display: 'flex',
        marginTop: 5,
        //height: fontSize + 10,
        width: '100%',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        //fontFamily: "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
        // fontFamily: "'Inter var', sans-serif",
        fontFamily: 'poppins, sans-serif',
      }}
    >
      {renderPrefix ? (
        <div
          className={css({
            paddingRight: 5,
            fontSize: fontSize - 10,
            lineHeight: `${fontSize - 10}px`,
            verticalAlign: 'text-top',
            alignSelf: 'start',
          })}
        >
          {renderPrefix()}
        </div>
      ) : null}
      {value ? (
        <div
          className={css({
            fontSize,
            lineHeight: `${fontSize}px`,
            paddingRight: postfix ? 10 : 0,
          })}
        >
          {value}
        </div>
      ) : null}
      {postfix ? (
        <div
          className={css({
            fontSize: fontSize - 5,
            lineHeight: `${fontSize - 5}px`,
            alignSelf: 'end',
          })}
        >
          {postfix}
        </div>
      ) : null}
    </div>
  )
}
const defaultProps = {
  // renderPrefix: () => null,
}
CardSectionValue.defaultProps = defaultProps

export default CardSectionValue
