import React from 'react'
import type { Story } from '@ladle/react'
import BlockheightTransactionsCard from '.'

interface BlockheightTransactionsCardStoryProps {
  blockheight: number
  transactionsCount: number
}
export const BlockheightTransactionsCardStory: Story<
  BlockheightTransactionsCardStoryProps
> = ({
  blockheight,
  transactionsCount,
}: BlockheightTransactionsCardStoryProps) => (
  <BlockheightTransactionsCard
    blockheight={blockheight}
    transactionsCount={transactionsCount}
  />
)
BlockheightTransactionsCardStory.args = {
  blockheight: 758348,
  transactionsCount: 10000,
}
