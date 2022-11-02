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

const getSecondsSinceUnixTimestamp = (unixTimestamp, currentTime) => {
  const unixTimestampInMilliseconds = unixTimestamp * 1000
  const blockTime = new Date(unixTimestampInMilliseconds)
  const currentDateTime = new Date(currentTime)
  const msSinceLastBlock = currentDateTime.valueOf() - blockTime.valueOf()
  const secondsSinceLastBlock = msSinceLastBlock / 1000
  const utcSecondsSinceEpoch = Math.round(secondsSinceLastBlock)

  return utcSecondsSinceEpoch
}

const getFormattedStringForSeconds = (seconds) => {
  var date = new Date(null)
  date.setSeconds(seconds) // specify value for SECONDS here
  var result = date.toISOString().substr(14, 5)
  return result
}

interface BlockchainSectionProps {
  hashrate: number
  blocksMinedLast24Hours: number
  screenWidth: number
  timeOfLastBlock: number
  currentTime: number
  utxoSetSize: number
  chainSize: number
  avgSecondsPerBlockForCurrentEpoch: number
  avgSecondsPerBlockForLast2016Blocks: number
}
const BlockchainSection: React.FC<BlockchainSectionProps> = ({
  hashrate,
  blocksMinedLast24Hours,
  screenWidth,
  timeOfLastBlock,
  currentTime,
  utxoSetSize,
  chainSize,
  avgSecondsPerBlockForCurrentEpoch,
  avgSecondsPerBlockForLast2016Blocks,
}: BlockchainSectionProps) => {
  const getSinceLastBlockFontSize = (width: number): number => {
    if (width <= 500) {
      return 10
    } else if (width > 500 && width <= 600) {
      return 11
    } else if (width > 600 && width <= 900) {
      return 11
    } else if (width > 900 && width <= 1307) {
      return 11
    } else if (width > 1307 && width <= 1562) {
      return 11
    } else if (width > 1562 && width <= 1700) {
      return 11
    } else if (width > 1700) {
      return 11
    } else {
      // shouldn't reach
      return 12
    }
  }
  const sinceLastFontSize = getSinceLastBlockFontSize(screenWidth)
  const columnsCount = screenWidth >= 550 ? 2 : 1
  return (
    <div
      className={css({
        marginBottom: 20,
      })}
    >
      <SectionHeader emoji="⛓️" title="Blockchain" />
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
          gap: 20,
        })}
      >
        <div className={css({})}>
          <div className={css({})}>
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
                                title="Block Time"
                                screenWidth={screenWidth}
                              />
                              <div
                                className={css({
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                })}
                              >
                                <div
                                  className={css({
                                    width: '50%',
                                  })}
                                >
                                  <CardSectionValue
                                    value={
                                      timeOfLastBlock
                                        ? getFormattedStringForSeconds(
                                            getSecondsSinceUnixTimestamp(
                                              timeOfLastBlock,
                                              currentTime
                                            )
                                          )
                                        : '--'
                                    }
                                    screenWidth={screenWidth}
                                  />
                                </div>
                                <div
                                  className={css({
                                    width: '50%',
                                    color: '#BDC4DC',
                                    fontSize: sinceLastFontSize,
                                    fontWeight: 100,
                                    fontFamily: 'poppins',
                                    display: 'inline-block',
                                    alignSelf: 'flex-end',
                                  })}
                                >
                                  since last block
                                </div>
                              </div>
                              <div
                                className={css({
                                  marginTop: 10,
                                })}
                              ></div>
                              <div
                                className={css({
                                  color: 'rgb(171, 171, 172)',
                                  fontSize: 11,
                                  fontWeight: 100,
                                  fontFamily: 'poppins',
                                  paddingLeft: 5,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                })}
                              >
                                <div className={css({})}>
                                  Target time per block
                                </div>
                                <div className={css({})}>
                                  {getFormattedStringForSeconds(600)}
                                </div>
                              </div>
                              <div
                                className={css({
                                  width: '100%',
                                  height: 10,
                                  backgroundColor: '#8FD8E7',
                                  borderRadius: 50,
                                })}
                              ></div>
                              <div
                                className={css({
                                  marginTop: 10,
                                })}
                              ></div>
                              <div
                                className={css({
                                  color: 'rgb(171, 171, 172)',
                                  fontSize: 11,
                                  fontWeight: 100,
                                  fontFamily: 'poppins',
                                  paddingLeft: 5,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                })}
                              >
                                <div className={css({})}>
                                  Avg Time for Current Epoch
                                </div>
                                {!avgSecondsPerBlockForCurrentEpoch ? null : (
                                  <div className={css({})}>
                                    {getFormattedStringForSeconds(
                                      avgSecondsPerBlockForCurrentEpoch
                                    )}
                                  </div>
                                )}
                              </div>
                              <div
                                className={css({
                                  width: '100%',
                                  height: 10,
                                  backgroundColor: '#8FD8E7',
                                  borderRadius: 50,
                                })}
                              ></div>
                              <div
                                className={css({
                                  marginTop: 10,
                                })}
                              ></div>
                              <div
                                className={css({
                                  color: 'rgb(171, 171, 172)',
                                  fontSize: 11,
                                  fontWeight: 100,
                                  fontFamily: 'poppins',
                                  paddingLeft: 5,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                })}
                              >
                                <div className={css({})}>
                                  Avg Time for Last 2016 Blocks
                                </div>
                                {!avgSecondsPerBlockForCurrentEpoch ? null : (
                                  <div className={css({})}>
                                    {getFormattedStringForSeconds(
                                      avgSecondsPerBlockForLast2016Blocks
                                    )}
                                  </div>
                                )}
                              </div>
                              <div
                                className={css({
                                  width: '100%',
                                  height: 10,
                                  backgroundColor: '#8FD8E7',
                                  borderRadius: 50,
                                })}
                              ></div>
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
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: `repeat(${
              columnsCount == 1 ? 2 : 0
            }, minmax(0, 1fr))`,
            gap: 20,
            gridAutoRows: 'min-content',
          })}
        >
          <div className={css({})}>
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
                                title="UTXO Set Size"
                                screenWidth={screenWidth}
                              />
                              {!utxoSetSize ? (
                                <CardSectionLoading />
                              ) : (
                                <CardSectionValue
                                  value={(utxoSetSize / 1_000_000).toFixed(2)}
                                  postfix="mm"
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
          <div className={css({})}>
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
                                title="Chain size"
                                screenWidth={screenWidth}
                              />
                              {!chainSize ? (
                                <CardSectionLoading />
                              ) : (
                                <CardSectionValue
                                  value={(chainSize / 1_000_000_000).toFixed(2)}
                                  postfix="GB"
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
    </div>
  )
}

export default BlockchainSection
