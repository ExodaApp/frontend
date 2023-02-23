import axios from 'axios'
import { PUBLIC_EXODA_API } from '$env/static/public'
import type { IExpense } from '$lib/interfaces/IExpense'

export class ExpenseService {
    public static readonly baseUrl = `${ PUBLIC_EXODA_API }/expense`

    public static async createExpenses(expenses: IExpense[]) {
        console.log({ expenses })

        await axios.post(
            ExpenseService.baseUrl,
            { expenses },
            { withCredentials: true },
        )
    }

    public static async getExpenses(userAddress: string): Promise<IExpense[]> {
        return (await axios.get(
            `${ ExpenseService.baseUrl }`,
            { withCredentials: true }
        )).data
    }
}
