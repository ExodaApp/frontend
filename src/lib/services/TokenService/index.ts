import axios from 'axios'
import { PUBLIC_ANKR_API } from '$env/static/public'
import z from 'zod'
import BigNumber from 'bignumber.js'
import { Chains, providers, Token, type Chain } from '@exoda-app/tokens'

const ANKR_ARBITRUM = 'arbitrum'
const ANKR_BSC = 'bsc'
const ANKR_POLYGON = 'polygon'
const ANKR_OPTIMISM = 'optimism'
const ANKR_ETH = 'eth'

const NATIVE_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const ankrChains = [
    ANKR_ARBITRUM,
    ANKR_BSC,
    ANKR_POLYGON,
    ANKR_OPTIMISM,
    ANKR_ETH,
] as const

type AnkrChain = typeof ankrChains[number]

const ankrChainToExodaChain: Record<AnkrChain, Chain> = {
    [ANKR_ARBITRUM]: Chains.ARBITRUIM,
    [ANKR_BSC]: Chains.BSC,
    [ANKR_POLYGON]: Chains.POLYGON,
    [ANKR_OPTIMISM]: Chains.OPTIMISM,
    [ANKR_ETH]: Chains.ETH,
} as const

const AnkrTokenSchema = z.object({
    balance: z.string(),
    balanceRawInteger: z.string(),
    balanceUsd: z.string().transform(balanceUsd => new BigNumber(balanceUsd)),
    blockchain: z.enum(ankrChains).transform((chain)=> ankrChainToExodaChain[chain]),
    contractAddress: z.string().nullish(),
    holderAddress: z.string(),
    thumbnail: z.string(),
    tokenDecimals: z.number(),
    tokenName: z.string(),
    tokenPrice: z.string().transform(price => new BigNumber(price)),
    tokenSymbol: z.string(),
    tokenType: z.string(),
}).transform(ankrToken => {
    const token = new Token(
        ankrToken.tokenSymbol,
        ankrToken.tokenPrice.toNumber(),
        ankrToken.thumbnail,
        ankrToken.blockchain,
        ankrToken.contractAddress || NATIVE_ADDRESS,
        ankrToken.tokenName,
        ankrToken.tokenDecimals,
        '0',
        providers[ankrToken.blockchain]
    )

    token.setBalance(ankrToken.balanceRawInteger)

    return token
})


const AnkrResponseSchema = z.object({
    id: z.number(),
    jsonrpc: z.string(),
    result: z.object({
        assets: AnkrTokenSchema.array(),
        totalBalanceUsd: z.string().transform(totalUsd => new BigNumber(totalUsd)),
        totalCount: z.number()
    })
})

/**
 *  Fetch token info from the blockchain
 */
export class TokenService {
    public static readonly chains = []

    public static async getTokens(userAddress: string) {
        const response = await TokenService._fetch('ankr_getAccountBalance', userAddress)

        const walletInfo = AnkrResponseSchema.parse(response.data)

        return walletInfo.result
    }

    private static _fetch(method: string, userAddress: string) {
        return axios.post(`${ PUBLIC_ANKR_API }`, {
            id: 1,
            method,
            params: {
                walletAddress: userAddress,
                blockchain: ankrChains,
            },
        })
    }
}
