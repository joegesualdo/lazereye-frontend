import React from 'react'
import { css, cx } from '@emotion/css'
import CardSection from './../CardSection'
import CardSectionTitle from '../CardSectionTitle'
import CardSectionValue from '../CardSectionValue'
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
            <CardSectionValue value={blockheight} screenWidth={screenWidth} />
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
            <CardSectionValue
              value={transactionsCount}
              postfix="mm"
              screenWidth={screenWidth}
            />
          </div>
        )}
      />
    </div>
  </div>
)

export default BlockheightTransactionsCardSectionContent
