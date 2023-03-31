import { writable, get } from 'svelte/store'
import type { IExchangeWallet } from '$lib/interfaces/IExchangeWallet'

export const exchangeWallets = writable<IExchangeWallet[]>([])

export const setExchangeWallets = (_exchangeWallets: IExchangeWallet[]) => {
    exchangeWallets.set(_exchangeWallets)
}

export const getExchange = (exchangeId: number): IExchangeWallet | undefined =>
    get(exchangeWallets).find(wallet => wallet.id === exchangeId)
