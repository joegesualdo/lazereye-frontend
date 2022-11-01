import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import get24HourPrices from './get24HourPrices'
const BLOCKS_PER_DIFFICULTY_PERIOD = 2016
const appStyles = {
  backgroundColor: 'rgb(20 26 47/1)',
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
}

const BITCOIND_REST_API_URL = 'http://127.0.0.1:3030'

const fetchDashboard = async () => {
  const data = await fetch('/api/v1/dashboard')
  const json = await data.json()
  console.log(json)
  return json
}
const fetchBC = async () => {
  console.log('about to fetch block count...')
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getblockcount`)
  console.log('blockcount: ')
  const blockcount = await data.json()
  console.log(blockcount)
  return blockcount
}
const fetchPrice = async () => {
  const data = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
  const priceResponse = await data.json()
  return priceResponse
}
const fetch24HourPriceHistory = async () => {
  const data = await fetch(
    'https://api.coinbase.com/v2/prices/BTC-USD/historic?period=day'
  )
  const priceHistory = await data.json()
  return priceHistory
}
const fetchDifficulty = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getdifficulty`)
  const difficulty = await data.json()
  return difficulty
}
const fetchTxOutsetInfo = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/gettxoutsetinfo`)
  const txOutsetInfo = await data.json()
  return txOutsetInfo
}
const fetchBlockchainInfo = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getblockchaininfo`)
  const blockchainInfo = await data.json()
  return blockchainInfo
}
const fetchBlockStatsForHeight = async (height: number) => {
  console.log('about to fetch block count...')
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getblockstats?hash_or_height=${height}`
  )
  const blockstats = await data.json()
  console.log(blockstats)
  return blockstats
}
const fetchNetworkHashPsForLastBlocks = async (blockCount: number) => {
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getnetworkhashps?n_blocks=${blockCount}`
  )
  const networkHashPs = await data.json()
  return networkHashPs
}
const fetchNetworkHashPsForLast2016BlocksAtHeight = async (height: number) => {
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getnetworkhashps?n_blocks=2016&height=${height}`
  )
  const networkHashPs = await data.json()
  return networkHashPs
}
const fetchBlockHashForHeight = async (height: number) => {
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getblockhash?height=${height}`
  )
  const blockhash = await data.json()
  return blockhash
}

const fetchBlockForBlockHash = async (blockhash: string) => {
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getblock?blockhash=${blockhash}&verbosity=1`
  )
  const blockData = await data.json()
  return blockData
}

const fetchHashrateForLast2016Blocks = async (currentHeight: number) => {
  // approximately 1 year
  //const results = Array(360)
  const results = Array(100)
    .fill(0)
    .map((_, i) => i)
    .map(async (i) => {
      const forHeight = currentHeight - i * 144
      const networkHashPsForLast2016Blocks =
        await fetchNetworkHashPsForLast2016BlocksAtHeight(forHeight)
      const hashRateAtHeight = {
        height: forHeight,
        hashrate: networkHashPsForLast2016Blocks,
      }
      return hashRateAtHeight
    })
    .reverse()
  return await Promise.all(results)
}

const fetchDifficultyForAllEpochsInTheLastYear = async (
  heightOfLastDifficultyAdjustment: number
) => {
  const oneYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  )
  // approximately 1 year
  var finished = false
  const results = Array(Math.floor(heightOfLastDifficultyAdjustment / 2016))
    .fill(0)
    .map((_, i) => i)
    .map(async (i) => {
      if (!finished) {
        const forHeight = heightOfLastDifficultyAdjustment - i * 2016
        const blockhash = await fetchBlockHashForHeight(forHeight)
        const block = await fetchBlockForBlockHash(blockhash)
        const blockDifficulty = block.difficulty
        const blockTime = new Date(block.time * 1000)
        if (blockTime < oneYearAgo) {
          finished = true
          return null
        } else {
          console.log(`Difficulty for block ${forHeight}: ${blockDifficulty}`)
          const difficultyAtHeight = {
            height: forHeight,
            difficulty: blockDifficulty,
          }
          return difficultyAtHeight
        }
      } else {
        return null
      }
    })
    .reverse()
  const a = await Promise.all(results)
  return a.filter((element) => {
    const e = element
    const isNull = e == null
    return !isNull
  })
}

const fetchChainTxStatsForLastMonth = async () => {
  console.log('about to fetch block count...')
  const data = await fetch('http://127.0.0.1:3030/api/v1/getchaintxstats')
  const chainTxStatsForLastMonth = await data.json()
  console.log(chainTxStatsForLastMonth)
  return chainTxStatsForLastMonth
}
function App(): React.ReactElement {
  const [currentTime, setCurrentTime] = useState(0)
  const [priceInCents, setPriceInCents] = useState(0)
  const [blockCount, setBlockCount] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [last24HourPrices, setLast24HourPrices] = useState([])
  const [networkHashPsForLast2016Blocks, setNetworkHashPsForLast2016Blocks] =
    useState(0)
  const [
    networkHashPsForLastEachOfTheLast2016Blocks,
    setNetworkHashPsForLastEachOfTheLast2016Blocks,
  ] = useState([])
  const [
    difficultyAtEachEpochInTheLastYear,
    setDifficultyAtEachEpochInTheLastYear,
  ] = useState([])
  const [blockStatsForCurrentHeight, setBlockStatsForCurrentHeight] = useState(
    {}
  )
  const [blockStatsForBlock2016BlocksAgo, setBlockStatsForBlock2016BlocksAgo] =
    useState({})
  const [blockchainInfo, setBlockchainInfo] = useState({})
  const [txOutsetInfo, setTxOutsetInfo] = useState({})
  const [
    blockStatsForHeightOfLastDifficultyAdjustment,
    setBlockStatsForHeightOfLastDifficultyAdjustment,
  ] = useState({})
  const [chainTxStatsForLastMonth, setChainTxStatsForLastMonth] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const priceResponse = await fetchPrice()
      setPriceInCents(Number(priceResponse.data.amount) * 100)
      const last24HourPriceHistoryResult = await fetch24HourPriceHistory()
      setLast24HourPrices(last24HourPriceHistoryResult.data.prices.reverse())
      // const jsonData = await fetchDashboard()
      // setPriceInCents(2006500)
      // setBlockHeight(jsonData.block_count)
      //
      const blockCount = await fetchBC()
      // setPrice(jsonData.price)
      setBlockCount(blockCount)

      const difficulty = await fetchDifficulty()
      // setPrice(jsonData.price)
      setDifficulty(difficulty)

      const blockchainInfo = await fetchBlockchainInfo()
      setBlockchainInfo(blockchainInfo)
      const blockStatsForCurrentHeight = await fetchBlockStatsForHeight(
        blockCount
      )
      setBlockStatsForCurrentHeight(blockStatsForCurrentHeight)
      const blockStatsForBlock2016BlocksAgo = await fetchBlockStatsForHeight(
        blockCount - 2016
      )
      setBlockStatsForBlock2016BlocksAgo(blockStatsForBlock2016BlocksAgo)
      const currentDifficultyEpoch = blockCount
        ? (blockCount / BLOCKS_PER_DIFFICULTY_PERIOD).toFixed(0)
        : undefined

      const block_height_of_last_difficulty_adjustment =
        (currentDifficultyEpoch - 1) * 2016
      const blockStatsForHeightOfLastDifficultyAdjustment =
        await fetchBlockStatsForHeight(
          block_height_of_last_difficulty_adjustment
        )
      setBlockStatsForHeightOfLastDifficultyAdjustment(
        blockStatsForHeightOfLastDifficultyAdjustment
      )

      const chainTxStatsForLastMonth = await fetchChainTxStatsForLastMonth()
      setChainTxStatsForLastMonth(chainTxStatsForLastMonth)

      const networkHashPsForLastEachOfTheLast2016Blocks =
        await fetchHashrateForLast2016Blocks(blockCount)

      setNetworkHashPsForLastEachOfTheLast2016Blocks(
        networkHashPsForLastEachOfTheLast2016Blocks
      )
      const networkHashPsForLast2016Blocks =
        await fetchNetworkHashPsForLastBlocks(2016)
      setNetworkHashPsForLast2016Blocks(networkHashPsForLast2016Blocks)

      const difficultyAtEachEpochInTheLastYear =
        await fetchDifficultyForAllEpochsInTheLastYear(blockCount)
      setDifficultyAtEachEpochInTheLastYear(difficultyAtEachEpochInTheLastYear)

      // TAKES A VERY LONG TIME
      const txOutsetInfo = await fetchTxOutsetInfo()
      setTxOutsetInfo(txOutsetInfo)
    }
    const setCurrentTimeInterval = setInterval(async () => {
      setCurrentTime(new Date().valueOf())
    }, 1000)
    const setPriceInterval = setInterval(async () => {
      const priceResponse = await fetchPrice()
      setPriceInCents(Number(priceResponse.data.amount) * 100)
    }, 10000)
    const everyFiveSecondInterval = setInterval(async () => {
      console.log(`inside interval: ${blockCount}`)

      const newBlockCount = await fetchBC()
      console.log(`new block: ${newBlockCount}; old block: ${blockCount}`)
      if (newBlockCount !== blockCount) {
        console.log("doesn't match")
        fetchData().catch(console.error)
      } else {
        console.log('matches')
      }
    }, 5000)
    fetchData()
      .then(() => {})
      .catch(console.error)
    return () => {
      clearInterval(everyFiveSecondInterval)
      clearInterval(setPriceInterval)
      clearInterval(setCurrentTimeInterval)
    }
  }, [blockCount])

  const currentDifficultyEpoch = blockCount
    ? (blockCount / BLOCKS_PER_DIFFICULTY_PERIOD).toFixed(0)
    : undefined

  const timeOfLastBlock = blockStatsForCurrentHeight.time
  const timeOfLastDifficultyAdjustmentBlock =
    blockStatsForHeightOfLastDifficultyAdjustment.time
  const timeOfBlock2016BlocksAgo = blockStatsForBlock2016BlocksAgo.time
  const percent_of_epoch_complete =
    (blockCount / BLOCKS_PER_DIFFICULTY_PERIOD) % 1.0
  const percent_of_epoch_to_go = 1.0 - percent_of_epoch_complete
  const blocksUntilRetarget =
    percent_of_epoch_to_go * BLOCKS_PER_DIFFICULTY_PERIOD
  const transactionsCountLast30Days = chainTxStatsForLastMonth.window_tx_count
  const totalMoneySupply = txOutsetInfo.total_amount
  const utxoSetSize = txOutsetInfo.txouts
  const estimatedSecondsUntilRetarget = blockCount
    ? 10.0 * 60.0 * blocksUntilRetarget
    : undefined

  const blocksSinceLastRetarget =
    BLOCKS_PER_DIFFICULTY_PERIOD - blocksUntilRetarget

  const secondsBetweenLastDifficultyBlockAndLastBlock =
    timeOfLastBlock - timeOfLastDifficultyAdjustmentBlock
  console.log(`BOOO: ${timeOfLastBlock}`)
  console.log(`YOOO: ${timeOfLastDifficultyAdjustmentBlock}`)
  const avgSecondsPerBlockForCurrentEpoch =
    secondsBetweenLastDifficultyBlockAndLastBlock / blocksSinceLastRetarget
  const secondsBetweenBlock2016BlocksAgoAndLastBlock =
    timeOfLastBlock - timeOfBlock2016BlocksAgo
  const avgSecondsPerBlockForLast2016Blocks=
    secondsBetweenBlock2016BlocksAgoAndLastBlock/ 2016
  return (
    <Dashboard
      avgSecondsPerBlockForCurrentEpoch={avgSecondsPerBlockForCurrentEpoch}
      avgSecondsPerBlockForLast2016Blocks={avgSecondsPerBlockForLast2016Blocks}
      chainSize={blockchainInfo.size_on_disk}
      utxoSetSize={utxoSetSize}
      priceInCents={priceInCents}
      pricesLast24Hours={last24HourPrices}
      blockheight={blockCount}
      subsidyInSatsForCurrentBlock={blockStatsForCurrentHeight.subsidy}
      hashrateForEachOfTheLast2016BlocksWithRangeof2016={
        networkHashPsForLastEachOfTheLast2016Blocks
      }
      totalMoneySupply={totalMoneySupply}
      timeOfLastBlock={timeOfLastBlock}
      totalTransactionsCount={chainTxStatsForLastMonth.txcount}
      transactionsCountLast30Days={transactionsCountLast30Days}
      tps30Day={
        transactionsCountLast30Days / chainTxStatsForLastMonth.window_interval
      }
      difficulty={difficulty}
      currentDifficultyEpoch={currentDifficultyEpoch}
      blocksUntilRetarget={(() => {
        return blockCount ? Math.floor(blocksUntilRetarget) : undefined
      })()}
      // averageSecondsPerBlockForCurrentEpoch={(() => {
      //   const blocks_since_last_retarget =
      //     BLOCKS_PER_DIFFICULTY_PERIOD - blocksUntilRetarget

      //   const duration_since_last_difficulty_adjustment =
      //     timeOfLastBlock - timeOfLastDifficultyAdjustmentBlock
      //   const average_seconds_per_block_for_current_epoch =
      //     duration_since_last_difficulty_adjustment / blocks_since_last_retarget
      // })()}
      estimatedSecondsUntilRetarget={estimatedSecondsUntilRetarget}
      estimatedHashRateForLast2016Blocks={networkHashPsForLast2016Blocks}
      difficultyAtEachEpoch={difficultyAtEachEpochInTheLastYear}
      currentTime={currentTime}
      isMarketCapInDollarsLoading={
        isNaN(totalMoneySupply) || isNaN(priceInCents)
      }
    />
  )
}

export default App
