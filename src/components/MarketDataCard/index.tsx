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
    setHeight(leftSectionRef.current.clientHeight * 0.9)
  })
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
                          title="Price"
                          screenWidth={screenWidth}
                        />
                        <CardSectionValue
                          value={new Intl.NumberFormat('en', {
                            maximumFractionDigits: 0,
                          }).format(priceInCents / 100)}
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
                // This makes the graph the height of the section to the left of it
                height: leftSectionHeight,
              })}
            >
              <LazereyeChart
                // data={Array.from('x'.repeat(15)).map(() => ({
                //   label: '2039',
                //   data: 20000,
                // }))}
                data={pricesLast24Hours.map((d) => ({
                  x: new Date(d.time).valueOf(),
                  y: Number(d.price),
                }))}
              />
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
                        <div
                          className={css({
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            height: 50,
                          })}
                        >
                          <Bars
                            height="20"
                            width="20"
                            color="rgb(255, 45, 85)"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass={css({
                              height: 20,
                              alignSelf: 'center',
                            })}
                            visible={true}
                          />
                        </div>
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
