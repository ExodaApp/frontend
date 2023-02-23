export enum Currency {
    USD,
    BRL,
}

export interface IExpense {
    id?: number
    userAddress?: string
    name: string
    dueDay: number
    value: number
    currency: Currency 
}
