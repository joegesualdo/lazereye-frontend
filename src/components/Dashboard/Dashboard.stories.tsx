import React from 'react'
import type { Story } from '@ladle/react'
import Dashboard from '.'

interface DashboardStoryProps {
  blockheight: number
  subsidyInSatsForCurrentBlock: number
  priceInCents: number
  totalMoneySupply: number
  timeOfLastBlock: number
  totalTransactionsCount: number
  tps30Day: number
  difficulty: number
  currentDifficultyEpoch: number
  blocksUntilRetarget: number
  estimatedSecondsUntilRetarget: number
  estimatedHashRateForLast2016Blocks: number
}
export const DashboardStory: Story<DashboardStoryProps> = ({
  blockheight,
  subsidyInSatsForCurrentBlock,
  priceInCents,
  totalMoneySupply,
  timeOfLastBlock,
  totalTransactionsCount,
  tps30Day,
  difficulty,
  currentDifficultyEpoch,
  blocksUntilRetarget,
  estimatedSecondsUntilRetarget,
  estimatedHashRateForLast2016Blocks,
}: DashboardStoryProps) => (
  <Dashboard
    blockheight={blockheight}
    subsidyInSatsForCurrentBlock={subsidyInSatsForCurrentBlock}
    priceInCents={priceInCents}
    totalMoneySupply={totalMoneySupply}
    timeOfLastBlock={timeOfLastBlock}
    totalTransactionsCount={totalTransactionsCount}
    tps30Day={tps30Day}
    difficulty={difficulty}
    currentDifficultyEpoch={currentDifficultyEpoch}
    blocksUntilRetarget={blocksUntilRetarget}
    estimatedSecondsUntilRetarget={estimatedSecondsUntilRetarget}
    estimatedHashRateForLast2016Blocks={estimatedHashRateForLast2016Blocks}
  />
)
DashboardStory.storyName = 'Dashboard'
DashboardStory.args = {
  blockheight: 700000,
  subsidyInSatsForCurrentBlock: 625000000,
  priceInCents: 1200000,
  totalMoneySupply: 18000000,
  timeOfLastBlock: 348392929833,
  totalTransactionsCount: 7000000,
  tps30Day: 4.78,
  difficulty: 7388383838383,
  currentDifficultyEpoch: 344,
  blocksUntilRetarget: 22,
  estimatedSecondsUntilRetarget: 30000000,
  estimatedHashRateForLast2016Blocks: 393939393,
}

export default {
  title: 'Dashboard',
}
