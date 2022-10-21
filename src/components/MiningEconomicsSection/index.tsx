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

interface MiningEconomicsSectionProps {
  screenWidth: number
  subsidyInSatsForCurrentBlock: number
}
const MiningEconomicsSection: React.FC<MiningEconomicsSectionProps> = ({
  screenWidth,
  subsidyInSatsForCurrentBlock,
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
                          <CardSectionValue
                            value={subsidyInSatsForCurrentBlock / 100000000}
                            postfix="btc"
                            screenWidth={screenWidth}
                          />
                        </div>
                        <div className={css({ width: '50%', paddingLeft: 20 })}>
                          <CardSectionValue
                            value="120,000"
                            screenWidth={screenWidth}
                            renderPrefix={() => '$'}
                          />
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
                            <CardSectionValue
                              value="11.65"
                              postfix="btc"
                              screenWidth={screenWidth}
                            />
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            <CardSectionValue
                              value="214,000"
                              screenWidth={screenWidth}
                              renderPrefix={() => '$'}
                            />
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
                            <CardSectionValue
                              value="0.1"
                              postfix="btc"
                              screenWidth={screenWidth}
                            />
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            <CardSectionValue
                              value="1,840"
                              screenWidth={screenWidth}
                              renderPrefix={() => '$'}
                            />
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
                            <CardSectionValue
                              value="0.6"
                              postfix="btc"
                              screenWidth={screenWidth}
                            />
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            <CardSectionValue
                              value="11,237"
                              screenWidth={screenWidth}
                              renderPrefix={() => '$'}
                            />
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
                            <CardSectionValue
                              value="1.53"
                              postfix="%"
                              screenWidth={screenWidth}
                            />
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            <CardSectionValue
                              value="98.47"
                              postfix="%"
                              screenWidth={screenWidth}
                            />
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
                            <CardSectionValue
                              value="0.93"
                              postfix="%"
                              screenWidth={screenWidth}
                            />
                          </div>
                          <div
                            className={css({ width: '50%', paddingLeft: 20 })}
                          >
                            <CardSectionValue
                              value="99.07"
                              postfix="%"
                              screenWidth={screenWidth}
                            />
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
