import React from 'react'
import { css, cx } from '@emotion/css'
import SectionHeader from '../SectionHeader'
import MarketDataCard from '../MarketDataCard'
import Logo from '../Logo'

interface MarketDataSectionProps {
  priceInCents: number
  marketCapInDollars: number
  satsPerDollar: number
  screenWidth: number
}
const MarketDataSection: React.FC<MarketDataSectionProps> = ({
  priceInCents,
  marketCapInDollars,
  satsPerDollar,
  screenWidth,
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
      satsPerDollar={satsPerDollar}
    />
  </div>
)

export default MarketDataSection
