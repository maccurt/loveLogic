export class IncomeStatement {
    revenue!: number;
    costOfGoodsSold!: number;
    expenseList: IncomeStatementExpense[] = [];
    taxRate!: number;
    name?: string;
    expense!: number;
    grossProfitBeforeExpenses!: number;
    grossProfitAfterExpense!: number;
    // grossProfit!: number;
    operatingExpenses!: number;
    taxes!: number;
    netIncome!: number;
}

export enum ExpenseType {
    none = 0,
    percentOfRevenue = 1,
    fixedFee,
    shipping
}

export class IncomeStatementExpense {
    name!: string;
    modifier!: number;
    value?: number = 0;
    expenseType: ExpenseType = ExpenseType.none;
}

