import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './components/Dashboard'

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
      const jsonData = await fetchDashboard()
      setPriceInCents(jsonData.price * 100)
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

      const BLOCKS_PER_DIFFICULTY_PERIOD = 2016
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

  return (
    <Dashboard
      priceInCents={priceInCents}
      blockheight={blockCount}
      subsidyInSatsForCurrentBlock={blockStatsForCurrentHeight.subsidy}
      totalMoneySupply={txOutsetInfo.total_amount}
    />
  )
}

export default App
