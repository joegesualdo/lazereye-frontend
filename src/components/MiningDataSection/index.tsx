import React from 'react'
import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { css, cx } from '@emotion/css'
import SectionHeader from '../SectionHeader'
import Logo from '../Logo'
import CardSection from '../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import Card from '../Card'
import LazereyeChart from '../LazereyeChart'
import PercentChangeRow from '../PercentChangeRow'
import { Bars } from 'react-loader-spinner'
import CardSectionLoading from '../CardSectionLoading'

interface MiningDataSectionProps {
  hashrate: number
  blocksMinedLast24Hours: number
  screenWidth: number
  estimatedHashRateForLast2016Blocks: number
  hashrateForEachOfTheLast2016BlocksWithRangeof2016: [
    {
      height: number
      hashrate: number
    }
  ]
  blocksMinedOverTheLast24HoursCount: number
  networkHashrateForBlockMined24HoursAgo: number
}
const MiningDataSection: React.FC<MiningDataSectionProps> = ({
  estimatedHashRateForLast2016Blocks,
  blocksMinedLast24Hours,
  screenWidth,
  hashrateForEachOfTheLast2016BlocksWithRangeof2016,
  blocksMinedOverTheLast24HoursCount,
  networkHashrateForBlockMined24HoursAgo,
}: MiningDataSectionProps) => {
  const leftSectionRef = useRef(null)

  const [leftSectionHeight, setHeight] = useState(0)

  useEffect(() => {
    setHeight(leftSectionRef.current.clientHeight * 0.9)
  })
  return (
    <div
      className={css({
        marginBottom: 20,
      })}
    >
      <SectionHeader emoji="⛏️" title="Mining Data" />
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
                    hasTopBorder={false}
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
                            title="Hash Rate Last 2016 Blocks"
                            screenWidth={screenWidth}
                          />
                          {!estimatedHashRateForLast2016Blocks ? (
                            <CardSectionLoading />
                          ) : (
                            <CardSectionValue
                              value={(
                                estimatedHashRateForLast2016Blocks /
                                1_000_000_000_000_000_000
                              ).toFixed(2)}
                              postfix="eh/s"
                              screenWidth={screenWidth}
                            />
                          )}
                        </div>
                        {!estimatedHashRateForLast2016Blocks ||
                        !networkHashrateForBlockMined24HoursAgo ? null : (
                          <PercentChangeRow
                            change={(
                              ((estimatedHashRateForLast2016Blocks -
                                networkHashrateForBlockMined24HoursAgo) /
                                networkHashrateForBlockMined24HoursAgo) *
                              100
                            ).toFixed(2)}
                            text={'vs yesterday'}
                            screenWidth={screenWidth}
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
                  paddingTop: '0.5%',
                  height: leftSectionHeight,
                })}
              >
                {hashrateForEachOfTheLast2016BlocksWithRangeof2016.length ==
                0 ? (
                  <div
                    className={css({
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      height: '100%',
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
                  <LazereyeChart
                    data={hashrateForEachOfTheLast2016BlocksWithRangeof2016.map(
                      (d) => ({ x: d.height, y: d.hashrate })
                    )}
                    formatTitle={(title) => {
                      const blockString = new Intl.NumberFormat({}).format(
                        Number(String(title))
                      )
                      return `Block: ${blockString}`
                    }}
                    formatBody={(body: string) => {
                      const hashrate= Number(String(body).replace(/,/g, ''))
                      return `${(hashrate/ 1_000_000_000_000_000_000).toFixed(2)} eh/s`
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      />
      <div className={css({ marginTop: 20 })}>
        <div className={css({ width: '48%', marginRight: 10 })}>
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
                      width: '100%',
                    })}
                  >
                    <CardSection
                      screenWidth={screenWidth}
                      hasRightBorder={false}
                      hasTopBorder={false}
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
                              title="Blocks Mined Last 24 Hours"
                              screenWidth={screenWidth}
                            />
                            {!blocksMinedOverTheLast24HoursCount ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={blocksMinedOverTheLast24HoursCount}
                                screenWidth={screenWidth}
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
        </div>
      </div>
    </div>
  )
}

export default MiningDataSection
