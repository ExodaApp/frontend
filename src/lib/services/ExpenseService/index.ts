import axios from 'axios'
import { PUBLIC_EXODA_API } from '$env/static/public'
import type { IExpense } from '$lib/interfaces/IExpense'
import z from 'zod'

const ExpenseSchema = z.object({
    id: z.number(),
    name: z.string(),
    dueDay: z.number().gt(-1).lte(31),
    value: z.number(),
    userAddress: z.string().length(42),
    currency: z.string().length(3),
})

const GetExpensesSchema = z.object({
    items: ExpenseSchema.array(),
    totalUsdValue: z.string()
})

export class ExpenseService {
    public static readonly baseUrl = `${ PUBLIC_EXODA_API }/expense`

    public static async createExpenses(expenses: IExpense[]) {
        await axios.post(
            ExpenseService.baseUrl,
            { expenses },
            { withCredentials: true },
        )
    }

    public static async getExpenses(): Promise<z.infer<typeof GetExpensesSchema>> {
        const response = (await axios.get(
            ExpenseService.baseUrl,
            { withCredentials: true }
        )).data

        return GetExpensesSchema.parse(response)
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
