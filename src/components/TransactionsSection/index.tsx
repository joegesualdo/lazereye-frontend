import React from 'react'
import { css, cx } from '@emotion/css'
import SectionHeader from '../SectionHeader'
import Logo from '../Logo'
import CardSection from '../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import Card from '../Card'

interface TransactionsSectionProps {
  transactions: number
  tps30Day: number
  screenWidth: number
}
const TransactionsSection: React.FC<TransactionsSectionProps> = ({
  transactions,
  tps30Day,
  screenWidth,
}: TransactionsSectionProps) => (
  <div
    className={css({
      marginBottom: 20,
    })}
  >
    <SectionHeader emoji="🖊️" title="Transactions" />
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
                        title="Transactions 30 Day"
                        screenWidth={screenWidth}
                      />
                      <CardSectionValue
                        value="7,258,348"
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
                        title="TPS 30 Day"
                        screenWidth={screenWidth}
                      />
                      <CardSectionValue
                        value="3"
                        postfix="tx/s"
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

export default TransactionsSection
