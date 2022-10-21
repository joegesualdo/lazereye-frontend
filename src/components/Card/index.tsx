import React from 'react'
import { css, cx } from '@emotion/css'

const glowStyles = css`
  animation: glow 1s infinite alternate;
  @keyframes glow {
    from {
      box-shadow: 0 0 10px -5px #ff2d55;
    }
    to {
      box-shadow: 0 0 10px 5px #ff2d55;
    }
  }
`

interface CardProps {
  isGlowing: boolean
  renderContent: () => React.ReactNode
}

const Card: React.FC<CardProps> = ({ isGlowing, renderContent }: CardProps) => (
  <div
    className={cx(
      css({
        width: '100%',
        backgroundColor: '#35363A',
        borderRadius: 20,
        boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
      }),
      isGlowing ? glowStyles : css({}),
    )}
  >
    {renderContent()}
  </div>
)

export default Card
