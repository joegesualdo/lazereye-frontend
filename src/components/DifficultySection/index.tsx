import React from 'react'
import { useRef, useEffect, useState } from 'react'

import { css, cx } from '@emotion/css'
import Card from './../Card'
import CardSection from '../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import LazereyeChart from '../LazereyeChart'
import PercentChangeRow from '../PercentChangeRow'
import SectionHeader from '../SectionHeader'
interface DifficultySectionProps {
  difficulty: number
  blocksUntilRetarget: number
  currentEpoch: number
  daysUntilNextRetarget: number
  dateOfNextRetarget: string
  screenWidth: number
}

const DifficultySection: React.FC<MarketDataCardProps> = ({
  difficulty,
  blocksUntilRetarget,
  currentEpoch,
  daysUntilNextRetarget,
  dateOfNextRetarget,
  screenWidth,
}: DifficultySectionProps) => {
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
      <SectionHeader emoji="⚙️" title="Difficulty" />
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
                            title="Difficulty"
                            screenWidth={screenWidth}
                          />
                          <CardSectionValue
                            value="35.61"
                            postfix="t"
                            screenWidth={screenWidth}
                          />
                        </div>
                        <PercentChangeRow
                          change={6}
                          text={'vs last epoch'}
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
                          title="Blocks Until Retarget"
                          screenWidth={screenWidth}
                        />
                        <CardSectionValue
                          value="1,285"
                          screenWidth={screenWidth}
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
                          title="Current Epoch"
                          screenWidth={screenWidth}
                        />
                        <CardSectionValue
                          value="377"
                          screenWidth={screenWidth}
                        />
                      </div>
                    </div>
                  )}
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
                          title="Days Until Next Retarget"
                          screenWidth={screenWidth}
                        />
                        <CardSectionValue
                          value="14"
                          postfix="days"
                          screenWidth={screenWidth}
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
                          title="Date of Next Retarget"
                          screenWidth={screenWidth}
                        />
                        <CardSectionValue
                          value="10/7/22"
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
  )
}

export default DifficultySection
