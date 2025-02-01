
export class IncomeStatement {
    name?: string;
    revenue!: number;
    costOfGoodsSold!: number;
    expenseList: IncomeStatementExpense[] = [];
    expense!: number;
    grossProfit!: number;
    operatingExpenses!: number;
    taxRate!: number;
    netIncome!: number;
}

export enum ExpenseType {
    none = 0,
    percentOfRevenue = 1,
    fixedFee
}

export class IncomeStatementExpense {
    name!: string;
    modifier!: number;
    value?: number = 0;
    expenseType: ExpenseType = ExpenseType.none;
}

