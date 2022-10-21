import React from 'react'
import { css, cx } from '@emotion/css'

interface CardSectionProps {
  hasRightBorder: boolean
  hasTopBorder: boolean
  cardSectionContent: () => React.ReactNode
  screenWidth: number
}
const CardSection: React.FC<CardSectionProps> = ({
  cardSectionContent,
  hasRightBorder,
  hasTopBorder,
  screenWidth,
}: CardSectionProps) => {
  const getLeftRightPadding = (width: number): number => {
    if (width <= 900) {
      return 17
    } else if (width > 900 && width <= 1307) {
      return 17
    } else if (width > 1307 && width <= 1445) {
      return 17
    } else if (width > 1445 && width <= 1807) {
      return 20
    } else if (width > 1407) {
      return 30
    } else {
      // shouldn't reach
      return 30
    }
  }
  const getTopBottomPadding = (width: number): number => {
    if (width <= 900) {
      return 13
    } else if (width > 900 && width <= 1307) {
      return 12
    } else if (width > 1307 && width <= 1445) {
      return 12
    } else if (width > 1445 && width <= 1807) {
      return 12
    } else if (width > 1407) {
      return 20
    } else {
      // shouldn't reach
      return 20
    }
  }
  const leftRightPadding = getLeftRightPadding(screenWidth)
  const topBottomPadding = getTopBottomPadding(screenWidth)
  const cardSectionStyle = css({
    paddingTop: topBottomPadding,
    paddingBottom: topBottomPadding,
    paddingLeft: leftRightPadding,
    paddingRight: leftRightPadding,
  })

  const cardSectionRightBorderStyle = css({
    borderRightColor: '#252628',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
  })
  const cardSectionTopBorderStyle = css({
    borderTopColor: '#252628',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
  })
  return (
    <div
      className={cx(
        cardSectionStyle,
        hasRightBorder ? cardSectionRightBorderStyle : css({}),
        hasTopBorder ? cardSectionTopBorderStyle : css({})
      )}
    >
      {cardSectionContent()}
    </div>
  )
}

export default CardSection
