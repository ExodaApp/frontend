import { writable } from 'svelte/store'
import type { IExpense } from '$lib/interfaces/IExpense'

export const expenses = writable<IExpense[]>([])

export const setExpenses = (_expenses: IExpense[]) => {
    expenses.set(_expenses)
}
