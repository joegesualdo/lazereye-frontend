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
  estimatedSecondsUntilRetarget: number

  // daysUntilNextRetarget: number
  // dateOfNextRetarget: string
  screenWidth: number
}

const getDateFormatForSecondsInTheFuture = (secondsInTheFuture) => {
  var options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }
  const now = new Date()
  const dateInTheFuture = new Date(now.valueOf() + secondsInTheFuture * 1000)
  return dateInTheFuture.toLocaleDateString('en-US', options)
}

const DifficultySection: React.FC<MarketDataCardProps> = ({
  difficulty,
  blocksUntilRetarget,
  currentDifficultyEpoch,
  estimatedSecondsUntilRetarget,
  // daysUntilNextRetarget,
  // dateOfNextRetarget,
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
                            value={(difficulty / 1000000000000).toFixed(2)}
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
                          value={blocksUntilRetarget}
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
                          value={currentDifficultyEpoch}
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
                          value={(
                            estimatedSecondsUntilRetarget /
                            (60 * 60 * 24)
                          ).toFixed(0)}
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
                          postfix={getDateFormatForSecondsInTheFuture(
                            estimatedSecondsUntilRetarget
                          )}
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
