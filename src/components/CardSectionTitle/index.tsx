import React from 'react'
import { css, cx } from '@emotion/css'

interface CardSectionTitleProps {
  title: string
  screenWidth: number
}

const CardSectionTitle: React.FC<CardSectionTitleProps> = ({
  title,
  screenWidth,
}: CardSectionTitleProps) => {
  const getFontSize = (width: number): number => {
    if (width <= 600) {
      return 10
    } else if (width > 600 && width <= 900) {
      return 15
    } else if (width > 900 && width <= 1307) {
      return 13
    } else if (width > 1307 && width <= 1562) {
      return 12
    } else if (width > 1562 && width <= 1700) {
      return 15
    } else if (width > 1700) {
      return 15
    } else {
      // shouldn't reach
      return 15
    }
  }
  const fontSize = getFontSize(screenWidth)
  return (
    <div
      style={{
        width: '100%',
        color: '#ABABAC',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: fontSize,
        fontFamily:
          "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
      }}
    >
      {title}
    </div>
  )
}

export default CardSectionTitle
