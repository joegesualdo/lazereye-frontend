import React from 'react'
import type { Story } from '@ladle/react'
import Dashboard from '.'

interface DashboardStoryProps {}
export const DashboardStory: Story<
  DashboardStoryProps
> = ({}: DashboardStoryProps) => (
  <Dashboard
    priceInCents={1000}
    marketCapInDollars={10000}
    satsPerDollar={2000}
  />
)
DashboardStory.storyName = 'Dashboard'
DashboardStory.args = {}

export default {
  title: 'Dashboard',
}
