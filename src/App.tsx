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
  const [price, setPrice] = useState(0)
  const [blockHeight, setBlockHeight] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [networkHashPsForLast2016Blocks, setNetworkHashPsForLast2016Blocks] =
    useState(0)
  const [blockStatsForCurrentHeight, setBlockStatsForCurrentHeight] = useState(
    {}
  )
  const [
    blockStatsForHeightOfLastDifficultyAdjustment,
    setBlockStatsForHeightOfLastDifficultyAdjustment,
  ] = useState({})
  const [chainTxStatsForLastMonth, setChainTxStatsForLastMonth] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchDashboard()
      setPrice(jsonData.price)
      // setBlockHeight(jsonData.block_count)
      //
      const blockcount = await fetchBC()
      // setPrice(jsonData.price)
      setBlockHeight(blockcount)

      const difficulty = await fetchDifficulty()
      // setPrice(jsonData.price)
      setDifficulty(difficulty)

      const blockStatsForCurrentHeight = await fetchBlockStatsForHeight(
        blockcount
      )
      setBlockStatsForCurrentHeight(blockStatsForCurrentHeight)
      const networkHashPsForLast2016Blocks =
        await fetchNetworkHashPsForLastBlocks(2016)
      setNetworkHashPsForLast2016Blocks(networkHashPsForLast2016Blocks)
      const BLOCKS_PER_DIFFICULTY_PERIOD = 2016
      const current_difficulty_epoch =
        blockcount / BLOCKS_PER_DIFFICULTY_PERIOD + 1
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
    }
    fetchData().catch(console.error)
  }, [])
  const onClickUpdate = () => {
    const fetchMainData = async () => {
      const jsonData = await fetchData()
      setPrice(jsonData.price)
      return jsonData
    }
    fetchMainData().catch(console.error)
  }
  return (
    <Dashboard
      blockheight={blockHeight}
      subsidyInSatsForCurrentBlock={blockStatsForCurrentHeight.subsidy}
    />
  )
}

export default App
