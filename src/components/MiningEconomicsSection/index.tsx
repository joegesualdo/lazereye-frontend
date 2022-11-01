import React from 'react'
import { css, cx } from '@emotion/css'
import SectionHeader from '../SectionHeader'
import Logo from '../Logo'
import CardSection from '../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import Card from '../Card'
import LazereyeChart from '../LazereyeChart'
import PercentChangeRow from '../PercentChangeRow'
import CardSectionLoading from '../CardSectionLoading'

interface MiningEconomicsSectionProps {
  screenWidth: number
  subsidyInSatsForCurrentBlock: number
  totalFeesLast24HoursInSats: number
  priceInCents: number
  avgFeesLast24HoursInSats: number
  avgFeesLast2016BlocksInSats: number
  feesVsRewardLast24Hours: number
  feesVsRewardLast2016Blocks: number
}
const MiningEconomicsSection: React.FC<MiningEconomicsSectionProps> = ({
  screenWidth,
  subsidyInSatsForCurrentBlock,
  totalFeesLast24HoursInSats,
  priceInCents,
  avgFeesLast24HoursInSats,
  avgFeesLast2016BlocksInSats,
  feesVsRewardLast24Hours,
  feesVsRewardLast2016Blocks,
}: MiningEconomicsSectionProps) => {
  const getSubtitleFontSize = (width: number): number => {
    if (width <= 600) {
      return 8
    } else if (width > 600 && width <= 900) {
      return 13
    } else if (width > 900 && width <= 1307) {
      return 10
    } else if (width > 1307 && width <= 1562) {
      return 9
    } else if (width > 1562 && width <= 1700) {
      return 11
    } else if (width > 1700) {
      return 12
    } else {
      // shouldn't reach
      return 12
    }
  }
  const subtitleFontSize = getSubtitleFontSize(screenWidth)
  return (
    <div
      className={css({
        marginBottom: 20,
      })}
    >
      <SectionHeader emoji="💰" title="Mining Economics" />
      <Card
        isGlowing={false}
        renderContent={() => (
          <div>
            <div
              className={css({
                width: '100%',
              })}
            >
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
                        title="Block Subsidy"
                        screenWidth={screenWidth}
                      />
                      <div
                        className={css({
                          display: 'flex',
                        })}
                      >
                        <div
                          className={css({
                            width: '50%',
                            borderRightColor: '#252628',
                            borderRightStyle: 'solid',
                            borderRightWidth: 1,
                          })}
                        >
                          {!subsidyInSatsForCurrentBlock ? (
                            <CardSectionLoading />
                          ) : (
                            <CardSectionValue
                              value={subsidyInSatsForCurrentBlock / 100_000_000}
                              postfix="btc"
                              screenWidth={screenWidth}
                            />
                          )}
                        </div>
                        <div className={css({ width: '50%', paddingLeft: 20 })}>
                          {!priceInCents || !subsidyInSatsForCurrentBlock ? (
                            <CardSectionLoading />
                          ) : (
                            <CardSectionValue
                              value={new Intl.NumberFormat('en', {
                                maximumFractionDigits: 0,
                              }).format(
                                ((priceInCents / 100_000_000) *
                                  subsidyInSatsForCurrentBlock) /
                                  100
                              )}
                              screenWidth={screenWidth}
                              renderPrefix={() => '$'}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      />
      <div className={css({ marginTop: 20 })}>
        <Card
          isGlowing={false}
          renderContent={() => (
            <div>
              <div
                className={css({
                  width: '100%',
                })}
              >
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
                          title="Total Fees"
                          screenWidth={screenWidth}
                        />
                        <div
                          style={{
                            marginTop: 10,
                            width: '100%',
                            color: '#777E91',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: subtitleFontSize,
                            fontFamily:
                              "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
                          }}
                        >
                          Last 24 hours
                        </div>
                        <div
                          className={css({
                            display: 'flex',
                          })}
                        >
                          <div
                            className={css({
                              width: '50%',
                              borderRightColor: '#252628',
                              borderRightStyle: 'solid',
                              borderRightWidth: 1,
                            })}
                          >
                            {!totalFeesLast24HoursInSats ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(
                                  totalFeesLast24HoursInSats / 100_000_000
                                ).toFixed(2)}
                                postfix="btc"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            {!priceInCents || !totalFeesLast24HoursInSats ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={new Intl.NumberFormat('en', {
                                  maximumFractionDigits: 0,
                                }).format(
                                  ((priceInCents / 100_000_000) *
                                    totalFeesLast24HoursInSats) /
                                    100
                                )}
                                screenWidth={screenWidth}
                                renderPrefix={() => '$'}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        />
      </div>
      <div className={css({ marginTop: 20 })}>
        <Card
          isGlowing={false}
          renderContent={() => (
            <div>
              <div
                className={css({
                  width: '100%',
                })}
              >
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
                          title="Avg Fees Per Block"
                          screenWidth={screenWidth}
                        />
                        <div
                          style={{
                            marginTop: 10,
                            width: '100%',
                            color: '#777E91',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: subtitleFontSize,
                            fontFamily:
                              "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
                          }}
                        >
                          Last 24 hours
                        </div>
                        <div
                          className={css({
                            display: 'flex',
                            borderBottomColor: '#252628',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                          })}
                        >
                          <div
                            className={css({
                              width: '50%',
                              borderRightColor: '#252628',
                              borderRightStyle: 'solid',
                              borderRightWidth: 1,
                            })}
                          >
                            {!avgFeesLast24HoursInSats ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(
                                  avgFeesLast24HoursInSats / 100_000_000
                                ).toFixed(2)}
                                postfix="btc"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            {!priceInCents || !avgFeesLast24HoursInSats ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={new Intl.NumberFormat('en', {
                                  maximumFractionDigits: 0,
                                }).format(
                                  ((priceInCents / 100_000_000) *
                                    avgFeesLast24HoursInSats) /
                                    100
                                )}
                                screenWidth={screenWidth}
                                renderPrefix={() => '$'}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            width: '100%',
                            color: '#777E91',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: subtitleFontSize,
                            fontFamily:
                              "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
                          }}
                        >
                          Last 2016 blocks
                        </div>
                        <div
                          className={css({
                            display: 'flex',
                            paddingBottom: 10,
                          })}
                        >
                          <div
                            className={css({
                              width: '50%',
                              borderRightColor: '#252628',
                              borderRightStyle: 'solid',
                              borderRightWidth: 1,
                            })}
                          >
                            {!avgFeesLast2016BlocksInSats ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(
                                  avgFeesLast2016BlocksInSats / 100_000_000
                                ).toFixed(2)}
                                postfix="btc"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            {!priceInCents || !avgFeesLast2016BlocksInSats ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={new Intl.NumberFormat('en', {
                                  maximumFractionDigits: 0,
                                }).format(
                                  ((priceInCents / 100_000_000) *
                                    avgFeesLast2016BlocksInSats) /
                                    100
                                )}
                                screenWidth={screenWidth}
                                renderPrefix={() => '$'}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        />
      </div>
      <div className={css({ marginTop: 20 })}>
        <Card
          isGlowing={false}
          renderContent={() => (
            <div>
              <div
                className={css({
                  width: '100%',
                })}
              >
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
                          title="Avg Fees vs reward"
                          screenWidth={screenWidth}
                        />
                        <div
                          style={{
                            marginTop: 10,
                            width: '100%',
                            color: '#777E91',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: subtitleFontSize,
                            fontFamily:
                              "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
                          }}
                        >
                          Last 24 hours
                        </div>
                        <div
                          className={css({
                            display: 'flex',
                            borderBottomColor: '#252628',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                          })}
                        >
                          <div
                            className={css({
                              width: '50%',
                              borderRightColor: '#252628',
                              borderRightStyle: 'solid',
                              borderRightWidth: 1,
                            })}
                          >
                            {!feesVsRewardLast24Hours ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(feesVsRewardLast24Hours * 100).toFixed(
                                  2
                                )}
                                postfix="%"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            {!feesVsRewardLast24Hours ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(
                                  (1 - feesVsRewardLast24Hours) *
                                  100
                                ).toFixed(2)}
                                postfix="%"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            width: '100%',
                            color: '#777E91',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: subtitleFontSize,
                            fontFamily:
                              "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
                          }}
                        >
                          Last 2016 blocks
                        </div>
                        <div
                          className={css({
                            display: 'flex',
                            paddingBottom: 10,
                          })}
                        >
                          <div
                            className={css({
                              width: '50%',
                              borderRightColor: '#252628',
                              borderRightStyle: 'solid',
                              borderRightWidth: 1,
                            })}
                          >
                            {!feesVsRewardLast2016Blocks ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(
                                  feesVsRewardLast2016Blocks * 100
                                ).toFixed(2)}
                                postfix="%"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            {!feesVsRewardLast2016Blocks ? (
                              <CardSectionLoading />
                            ) : (
                              <CardSectionValue
                                value={(
                                  (1 - feesVsRewardLast2016Blocks) *
                                  100
                                ).toFixed(2)}
                                postfix="%"
                                screenWidth={screenWidth}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default MiningEconomicsSection
