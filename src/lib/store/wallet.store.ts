import { writable } from 'svelte/store'
import type BigNumber from 'bignumber.js'
import type { Token } from '@exoda-app/tokens'

interface IWalletStore {
    tokens: Token[] | null
    totalUsdBalance: BigNumber | null
}

export const wallet = writable<IWalletStore> ({
    tokens: null,
    totalUsdBalance: null,
})

export const setWallet = ({
    tokens,
    totalUsdBalance,
}: IWalletStore) => wallet.set({ tokens, totalUsdBalance })


