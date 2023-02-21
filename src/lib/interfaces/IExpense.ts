export enum Currency {
    USD,
    BRL,
}

export interface IExpense {
    name: string
    dueDay: number
    value: number
    currency: Currency 
}
