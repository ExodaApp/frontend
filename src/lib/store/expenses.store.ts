import { writable } from 'svelte/store'
import type BigNumber from 'bignumber.js'
import type { IExpense } from '$lib/interfaces/IExpense'

interface IExpenseStore {
    items: IExpense[],
    totalUsdValue: BigNumber | null,
}

export const expenses = writable<IExpenseStore>({
    items: [],
    totalUsdValue: null,
})

export const setExpenses = ({
    items,
    totalUsdValue,
}: {
    items: IExpense[],
    totalUsdValue: BigNumber
}) => {
    expenses.set({
        items,
        totalUsdValue,
    })
}
