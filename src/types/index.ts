export type TransactionType = "income" | "expense";
export type IncomeCategory = "sueldo" | "ingresos extra" | "paga";
export type ExpenseCategory = "comida" | "productos básicos" | "vivienda" | "ocio" | "transporte";

export interface Transaction {
    id: string,
    date: string, 
    amount: number,
    content: string,
    type: TransactionType,
    category: IncomeCategory | ExpenseCategory,
}

export interface Balance {
    income: number,
    expense: number,
    balance: number
}

export interface CalendarContent {
    start: string,
    income: string,
    expense: string,
    balance: string
}