import React from 'react'
import { css, cx } from '@emotion/css'
import CardSection from './../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
import CardSectionLoading from '../CardSectionLoading'
interface BlockheightTransactionsCardSectionContentProps {
  blockheight: number
  transactionsCount: number
  screenWidth: number
}

const BlockheightTransactionsCardSectionContent: React.FC<
  BlockheightTransactionsCardSectionContentProps
> = ({
  blockheight,
  transactionsCount,
  screenWidth,
}: BlockheightTransactionsCardSectionContentProps) => (
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
        cardSectionContent={() => (
          <div
            style={{
              width: '100%',
            }}
          >
            <CardSectionTitle title="Blockheight" screenWidth={screenWidth} />
            {!blockheight ? (
              <CardSectionLoading />
            ) : (
              <CardSectionValue
                value={new Intl.NumberFormat().format(blockheight)}
                screenWidth={screenWidth}
              />
            )}
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
        cardSectionContent={() => (
          <div
            style={{
              width: '100%',
            }}
          >
            <CardSectionTitle title="Transactions" screenWidth={screenWidth} />
            {!transactionsCount ? (
              <CardSectionLoading />
            ) : (
              <CardSectionValue
                value={new Intl.NumberFormat('en-IN', {
                  maximumSignificantDigits: 5,
                }).format(transactionsCount / 1_000_000)}
                postfix="mm"
                screenWidth={screenWidth}
              />
            )}
          </div>
        )}
      />
    </div>
  </div>
)

export default BlockheightTransactionsCardSectionContent
