import { Injectable } from '@angular/core';
import { ExpenseType, IncomeStatementExpense } from "./IncomeStatement";
import { IncomeStatement } from "./IncomeStatement";

@Injectable({
  providedIn: 'root'
})
export class IncomeStatementService {

  round(number: number): number {
    return Math.round(number * 100) / 100;
  }

  getIncomeStatement(revenue: number, cogs: number, expenseList: IncomeStatementExpense[] = []): IncomeStatement {
    const i = new IncomeStatement();
    i.revenue = revenue;
    i.costOfGoodsSold = cogs;
    i.expenseList = expenseList;
    this.calculateIncomeStatement(i);
    return i;
  }

  calculateIncomeStatement(i: IncomeStatement) {
    i.grossProfit = this.grossProfit(i);
  }

  expensePercentOfRevenue(revenue: number, percentOfRevenue: number) {
    const expense = this.round(revenue * (percentOfRevenue / 100));
    return expense;
  }

  setExpenseTotal(incomeStatement: IncomeStatement) {

    let expenseTotal = 0;
    incomeStatement.expenseList.forEach((expense) => {

      expense.value = 0;
      switch (expense.expenseType) {
        case ExpenseType.percentOfRevenue:
          expense.value = this.expensePercentOfRevenue(incomeStatement.revenue, expense.modifier);
          break;
        case ExpenseType.fixedFee:
          expense.value = expense.modifier;
          break;
        default:
          throw new Error('no switch for' + expense.expenseType.toString());
      }

      expenseTotal = expenseTotal + expense.value;

    });
    incomeStatement.expense = expenseTotal;
  }

  grossProfit(i: IncomeStatement): number {
    this.setExpenseTotal(i);
    return this.round(i.revenue - i.costOfGoodsSold - i.expense);
  }
}

export { IncomeStatementExpense };

