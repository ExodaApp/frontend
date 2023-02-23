import axios from 'axios'
import { PUBLIC_EXODA_API } from '$env/static/public'
import type { IExpense } from '$lib/interfaces/IExpense'

export class ExpenseService {
    public static readonly baseUrl = `${ PUBLIC_EXODA_API }/expense`

    public static async createExpenses(expenses: IExpense[]) {
        await axios.post(
            ExpenseService.baseUrl,
            { expenses },
            { withCredentials: true },
        )
    }

    public static async getExpenses(): Promise<IExpense[]> {
        return (await axios.get(
            ExpenseService.baseUrl,
            { withCredentials: true }
        )).data
    }

    public static async deleteExpense(id: number) {
        await axios.delete(
            `${ ExpenseService.baseUrl }/${ id }`,
            { withCredentials: true },
        )
    }

    public static async editExpense(expense: IExpense) {
        if (!expense.id)
            throw new Error('Expense doesnt exist')

        await axios.put(
            `${ ExpenseService.baseUrl }/${ expense.id }`,
            expense,
            { withCredentials: true },
        )
    }
}
