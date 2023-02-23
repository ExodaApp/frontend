import { writable } from 'svelte/store'
import type { IExpense } from '$lib/interfaces/IExpense'

export const expenses = writable<IExpense[] | null>(null)

export const setExpenses = (_expenses: IExpense[]) => {
    console.log({ updatedExpenses: _expenses })

    expenses.set(_expenses)
}
