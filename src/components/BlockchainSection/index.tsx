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

interface BlockchainSectionProps {
  hashrate: number
  blocksMinedLast24Hours: number
  screenWidth: number
}
const BlockchainSection: React.FC<BlockchainSectionProps> = ({
  hashrate,
  blocksMinedLast24Hours,
  screenWidth,
}: BlockchainSectionProps) => {
  const getSinceLastBlockFontSize = (width: number): number => {
    if (width <= 500) {
      return 10
    } else if (width > 500 && width <= 600) {
      return 13
    } else if (width > 600 && width <= 900) {
      return 13
    } else if (width > 900 && width <= 1307) {
      return 13
    } else if (width > 1307 && width <= 1562) {
      return 13
    } else if (width > 1562 && width <= 1700) {
      return 13
    } else if (width > 1700) {
      return 13
    } else {
      // shouldn't reach
      return 13
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
                                })}
                              >
                                <div>
                                  <CardSectionValue
                                    value="7:01"
                                    screenWidth={screenWidth}
                                  />
                                </div>
                                <div
                                  className={css({
                                    color: '#BDC4DC',
                                    fontSize: sinceLastFontSize,
                                    fontWeight: 100,
                                    fontFamily: 'poppins',
                                    paddingLeft: 5,
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
                                <div className={css({})}>10:00</div>
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
                                <div className={css({})}>9:25</div>
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
                                <div className={css({})}>10:00</div>
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
            gridAutoRows: "min-content"
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
                              <CardSectionValue
                                value="83.39"
                                postfix="mm"
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
                              <CardSectionValue
                                value="490.8"
                                postfix="GB"
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
    </div>
  )
}

export default BlockchainSection
