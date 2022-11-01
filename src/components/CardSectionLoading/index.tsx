import React from 'react'
import { css, cx } from '@emotion/css'
import { Bars } from 'react-loader-spinner'
import LoadingAnimation from '../LoadingAnimation'

interface CardSectionLoadingProps {}
const CardSectionLoading: React.FC<
  CardSectionProps
> = ({}: CardSectionLoadingProps) => {
  const getHeight = (width: number): number => {
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
  return (
    <div
      className={css({
        width: '100%',
        height: 40,
      })}
    >
      <LoadingAnimation />
    </div>
  )
}

export default CardSectionLoading
