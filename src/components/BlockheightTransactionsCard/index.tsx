import React from 'react'
import { css, cx } from '@emotion/css'

import Card from './../Card'
import BlockheightTransactionsCardSectionContent from './BlockheightTransactionsCardSectionContent'

interface BlockheightTransactionsCardProps {
  blockheight: number
  transactionsCount: number
  screenWidth: number
}

const BlockheightTransactionsCard: React.FC<
  BlockheightTransactionsCardProps
> = ({
  blockheight,
  transactionsCount,
  screenWidth,
}: BlockheightTransactionsCardProps) => (
  <Card
    isGlowing={true}
    renderContent={() => (
      <BlockheightTransactionsCardSectionContent
        screenWidth={screenWidth}
        blockheight={blockheight}
        transactionsCount={transactionsCount}
      />
    )}
  />
)

export default BlockheightTransactionsCard
