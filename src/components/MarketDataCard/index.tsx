import React from 'react'
import { useRef, useLayoutEffect, useEffect, useState } from 'react'

import { css, cx } from '@emotion/css'
import Card from './../Card'
import CardSection from '../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import LazereyeChart from '../LazereyeChart'
import PercentChangeRow from '../PercentChangeRow'
interface MarketDataCardProps {
  priceInCents: number
  marketCapInDollars: number
  satsPerDollar: number
  screenWidth: number
}

const MarketDataCard: React.FC<MarketDataCardProps> = ({
  priceInCents,
  marketCapInDollars,
  satsPerDollar,
  screenWidth,
}: MarketDataCardProps) => {
  const leftSectionRef = useRef(null)

  const [leftSectionHeight, setHeight] = useState(0)

  useEffect(() => {
    setHeight(leftSectionRef.current.clientHeight)
  })
  return (
    <Card
      isGlowing={false}
      renderContent={() => (
        <div>
          <div
            className={css({
              display: 'flex',
            })}
          >
            <div
              className={css({
                width: '50%',
              })}
            >
              <div ref={leftSectionRef}>
                <CardSection
                  screenWidth={screenWidth}
                  hasRightBorder={true}
                  cardSectionContent={() => (
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <CardSectionTitle
                          title="Price"
                          screenWidth={screenWidth}
                        />
                        <CardSectionValue
                          value="19,879"
                          renderPrefix={() => '$'}
                          screenWidth={screenWidth}
                        />
                      </div>
                      <PercentChangeRow
                        screenWidth={screenWidth}
                        change={2}
                        text={'vs last 24 hours'}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div
              className={css({
                width: '50%',
                paddingTop: '0.5%',
                // This makes the graph the height of the section to the left of it
                height: leftSectionHeight,
              })}
            >
              <LazereyeChart />
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
            })}
          >
            <div
              className={css({
                width: '50%',
              })}
            >
              <CardSection
                screenWidth={screenWidth}
                hasTopBorder={true}
                hasRightBorder={true}
                cardSectionContent={() => (
                  <div
                    style={{
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <CardSectionTitle
                        title="Market Cap"
                        screenWidth={screenWidth}
                      />
                      <CardSectionValue
                        screenWidth={screenWidth}
                        value="365.62"
                        postfix="bn."
                        renderPrefix={() => '$'}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
            <div
              className={css({
                width: '50%',
              })}
            >
              <CardSection
                screenWidth={screenWidth}
                hasTopBorder={true}
                hasRightBorder={true}
                cardSectionContent={() => (
                  <div
                    style={{
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <CardSectionTitle
                        title="Sats Per Dollar"
                        screenWidth={screenWidth}
                      />
                      <CardSectionValue
                        value="5,248"
                        screenWidth={screenWidth}
                        renderPrefix={() => (
                          <i className="fak fa-satoshisymbol-solidtilt" />
                        )}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default MarketDataCard
