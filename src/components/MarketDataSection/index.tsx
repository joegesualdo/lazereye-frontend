import React from 'react'
import { css, cx } from '@emotion/css'
import SectionHeader from '../SectionHeader'
import MarketDataCard from '../MarketDataCard'
import Logo from '../Logo'

interface MarketDataSectionProps {
  priceInCents: number
  marketCapInDollars: number
  screenWidth: number
  pricesLast24Hours: {
    t: number
    p: number
  }
}
const MarketDataSection: React.FC<MarketDataSectionProps> = ({
  priceInCents,
  marketCapInDollars,
  screenWidth,
  pricesLast24Hours,
}: MarketDataSectionProps) => (
  <div
    className={css({
      marginBottom: 20,
    })}
  >
    <SectionHeader emoji="📈" title="Market Data" />
    <MarketDataCard
      screenWidth={screenWidth}
      priceInCents={priceInCents}
      marketCapInDollars={marketCapInDollars}
      pricesLast24Hours={pricesLast24Hours}
    />
  </div>
)

export default MarketDataSection
