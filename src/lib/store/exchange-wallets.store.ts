import { writable } from 'svelte/store'
import type { IExpense } from '$lib/interfaces/IExpense'

export const exchangeWallets = writable<IExpense[]>([])

export const setExchangeWallets = (_exchangeWallets: IExpense[]) => {
    exchangeWallets.set(_exchangeWallets)
}
