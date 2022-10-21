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

interface MiningDataSectionProps {
  hashrate: number
  blocksMinedLast24Hours: number
  screenWidth: number
}
const MiningDataSection: React.FC<MiningDataSectionProps> = ({
  hashrate,
  blocksMinedLast24Hours,
  screenWidth,
}: MiningDataSectionProps) => {
  const leftSectionRef = useRef(null)

  const [leftSectionHeight, setHeight] = useState(0)

  useEffect(() => {
    setHeight(leftSectionRef.current.clientHeight)
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
                          <CardSectionValue
                            value="262.3"
                            postfix="eh/s"
                            screenWidth={screenWidth}
                          />
                        </div>
                        <PercentChangeRow
                          change={2}
                          text={'vs yesterday'}
                          screenWidth={screenWidth}
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
                  height: leftSectionHeight,
                })}
              >
                <LazereyeChart />
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
                            <CardSectionValue
                              value="153"
                              screenWidth={screenWidth}
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
        </div>
      </div>
    </div>
  )
}

export default MiningDataSection
