import React from 'react'
import { useState, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import Logo from '../Logo'
import MarketDataSection from '../MarketDataSection'
import TransactionsSection from '../TransactionsSection'
import MiningDataSection from '../MiningDataSection'
import BlockheightTransactionsCard from '../BlockheightTransactionsCard'
import DifficultySection from '../DifficultySection'
import MiningEconomicsSection from '../MiningEconomicsSection'
import BlockchainSection from '../BlockchainSection'

// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined
  height: number | undefined
}
// Hook
function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}
interface DashboardProps {
  blockheight: number
  chainSize: number
  utxoSetSize: number
  pricesLast24Hours: {
    t: number
    p: number
  }
  subsidyInSatsForCurrentBlock: number
  priceInCents: number
  currentTime: number
  totalMoneySupply: number
  timeOfLastBlock: number
  totalTransactionsCount: number
  transactionsCountLast30Days: number
  tps30Day: number
  difficulty: number
  currentDifficultyEpoch: number
  blocksUntilRetarget: number
  estimatedSecondsUntilRetarget: number
  estimatedHashRateForLast2016Blocks: number
  isMarketCapInDollarsLoading: boolean
  hashrateForEachOfTheLast2016BlocksWithRangeof2016: [
    {
      height: number
      hashrate: number
    }
  ]
  difficultyAtEachEpoch: [
    {
      height: number
      difficulty: number
    }
  ]
}

const columnCount = (width: number): number => {
  if (width <= 900) {
    return 1
  } else if (width > 900 && width <= 1307) {
    return 2
  } else if (width > 1307) {
    return 3
  } else {
    return 1
  }
}

interface LogoAndBlockHeightTransactionsProps {
  screenWidth: number
  blockheight: number
  totalMoneySupply: number
  totalTransactionsCount: number
}

const LogoAndBlockHeightTransactions: React.FC<
  LogoAndBlockHeightTransactionsProps
> = ({
  screenWidth,
  blockheight,
  totalTransactionsCount,
}: LogoAndBlockHeightTransactionsProps) => (
  <div>
    <div
      className={css({
        margin: 'auto',
        marginBottom: 30,
        width: '100%',
      })}
    >
      <Logo />
    </div>
    <div
      className={css({
        marginBottom: 20,
      })}
    >
      <BlockheightTransactionsCard
        screenWidth={screenWidth}
        blockheight={blockheight}
        transactionsCount={totalTransactionsCount}
      />
    </div>
  </div>
)

const Dashboard: React.FC<DashboardProps> = ({
  blockheight,
  chainSize,
  utxoSetSize,
  pricesLast24Hours,
  subsidyInSatsForCurrentBlock,
  priceInCents,
  totalMoneySupply,
  timeOfLastBlock,
  totalTransactionsCount,
  transactionsCountLast30Days,
  tps30Day,
  difficulty,
  currentDifficultyEpoch,
  blocksUntilRetarget,
  estimatedSecondsUntilRetarget,
  estimatedHashRateForLast2016Blocks,
  hashrateForEachOfTheLast2016BlocksWithRangeof2016,
  difficultyAtEachEpoch,
  currentTime,
  isMarketCapInDollarsLoading,
}: DashboardProps) => {
  const size: Size = useWindowSize()
  return (
    <div
      style={{
        padding: columnCount(size.width) == 1 ? 15 : 30,
        backgroundColor: 'rgb(44, 45, 48)',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount(
            size.width
          )}, minmax(0, 1fr)`,
          gridGap: columnCount(size.width) == 1 ? 0 : 40,
        }}
      >
        <div className={css({})}>
          {columnCount(size.width) == 2 || columnCount(size.width) == 1 ? (
            <LogoAndBlockHeightTransactions
              screenWidth={size.width}
              blockheight={blockheight}
              totalTransactionsCount={totalTransactionsCount}
            />
          ) : null}
          <MarketDataSection
            isMarketCapInDollarsLoading={isMarketCapInDollarsLoading}
            screenWidth={size.width}
            pricesLast24Hours={pricesLast24Hours}
            marketCapInDollars={
              ((priceInCents / 100) * totalMoneySupply) / 1000000000
            }
            priceInCents={priceInCents}
          />
          <TransactionsSection
            transactionsCountLast30Days={transactionsCountLast30Days}
            tps30Day={tps30Day}
            screenWidth={size.width}
          />
          {columnCount(size.width) == 3 || columnCount(size.width) == 1 ? (
            <BlockchainSection
              screenWidth={size.width}
              timeOfLastBlock={timeOfLastBlock}
              currentTime={currentTime}
              utxoSetSize={utxoSetSize}
              chainSize={chainSize}
            />
          ) : null}
          {columnCount(size.width) == 2 ? (
            <MiningEconomicsSection
              screenWidth={size.width}
              subsidyInSatsForCurrentBlock={subsidyInSatsForCurrentBlock}
            />
          ) : null}
        </div>
        <div className={css({})}>
          {columnCount(size.width) == 3 ? (
            <LogoAndBlockHeightTransactions
              screenWidth={size.width}
              blockheight={blockheight}
              totalTransactionsCount={totalTransactionsCount}
            />
          ) : null}
          <DifficultySection
            screenWidth={size.width}
            difficulty={difficulty}
            currentDifficultyEpoch={currentDifficultyEpoch}
            blocksUntilRetarget={blocksUntilRetarget}
            estimatedSecondsUntilRetarget={estimatedSecondsUntilRetarget}
            difficultyAtEachEpoch={difficultyAtEachEpoch}
          />
          <MiningDataSection
            screenWidth={size.width}
            estimatedHashRateForLast2016Blocks={
              estimatedHashRateForLast2016Blocks
            }
            hashrateForEachOfTheLast2016BlocksWithRangeof2016={
              hashrateForEachOfTheLast2016BlocksWithRangeof2016
            }
          />
          {columnCount(size.width) == 2 ? (
            <BlockchainSection
              screenWidth={size.width}
              timeOfLastBlock={timeOfLastBlock}
              currentTime={new Date().valueOf()}
              utxoSetSize={utxoSetSize}
              chainSize={chainSize}
            />
          ) : null}
        </div>
        {columnCount(size.width) == 3 || columnCount(size.width) == 1 ? (
          <div className={css({})}>
            <MiningEconomicsSection
              screenWidth={size.width}
              subsidyInSatsForCurrentBlock={subsidyInSatsForCurrentBlock}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Dashboard
