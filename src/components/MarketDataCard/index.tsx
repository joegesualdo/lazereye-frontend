import React from 'react'
import { useRef, useLayoutEffect, useEffect, useState } from 'react'

import { css, cx } from '@emotion/css'
import Card from './../Card'
import CardSection from '../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import LazereyeChart from '../LazereyeChart'
import PercentChangeRow from '../PercentChangeRow'
import { Bars, Oval } from 'react-loader-spinner'
import CardSectionLoading from '../CardSectionLoading'
import LoadingAnimation from '../LoadingAnimation'
interface MarketDataCardProps {
  priceInCents: number
  marketCapInDollars: number
  isMarketCapInDollarsLoading: boolean
  satsPerDollar: number
  screenWidth: number
  pricesLast24Hours: {
    t: number
    p: number
  }
}

const MarketDataCard: React.FC<MarketDataCardProps> = ({
  priceInCents,
  marketCapInDollars,
  satsPerDollar,
  screenWidth,
  pricesLast24Hours,
  isMarketCapInDollarsLoading,
}: MarketDataCardProps) => {
  const leftSectionRef = useRef(null)

  const [leftSectionHeight, setHeight] = useState(0)

  useEffect(() => {
    setHeight(leftSectionRef.current.clientHeight)
  })
  const oldestPriceObj = pricesLast24Hours
    ? pricesLast24Hours.reduce((prev, curr) => {
        return new Date(prev.time).valueOf() < new Date(curr.time).valueOf()
          ? prev
          : curr
      }, {})
    : null
  const oldestPriceInCents = oldestPriceObj ? oldestPriceObj.price * 100 : null
  // const minPrice = pricesLast24Hours.reduce((a, b) => Math.min((new Date(a.time)).valueOf(), (new Date(b.time).valueOf()))).price
  return (
    <Card
      isGlowing={false}
      renderContent={() => (
        <div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'end',
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
                          title="Price!"
                          screenWidth={screenWidth}
                        />
                        {!priceInCents ? (
                          <CardSectionLoading />
                        ) : (
                          <CardSectionValue
                            value={new Intl.NumberFormat('en', {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            }).format(priceInCents / 100)}
                            renderPrefix={() => '$'}
                            screenWidth={screenWidth}
                          />
                        )}
                      </div>
                      {!priceInCents || !oldestPriceInCents ? null : (
                        <PercentChangeRow
                          screenWidth={screenWidth}
                          change={(
                            ((priceInCents - oldestPriceInCents) /
                              oldestPriceInCents) *
                            100
                          ).toFixed(2)}
                          text={'vs last 24 hours'}
                        />
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div
              className={css({
                width: '50%',
                // This makes the graph the height of the section to the left of it
                height: leftSectionHeight,
              })}
            >
              {pricesLast24Hours.length == 0 ? (
                <LoadingAnimation />
              ) : (
                <div
                  className={css({
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                  })}
                >
                  <LazereyeChart
                    rangeLabelText={'1 DAY'}
                    height={leftSectionHeight}
                    // data={Array.from('x'.repeat(15)).map(() => ({
                    //   label: '2039',
                    //   data: 20000,
                    // }))}
                    data={pricesLast24Hours
                      .map((d) => ({
                        x: new Date(d.time).valueOf(),
                        y: Number(d.price),
                      }))
                      .concat([
                        { x: new Date().valueOf(), y: priceInCents / 100 },
                      ])}
                    formatTitle={(title) => {
                      const date = new Date(Number(title))
                      const dateString = date.toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                      const timeString = date.toLocaleTimeString('en-us', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })
                      return `${dateString}, ${timeString}`
                    }}
                    formatBody={(body) => {
                      return `$${body}`
                    }}
                  />
                </div>
              )}
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

                      {isMarketCapInDollarsLoading ? (
                        <CardSectionLoading />
                      ) : (
                        <CardSectionValue
                          screenWidth={screenWidth}
                          value={marketCapInDollars.toFixed(2)}
                          postfix="bn."
                          renderPrefix={() => '$'}
                        />
                      )}
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
                      {!priceInCents ? (
                        <CardSectionLoading />
                      ) : (
                        <CardSectionValue
                          value={(() => {
                            const satPriceInCents = priceInCents / 100_000_000
                            const satsPerDollar = 100 / satPriceInCents
                            return new Intl.NumberFormat({}).format(
                              satsPerDollar.toFixed(0)
                            )
                          })()}
                          screenWidth={screenWidth}
                          renderPrefix={() => (
                            <i className="fak fa-satoshisymbol-solidtilt" />
                          )}
                        />
                      )}
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
