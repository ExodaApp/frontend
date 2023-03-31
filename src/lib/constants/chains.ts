import { ChainMap, IChainData } from '../types'

export const ETH = 1
export const ETH_TESTNET = 5
export const AVAX = 43114
export const AVAX_TESTNET = 43113
export const BSC = 56
export const BSC_TESTNET = 97
export const POLYGON = 137
export const POLYGON_TESTNET = 80001

export const Chains = {
  ETH,
  ETH_TESTNET,

  AVAX,
  AVAX_TESTNET,

  BSC,
  BSC_TESTNET,

  POLYGON,
  POLYGON_TESTNET,
} as const

type ChainKey = keyof typeof Chains 

export type Chain = typeof Chains[ChainKey]
export const availableChains: Chain[] = Object.values(Chains)

export const chainsInfo: ChainMap<IChainData> = {
    [Chains.ETH]: {
        name: 'Ethereum',
        icon: 'icons-ethereum',
        rpc: 'https://rpc.ankr.com/eth',
        id: 1,
        currency: 'ETH',
        explorer: 'https://etherscan.io',
    },

    [Chains.ETH_TESTNET]: {
        name: 'Goerli',
        icon: 'icons-ethereum',
        rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        id: 5,
        currency: 'ETH',
        explorer: 'https://goerli.etherscan.io',
    },

    [Chains.AVAX]: {
        name: 'Avalanche',
        icon: 'icons-avalanche',
        rpc: 'https://rpc.ankr.com/avalanche',
        id: 43114,
        currency: 'AVAX',
        explorer: 'https://snowtrace.io'
    },

    [Chains.AVAX_TESTNET]: {
        name: 'Avalanche Testnet',
        icon: 'icons-avalanche',
        rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
        id: 43113,
        currency: 'AVAX',
        explorer: 'https://testnet.snowtrace.io'
    },

    [Chains.POLYGON]: {
        name: 'Polygon',
        icon: 'icons-polygon',
        rpc: 'https://rpc.ankr.com/polygon',
        id: 137,
        currency: 'MATIC',
        explorer: 'https://polygonscan.com',
    },

    [Chains.POLYGON_TESTNET]: {
        name: 'Polygon Testnet',
        icon: 'icons-polygon',
        rpc: 'https://rpc-mumbai.maticvigil.com',
        id: 80001,
        currency: 'MATIC',
        explorer: 'https://mumbai.polygonscan.com',
    },

    [Chains.BSC]: {
        name: 'BNB Chain',
        icon: 'icons-bsc',
        rpc: 'https://rpc.ankr.com/bsc',
        id: 56,
        currency: 'BNB',
        explorer: 'https://bscscan.com',
    },

    [Chains.BSC_TESTNET]: {
        name: 'BNB Chain Testnet',
        icon: 'icons-bsc',
        rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        id: 97,
        currency: 'BNB',
        explorer: 'https://testnet.bscscan.com',
    },
}

