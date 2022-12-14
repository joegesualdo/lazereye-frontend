import React, { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'

const BLOCKS_PER_DIFFICULTY_PERIOD = 2016

const IS_PROD = Boolean(import.meta.env.PROD) || Boolean(process.env.IS_PROD)

const BITCOIND_REST_API_URL = IS_PROD
  ? 'https://bitcoin.haltoshi.com:3030'
  : 'http://127.0.0.1:3030'

const BITCOIND_REST_API_CACHE_URL_HOST_AND_PORT = IS_PROD
  ? 'api.lazereye.io:443'
  : '127.0.0.1:3032'

const BITCOIND_REST_API_CACHE_URL = IS_PROD
  ? `https://${BITCOIND_REST_API_CACHE_URL_HOST_AND_PORT}`
  : `http://${BITCOIND_REST_API_CACHE_URL_HOST_AND_PORT}`

const fetchBC = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getblockcount`)
  const blockcount = await data.json()
  return blockcount
}

const fetchBlockStatsForHeightOfLastDifficultyAdjustmentsFromCache =
  async () => {
    const data = await fetch(
      `${BITCOIND_REST_API_CACHE_URL}/api/v1/blockstatsforheightoflastdifficultyadjustments`
    )
    const blockcountFromCacheResponse = await data.json()
    return blockcountFromCacheResponse.response
  }

const fetchBlockcountFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/getblockcount`
  )
  const blockcountFromCacheResponse = await data.json()
  return blockcountFromCacheResponse.response
}
const fetchBlockStatsForCurrentHeightFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/blockstatsforcurrentheight`
  )
  const blockcountFromCacheResponse = await data.json()
  return blockcountFromCacheResponse.response
}

// const fetchPrice = async () => {
//   const data = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
//   const priceResponse = await data.json()
//   return priceResponse
// }

const fetchPriceFromCache = async () => {
  const data = await fetch(`${BITCOIND_REST_API_CACHE_URL}/api/v1/price`)
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
const fetch24HourPriceHistoryFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/24hourpricehistory`
  )
  const priceHistory = await data.json()
  return priceHistory
}

const fetchDifficulty = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getdifficulty`)
  const difficulty = await data.json()
  return difficulty
}
const fetchDifficultyFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/getdifficulty`
  )
  const difficultyFromCacheResponse = await data.json()
  return difficultyFromCacheResponse.response
}
const fetchTxOutsetInfo = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/gettxoutsetinfo`)
  const txOutsetInfo = await data.json()
  return txOutsetInfo
}
const fetchTxOutsetInfoFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/gettxoutsetinfo`
  )
  const txOutsetInfoFromCacheResponse = await data.json()
  return txOutsetInfoFromCacheResponse.response
}
const fetchBlockchainInfo = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getblockchaininfo`)
  const blockchainInfo = await data.json()
  return blockchainInfo
}
const fetchBlockchainInfoFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/getblockchaininfo`
  )
  const getBlockChainInfoCacheResponse = await data.json()
  return getBlockChainInfoCacheResponse.response
}
const fetchBlockStatsForHeight = async (height: number) => {
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getblockstats?hash_or_height=${height}`
  )
  const blockstats = await data.json()
  return blockstats
}
const fetchNetworkHashPsForLast2016Blocks = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_URL}/api/v1/getnetworkhashps?n_blocks=2016`
  )
  const networkHashPs = await data.json()
  return networkHashPs
}

const fetchNetworkHashPsForLast2016BlocksFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/getnetworkhashpsforlast2016blocks`
  )
  const getBlockChainInfoCacheResponse = await data.json()
  return getBlockChainInfoCacheResponse.response
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

const fetchBlockForHeightTwoDifficultyAdjustmentsAgoFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/blockforheighttwodifficultyadjustmentsago`
  )
  const a = await data.json()
  return a.response
}

const fetchNetworkHashPSForEachOfTheLast2016BlocksFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/networkhashpsforeachofthelast2016blocks`
  )
  const a = await data.json()
  return a.response
}

const fetchBlockForHeight = async (height: number) => {
  const blockhash = await fetchBlockHashForHeight(height)
  const block = await fetchBlockForBlockHash(blockhash)
  return block
}

const fetchDifficultyForAllEpochsInTheLastYear = async (
  currentHeight: number
) => {
  const oneYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  )
  // approximately 1 year
  var finished = false
  const results = Array(Math.floor(currentHeight / 2016))
    .fill(0)
    .map((_, i) => i)
    .map(async (i) => {
      if (!finished) {
        const forHeight = currentHeight - i * 2016
        const block = await fetchBlockForHeight(forHeight)
        const blockDifficulty = block.difficulty
        const blockTime = new Date(block.time * 1000)
        if (blockTime < oneYearAgo) {
          finished = true
          return null
        } else {
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

const fetchBlocksMinedOverTheLast24Hours = async (
  currentBlockHeight: number
) => {
  const twentyFourHoursAgo = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  )
  // approximately 1 year
  var finished = false
  const results = Array(300)
    .fill(0)
    .map((_, i) => i)
    .map(async (i) => {
      if (!finished) {
        const forHeight = currentBlockHeight - i
        const block = await fetchBlockStatsForHeight(forHeight)
        const blockTime = new Date(block.time * 1000)
        if (blockTime < twentyFourHoursAgo) {
          finished = true
          return null
        } else {
          return block
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
const fetchLast2016Blocks = async (currentBlockHeight: number) => {
  const results = Array(2016)
    .fill(0)
    .map((_, i) => i)
    .map(async (i) => {
      // We wait 150ms between each request so the bitcoind doesn't get overwhelmed and fail
      await new Promise((resolve) => setTimeout(resolve, 150 * i))
      const forHeight = currentBlockHeight - i
      const block = await fetchBlockStatsForHeight(forHeight)
      console.log(
        `feching last 2016 blocks: ${((i / 2016) * 100).toFixed(2)}% complete`
      )
      return block
    })
    .reverse()
  return await Promise.all(results)
}
const fetchLast2016BlockStatsFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/blockstatsforlast2016blocks`
  )
  const blockstatsforlast2016blocksFromCache = await data.json()
  return blockstatsforlast2016blocksFromCache.response
}
const fetchAllDifficultyAdjustmentsBlocksFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/alldifficultyadjustments`
  )
  const allDifficultyAdjustmentsBlocksFromCache = await data.json()
  return allDifficultyAdjustmentsBlocksFromCache.response
}

const fetchChainTxStatsForLastMonth = async () => {
  const data = await fetch(`${BITCOIND_REST_API_URL}/api/v1/getchaintxstats`)
  const chainTxStatsForLastMonth = await data.json()
  return chainTxStatsForLastMonth
}
const fetchChainTxStatsForLastMonthFromCache = async () => {
  const data = await fetch(
    `${BITCOIND_REST_API_CACHE_URL}/api/v1/getchaintxstats`
  )
  const txOutsetInfoFromCacheResponse = await data.json()
  return txOutsetInfoFromCacheResponse.response
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
  const [blocksMinedOverTheLast24Hours, setBlocksMinedOverTheLast24Hours] =
    useState(null)
  const [
    networkHashPsForBlockMined24HoursAgo,
    setNetworkHashPsForBlockMined24HoursAgo,
  ] = useState({})
  const [last2016Blocks, setLast2016Blocks] = useState(null)
  const [
    blockStatsForHeightOfTwoDifficultyAjustmentsAgo,
    setBlockStatsForHeightOfTwoDifficultyAjustmentsAgo,
  ] = useState({})
  const [blockStatsForCurrentHeight, setBlockStatsForCurrentHeight] = useState(
    {}
  )
  const [blockchainInfo, setBlockchainInfo] = useState({})
  const [txOutsetInfo, setTxOutsetInfo] = useState({})
  const [
    blockStatsForHeightOfLastDifficultyAdjustment,
    setBlockStatsForHeightOfLastDifficultyAdjustment,
  ] = useState({})
  const [chainTxStatsForLastMonth, setChainTxStatsForLastMonth] = useState({})
  const fetchData = async () => {
    const blockCount = await fetchBlockcountFromCache()
    setBlockCount(blockCount)
    const priceResponse = await fetchPriceFromCache()
    setPriceInCents(Number(priceResponse.response) * 100)
    const last24HourPriceHistoryResult =
      await fetch24HourPriceHistoryFromCache()
    setLast24HourPrices(
      last24HourPriceHistoryResult.response.data.prices.reverse()
    )
    const txOutsetInfo = await fetchTxOutsetInfoFromCache()
    setTxOutsetInfo(txOutsetInfo)
    const chainTxStatsForLastMonth =
      await fetchChainTxStatsForLastMonthFromCache()
    setChainTxStatsForLastMonth(chainTxStatsForLastMonth)
    const difficulty = await fetchDifficultyFromCache()
    // setPrice(jsonData.price)
    setDifficulty(difficulty)

    const last2016Blocks = await fetchLast2016BlockStatsFromCache()
    setLast2016Blocks(last2016Blocks)

    const networkHashPsForLast2016Blocks =
      await fetchNetworkHashPsForLast2016BlocksFromCache()
    setNetworkHashPsForLast2016Blocks(networkHashPsForLast2016Blocks)

    const blockStatsForHeightOfTwoDifficultyAjustmentsAgo =
      await fetchBlockForHeightTwoDifficultyAdjustmentsAgoFromCache()
    setBlockStatsForHeightOfTwoDifficultyAjustmentsAgo(
      blockStatsForHeightOfTwoDifficultyAjustmentsAgo
    )

    const blockStatsForCurrentHeight =
      await fetchBlockStatsForCurrentHeightFromCache()
    setBlockStatsForCurrentHeight(blockStatsForCurrentHeight)

    const getBlocksMindedOverTheLast24Hours = (last2016Blocks) => {
      const twentyFourHoursAgo = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
      )
      // approximately 1 year
      const results = last2016Blocks.filter((block) => {
        const blockTime = new Date(block.time * 1000)
        return blockTime >= twentyFourHoursAgo
      })
      return results
    }
    const blocksMinedOverTheLast24Hours =
      getBlocksMindedOverTheLast24Hours(last2016Blocks)
    setBlocksMinedOverTheLast24Hours(blocksMinedOverTheLast24Hours)

    const allDifficultyAdjustmentsBlocks =
      await fetchAllDifficultyAdjustmentsBlocksFromCache()
    const getDifficultyAdjustmentBlocksInTheLastYear = (
      allDifficultyAdjustmentsBlocks
    ) => {
      const oneYearAgo = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      )
      // approximately 1 year
      const results = allDifficultyAdjustmentsBlocks.filter((block) => {
        const blockTime = new Date(block.time * 1000)
        return blockTime >= oneYearAgo
      })
      return results
    }
    const difficultyAtEachEpochInTheLastYear =
      getDifficultyAdjustmentBlocksInTheLastYear(allDifficultyAdjustmentsBlocks)
    setDifficultyAtEachEpochInTheLastYear(difficultyAtEachEpochInTheLastYear)

    const blockchainInfo = await fetchBlockchainInfoFromCache()
    setBlockchainInfo(blockchainInfo)

    const networkHashPsForLastEachOfTheLast2016Blocks =
      await fetchNetworkHashPSForEachOfTheLast2016BlocksFromCache()

    setNetworkHashPsForLastEachOfTheLast2016Blocks(
      networkHashPsForLastEachOfTheLast2016Blocks
    )

    const blockMined24HoursAgo = blocksMinedOverTheLast24Hours.reduce(
      (prev, curr) => {
        return prev.height < curr.height ? prev : curr
      },
      {}
    )

    const networkHashPsForBlockMined24HoursAgo =
      networkHashPsForLastEachOfTheLast2016Blocks.find(
        (h) => h.height === blockMined24HoursAgo.height
      ).hashrate
    // const networkHashPsForBlockMined24HoursAgo =
    //   await fetchNetworkHashPsForLast2016BlocksAtHeight(
    //     blockMined24HoursAgo.height
    //   )
    const hashRateForBlockMined24HoursAgo = {
      height: blockMined24HoursAgo.height,
      hashrate: networkHashPsForBlockMined24HoursAgo,
    }
    setNetworkHashPsForBlockMined24HoursAgo(hashRateForBlockMined24HoursAgo)

    // const blockStatsForBlock2016BlocksAgo = await fetchBlockStatsForHeight(
    //   blockCount - 2016
    // )
    //setBlockStatsForBlock2016BlocksAgo(blockStatsForBlock2016BlocksAgo)
    const currentDifficultyEpoch = blockCount
      ? (blockCount / BLOCKS_PER_DIFFICULTY_PERIOD).toFixed(0)
      : undefined

    const block_height_of_last_difficulty_adjustment =
      (currentDifficultyEpoch - 1) * 2016
    const blockStatsForHeightOfLastDifficultyAdjustment =
      await fetchBlockStatsForHeightOfLastDifficultyAdjustmentsFromCache()
    setBlockStatsForHeightOfLastDifficultyAdjustment(
      blockStatsForHeightOfLastDifficultyAdjustment
    )

    // HERE

    // const difficultyAtEachEpochInTheLastYear =
    //   await fetchDifficultyForAllEpochsInTheLastYear(blockCount)
    // setDifficultyAtEachEpochInTheLastYear(difficultyAtEachEpochInTheLastYear)
  }
  useEffect(() => {
    const setCurrentTimeInterval = setInterval(async () => {
      setCurrentTime(new Date().valueOf())
    }, 1000)
    const setPriceInterval = setInterval(async () => {
      const priceResponse = await fetchPriceFromCache()
      setPriceInCents(Number(priceResponse.response) * 100)
    }, 1000)
    // const everyFiveSecondInterval = setInterval(async () => {
    //   // const newBlockCount = await fetchBC()
    //   const newBlockCountFromCache = await fetchBlockcountFromCache()
    //   const blockChainInfoFromCache = await fetchBlockchainInfoFromCache()
    //   if (newBlockCountFromCache > blockCount) {
    //     console.log(`BEHIND: ${newBlockCountFromCache} -- ${blockCount}`)
    //     fetchData().catch(console.error)
    //     //if (newBlockCountFromCache > blockChainInfoFromCache.blocks) {
    //     //  fetchData().catch(console.error)
    //     //}
    //     // Some of the long running caches updates won't be finished by this time. So those will be reflected until the next block, when this runs again.
    //   } else {
    //     console.log(`NOT BEHIND: ${newBlockCountFromCache} -- ${blockCount}`)
    //   }
    // }, 5000)
    const everySixtySecondInterval = setInterval(async () => {
      const last24HourPriceHistoryResult = await fetch24HourPriceHistory()
      setLast24HourPrices(last24HourPriceHistoryResult.data.prices.reverse())
    }, 1000 * 60)

    // WEBSOCKET
    console.log('SETTING UP WS')
    // const url = '127.0.0.1:3032'
    const uri = IS_PROD
      ? 'wss://' + BITCOIND_REST_API_CACHE_URL_HOST_AND_PORT + '/blockcount'
      : 'ws://' + BITCOIND_REST_API_CACHE_URL_HOST_AND_PORT + '/blockcount'
    const ws = new WebSocket(uri)
    console.log(ws)
    ws.onopen = function () {
      console.log('OPENED!')
      //chat.innerHTML = '<p><em>Connected!</em></p>'
      ws.send('MESSAGE FROM THE CLIENT!')
      // setInterval(() => {
      //   ws.send('MESSAGE FROM THE CLIENT!')
      // }, 1000)
    }
    ws.onmessage = function (msg) {
      console.log('MESSAGE!')
      console.log(msg.data)
      const json = JSON.parse(msg.data)
      console.log(json)
      fetchData().catch(console.error)
      //message(msg.data)
    }
    ws.onclose = function () {
      console.log('CLOSED!')
      // chat.getElementsByTagName('em')[0].innerText = 'Disconnected!'
    }
    // send.onclick = function () {
    //   const msg = text.value
    //   ws.send(msg)
    //   text.value = ''
    //   message('<You>: ' + msg)
    // }

    fetchData()
      .then(() => {})
      .catch(console.error)
    return () => {
      // clearInterval(everyFiveSecondInterval)
      clearInterval(everySixtySecondInterval)
      clearInterval(setPriceInterval)
      clearInterval(setCurrentTimeInterval)
    }
  }, [])

  const currentDifficultyEpoch = blockCount
    ? (blockCount / BLOCKS_PER_DIFFICULTY_PERIOD).toFixed(0)
    : undefined

  const blockStatsForBlock2016BlocksAgo = last2016Blocks
    ? last2016Blocks.reduce((prev, curr) => {
        return prev.height < curr.height ? prev : curr
      }, {})
    : null

  const timeOfLastBlock = blockStatsForCurrentHeight.time
  const timeOfLastDifficultyAdjustmentBlock =
    blockStatsForHeightOfLastDifficultyAdjustment.time
  // TODO: The 0 default makes no sense here
  const timeOfBlock2016BlocksAgo = blockStatsForBlock2016BlocksAgo
    ? blockStatsForBlock2016BlocksAgo.time
    : 0
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
  const avgSecondsPerBlockForCurrentEpoch =
    secondsBetweenLastDifficultyBlockAndLastBlock / blocksSinceLastRetarget
  const secondsBetweenBlock2016BlocksAgoAndLastBlock =
    timeOfLastBlock - timeOfBlock2016BlocksAgo
  const avgSecondsPerBlockForLast2016Blocks =
    secondsBetweenBlock2016BlocksAgoAndLastBlock / 2016
  const totalFeesLast24Hours = blocksMinedOverTheLast24Hours
    ? blocksMinedOverTheLast24Hours.reduce((sum, block) => {
        return sum + block.totalfee
      }, 0)
    : null
  const totalSubsidyLast24Hours = blocksMinedOverTheLast24Hours
    ? blocksMinedOverTheLast24Hours.reduce((sum, block) => {
        return sum + block.subsidy
      }, 0)
    : null
  const avgFeesLast24Hours = totalFeesLast24Hours
    ? totalFeesLast24Hours / blocksMinedOverTheLast24Hours.length
    : null
  const totalFeesLast2016Blocks = last2016Blocks
    ? last2016Blocks.reduce((sum, block) => {
        return sum + block.totalfee
      }, 0)
    : null
  const totalSubsidyLast2016Blocks = last2016Blocks
    ? last2016Blocks.reduce((sum, block) => {
        return sum + block.subsidy
      }, 0)
    : null
  const avgFeesLast2016Blocks = totalFeesLast2016Blocks
    ? last2016Blocks.reduce((sum, block) => {
        return sum + block.totalfee
      }, 0) / last2016Blocks.length
    : null
  return (
    <Dashboard
      networkHashrateForBlockMined24HoursAgo={
        networkHashPsForBlockMined24HoursAgo
          ? networkHashPsForBlockMined24HoursAgo.hashrate
          : null
      }
      difficultyForHeightOfTwoDifficultyAdjustmentsAgo={
        blockStatsForHeightOfTwoDifficultyAjustmentsAgo.difficulty
      }
      feesVsRewardLast24Hours={totalFeesLast24Hours / totalSubsidyLast24Hours}
      feesVsRewardLast2016Blocks={
        totalFeesLast2016Blocks / totalSubsidyLast2016Blocks
      }
      avgFeesLast24HoursInSats={avgFeesLast24Hours}
      avgFeesLast2016BlocksInSats={avgFeesLast2016Blocks}
      totalFeesLast24HoursInSats={totalFeesLast24Hours}
      blocksMinedOverTheLast24HoursCount={
        blocksMinedOverTheLast24Hours
          ? blocksMinedOverTheLast24Hours.length
          : undefined
      }
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
