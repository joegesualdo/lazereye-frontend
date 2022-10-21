import React from 'react'
import type { Story } from '@ladle/react'
import MarketDataSection from '.'

interface MarketDataSectionStoryProps {
  priceInCents: number
  marketCapInDollars: number
  satsPerDollar: number
}
export const MarketDataSectionStory: Story<MarketDataSectionStoryProps> = ({
  priceInCents,
  marketCapInDollars,
  satsPerDollar,
}: MarketDataSectionStoryProps) => (
  <MarketDataSection
    priceInCents={priceInCents}
    marketCapInDollars={marketCapInDollars}
    satsPerDollar={satsPerDollar}
  />
)
MarketDataSectionStory.storyName = 'MarketDataSection'
MarketDataSectionStory.args = {
  priceInCents: 19879,
  marketCapInDollars: 360000,
  satsPerDollar: 5248,
}

export default {
  title: 'MarketDataSection',
}
