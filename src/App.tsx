import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './components/Dashboard'

const BLOCKS_PER_DIFFICULTY_PERIOD = 2016
const appStyles = {
  backgroundColor: 'rgb(20 26 47/1)',
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
}

const fetchDashboard = async () => {
  const data = await fetch('http://127.0.0.1:3030/api/v1/dashboard')
  const json = await data.json()
  console.log(json)
  return json
}
const fetchBC = async () => {
  console.log('about to fetch block count...')
  const data = await fetch('http://127.0.0.1:3030/api/v1/getblockcount')
  console.log('blockcount: ')
  const blockcount = await data.json()
  console.log(blockcount)
  return blockcount
}
const fetchDifficulty = async () => {
  const data = await fetch('http://127.0.0.1:3030/api/v1/getdifficulty')
  const difficulty = await data.json()
  return difficulty
}
const fetchTxOutsetInfo = async () => {
  const data = await fetch('http://127.0.0.1:3030/api/v1/gettxoutsetinfo')
  const txOutsetInfo = await data.json()
  return txOutsetInfo
}
const fetchBlockStatsForHeight = async (height: number) => {
  console.log('about to fetch block count...')
  const data = await fetch(
    `http://127.0.0.1:3030/api/v1/getblockstats?hash_or_height=${height}`
  )
  const blockstats = await data.json()
  console.log(blockstats)
  return blockstats
}
const fetchNetworkHashPsForLastBlocks = async (blockCount: number) => {
  const data = await fetch(
    `http://127.0.0.1:3030/api/v1/getnetworkhashps?n_blocks=${blockCount}`
  )
  const networkHashPs = await data.json()
  return networkHashPs
}

const fetchChainTxStatsForLastMonth = async () => {
  console.log('about to fetch block count...')
  const data = await fetch('http://127.0.0.1:3030/api/v1/getchaintxstats')
  const chainTxStatsForLastMonth = await data.json()
  console.log(chainTxStatsForLastMonth)
  return chainTxStatsForLastMonth
}
function App(): React.ReactElement {
  const [priceInCents, setPriceInCents] = useState(0)
  const [blockCount, setBlockCount] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [networkHashPsForLast2016Blocks, setNetworkHashPsForLast2016Blocks] =
    useState(0)
  const [blockStatsForCurrentHeight, setBlockStatsForCurrentHeight] = useState(
    {}
  )
  const [txOutsetInfo, setTxOutsetInfo] = useState({})
  const [
    blockStatsForHeightOfLastDifficultyAdjustment,
    setBlockStatsForHeightOfLastDifficultyAdjustment,
  ] = useState({})
  const [chainTxStatsForLastMonth, setChainTxStatsForLastMonth] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      // const jsonData = await fetchDashboard()
      setPriceInCents(1977800)
      // setBlockHeight(jsonData.block_count)
      //
      const blockCount = await fetchBC()
      // setPrice(jsonData.price)
      setBlockCount(blockCount)

      const difficulty = await fetchDifficulty()
      // setPrice(jsonData.price)
      setDifficulty(difficulty)

      const blockStatsForCurrentHeight = await fetchBlockStatsForHeight(
        blockCount
      )
      setBlockStatsForCurrentHeight(blockStatsForCurrentHeight)
      const networkHashPsForLast2016Blocks =
        await fetchNetworkHashPsForLastBlocks(2016)
      setNetworkHashPsForLast2016Blocks(networkHashPsForLast2016Blocks)

      const current_difficulty_epoch =
        blockCount / BLOCKS_PER_DIFFICULTY_PERIOD + 1
      const block_height_of_last_difficulty_adjustment =
        (current_difficulty_epoch - 1) * 2016
      const blockStatsForHeightOfLastDifficultyAdjustment =
        await fetchBlockStatsForHeight(
          block_height_of_last_difficulty_adjustment
        )
      setBlockStatsForHeightOfLastDifficultyAdjustment(
        blockStatsForHeightOfLastDifficultyAdjustment
      )

      const chainTxStatsForLastMonth = await fetchChainTxStatsForLastMonth()
      setChainTxStatsForLastMonth(chainTxStatsForLastMonth)
      // TAKES A VERY LONG TIME
      const txOutsetInfo = await fetchTxOutsetInfo()
      setTxOutsetInfo(txOutsetInfo)
    }
    fetchData().catch(console.error)
  }, [])
  // console.log('------')
  // console.log(`price: ${priceInCents}`)
  // console.log(`blockCount: ${blockCount}`)
  // console.log(`totalMoneySupply: ${txOutsetInfo.total_amount}`)
  // console.log('------')

  const timeOfLastBlock = blockStatsForCurrentHeight.time
  const timeOfLastDifficultyAdjustmentBlock =
    blockStatsForHeightOfLastDifficultyAdjustment.time
  const percent_of_epoch_complete =
    (blockCount / BLOCKS_PER_DIFFICULTY_PERIOD) % 1.0
  const percent_of_epoch_to_go = 1.0 - percent_of_epoch_complete
  const blocksUntilRetarget =
    percent_of_epoch_to_go * BLOCKS_PER_DIFFICULTY_PERIOD
  const transactionsCountLast30Days = chainTxStatsForLastMonth.window_tx_count
  return (
    <Dashboard
      priceInCents={priceInCents}
      blockheight={blockCount}
      subsidyInSatsForCurrentBlock={blockStatsForCurrentHeight.subsidy}
      totalMoneySupply={txOutsetInfo.total_amount}
      timeOfLastBlock={timeOfLastBlock}
      totalTransactionsCount={chainTxStatsForLastMonth.txcount}
      transactionsCountLast30Days={transactionsCountLast30Days}
      tps30Day={
        transactionsCountLast30Days / chainTxStatsForLastMonth.window_interval
      }
      difficulty={difficulty}
      currentDifficultyEpoch={(
        blockCount / BLOCKS_PER_DIFFICULTY_PERIOD +
        1
      ).toFixed(0)}
      blocksUntilRetarget={(() => {
        return Math.ceil(blocksUntilRetarget)
      })()}
      // averageSecondsPerBlockForCurrentEpoch={(() => {
      //   const blocks_since_last_retarget =
      //     BLOCKS_PER_DIFFICULTY_PERIOD - blocksUntilRetarget

      //   const duration_since_last_difficulty_adjustment =
      //     timeOfLastBlock - timeOfLastDifficultyAdjustmentBlock
      //   const average_seconds_per_block_for_current_epoch =
      //     duration_since_last_difficulty_adjustment / blocks_since_last_retarget
      // })()}
      estimatedSecondsUntilRetarget={10.0 * 60.0 * blocksUntilRetarget}
      estimatedHashRateForLast2016Blocks={networkHashPsForLast2016Blocks}
    />
  )
}

export default App
