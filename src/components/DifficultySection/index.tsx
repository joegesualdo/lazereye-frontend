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
import { Bars } from 'react-loader-spinner'
import CardSectionLoading from '../CardSectionLoading'
interface DifficultySectionProps {
  difficulty: number
  blocksUntilRetarget: number
  currentDifficultyEpoch: number
  estimatedSecondsUntilRetarget: number

  // daysUntilNextRetarget: number
  // dateOfNextRetarget: string
  screenWidth: number
  difficultyAtEachEpoch: [
    {
      height: number
      difficulty: number
    }
  ]
  difficultyForHeightOfTwoDifficultyAdjustmentsAgo: number
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
  difficultyAtEachEpoch,
  difficultyForHeightOfTwoDifficultyAdjustmentsAgo,
}: DifficultySectionProps) => {
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
      <SectionHeader emoji="⚙️" title="Difficulty" />
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
                            title="Difficulty"
                            screenWidth={screenWidth}
                          />
                          {!difficulty ? (
                            <CardSectionLoading />
                          ) : (
                            <CardSectionValue
                              value={(difficulty / 1000000000000).toFixed(2)}
                              postfix="t"
                              screenWidth={screenWidth}
                            />
                          )}
                        </div>
                        {!difficulty ||
                        !difficultyForHeightOfTwoDifficultyAdjustmentsAgo ? null : (
                          <PercentChangeRow
                            change={(
                              ((difficulty -
                                difficultyForHeightOfTwoDifficultyAdjustmentsAgo) /
                                difficultyForHeightOfTwoDifficultyAdjustmentsAgo) *
                              100
                            ).toFixed(2)}
                            text={'vs last epoch'}
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
                {difficultyAtEachEpoch.length == 0 ? (
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
                    data={difficultyAtEachEpoch.map((d) => ({
                      x: d.height,
                      y: d.difficulty,
                    }))}
                    formatTitle={(title) => {
                      const blockString = new Intl.NumberFormat({}).format(
                        Number(String(title))
                      )
                      return `Block: ${blockString}`
                    }}
                    formatBody={(body: string) => {
                      const difficulty = Number(String(body).replace(/,/g, ''))
                      return `${(difficulty / 1000000000000).toFixed(2)} T`
                    }}
                  />
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
                          title="Blocks Until Retarget"
                          screenWidth={screenWidth}
                        />
                        {!blocksUntilRetarget ? (
                          <CardSectionLoading />
                        ) : (
                          <CardSectionValue
                            value={new Intl.NumberFormat().format(
                              blocksUntilRetarget
                            )}
                            screenWidth={screenWidth}
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
                          title="Current Epoch"
                          screenWidth={screenWidth}
                        />
                        {!currentDifficultyEpoch ? (
                          <CardSectionLoading />
                        ) : (
                          <CardSectionValue
                            value={new Intl.NumberFormat().format(
                              currentDifficultyEpoch
                            )}
                            screenWidth={screenWidth}
                          />
                        )}
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
                        {!estimatedSecondsUntilRetarget ? (
                          <CardSectionLoading />
                        ) : (
                          <CardSectionValue
                            value={(
                              estimatedSecondsUntilRetarget /
                              (60 * 60 * 24)
                            ).toFixed(0)}
                            postfix="days"
                            screenWidth={screenWidth}
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
                          title="Date of Next Retarget"
                          screenWidth={screenWidth}
                        />
                        {!estimatedSecondsUntilRetarget ? (
                          <CardSectionLoading />
                        ) : (
                          <CardSectionValue
                            postfix={getDateFormatForSecondsInTheFuture(
                              estimatedSecondsUntilRetarget
                            )}
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
  )
}

export default DifficultySection
