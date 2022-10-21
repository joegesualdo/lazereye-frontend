import React from 'react'
import type { Story } from '@ladle/react'
import MarketDataCard from '.'

interface MarketDataCardStoryProps {}
export const MarketDataCardStory: Story<
  MarketDataCardStoryProps
> = ({}: MarketDataCardStoryProps) => (
  <MarketDataCard
    priceInCents={1000}
    marketCapInDollars={10000}
    satsPerDollar={2000}
  />
)
MarketDataCardStory.storyName = 'MarketDataCardName--woowee'
MarketDataCardStory.args = {}

export default {
  title: 'MarketDataCard',
  appendToHead: '<style>.ladle-main {background: pink}</style>',
}
