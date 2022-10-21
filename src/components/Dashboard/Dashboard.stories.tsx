import React from 'react'
import type { Story } from '@ladle/react'
import Dashboard from '.'

interface DashboardStoryProps {
  blockheight: number
  subsidyInSatsForCurrentBlock: number
  priceInCents: number
}
export const DashboardStory: Story<DashboardStoryProps> = ({
  blockheight,
  subsidyInSatsForCurrentBlock,
  priceInCents,
}: DashboardStoryProps) => (
  <Dashboard
    blockheight={blockheight}
    subsidyInSatsForCurrentBlock={subsidyInSatsForCurrentBlock}
    priceInCents={priceInCents}
    marketCapInDollars={10000}
    satsPerDollar={2000}
  />
)
DashboardStory.storyName = 'Dashboard'
DashboardStory.args = {
  blockheight: 700000,
  subsidyInSatsForCurrentBlock: 625000000,
  priceInCents: 1200000,
}

export default {
  title: 'Dashboard',
}
