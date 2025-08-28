export type TransactionType = "income" | "expense";
export type IncomeCategory = "salary" | "extra income" | "pocket money";
export type ExpenseCategory = "groceries" | "daily necessities" | "housing expense" | "entertainment" | "transportation expenses";

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