import React from 'react'
import { css, cx } from '@emotion/css'
import { Bars } from 'react-loader-spinner'

interface LoadingAnimationProps {}
const LoadingAnimation: React.FC<
  CardSectionProps
> = ({}: LoadingAnimationProps) => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
      })}
    >
      <Bars
        height="20"
        width="20"
        color="rgb(255, 45, 85)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={css({
          height: 20,
          alignSelf: 'center',
        })}
        visible={true}
      />
    </div>
  )
}

export default LoadingAnimation
